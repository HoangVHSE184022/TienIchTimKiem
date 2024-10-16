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
    justifyContent: 'flex-start',  
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
    marginLeft: 10, 
  },
  danDuongButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default styles;
