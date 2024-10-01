import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './AboutUsStyles'; // Import styles từ file AboutUsStyles

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Về Chúng Tôi</Text>
        <Text style={styles.description}>Tên ứng dụng: Tiện ích tìm kiếm</Text>
        <Text style={styles.description}>Phiên bản: 0.0.1</Text>
        <Text style={styles.description}>Công ty: Amazing Tech</Text>
        <Text style={styles.description}>Điều khoản sử dụng</Text>
        <Text style={styles.description}>Chính sách quyền riêng tư</Text>
        <Text style={styles.description}>Hotline hỗ trợ: 0987654321</Text>
        <Text style={styles.description}>Hướng dẫn sử dụng</Text>

        {/* Dòng copyright */}
        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>© AmazingTech 2024</Text>
        </View>
      </ScrollView>

      {/* Khung quảng cáo ở cuối màn hình người dùng */}
      <View style={styles.adContainer}>
        <Text style={styles.adText}>Cái này là quảng cáo</Text>
      </View>
    </View>
  );
};

export default AboutUs;
