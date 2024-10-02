import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styles from './UserGuideStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const UserGuide = () => {
  return (
    <ScreenLayout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Hướng dẫn sử dụng</Text>
        <Text style={styles.paragraph}>
          Chào mừng bạn đến với ứng dụng của chúng tôi! Dưới đây là các bước hướng dẫn để bạn có thể sử dụng ứng dụng một cách dễ dàng.
        </Text>

        <Text style={styles.subheading}>1. Đăng nhập/Đăng ký</Text>
        <Text style={styles.paragraph}>
          - Nếu bạn đã có tài khoản, hãy đăng nhập bằng tên đăng nhập và mật khẩu. 
          - Nếu chưa có, bạn có thể tạo một tài khoản mới bằng cách nhấn vào nút Đăng ký.
        </Text>

        <Text style={styles.subheading}>2. Trang chính</Text>
        <Text style={styles.paragraph}>
          Sau khi đăng nhập thành công, bạn sẽ được chuyển đến trang chính. Tại đây, bạn có thể truy cập các chức năng như Bản đồ quy hoạch, Nghĩa trang liệt sĩ, và nhiều hơn nữa.
        </Text>

        <Text style={styles.subheading}>3. Chức năng điều hướng</Text>
        <Text style={styles.paragraph}>
          Trong menu điều hướng, bạn có thể di chuyển giữa các trang như Chính sách quyền riêng tư, Điều khoản dịch vụ, và các trang khác.
        </Text>

        <Text style={styles.subheading}>4. Cách sử dụng các tính năng chính</Text>
        <Text style={styles.paragraph}>
          - Bản đồ quy hoạch: Bạn có thể tìm kiếm và xem chi tiết các quy hoạch địa phương.
          - Nghĩa trang liệt sĩ: Bạn có thể tìm kiếm và xem thông tin về các nghĩa trang liệt sĩ.
        </Text>

        <Text style={styles.subheading}>5. Hỗ trợ</Text>
        <Text style={styles.paragraph}>
          Nếu bạn gặp bất kỳ vấn đề nào khi sử dụng ứng dụng, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi qua email support@example.com.
        </Text>
      </ScrollView>
    </ScreenLayout>
  );
};


export default UserGuide;
