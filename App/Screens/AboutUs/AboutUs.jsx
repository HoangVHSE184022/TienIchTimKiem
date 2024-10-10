import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
import styles from './AboutUsStyles';
import { useDatabase } from '../../Database/DatabaseContext';

const AboutUs = () => {
  const navigation = useNavigation();
  const { db, isInitialized, error } = useDatabase();
  const [data, setData] = useState([]); // State to hold fetched data

  const insertSampleData = async () => {
    if (!isInitialized || error) {
      Alert.alert('Error', 'Database not initialized or error occurred.');
      return;
    }

    const sampleData = {
      HoVaTen: 'Nguyễn Văn A',
      QueQuan: 'Hà Nội',
      NamSinh: 1990,
      NamMat: 2020,
      NoiYenNghi: 'Nghĩa trang Hà Nội',
      DonVi: 'Quân đội',
      CapBac: 'Thiếu tá',
      ViTriMoX: 21.0285,
      ViTriMoY: 105.8542,
    };

    // Prepare the insert query using placeholders for prepared statements
    const insertQuery = `
      INSERT INTO LietSi (HoVaTen, QueQuan, NamSinh, NamMat, NoiYenNghi, DonVi, CapBac, ViTriMoX, ViTriMoY)
      VALUES ($HoVaTen, $QueQuan, $NamSinh, $NamMat, $NoiYenNghi, $DonVi, $CapBac, $ViTriMoX, $ViTriMoY)
    `;

    // Prepare and execute the insert statement asynchronously
    const statement = await db.prepareAsync(insertQuery);
    try {
      let result = await statement.executeAsync({
        $HoVaTen: sampleData.HoVaTen,
        $QueQuan: sampleData.QueQuan,
        $NamSinh: sampleData.NamSinh,
        $NamMat: sampleData.NamMat,
        $NoiYenNghi: sampleData.NoiYenNghi,
        $DonVi: sampleData.DonVi,
        $CapBac: sampleData.CapBac,
        $ViTriMoX: sampleData.ViTriMoX,
        $ViTriMoY: sampleData.ViTriMoY,
      });

      console.log('Sample data inserted successfully', result.lastInsertRowId);

    } catch (error) {
      console.error('Error inserting sample data:', error);
    } finally {
      await statement.finalizeAsync(); // Finalize the statement to release resources
    }
  };

  const fetchData = async () => {
    if (!isInitialized || error) {
      Alert.alert('Error', 'Database not initialized or error occurred.');
      return;
    }

    const query = 'SELECT * FROM LietSi';
    const result = await db.getAllAsync(query);
    console.log(result);
  };

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

          {/* Button to load sample data */}
          <TouchableOpacity onPress={insertSampleData} style={styles.button}>
            <Text style={styles.buttonText}>Tải dữ liệu mẫu</Text>
          </TouchableOpacity>

          {/* Button to show all data */}
          <TouchableOpacity onPress={fetchData} style={styles.button}>
            <Text style={styles.buttonText}>Hiển thị tất cả dữ liệu</Text>
          </TouchableOpacity>
          <View style={styles.copyrightContainer}>
            <Text style={styles.copyrightText}>© AmazingTech 2024</Text>
          </View>
        </ScrollView>
      </View>
    </ScreenLayout>
  );
};

export default AboutUs;
