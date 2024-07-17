import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Image } from "react-native";
import { screen } from "../utils"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Importa FontAwesome desde @expo/vector-icons
import AsyncStorage from "@react-native-async-storage/async-storage";

export function MenuScreen() {
  const navigation = useNavigation();
  const [iUser, setIUser] = useState(0); // Estado para determinar si el usuario es Admin o Landors
  const [storedUserId, setStoredUserId] = useState(""); // Estado para el userId
  const [storedUserType, setStoredUserType] = useState(""); // Estado para el rol del usuario

  const sections = [
    { id: 1, title: "Sección 1", image: require("../../assets/Login.png") },
    { id: 2, title: "Sección 2", image: require("../../assets/Login.png") },
    { id: 3, title: "Sección 3", image: require("../../assets/Login.png") },
    { id: 4, title: "Sección 4", image: require("../../assets/Login.png") },
    { id: 5, title: "Sección 5", image: require("../../assets/Login.png") },
    { id: 6, title: "Sección 6", image: require("../../assets/Login.png") },
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
        // Manejo de errores
      }
    };

    fetchUserId();
  }, [navigation]); // Dependencia de navegación para actualizar cuando la navegación cambia

  const renderSection = ({ item }) => (
    <TouchableOpacity
      style={styles.sectionContainer}
      onPress={() => {}}
    >
      <Image source={item.image} style={styles.sectionImage} />
      <Text style={styles.sectionTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {iUser === 1 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate(screen.flat.flats)}
          >
            <FontAwesome name="list-alt" size={24} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(screen.flat.listflats)}
        >
          <FontAwesome name="building" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Flats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(screen.flat.favoriteflats, { type: "favo", userId: storedUserId })
          }
        >
          <FontAwesome name="cog" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>
      </ScrollView>
      <FlatList
        data={sections}
        renderItem={renderSection}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.sectionsContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#f0f0f0",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    backgroundColor: "#6200ea",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
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
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});
