import React from 'react';
import {ScrollView, Text, Image} from 'react-native';
import {empty} from '@assets/images';
import {t} from '@translations';
import styles from './EmptyState.styles';
/*
 change empty to require(empty) or fix it in the import in impty file
*/
const EmptyState = () => {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      style={styles.container}
      contentContainerStyle={styles.contentContiner}>
      <Image source={empty} />
      <Text style={styles.emptyTitle}>{t.connections.emptyTitle}</Text>
      <Text style={styles.emptyDescription}>
        {t.connections.emptyDescription}
      </Text>
    </ScrollView>
  );
};

export default React.memo(EmptyState);
