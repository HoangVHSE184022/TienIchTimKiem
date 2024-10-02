import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'red',
  },
  description: {
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 10,
  },
  adContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    backgroundColor: 'blue',
    // Đặt margin trên và dưới
  },
  adText: {
    fontSize: 16,
    color: 'white',
  },
  copyrightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5', // Đảm bảo background không bị trùng với quảng cáo
  },
  copyrightText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5, // Tùy chỉnh khoảng cách giữa copyright và quảng cáo
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default styles;
