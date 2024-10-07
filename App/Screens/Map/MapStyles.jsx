import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,  // Thêm khoảng cách bên phải của title
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',  // Thay đổi từ 'space-between' sang 'flex-start'
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'darkgray',
    textAlign: 'center',
    fontSize: 18,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  sliderLabel: {
    marginRight: 10,
  },
  slider: {
    flex: 1,
  },
  toggleContainer: {
    marginLeft: 'auto',
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 25,
    padding: 5,
  },
  toggleCircle: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  danDuongButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10, // Add some space between the toggle and the button
  },
  danDuongButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  distanceContainer: {
    position: 'absolute',
    top: 100,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
  },
  distanceText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
