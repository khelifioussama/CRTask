// @ts-nocheck

import React from 'react';
import {View, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {FlightData} from '@components';
import Baggage from './components/Baggage/Baggage';
import Form from './components/PassengerForm/Form';
import styles from './Booking.styles';
import {RootStackParamsList} from '@navigation/types';

const Booking = () => {
  /*
  My Booking screen should be opened after pressing the “Book Ticket” button in Modal with flight summary : done
  TS is ignored in this file
    */
  const route = useRoute<RouteProp<RootStackParamsList, 'BookingScreen'>>();
  const [state, setState] = React.useState({
    cabin: true,
    checked: true,
  });

  const {
    id,
    destination,
    destinationIata,
    origin,
    originIata,
    time,
  } = route.params.modalData;

  const setCabinVal = () => setState({...state, cabin: !state.cabin});
  const setCheckedVal = () => setState({...state, checked: !state.checked});

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <FlightData
          destination={destination}
          destinationIata={destinationIata}
          origin={origin}
          originIata={originIata}
          time={time}
        />
        <Baggage
          cabin={state.cabin}
          checked={state.checked}
          setCabinValue={setCabinVal}
          setCheckedValue={setCheckedVal}
        />
        <Form flightId={id} />
      </ScrollView>
    </View>
  );
};

export default Booking;
