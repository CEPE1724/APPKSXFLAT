import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  ScrollView,
  Alert,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URLS } from "../../config/apiConfig";
import { styles } from "./FlatsScreen.style";
import Theme from "../../component/themes";
import { MapForm } from "../Flats/MapForm";
export function FlatsScreen({ route }) {
  const { userId } = route.params;
  const [showMap, setshowMap] = useState(false);

  const [flats, setFlats] = useState({
    city: "",
    canton: "",
    streetName: "",
    streetNumber: "",
    areaSize: "",
    hasAc: false,
    yearBuilt: "",
    rentPrice: "",
    dateAvailable: new Date().toISOString().slice(0, 10),
    user: userId || "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [provincias, setProvincias] = useState([]);
  const [canton, setCanton] = useState([]);

  const onOpenCloseMap = () => setshowMap((prev) => !prev);

  // Función para obtener el ID del usuario almacenado o del parámetro de ruta
  const fetchUserId = async () => {
    try {
      if (!userId) {
        const storedUserId = await AsyncStorage.getItem("userId");
        if (storedUserId) {
          setFlats((prevFlats) => ({ ...prevFlats, user: storedUserId }));
        }
      }

      if (route.params.type === "update") {
        setIsUpdate(true);
        fetchFlatDetails(flats.user);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  // Función para obtener la lista de provincias desde la API
  const fetchProvincias = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.getAllProvincia, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching provinces");
      }

      const data = await response.json();
      const mappedProvincias = data.map((item) => ({
        id: item.idProvincia, // Asegúrate de tener un campo `id` en tu objeto de provincia
        label: item.provincia,
        value: item.provincia,
      }));
      setProvincias(mappedProvincias);
    } catch (error) {
      console.error("Error fetching provinces:", error);
      setError("Error fetching provinces");
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener la lista de cantones según el ID de la provincia seleccionada
  const fetchCanton = async (idProvincia) => {
    setLoading(true);
    try {
      console.log(API_URLS.getAllCanton(idProvincia));
      const response = await fetch(API_URLS.getAllCanton(idProvincia), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching canton");
      }

      const data = await response.json();
      const mappedCanton = data.map((item) => ({
        label: item.nombre,
        value: item.nombre,
      }));
      setCanton(mappedCanton);
    } catch (error) {
      console.error("Error fetching canton:", error);
      setError("Error fetching canton");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el cambio de provincia en el Picker
  const handleProvinceChange = (value) => {
    const selectedProvince = provincias.find((province) => province.value === value);
    if (selectedProvince) {
      setFlats({ ...flats, city: value });
      fetchCanton(selectedProvince.id); // Llama a fetchCanton con el ID de la provincia seleccionada
    }
  };

  // Función para manejar el cambio de cantón en el Picker
  const handleCantonChange = (value) => {
    setFlats({ ...flats, canton: value });
  };

  // Función para obtener los detalles del apartamento para actualizar
  const fetchFlatDetails = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(API_URLS.getfindFullFlatById(id), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching flat details");
      }
      const data = await response.json();
      setFlats({
        city: data.city || "",
        canton: data.canton || "",
        streetName: data.streetName || "",
        streetNumber: data.streetNumber || "",
        areaSize: data.areaSize || "",
        hasAc: data.hasAc || false,
        yearBuilt: data.yearBuilt || "",
        rentPrice: data.rentPrice || "",
        dateAvailable: data.dateAvailable
          ? new Date(data.dateAvailable).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10),
        user: data.user || flats.user,
      });
      setError("");
    } catch (error) {
      console.error("Error fetching flat details:", error);
      setError("Error fetching flat details");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la presentación del formulario
  const handleSubmit = async () => {
    setLoading(true);

    try {
      const requiredFields = [
        { value: flats.city, label: "City" },
        { value: flats.canton, label: "Canton"},
        { value: flats.streetName, label: "Street name" },
        { value: flats.streetNumber, label: "Street number" },
        { value: flats.areaSize, label: "Area size" },
        { value: flats.yearBuilt, label: "Year built" },
        { value: flats.rentPrice, label: "Rent price" },
        { value: flats.dateAvailable, label: "Date available" },
      ];

      const isEmpty = requiredFields.some((field) => field.value.trim() === "");
      if (isEmpty) {
        setError("Complete all required fields");
        setLoading(false);
        return;
      }

      const url = isUpdate
        ? `${API_URLS.putUpdateFlats(userId)}`
        : API_URLS.postCreateFlat;
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flats),
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || "Error submitting the form");
        setLoading(false);
        return;
      }

      Alert.alert(
        "Success",
        `Flat ${isUpdate ? "updated" : "created"} successfully`
      );
      if (!isUpdate) {
        setFlats({
          city: "",
          canton: "",
          streetName: "",
          streetNumber: "",
          areaSize: "",
          hasAc: false,
          yearBuilt: "",
          rentPrice: "",
          dateAvailable: new Date().toISOString().slice(0, 10),
          user: flats.user,
        });
      }
      setError("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error submitting the form");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserId();
    fetchProvincias();
  }, [userId, route.params.type]);

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.inputGroup}>
        <Icon name="location-city" size={24} style={styles.icon} />
        <Picker
          selectedValue={flats.city}
          style={{
            height: 40,
            width: "100%",
            backgroundColor: Theme.colors.background,
            color: Theme.colors.text,
          }}
          onValueChange={(itemValue) => handleProvinceChange(itemValue)}
        >
          {provincias.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Icon name="location-city" size={24} style={styles.icon} />
        <Picker
          selectedValue={flats.canton}
          style={{
            height: 40,
            width: "100%",
            backgroundColor: Theme.colors.background,
            color: Theme.colors.text,
          }}
          onValueChange={(itemValue) => handleCantonChange(itemValue)}
        >
          {canton.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.inputGroup}>
        <Icon name="add-road" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Street name"
          value={flats.streetName}
          onChangeText={text => setFlats({ ...flats, streetName: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="add-road" size={24} style={styles.icon}
         onPress={onOpenCloseMap}
        />
        <TextInput
          style={styles.input}
          placeholder="Localizaciòn"
          value={flats.streetName}
          onChangeText={text => setFlats({ ...flats, streetName: text })}
        />
        <Icon name="add-road" size={24} style={styles.icon}
         onPress={onOpenCloseMap}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="signpost" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Street number"
          value={flats.streetNumber}
          onChangeText={text => setFlats({ ...flats, streetNumber: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="fit-screen" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Area size"
          keyboardType="numeric"
          value={flats.areaSize}
          onChangeText={text => setFlats({ ...flats, areaSize: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="date-range" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Year built"
          keyboardType="numeric"
          value={flats.yearBuilt}
          onChangeText={text => setFlats({ ...flats, yearBuilt: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="price-change" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Rent price"
          keyboardType="numeric"
          value={flats.rentPrice}
          onChangeText={text => setFlats({ ...flats, rentPrice: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="event-note" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Date Available"
          value={flats.dateAvailable}
          onChangeText={text => setFlats({ ...flats, dateAvailable: text })}
        />
      </View>

      <View style={styles.switchGroup}>
        <Text>Has AC</Text>
        <Switch
          value={flats.hasAc}
          onValueChange={value => setFlats({ ...flats, hasAc: value })}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit} />

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      )}
    </ScrollView>
    <MapForm show={showMap} close={onOpenCloseMap} />
    </>
  );
}
