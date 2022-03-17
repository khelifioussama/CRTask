import React from 'react';
import {View, Text} from 'react-native';
import styles from './BaggageItem.styles';
import {Checkbox} from 'react-native-paper';
import {MaterialCommunityIcons} from '@expo/vector-icons';



/* 
User should be able to select/deselect Cabin and Checked baggage : Done
*/
interface BaggageItemProps {
  value: Boolean;
  setValue: () => void;
  icon: any;
  name: string;
  size: string;
  price: string;
}

export default class BaggageClassComponent extends React.Component<BaggageItemProps> {
  render() {
    const {value, setValue, icon, name, size, price} = this.props;
    return (
      <View style={styles.baggageElementWrapper}>
        <View style={styles.bagWrapper}>
          <View style={styles.checkboxWrapper}>
            <Checkbox
              status={value ? 'checked' : 'unchecked'}
              onPress={setValue}
            />
          </View>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name={icon} size={35} color="black" />
          </View>
          <View>
            <Text>{name}</Text>
            <Text style={styles.size}>{size}</Text>
          </View>
        </View>
        <View>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>{price}</Text>
          </View>
        </View>
      </View>
    );
  }
}
