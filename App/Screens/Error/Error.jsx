import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import styles from './ErrorStyles';

const ErrorScreen = ({ navigation, route }) => {
  // Sử dụng optional chaining và giá trị mặc định
  const message = route?.params?.message || 'Đã xảy ra lỗi không xác định';

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoHome = () => {
    navigation.navigate('Trang chủ');
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/iconError.png')}
          style={styles.errorIcon}
        />
        <Text style={styles.errorTitle}>Rất tiếc!</Text>
        <Text style={styles.errorMessage}>{message}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Quay lại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGoHome}>
            <Text style={styles.buttonText}>Về trang chủ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default ErrorScreen;
