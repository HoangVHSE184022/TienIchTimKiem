import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginStyles from './LoginStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const Login = ({ setIsLoggedIn: setAppLoggedIn }) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Đăng xuất
      setIsLoggedIn(false);
      setAppLoggedIn(false);
      setUsername('');
      setPassword('');
    } else {
      // Đăng nhập
      // Thêm logic kiểm tra đăng nhập ở đây nếu cần
      setIsLoggedIn(true);
      setAppLoggedIn(true);
      navigation.navigate('Home');
    }
  };

  return (
    <ScreenLayout>
      <View style={LoginStyles.container}>
        <Text style={LoginStyles.title}>
          {isLoggedIn ? `Xin chào ${username}` : 'Đăng nhập'}
        </Text>

        {!isLoggedIn && (
          <>
            <TextInput
              style={LoginStyles.input}
              placeholder="Tên đăng nhập"
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={LoginStyles.input}
              placeholder="Mật khẩu"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </>
        )}

        <TouchableOpacity
          style={LoginStyles.buttonContainer}
          onPress={handleLoginLogout}
        >
          <View style={LoginStyles.button}>
            <Text style={LoginStyles.buttonText}>
              {isLoggedIn ? 'Đăng xuất' : 'Đăng nhập'}
            </Text>
          </View>
        </TouchableOpacity>

        {!isLoggedIn && (
          <TouchableOpacity 
            style={LoginStyles.registerButton} 
            onPress={() => navigation.navigate('Đăng ký')}
          >
            <Text style={LoginStyles.registerButtonText}>
              Chưa có tài khoản? Đăng ký
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenLayout>
  );
};

export default Login;
