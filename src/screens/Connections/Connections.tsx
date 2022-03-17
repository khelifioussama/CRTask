import React, {useState, useCallback, useRef} from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  Keyboard,
  View,
  StyleSheet,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {colors} from '@constants';
import {t} from '@translations';
import {flightUtils} from '@utils';
import {ModalData} from '@types';
import FlightInfoModal from './components/FlightInfoModal/FlightInfoModal';
import styles from './Connections.styles';
import MapView from './components/MapView/MapView';
import FlightCard from './components/FlightCard/FlightCard';
import HeaderWithInput from './components/HeaderWithInput/HeaderWithInput';
import EmptyState from './components/EmptyState/EmptyState';
import Switch from './components/Switch/Switch';
import {flights} from '../../data';

type Props = {
  navigation: any;
};

/*
 storing flights in store would be better , to work offline
*/

const Connections = ({navigation}: Props) => {
  const [fromText, setFromText] = useState('');
  const [inputExpanded, setInputExpanded] = useState(false);
  const [originAirport, setOriginAirport] = useState<{
    iata: string;
    city: string;
  } | null>(null);
  const [searchResults, setSearchResults] = useState(
    flightUtils.autocompleteListInitialState,
  );
  const [searchingFlights, setSearchingFlights] = useState(false);
  const [isMapView, setIsMapView] = useState(false);
  const [modalData, setModalData] = useState<ModalData>({
    id: '',
    destination: '',
    destinationIata: '',
    time: '',
    origin: '',
    originIata: '',
  });
  const modalRef = useRef<RBSheet | null>(null);

  const openModal = useCallback((newModalData) => {
    modalRef?.current?.open();
    setModalData(newModalData);
  }, []);

  const onChangeText = useCallback((text) => {
    /* secure text text?.length  */
    if (text.length > 1) {
      setSearchResults(flightUtils.searchCityAutocomplete(text));
    } else {
      setSearchResults(flightUtils.autocompleteListInitialState);
    }
    setFromText(text);
  }, []);

  const handleCitySelect = useCallback(({iata, city}) => {
    setOriginAirport({
      iata,
      city,
    });
    setFromText(city);
    setSearchingFlights(true);
    Keyboard.dismiss();
    setTimeout(() => {
      setSearchingFlights(false);
    }, 2000);
  }, []);

  const onPress = () => {
    if (modalRef && modalRef.current && modalRef.current.close) {
      modalRef.current.close();
    }

    navigation.navigate('BookingScreen', {
      modalData: modalData,
    });
  };

  const renderFlight = ({
    item: {destination, destinationIata, time, id},
  }: {
    item: {
      destination: string;
      destinationIata: string;
      time: string;
      id: string;
    };
  }) => {
    if (originAirport !== null) {
      return (
        <FlightCard
          id={id}
          destination={destination}
          destinationIata={destinationIata}
          time={time}
          origin={originAirport.city}
          originIata={originAirport.iata}
          onPress={openModal}
        />
      );
    }
    return null;
  };

  const renderBody = () => {
    if (searchingFlights || originAirport) {
      return (
        <FlatList
          style={styles.flightsList}
          data={searchingFlights ? [] : flights}
          renderItem={renderFlight}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            searchingFlights ? (
              <ActivityIndicator color={colors.blue} />
            ) : (
              <Text style={styles.openedToday}>
                {t.connections.openedToday}
              </Text>
            )
          }
        />
      );
    }
    return <EmptyState />;
  };

  const listViewContainerStyle = {
    opacity: !isMapView ? 1 : 0,
    ...StyleSheet.absoluteFillObject,
  };

  const mapViewContainerStyle = {
    opacity: isMapView ? 1 : 0,
    ...StyleSheet.absoluteFillObject,
  };

  return (
    <>
      <View
        pointerEvents={isMapView ? 'auto' : 'none'}
        style={mapViewContainerStyle}>
        {originAirport ? (
          <MapView originAirport={originAirport} openModal={openModal} />
        ) : null}
      </View>
      <View
        pointerEvents={isMapView ? 'none' : 'auto'}
        style={listViewContainerStyle}>
        <SafeAreaView style={styles.safeArea} />
        <HeaderWithInput
          originAirport={originAirport}
          searchingFlights={searchingFlights}
          fromText={fromText}
          onChangeText={onChangeText}
          setSearchResults={setSearchResults}
          setOriginAirport={setOriginAirport}
          inputExpanded={inputExpanded}
          setInputExpanded={setInputExpanded}
          searchResults={searchResults}
          handleCitySelect={handleCitySelect}
        />
        {renderBody()}
      </View>
      {!!originAirport && !searchingFlights && (
        <View style={styles.switchContainer}>
          <Switch toggled={isMapView} setToggled={setIsMapView} />
        </View>
      )}
      <FlightInfoModal modalRef={modalRef} {...modalData} onPress={onPress} />
    </>
  );
};

export default Connections;
