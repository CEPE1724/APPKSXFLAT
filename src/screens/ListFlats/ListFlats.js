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
export function ListFlats() {
  const navigation = useNavigation();
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
              <TouchableOpacity
                style={styles.userIcon}
                onPress={() =>
                  navigation.navigate(screen.flat.updateflats, {
                    userId: item._id,
                  })
                }
              >
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

