import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';

const FilterPage = ({ visible, onClose }) => {
  const [toggle, setToggle] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    online: false,
    bodyType: {
      average: false,
      toned: false,
      muscular: false,
      slim: false,
    },
  });

  const handleSave = () => {
    // Handle save action
    console.log('Filters saved:', selectedFilters);
    onClose(); // Close the modal after saving
  };

  const handleFilterPress = (key) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleBodyTypePress = (key) => {
    setSelectedFilters((prev) => ({
      ...prev,
      bodyType: {
        ...prev.bodyType,
        [key]: !prev.bodyType[key],
      },
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <TouchableOpacity
              style={[styles.toggleButton, { backgroundColor: toggle ? '#4CAF50' : '#f44336' }]}
              onPress={() => setToggle(!toggle)}
            >
              <Text style={styles.toggleButtonText}>{toggle ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContainer}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Body Type</Text>
              {Object.keys(selectedFilters.bodyType).map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.checkboxContainer, selectedFilters.bodyType[key] && styles.checked]}
                  onPress={() => handleBodyTypePress(key)}
                >
                  <Text style={styles.checkboxLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Online</Text>
              <TouchableOpacity
                style={[styles.checkboxContainer, selectedFilters.online && styles.checked]}
                onPress={() => handleFilterPress('online')}
              >
                <Text style={styles.checkboxLabel}>Online</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <Button title="Apply" onPress={handleSave} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    fontSize: 24,
    color: '#000',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toggleButton: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  toggleButtonText: {
    color: '#fff',
  },
  filterContainer: {
    marginTop: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 5,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  checked: {
    backgroundColor: '#e0f7fa',
    borderColor: '#4CAF50',
  },
});

export default FilterPage;
