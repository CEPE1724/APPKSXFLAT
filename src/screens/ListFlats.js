import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { Card, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function ListFlats() {
  const [flatsData, setFlatsData] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId !== null) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error(
          "Error fetching userId from AsyncStorage:",
          error.message
        );
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    axios
      .get("http://192.168.100.152:3000/api/v1/flats", { timeout: 5000 })
      .then((response) => {
        setFlatsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching flats data:", error.message);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  const renderFlat = ({ item }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={1000}
      style={styles.flatContainer}
    >
      <Card>
        <View style={styles.headerContainer}>
          <Text style={styles.flatName}>Flat in {item.city}</Text>
          {userId === item.user._id && (
            <View style={styles.userIconContainer}>
              <TouchableOpacity style={styles.userIcon}>
                <FontAwesome name="edit" size={24} color="green" />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            onPress={() => toggleFavorite(item._id)}
            style={styles.heartIconContainer}
          >
            <FontAwesome
              name={favorites[item._id] ? "heart" : "heart-o"}
              size={24}
              color={favorites[item._id] ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <Card.Divider />
        <Text style={styles.flatDescription}>
          Street: {item.streetName}, {item.streetNumber}
        </Text>
        <Text style={styles.flatDescription}>
          Rent Price: ${item.rentPrice}
        </Text>
        <Text style={styles.flatDescription}>
          Area Size: {item.areaSize} sq ft
        </Text>
        <Text style={styles.flatDescription}>Year Built: {item.yearBuilt}</Text>
        <Text style={styles.flatDescription}>
          Available: {new Date(item.dateAvailable).toDateString()}
        </Text>
        <Text style={styles.flatDescription}>
          User Email: {item.user.email}
        </Text>
        <Text style={styles.flatDescription}>User ID: {item.user._id}</Text>
        <View style={styles.iconContainer}>
          <Icon
            name="snowflake-o"
            type="font-awesome"
            color={item.hasAc ? "blue" : "grey"}
          />
          <Text style={styles.iconText}>{item.hasAc ? "Has AC" : "No AC"}</Text>
        </View>

        {userId !== item.user._id && (
          <View style={styles.userIconContainer}>
            <TouchableOpacity style={styles.userIcon}>
              <FontAwesome name="envelope" size={24} color="blue" />
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </Animatable.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={flatsData}
      renderItem={renderFlat}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e0f7fa", // Fondo azul claro
    borderRadius: 15, // Borde redondeado
  },
  flatContainer: {
    marginBottom: 15,
    borderRadius: 15, // Borde redondeado
    overflow: "hidden", // Asegura que el contenido dentro del contenedor sea recortado por los bordes redondeados
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flatName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00796b", // Verde oscuro
  },
  flatDescription: {
    fontSize: 16,
    color: "#004d40", // Verde más oscuro
    marginTop: 5,
  },
  heartIconContainer: {
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  iconText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#00796b", // Verde oscuro
  },
  userIconContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  userIcon: {
    marginLeft: 10,
  },
});

export default ListFlats;
