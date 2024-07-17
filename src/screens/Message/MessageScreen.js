import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URLS } from "../../config/apiConfig";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/screenName";

export function MessageScreen() {
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const iduser = await AsyncStorage.getItem("userId");
        if (iduser !== null) {
          setUserId(iduser);
        }
      } catch (error) {
        console.error("Error fetching userId from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (userId) {
          setLoading(true);
          const response = await fetch(API_URLS.getMEssage(userId));
          const data = await response.json();
          setMessages(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  const handleSliderChange = (idUsuarioRecibe, idUsuarioEnvia, idflat) => {
    navigation.navigate(screen.message.view, {
      idUsuarioRecibe: idUsuarioRecibe,
      idUsuarioEnvia: idUsuarioEnvia,
      idflat: idflat,
    });
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.envelope}>
          <View style={styles.envelopeTop}></View>
          <View style={styles.envelopeBody}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                name="map-marker"
                size={20}
                color="#555"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.envelopeTitle}>{item.streetName}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <Icon name="user" size={14} color="#007bff" style={{ marginRight: 5 }} />
              <Text style={styles.envelopeSender}>
                {item.sendingUser.firstName} {item.sendingUser.lastName}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <Icon name="envelope" size={12} color="#555" style={{ marginRight: 5 }} />
              <Text style={styles.envelopeSenderEmail}>{item.sendingUser.email}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <Icon name="comment" size={12} color="#555" style={{ marginRight: 5 }} />
              <Text style={styles.envelopeMessageCount}>{item.messageCount}</Text>
            </View>
            <Button
              title="Ver mensajes"
              buttonStyle={styles.buttonmail}
              onPress={() => handleSliderChange(userId, item.sendingUser._id, item._id)}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      <FlatList
        style={styles.list}
        data={messages}
        renderItem={renderCard}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  envelope: {
    backgroundColor: "#cf4a43",
    borderRadius: 8,
    width: "100%",
    padding: 16,
  },
  envelopeTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: "#e95f55",
    height: 20,
    marginBottom: 10,
  },
  envelopeBody: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  envelopeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000", // Asegúrate de especificar el color de texto dentro del estilo
  },
  envelopeSender: {
    fontSize: 14,
    color: "#007bff",
    marginBottom: 2,
  },
  envelopeSenderEmail: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  envelopeMessageCount: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  list: {
    width: "100%",
  },
  buttonmail: {
    backgroundColor: "#25D366",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 1,
    marginBottom: 5,
  },
});
