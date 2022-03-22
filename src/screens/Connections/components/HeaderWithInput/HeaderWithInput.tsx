import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  LayoutAnimation,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Icon, Header} from '@components';
import {t} from '@translations';
import {flightUtils} from '@utils';
import {iconTypes, colors} from '@constants';
import styles, {inputIconSize} from './HeaderWithInput.styles';
import AutocompleteItem from '../AutocompleteItem/AutocompleteItem';
import {AirportData} from '../../../../types/AirportData';

interface HeaderWithInputProps {
  originAirport: {city: string; iata: string} | null;
  searchingFlights: boolean;
  fromText: string;
  onChangeText: (text: string) => void;
  setSearchResults: (searchResults: AirportData[]) => void;
  setOriginAirport: (airport: {iata: string; city: string} | null) => void;
  inputExpanded: boolean;
  setInputExpanded: (isInputExpanded: boolean) => void;
  searchResults: AirportData[];
  handleCitySelect: ({iata, city}: {iata: string; city: string}) => void;
}
/* 
  - set label minimized when text empty 
  - animation not smooth
  - onBlur !fromtext need to check  the length of the fromtext.length == 0
  - use onChangetext when click renderInputRight cross button to clear the field ( fromtext )
  - setLabelMinimized to false when click renderInputRight cross button
  - keyExtractor={(item) => item.iata} keyExtractor need to be unique use flatList index or keyGenerator
*/
const HeaderWithInput = ({
  originAirport,
  searchingFlights,
  fromText,
  onChangeText,
  setSearchResults,
  setOriginAirport,
  inputExpanded,
  setInputExpanded,
  searchResults,
  handleCitySelect,
}: HeaderWithInputProps) => {
  const [labelMinimized, setLabelMinimized] = useState(false);
  const inputRef = useRef<TextInput | null>(null);
  const inputLabelAnimation = useRef(new Animated.Value(0)).current;

  const renderInputRight = () => {
    if (originAirport) {
      return <Text style={styles.inputIata}>{`(${originAirport.iata})`}</Text>;
    }
    if (fromText) {
      return (
        <TouchableOpacity
          onPress={() => {
            inputRef?.current?.clear();
            setSearchResults(flightUtils.autocompleteListInitialState);
          }}
          style={styles.crossContainer}>
          <Icon
            name={iconTypes.cross}
            size={12}
            color={colors.clearButtonCross}
          />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderItem = ({
    item: {iata, name, city},
  }: {
    item: {iata: string; name: string; city: string};
  }) => {
    return (
      <AutocompleteItem
        iata={iata}
        name={name}
        city={city}
        handleCitySelect={handleCitySelect}
      />
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View
        style={[styles.headerTop, inputExpanded && styles.headerTopShrinked]}>
        {!inputExpanded && (
          <Header
            headerFirstLine={t.connections.headerFirst}
            headerHighlightedText={t.connections.headerHighlighted}
            textColor={colors.white}
            highlightedTextColor={colors.white}
          />
        )}
      </View>
      <View
        style={[
          styles.headerBottom,
          inputExpanded && styles.headerBottomExpanded,
        ]}
      />
      <View
        style={[
          styles.inputContainer,
          inputExpanded && styles.inputContainerExpanded,
        ]}>
        <View style={styles.inputRow}>
          <Icon
            name={iconTypes.flights}
            size={inputIconSize}
            color={colors.textPrimary}
          />
          <View style={styles.textInputContainer}>
            <Animated.Text
              style={[
                labelMinimized ? styles.labelEnd : styles.labelStart,
                {
                  top: inputLabelAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ]}>
              {t.connections.inputPlaceholder}
            </Animated.Text>
            <TextInput
              ref={inputRef}
              style={styles.input}
              selectionColor={colors.textPrimary}
              value={fromText}
              onChangeText={onChangeText}
              autoCorrect={false}
              editable={!searchingFlights}
              onFocus={() => {
                if (originAirport) {
                  setSearchResults(
                    flightUtils.searchCityAutocomplete(originAirport.city),
                  );
                }
                LayoutAnimation.easeInEaseOut();
                setInputExpanded(true);
                setOriginAirport(null);
                if (!labelMinimized) {
                  setLabelMinimized(true);
                  Animated.timing(inputLabelAnimation, {
                    toValue: 1,
                    duration: 150,
                    useNativeDriver: false,
                  }).start();
                }
              }}
              onBlur={() => {
                LayoutAnimation.easeInEaseOut();
                setInputExpanded(false);
                if (labelMinimized && !fromText) {
                  setLabelMinimized(false);
                  Animated.timing(inputLabelAnimation, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: false,
                  }).start();
                }
              }}
            />
          </View>
          {renderInputRight()}
        </View>
        {inputExpanded && (
          <View style={styles.inputExpandedList}>
            <FlatList
              style={styles.autoCompleteList}
              data={searchResults}
              renderItem={renderItem}
              keyExtractor={(item) => item.iata}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderWithInput;
