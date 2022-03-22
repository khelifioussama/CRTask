import React, {Ref} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import modalStyles from '@styles/modalStyles';
import {t} from '@translations';
import styles from './FlightInfoModal.styles';
import {FlightData} from '@components';

const modalHeight = 510;
/* 
- modalHeight should be responsive for all devices type
*/
interface FlightInfoModalProps {
  destination: string;
  destinationIata: string;
  time: string;
  origin: string;
  originIata: string;
  modalRef: Ref<RBSheet>;
  onPress(): void;
}

const FlightInfoModal = ({
  modalRef,
  destination,
  destinationIata,
  origin,
  originIata,
  time,
  onPress,
}: FlightInfoModalProps) => {
  return (
    <RBSheet
      height={modalHeight}
      ref={modalRef}
      closeOnDragDown
      closeOnPressMask
      customStyles={{
        container: modalStyles.modalContainer,
        wrapper: modalStyles.modalWrapper,
        draggableIcon: modalStyles.modalDraggableIcon,
      }}>
      <View style={styles.container}>
        <FlightData
          destination={destination}
          destinationIata={destinationIata}
          origin={origin}
          originIata={originIata}
          time={time}
        />
        <View style={styles.transferRow}>
          <Text style={styles.transferLabel}>
            {t.flightInfoModal.transferLabel}
            <Text style={styles.transferValue}>
              {t.flightInfoModal.transferValue}
            </Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.guideButton}>
          <Text style={styles.guideButtonText}>
            {t.flightInfoModal.buttonFirst}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.detailsButton} onPress={onPress}>
          <Text style={styles.detailsButtonText}>
            {t.flightInfoModal.buttonSecond}
          </Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView />
    </RBSheet>
  );
};

export default React.memo(FlightInfoModal);
