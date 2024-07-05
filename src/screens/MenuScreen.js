import React , { useEffect }from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { screen } from "../utils"; // Asegúrate de que la ruta sea correcta
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons"; // Importa FontAwesome desde @expo/vector-icons
import AsyncStorage from "@react-native-async-storage/async-storage";
export function MenuScreen() {
  const navigation = useNavigation();
  let storedUserId = "";
  useEffect(() => {
    const fetchUserId = async () => {
      try {
         storedUserId = await AsyncStorage.getItem("userId");
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error.message);
        // Manejo de errores
      }
    };

    fetchUserId();
  }, [navigation]); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Menú de Usuario</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screen.flat.flats)}
      >
        <FontAwesome
          name="list-alt"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Opción 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screen.flat.listflats)}
      >
        <FontAwesome
          name="building"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Opción 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(screen.flat.favoriteflats, { type: "favo", userId: storedUserId})
        }
      >
        <FontAwesome name="cog" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Opción 3</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
//initialParams={{ type: "favo", userId: ""}}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: "#f0f0f0", // Fondo gris claro
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#6200ea", // Fondo morado
    borderRadius: 8,
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
    color: "#fff", // Texto blanco
    fontSize: 18,
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
