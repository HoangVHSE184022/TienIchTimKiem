import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import styles from './ChangeEmailStyles';

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const isValidEmail = (email) => {
    // Biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChangeEmail = () => {
    if (!newEmail || !password) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (!isValidEmail(newEmail)) {
      Alert.alert('Lỗi', 'Email không đúng định dạng');
      return;
    }

    // Ở đây, bạn sẽ gọi API để thay đổi email
    // Đây chỉ là mô phỏng
    Alert.alert('Thành công', 'Email đã được thay đổi', [
      { 
        text: 'OK', 
        onPress: () => {
          setNewEmail('');
          setPassword('');
          navigation.navigate('Thông tin cá nhân'); // Chuyển hướng đến trang Profile
        }
      }
    ]);
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Đổi email</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Email mới"
          keyboardType="email-address"
          value={newEmail}
          onChangeText={setNewEmail}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu để xác nhận"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
          <Text style={styles.buttonText}>Đổi email</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default ChangeEmail;
