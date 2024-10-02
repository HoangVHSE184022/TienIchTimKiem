import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import styles from './ChangePasswordStyles';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    // Ở đây, bạn sẽ gọi API để thay đổi mật khẩu
    // Đây chỉ là mô phỏng
    Alert.alert('Thành công', 'Mật khẩu đã được thay đổi', [
      { 
        text: 'OK', 
        onPress: () => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          navigation.navigate('Thông tin cá nhân'); // Chuyển hướng đến trang Profile
        }
      }
    ]);
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu hiện tại"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu mới"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};


export default ChangePassword;
