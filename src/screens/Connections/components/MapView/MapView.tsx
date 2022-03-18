import React from 'react';
import {View, Text} from 'react-native';
import Map, {Marker} from 'react-native-maps';
import {CircledButton} from '@components';
import {colors, iconTypes} from '@constants';
import CustomMapStyle from './CustomMapStyle.json';
import styles from './MapView.styles';
import {FlightData} from '@types';
import {flights} from '@data';
/*
Map key need to be added to app.json this app will work only in expo go , in standlone mode the Map will not work
use functions unsted of class
*/

const INIT_REGION = {
  latitude: 41.8962667,
  longitude: 11.3340056,
  latitudeDelta: 12,
  longitudeDelta: 12,
};

interface MapViewProps {
  openModal: (modalData: {
    destination: string;
    destinationIata: string;
    time: string;
    origin: string;
    originIata: string;
    id: string;
    location: {
      latitude: number;
      longitude: number;
    };
  }) => void;
  originAirport: {
    city: string;
    iata: string;
  };
}

interface MapViewState {}

class MapView extends React.Component<MapViewProps, MapViewState> {
  mapRef = React.createRef<Map>();

  renderMarker = (data: FlightData) => {
    return (
      <Marker
        key={data.id}
        identifier={`${data.id}`}
        coordinate={data.location}
        pinColor={colors.white}
        stopPropagation
        tracksViewChanges={false}
        onPress={() => this.handlePress(data)}>
        <View style={styles.marker}>
          <CircledButton
            withShadow={false}
            iconName={iconTypes.flights}
            iconSize={24}
          />
          <Text style={styles.iata}>{data.destinationIata}</Text>
          <Text style={styles.city}>{data.destination}</Text>
        </View>
      </Marker>
    );
  };

  handlePress = (flightData: FlightData) => {
    const {openModal, originAirport} = this.props;
    const modalData = {
      ...flightData,
      destination: flightData.destination,
      destinationIata: flightData.destinationIata,
      time: flightData.time,
      origin: originAirport.city,
      originIata: originAirport.iata,
    };
    openModal(modalData);
  };

  render() {
    return (
      <Map
        style={styles.container}
        initialRegion={INIT_REGION}
        customMapStyle={CustomMapStyle}
        ref={this.mapRef}
        moveOnMarkerPress={false}>
        {flights.map((item: FlightData) => this.renderMarker(item))}
      </Map>
    );
  }
}

export default MapView;
