import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';
import FilterPage from '../FilterPage/FilterPage';

const filters = [
  { id: '1', label: 'Age' },
  { id: '2', label: 'Online' },
  { id: '3', label: 'Fresh' },
  { id: '4', label: 'Male' },
  { id: '5', label: 'Female' },
  // Add more filters as needed
];

const FilterBar = ({ onFilterPress }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleFilterButtonPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.filterContainer}>
      {/* Filter button */}
      <TouchableOpacity style={styles.filterButton} onPress={handleFilterButtonPress}>
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity key={filter.id} style={styles.filterItem} onPress={() => onFilterPress(filter.label)}>
            <Text style={styles.filterText}>{filter.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filter Options</Text>
            {/* Add your filter options here */}
            <FilterPage />
            <Button title="Apply" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterItem: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  filterButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FilterBar;
