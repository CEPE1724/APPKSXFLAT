import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

import { API_URLS } from "../../config/apiConfig";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Nuevo estado para el orden
  const [sortFavorites, setFavorites] = useState("asc"); // Nuevo estado para favoritos
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [sortOrder]); // Asegúrate de que fetchUsers se llame cuando cambie sortOrder

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_URLS.listUser}?searchTerm=${searchQuery}&sortOrder=${sortOrder}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsPress = (user) => {
    console.log("Ver detalles de:", user.firstName, user.lastName);
  };

  const splitUsersIntoRows = (users) => {
    let rows = [];
    for (let i = 0; i < users.length; i += 2) {
      rows.push(users.slice(i, i + 2));
    }
    return rows;
  };

  const handleSortPress = () => {
    // Cambiar el orden al contrario del estado actual
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const handleSortFavorites = () => {
    // Cambiar el orden a 'favorites' cuando se presiona el botón de favoritos
    const newSortOrder = sortOrder === "favorites" ? "asc" : "favorites";
    setFavorites(newSortOrder);
    setSortOrder(newSortOrder);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Al cambiar la consulta, llamamos a fetchUsers nuevamente
    // para actualizar la lista filtrada y ordenada
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Searchbar
          placeholder="Buscar por nombre..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <TouchableOpacity onPress={handleSortPress}>
          <FontAwesome
            name="user"
            size={16}
            color="#5c5c5c"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSortPress}>
          <FontAwesome
            name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
            size={16}
            color="#5c5c5c"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSortFavorites}>
          <FontAwesome
            name="heart"
            size={16}
            color="#5c5c5c"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSortFavorites}>
          <FontAwesome
            name={sortFavorites === "asc" ? "arrow-up" : "arrow-down"}
            size={16}
            color="#5c5c5c"
          />
        </TouchableOpacity>
        
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        splitUsersIntoRows(filteredUsers).map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((user) => (
              <TouchableOpacity
                key={user._id}
                style={styles.card}
                onPress={() => handleDetailsPress(user)}
              >
                <View style={styles.card__avatar}>
                  <Image
                    source={{ uri: user.avatar }}
                    style={styles.card__avatarImg}
                  />
                  <FontAwesome
                    name="user"
                    size={30}
                    color="#78858F"
                    style={styles.avatarIcon}
                  />
                </View>
                <View style={styles.card__content}>
                  <Text style={styles.card__title}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text style={styles.card__subtitle}>{user.email}</Text>
                  <View style={styles.detailsContainer}>
                    <View style={styles.detailContainerLeft}>
                      <FontAwesome
                        name="user"
                        size={16}
                        color="#5c5c5c"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.detailText}> {user.rol}</Text>
                    </View>
                    {user.favoritesCount > 0 && (
                      <View style={styles.detailContainerLeft}>
                        <FontAwesome
                          name="heart"
                          size={16}
                          color="red"
                          style={{ marginRight: 5 }}
                        />
                        <Text style={styles.detailText}>
                          {user.favoritesCount}
                        </Text>
                      </View>
                    )}

                    <View style={styles.detailContainerRight}>
                      <FontAwesome
                        name="building"
                        size={16}
                        color="#5c5c5c"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.detailText}>{user.flatsCount}</Text>
                    </View>
                  </View>
                  {user.rol === "admin" && (
                    <TouchableOpacity
                      style={[styles.card__btn, styles.viewDetailsBtn]}
                      onPress={() => handleDetailsPress(user)}
                    >
                      <FontAwesome name="eye" size={18} color="#fff" />
                      <Text style={styles.card__btnText}>Ver Detalles</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    width: "48%",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignItems: "center",
    padding: 10,
  },
  card__avatar: {
    position: "relative",
    width: 114,
    height: 114,
    borderRadius: 100,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#78858F",
    borderWidth: 2,
    marginBottom: 3,
  },
  card__avatarImg: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  avatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
  },
  card__content: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  card__title: {
    fontSize: 12,
    fontWeight: "500",
    color: "#000",
    marginBottom: 10,
  },
  card__subtitle: {
    fontSize: 10,
    fontWeight: "400",
    color: "#78858F",
    marginBottom: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  detailContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailContainerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  detailText: {
    fontSize: 10,
    color: "#5c5c5c",
  },
  card__btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginHorizontal: 5,
    backgroundColor: "#2d8c31",
    marginTop: 8,
  },
  viewDetailsBtn: {
    backgroundColor: "#2d8c31",
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
});
