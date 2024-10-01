import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HomeScreenStyles'; // Import styles từ file HomeScreenStyles.js

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Màn hình chính</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('About Us')}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>About Us</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
