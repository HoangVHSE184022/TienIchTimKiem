import React from 'react';
import { View, StyleSheet } from 'react-native';
import AdBanner from '../../Components/AdBanner/AdBanner';

const ScreenLayout = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
      <AdBanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenLayout;
