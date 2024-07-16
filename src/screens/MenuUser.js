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
export function MenuUser() {
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
    <View style={styles.container}>
     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screen.user.accounts,{ type: "edit", userId: storedUserId})}
      >
        <FontAwesome
          name="list-alt"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screen.user.list)}
      >
        <FontAwesome
          name="list"
          size={24}
          color="white"
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(screen.flat.favoriteflats, { type: "favo", userId: storedUserId})
        }
      >
        <FontAwesome name="user" size={24} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Salir</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
}
//initialParams={{ type: "favo", userId: ""}}
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