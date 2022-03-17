import React from 'react';
import {Text, View} from 'react-native';
import {t} from '@translations';
import FlightInfo from '../FlightInfo/FlightInfo';
import styles from './FlightData.styles';

/*
 when a flight is selected , the following data is shown : 
  - Base Airport
  - Destination Airport
  - Airport codes
  - Departure Time
  - Price before discount
  - Price before discount
  - Price after discount
*/
interface FlightDataProps {
  destination: string;
  destinationIata: string;
  time: string;
  origin: string;
  originIata: string;
}

const FlightData = ({
  destination,
  destinationIata,
  origin,
  originIata,
  time,
}: FlightDataProps) => (
  <View style={styles.boxesRow}>
    <View style={styles.leftOuterBox}>
      <View style={styles.leftInnerBox}>
        <FlightInfo
          destination={destination}
          destinationIata={destinationIata}
          origin={origin}
          originIata={originIata}
          time={time}
        />
      </View>
      <View style={styles.leftInnerBox}>
        <FlightInfo
          destination={origin}
          destinationIata={originIata}
          origin={destination}
          originIata={destinationIata}
          time={time}
        />
      </View>
    </View>
    <View style={styles.rightBox}>
      <Text style={styles.priceLabel}>{t.flightInfoModal.priceLabel}</Text>
      <Text style={styles.newPrice}>{t.flightInfoModal.newPrice}</Text>
      <Text style={styles.oldPrice}>{t.flightInfoModal.oldPrice}</Text>
    </View>
  </View>
);

export default FlightData;
