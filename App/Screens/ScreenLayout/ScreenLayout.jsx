import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';

const ScreenLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
        <View style={styles.adPlaceholder}>
          {/* Khung chứa quảng cáo trong tương lai */}
          <Text style={styles.adText}>Cái này là quảng cáo</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  adPlaceholder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScreenLayout;
