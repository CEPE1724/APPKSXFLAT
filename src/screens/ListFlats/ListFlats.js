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
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils";
import { styles } from "./ListFlats.style";
import { API_URLS } from "../../config/apiConfig";

export function ListFlats({route}) {
  const { type, userId } = route.params;
  console.log("userId", userId);

  const navigation = useNavigation();
  const [flatsData, setFlatsData] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [userIdSet, setUserId] = useState("");

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId !== null) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error.message);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchFlatsData = async () => {
      try {
        const response = await axios.get("http://192.168.100.152:3000/api/v1/flats", {
          timeout: 5000,
        });
        // Almacenar todos los flats en flatsData
        setFlatsData(response.data);

        // Inicializar el estado de favorites basado en los datos iniciales
        const initialFavorites = {};
        response.data.forEach((item) => {
          initialFavorites[item._id] = false; // Inicialmente, ningún flat es favorito
        });
        setFavorites(initialFavorites);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching flats data:", error.message);
        setLoading(false);
      }
    };

    fetchFlatsData();
  }, []);

  useEffect(() => {
    const getFavoriteStatus = async (flatId, userIdSet) => {
      try {
        console.log(API_URLS.getFavoriteFlats(flatId, userIdSet));
        const response = await axios.get(API_URLS.getFavoriteFlats(flatId, userIdSet));
        if (response.data.search ==="ok") {
          console.log("Favorite status:", response.data);
          setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [flatId]: true, // Marcar como favorito si la respuesta es exitosa
          }));
        }
      } catch (error) {
        console.error(`Error fetching favorite status for flat ${flatId}:`, error.message);
      }
    };
  
    // Iterar sobre los flatsData y obtener el estado de favorito para cada uno
    flatsData.forEach((item) => {
      getFavoriteStatus(item._id, userIdSet);
    });
  }, [flatsData, userIdSet]);
  

  const toggleFavorite = async (idFlats, idUsuario) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [idFlats]: !prevFavorites[idFlats],
    }));

    const estadoFavorito = favorites[idFlats] ? "inactive" : "active";

    try {
      const response = await fetch(API_URLS.postFavoriteFlats, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flat: idFlats,
          user: idUsuario,
          status: estadoFavorito,
        }),
      });

      if (!response.ok) {
        throw new Error("Error adding favorite flat");
      }

      const data = await response.json();
      console.log("Favorite flat added:", data);
    } catch (error) {
      console.error("Error adding favorite flat:", error.message);
    }
  };

  const renderFlat = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={1000} style={styles.flatContainer}>
      <Card>
        <View style={styles.headerContainer}>
          <Text style={styles.flatName}>Flat in {item.city}</Text>
          {userIdSet === item.user._id && (
            <View style={styles.userIconContainer}>
              <TouchableOpacity
                style={styles.userIcon}
                onPress={() => navigation.navigate(screen.flat.updateflats, { userIdSet: item._id })}
              >
                <FontAwesome name="edit" size={24} color="green" />
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity onPress={() => toggleFavorite(item._id, userIdSet)} style={styles.heartIconContainer}>
            <FontAwesome
              name={favorites[item._id] ? "heart" : "heart-o"}
              size={24}
              color={favorites[item._id] ? "red" : "black"}
            />
          </TouchableOpacity>
        </View>
        <Card.Divider />
        <Text style={styles.flatDescription}>Street: {item.streetName}, {item.streetNumber}</Text>
        <Text style={styles.flatDescription}>Rent Price: ${item.rentPrice}</Text>
        <Text style={styles.flatDescription}>Area Size: {item.areaSize} sq ft</Text>
        <Text style={styles.flatDescription}>Year Built: {item.yearBuilt}</Text>
        <Text style={styles.flatDescription}>Available: {new Date(item.dateAvailable).toDateString()}</Text>
        <Text style={styles.flatDescription}>User Email: {item.user.email}</Text>
      
        <View style={styles.iconContainer}>
          <Icon
            name="snowflake-o"
            type="font-awesome"
            color={item.hasAc ? "blue" : "grey"}
          />
          <Text style={styles.iconText}>{item.hasAc ? "Has AC" : "No AC"}</Text>
        </View>

        {userIdSet !== item.user._id && (
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
