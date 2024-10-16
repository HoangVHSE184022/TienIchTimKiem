import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    searchInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 16,
    },
    item: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    itemTitle: {
      fontWeight: 'bold',
    },
});

export default styles;
