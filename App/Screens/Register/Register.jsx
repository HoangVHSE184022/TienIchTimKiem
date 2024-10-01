import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import RegisterStyles from './RegisterStyles';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Lỗi', 'Hãy điền đầy đủ thông tin');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    console.log('Register:', { username, email, password });

    Alert.alert(
      'Đăng ký thành công',
      'Tài khoản của bạn đã được tạo thành công',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  return (
    <View style={RegisterStyles.container}>
      <Text style={RegisterStyles.title}>Đăng ký</Text>
      <TextInput
        style={RegisterStyles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={RegisterStyles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={RegisterStyles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={RegisterStyles.input}
        placeholder="Xác nhận mật khẩu"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <View style={RegisterStyles.buttonContainer}>
        <TouchableOpacity style={RegisterStyles.button} onPress={handleRegister}>
          <Text style={RegisterStyles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={RegisterStyles.backToLoginButton} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={RegisterStyles.backToLoginText}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}
