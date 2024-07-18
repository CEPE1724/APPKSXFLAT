import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { API_URLS } from "../../config/apiConfig";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screen } from "../../utils";
export function UserList() {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortFavorites, setFavorites] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [flatsCount, setFlatsCount] = useState(0);

  // Nuevo estado para el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [iUser, setIUser] = useState(0); // Estado para determinar si el usuario es Admin o Landors
  const [storedUserId, setStoredUserId] = useState(""); // Estado para el userId
  const [storedUserType, setStoredUserType] = useState(""); // Estado para el rol del usuario

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const userType = await AsyncStorage.getItem("rol");
        setStoredUserId(userId);
        setStoredUserType(userType);
        console.log("userId:", userId);
        console.log("userId:", userId);
        console.log("userType:", storedUserId);
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

  const fetchFlatsCount = async () => {
    try {
      const API_URL = API_URLS.getCountFlats;
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Error al obtener el contador de flats");
      }

      const data = await response.json();
      const flatsCount = data.flatsCount;

      setFlatsCount(flatsCount);
      setMaxValue(flatsCount);
    } catch (error) {
      console.error("Error en fetchFlatsCount:", error.message);
    }
  };

  useEffect(() => {
    fetchFlatsCount();
  }, []);

  const handleSliderChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchUsers();
  }, [sortOrder]);

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
 
      navigation.navigate(screen.user.accounts, { type: "edit", userId: user,
      })
   
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
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };

  const handleSortFavorites = () => {
    const newSortOrder = sortOrder === "mostFlats" ? "favorites" : "mostFlats";
    setFavorites(newSortOrder);
    setSortOrder(newSortOrder);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchUsers();
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Función para mostrar el modal de confirmación de borrado
  const handleDeleteConfirmation = (user) => {
    console.log("Borrar usuario:", storedUserId, user._id);
    if (storedUserId === user._id) {
      alert("No puede borrar tu propio usuario");
      return;
    }
    setUserToDelete(user);
    setModalVisible(true);
  };

  // Función para confirmar el borrado del usuario
  const handleDeleteUser = () => {
    // Aquí puedes implementar la lógica para borrar al usuario
    console.log("Borrando usuario:", storedUserId, userToDelete.lastName);
    

    // Cierra el modal después de borrar
    setModalVisible(false);
  };

  // Función para cancelar el borrado y cerrar el modal
  const handleCancelDelete = () => {
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Modal para confirmar el borrado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              ¿Estás seguro de que deseas borrar a {userToDelete?.email}{" "}
              {userToDelete?.lastName}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={handleDeleteUser}
              >
                <Text style={styles.textStyle}>Borrar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#FF6347" }}
                onPress={handleCancelDelete}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.detailsContainer}>
        <Searchbar
          placeholder="Buscar por nombre..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={styles.searchBar}
        />
        <TouchableOpacity onPress={handleSortPress}>
          <FontAwesome name="user" size={16} color="#5c5c5c" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSortPress}>
          <FontAwesome
            name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
            size={16}
            color="#5c5c5c"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSortFavorites}>
          <FontAwesome name="heart" size={16} color="#5c5c5c" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSortFavorites}>
          <FontAwesome
            name={sortFavorites === "mostFlats" ? "arrow-down" : "arrow-up"}
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
                  <View style={styles.detailsContainer}>
                    <TouchableOpacity
                      style={[styles.card__btn, styles.viewDetailsBtn]}
                      onPress={() => handleDetailsPress(user._id)}
                    >
                      <FontAwesome name="eye" size={18} color="#fff" />
                      <Text style={styles.card__btnText}></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.card__btn, styles.viewDetailsBtnx]}
                      onPress={() => handleDeleteConfirmation(user)}   >
                      <FontAwesome name="close" size={18} color="white" />
                      <Text style={styles.card__btnText}></Text>
                    </TouchableOpacity>
                  </View>
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
  viewDetailsBtnx: {
    backgroundColor: "red",
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
