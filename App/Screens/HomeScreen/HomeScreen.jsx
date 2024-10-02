import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './HomeScreenStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const HomeScreen = ({ navigation }) => {
  return (
    <ScreenLayout>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Cửa sổ chính</Text> */}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Bản đồ quy hoạch')}
          >
            <Text style={styles.cardText}>Bản đồ quy hoạch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('NghiaTrangScreen')}  // Thay thế bằng tên màn hình
          >
            <Text style={styles.cardText}>Nghĩa trang liệt sĩ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('BanDoCaNhanScreen')}  // Thay thế bằng tên màn hình
          >
            <Text style={styles.cardText}>Bản đồ cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Về chúng tôi')}  // Điều hướng tới trang "About Us"
          >
            <Text style={styles.cardText}>Về chúng tôi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenLayout>
  );
};

export default HomeScreen;
