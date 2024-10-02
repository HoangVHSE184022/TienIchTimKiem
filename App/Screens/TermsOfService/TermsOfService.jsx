import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './TermsOfServiceStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';
const TermsOfService = () => {
  return (
    <ScreenLayout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Điều khoản dịch vụ</Text>
        <Text style={styles.paragraph}>
          Chào mừng bạn đến với ứng dụng của chúng tôi. Khi sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản và điều kiện sau:
        </Text>
        
        <Text style={styles.subheading}>1. Điều khoản sử dụng</Text>
        <Text style={styles.paragraph}>
          Nội dung của ứng dụng này chỉ dành cho mục đích cung cấp thông tin và sử dụng cá nhân. Mọi hình thức sao chép, phân phối, hoặc sử dụng trái phép nội dung mà không có sự cho phép của chúng tôi là vi phạm.
        </Text>

        <Text style={styles.subheading}>2. Quyền sở hữu trí tuệ</Text>
        <Text style={styles.paragraph}>
          Toàn bộ nội dung, thương hiệu, biểu tượng và tài liệu có trên ứng dụng này là tài sản của chúng tôi, trừ khi có tuyên bố khác. Bạn không được phép sử dụng mà không có sự đồng ý của chúng tôi.
        </Text>

        <Text style={styles.subheading}>3. Trách nhiệm pháp lý</Text>
        <Text style={styles.paragraph}>
          Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không thể sử dụng ứng dụng này.
        </Text>

        <Text style={styles.subheading}>4. Điều chỉnh điều khoản</Text>
        <Text style={styles.paragraph}>
          Chúng tôi có quyền thay đổi các điều khoản này mà không cần thông báo trước. Bạn có trách nhiệm kiểm tra các điều khoản định kỳ để cập nhật.
        </Text>

        <Text style={styles.subheading}>5. Liên hệ</Text>
        <Text style={styles.paragraph}>
          Nếu bạn có bất kỳ câu hỏi nào liên quan đến điều khoản dịch vụ này, vui lòng liên hệ với chúng tôi qua email support@example.com.
        </Text>
      </ScrollView>
    </ScreenLayout>
  );
};



export default TermsOfService;
