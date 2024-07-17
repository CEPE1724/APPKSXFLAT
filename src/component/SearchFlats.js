// components/FilterModal.js
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

const FilterModal = ({ visible, onClose, onFilterChange, totalElements }) => {
  const [sortBy, setSortBy] = useState("");

  const handleFilterChange = (value) => {
    setSortBy(value);
    onFilterChange(value);
  };

  const FilterModal = ({ visible, onClose, onFilterChange, totalElements }) => {
    const [sortBy, setSortBy] = useState("");
  
    const handleFilterChange = (value) => {
      setSortBy(value); // Actualiza el estado local 'sortBy' con el valor seleccionado
      onFilterChange(value); // Llama a la función prop 'onFilterChange' para aplicar el filtro
    };
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        {/* Contenido del modal */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ordenar por</Text>
  
            {/* Opciones de filtro */}
            <View style={styles.filterOption}>
              <RadioButton
                value="street-asc"
                status={sortBy === "street-asc" ? "checked" : "unchecked"}
                onPress={() => handleFilterChange("street-asc")}
              />
              <Text style={styles.filterText}>Nombre de calle (A-Z)</Text>
            </View>
            <View style={styles.filterOption}>
              <RadioButton
                value="street-desc"
                status={sortBy === "street-desc" ? "checked" : "unchecked"}
                onPress={() => handleFilterChange("street-desc")}
              />
              <Text style={styles.filterText}>Nombre de calle (Z-A)</Text>
            </View>
            <View style={styles.filterOption}>
              <RadioButton
                value="price-asc"
                status={sortBy === "price-asc" ? "checked" : "unchecked"}
                onPress={() => handleFilterChange("price-asc")}
              />
              <Text style={styles.filterText}>Precio de renta (Menor a mayor)</Text>
            </View>
            <View style={styles.filterOption}>
              <RadioButton
                value="price-desc"
                status={sortBy === "price-desc" ? "checked" : "unchecked"}
                onPress={() => handleFilterChange("price-desc")}
              />
              <Text style={styles.filterText}>Precio de renta (Mayor a menor)</Text>
            </View>
  
            {/* Elementos encontrados */}
            <View style={styles.totalElementsContainer}>
              <Text style={styles.totalElementsText}>
                Elementos encontrados: {totalElements}
              </Text>
            </View>
  
            {/* Botón para cerrar el modal */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semi-transparente
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  closeButtonText: {
    color: "blue",
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  totalElementsContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  totalElementsText: {
    fontSize: 16,
  },
});

export default FilterModal;
