import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, Modal, TouchableWithoutFeedback, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, useTheme, Surface } from "react-native-paper";
import { screen } from "../utils"; // Asegúrate de que la ruta sea correcta

export function MenuScreen() {
  const navigation = useNavigation();
  const [iUser, setIUser] = useState(0);
  const [storedUserId, setStoredUserId] = useState("");
  const [storedUserType, setStoredUserType] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const sections = [
    { id: 1, title: "CARTAJENA DE INDIAS", description: "Hermosa ciudad colonial.", image: require("../../assets/Cartejena.jpg") },
    { id: 2, title: "PUNTA CANA", description: "Famoso destino turístico.", image: require("../../assets/pUNTA.jpg") },
    { id: 3, title: "PUNTA SAL", description: "Playa paradisiaca en Perú.", image: require("../../assets/punta-sal-016.jpg") },
    { id: 4, title: "CONCORDIA ARGENTINA", description: "Conocida por sus termas.", image: require("../../assets/concordia1.jpg") },
    { id: 5, title: "ECUADOR QUITO", description: "Capital ecuatoriana en la sierra.", image: require("../../assets/ECUADOR.jpg") },
    { id: 6, title: "PERU MACHUPICHU", description: "Antigua ciudad inca.", image: require("../../assets/MACHU.jpg") },
  ];

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const userType = await AsyncStorage.getItem("rol");
        setStoredUserId(userId);
        setStoredUserType(userType);

        if (userType === "Admin" || userType === "Landors") {
          setIUser(1);
        }

      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error.message);
      }
    };

    fetchUserId();
  }, [navigation]);

  const handleImagePress = (item) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const renderSection = ({ item }) => (
    <TouchableOpacity
      style={styles.sectionContainer}
      onPress={() => handleImagePress(item)}
    >
      <Image source={item.image} style={styles.sectionImage} />
      <Text style={styles.sectionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const ItemSeparator = () => (
    <View style={styles.separator} />
  );

  const theme = useTheme();

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/fotos-premium/equipo-turistico-mochila-botas-montanas-dolomitas-ia-generativa_641010-9032.jpg?w=996' }} // Reemplaza con la URL de tu imagen
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.buttonContainer}>
          {iUser === 1 ? (
            <Surface style={styles.surface}>
              <Button
                mode="contained"
                icon={() => <FontAwesome name="file" size={24} color="white" />}
                onPress={() => navigation.navigate(screen.flat.flats)}
                style={styles.button}
                labelStyle={styles.buttonText}
              > 
              </Button>
            </Surface>
          ) : null}
          <Surface style={styles.surface}>
            <Button
              mode="contained"
              icon={() => <FontAwesome name="list" size={24} color="white" />}
              onPress={() => navigation.navigate(screen.flat.listflats)}
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              
            </Button>
          </Surface>
          <Surface style={styles.surface}>
            <Button
              mode="contained"
              icon={() => <FontAwesome name="heart" size={24} color="white" />}
              onPress={() =>
                navigation.navigate(screen.flat.favoriteflats, { type: "favo", userId: storedUserId })
              }
              style={styles.button}
              labelStyle={styles.buttonText}
            >
              
            </Button>
          </Surface>
        </View>
      </ScrollView>
        <Text style={styles.title}>DESTINOS TURISTICOS</Text>
        <FlatList
          data={sections}
          renderItem={renderSection}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.sectionsContainer}
          ItemSeparatorComponent={ItemSeparator}
        />
        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalBackground}>
              {selectedImage && (
                <>
                  <Image source={selectedImage.image} style={styles.fullscreenImage} />
                  <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                  <Text style={styles.modalDescription}>{selectedImage.description}</Text>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  buttonScrollContainer: {
    // Asegura que el contenedor del ScrollView tenga el ancho completo
    width: '100%',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // Alinea los botones al inicio del ScrollView
    marginHorizontal: 10,
    marginBottom: 20, // Añade margen inferior para separar los botones de la lista
  },
  surface: {
    marginHorizontal: 10,
    borderRadius: 25, // Ajusta el borderRadius
    elevation: 5,
    paddingVertical: 0, // Asegúrate de que el padding vertical sea adecuado
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12, // Aumenta el padding vertical para dar más espacio
    paddingHorizontal: 20, // Aumenta el padding horizontal
    backgroundColor: "#6200ea",
    borderRadius: 25, // Ajusta el borderRadius para un botón más grande
    shadowColor: "#000",
    
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18, // Ajusta el tamaño de la fuente
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#000", // Puedes ajustar el color según tu tema
  },
  sectionsContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  sectionContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionImage: {
    width: 150,
    height: 200, // Aumentar la altura para hacerlo más vertical
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "90%",
    height: "50%",
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    textAlign: "center",
  },
  modalDescription: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  separator: {
    height: 10, // Tamaño de la separación
    backgroundColor: "#ddd", // Color de la separación
  },
});
