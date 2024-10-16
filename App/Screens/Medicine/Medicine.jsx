import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import styles from './MedicineStyles';

const sampleMedicines = [
  { id: '1', tenThuoc: 'Paracetamol', loaiThuoc: 'Giảm đau' },
  { id: '2', tenThuoc: 'Ibuprofen', loaiThuoc: 'Giảm viêm' },
  { id: '3', tenThuoc: 'Aspirin', loaiThuoc: 'Giảm đau' },
  { id: '4', tenThuoc: 'Amoxicillin', loaiThuoc: 'Kháng sinh' },
];

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState(sampleMedicines);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = sampleMedicines.filter(medicine =>
        medicine.tenThuoc.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredMedicines(filtered);
    } else {
      setFilteredMedicines(sampleMedicines);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm thuốc..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredMedicines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.tenThuoc}</Text>
            <Text>{item.loaiThuoc}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
