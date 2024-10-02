import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import styles from './ProfileStyles';

const Profile = () => {
  const navigation = useNavigation();

  // Giả sử chúng ta có thông tin người dùng từ một nguồn nào đó (ví dụ: context hoặc redux store)
  const user = {
    displayName: 'Nguyễn Văn A',
    username: 'nguyenvana',
    email: 'nguyenvana@example.com',
    role: 'Người dùng'
  };

  const handleChangeEmail = () => {
    // Điều hướng đến trang đổi email
    navigation.navigate('ChangeEmail');
  };

  const handleChangePassword = () => {
    // Điều hướng đến trang đổi mật khẩu
    navigation.navigate('ChangePassword');
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Thông tin cá nhân</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tên hiển thị:</Text>
          <Text style={styles.value}>{user.displayName}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Tên đăng nhập:</Text>
          <Text style={styles.value}>{user.username}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Vai trò:</Text>
          <Text style={styles.value}>{user.role}</Text>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleChangeEmail}>
          <Text style={styles.buttonText}>Đổi email</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};


export default Profile;
