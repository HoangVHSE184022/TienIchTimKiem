import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './LoginStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Đăng xuất
      setIsLoggedIn(false);
      setUsername('');
      setPassword('');
    } else {
      // Đăng nhập
      // Thêm logic kiểm tra đăng nhập ở đây nếu cần
      setIsLoggedIn(true);
      navigation.navigate('Home');
    }
  };

  return (
    <ScreenLayout>
        <View style={styles.container}>
        <Text style={styles.title}>
            {isLoggedIn ? `Xin chào ${username}` : 'Đăng nhập'}
        </Text>

        {!isLoggedIn && (
            <>
            <TextInput
                style={styles.input}
                placeholder="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            </>
        )}

        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleLoginLogout}
        >
            <View style={styles.button}>
            <Text style={styles.buttonText}>
                {isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
            </Text>
            </View>
        </TouchableOpacity>
        </View>
    </ScreenLayout>

  );
};

export default Login;
