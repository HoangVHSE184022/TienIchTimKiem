import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './AdBannerStyles';

const AdBanner = () => {
  return (
    <View style={styles.adContainer}>
      <Text style={styles.adText}>Cái này là quảng cáo</Text>
    </View>
  );
};

export default AdBanner;