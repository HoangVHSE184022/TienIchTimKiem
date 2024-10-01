import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HomeScreenStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const HomeScreen = ({ navigation }) => {
  return (
    <ScreenLayout>  
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
    </ScreenLayout>
    
  );
};

export default HomeScreen;
