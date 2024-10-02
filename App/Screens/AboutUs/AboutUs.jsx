import React from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import styles from './AboutUsStyles';

const AboutUs = () => {
  const navigation = useNavigation();

  const navigateToTermsOfService = () => {
    navigation.navigate('Điều khoản dịch vụ');
  };

  const navigateToPrivacyPolicy = () => {
    navigation.navigate('Chính sách quyền riêng tư');
  };

  const navigateToUserGuide = () => {
    navigation.navigate('Hướng dẫn sử dụng');
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Về Chúng Tôi</Text>
          <Text style={styles.description}>Tên ứng dụng: Tiện ích tìm kiếm</Text>
          <Text style={styles.description}>Phiên bản: 0.0.1</Text>
          <Text style={styles.description}>Công ty: Amazing Tech</Text>
          <TouchableOpacity onPress={navigateToTermsOfService}>
            <Text style={[styles.description, styles.link]}>Điều khoản dịch vụ</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToPrivacyPolicy}>
            <Text style={[styles.description, styles.link]}>Chính sách quyền riêng tư</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToUserGuide}>
            <Text style={[styles.description, styles.link]}>Hướng dẫn sử dụng</Text>
          </TouchableOpacity>
          <Text style={styles.description}>Hotline hỗ trợ: 0987654321</Text>

          <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightText}>© AmazingTech 2024</Text>
          </View>
        </ScrollView>
        
      </View>
    </ScreenLayout>
  );
};

export default AboutUs;
