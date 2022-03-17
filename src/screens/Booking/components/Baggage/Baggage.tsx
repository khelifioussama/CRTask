import React from 'react';
import {View, Text} from 'react-native';
import {Divider} from 'react-native-paper';
import {t} from '@translations';
import styles from './Baggage.styles';
import BaggageItem from '../BaggageItem/BaggageItem';

/*
Simple baggage selection should be implemented with the following options to choose from:
- Select “Cabin Bag 40 x 18 x 25 cm, 7kg Free”
- Select “Checked Bag 55 x 20 x 40 cm, 10kg Free”
*/
interface BaggageProps {
  cabin: Boolean;
  checked: Boolean;
  setCabinValue: () => void;
  setCheckedValue: () => void;
}

const Baggage = ({
  cabin,
  checked,
  setCabinValue,
  setCheckedValue,
}: BaggageProps) => (
  <View style={styles.mainContainer}>
    <Divider />
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.baggage.title}</Text>
      <BaggageItem
        value={cabin}
        setValue={setCabinValue}
        icon={'bag-personal'}
        name={t.baggage.cabin}
        size={t.baggage.cabinSize}
        price={t.baggage.price}
      />
      <BaggageItem
        value={checked}
        setValue={setCheckedValue}
        icon={'bag-checked'}
        name={t.baggage.checked}
        size={t.baggage.checkedSize}
        price={t.baggage.price}
      />
    </View>
    <Divider />
  </View>
);

export default Baggage;
