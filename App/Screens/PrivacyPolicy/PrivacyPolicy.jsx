import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import styles from './PrivacyPolicyStyles';
import ScreenLayout from '../ScreenLayout/ScreenLayout';

const PrivacyPolicy = () => {
  return (
    <ScreenLayout>
        <ScrollView style={styles.container}>
        <Text style={styles.title}>Chính sách quyền riêng tư</Text>
        <Text style={styles.paragraph}>
            Chúng tôi cam kết bảo vệ quyền riêng tư của bạn. Chính sách quyền riêng tư này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi sử dụng ứng dụng của chúng tôi.
        </Text>

        <Text style={styles.subheading}>1. Thông tin chúng tôi thu thập</Text>
        <Text style={styles.paragraph}>
            Chúng tôi có thể thu thập các thông tin như tên, địa chỉ email, và các thông tin cá nhân khác mà bạn cung cấp khi sử dụng ứng dụng.
        </Text>

        <Text style={styles.subheading}>2. Cách chúng tôi sử dụng thông tin của bạn</Text>
        <Text style={styles.paragraph}>
            Chúng tôi sử dụng thông tin cá nhân của bạn để cung cấp dịch vụ, cải thiện trải nghiệm người dùng, và liên hệ với bạn khi cần thiết.
        </Text>

        <Text style={styles.subheading}>3. Chia sẻ thông tin</Text>
        <Text style={styles.paragraph}>
            Chúng tôi không chia sẻ thông tin cá nhân của bạn với bên thứ ba ngoại trừ khi được yêu cầu bởi pháp luật hoặc khi có sự đồng ý của bạn.
        </Text>

        <Text style={styles.subheading}>4. Bảo mật thông tin</Text>
        <Text style={styles.paragraph}>
            Chúng tôi cam kết bảo mật thông tin của bạn bằng các biện pháp bảo mật hợp lý để ngăn chặn truy cập trái phép.
        </Text>

        <Text style={styles.subheading}>5. Thay đổi chính sách</Text>
        <Text style={styles.paragraph}>
            Chúng tôi có quyền thay đổi chính sách này mà không cần thông báo trước. Mọi thay đổi sẽ được cập nhật trên ứng dụng.
        </Text>

        <Text style={styles.subheading}>6. Liên hệ</Text>
        <Text style={styles.paragraph}>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách quyền riêng tư này, vui lòng liên hệ với chúng tôi qua email support@example.com.
        </Text>
        </ScrollView>
    </ScreenLayout>

  );
};



export default PrivacyPolicy;
