import { StyleSheet, Dimensions } from 'react-native';

// Lấy kích thước màn hình
const { width, height } = Dimensions.get('window');

const CARD_WIDTH = width * 0.4;  // Chiều rộng mỗi thẻ là 40% chiều rộng màn hình
const CARD_HEIGHT = height * 0.4; // Chiều cao mỗi thẻ là 40% chiều cao màn hình

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  card: {
    width: CARD_WIDTH,  
    height: CARD_HEIGHT, 
    backgroundColor: 'lightgray',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
