import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { API_URLS } from "../../config/apiConfig";

export function ViewMessageScreen({ route }) {
  const { idUsuarioRecibe, idUsuarioEnvia, idflat } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (idUsuarioRecibe && idUsuarioEnvia && idflat) {
          const url = `${API_URLS.getMessagesByParams(idUsuarioRecibe, idUsuarioEnvia, idflat)}`;
          console.log("URL:", url);
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [idUsuarioRecibe, idUsuarioEnvia, idflat]); // Agregar dependencias a useEffect

  const renderMessage = ({ item }) => {
    const isSentMessage = item._idUsuarioEnvia === idUsuarioEnvia;

    return (
      <View style={[styles.messageContainer, isSentMessage ? styles.senderMessage : styles.receiverMessage]}>
        <Text style={styles.messageText}>{item.content}</Text>
        <Text style={styles.timestampText}>{formatTimestamp(item.createdAt)}</Text>
      </View>
    );
  };

  const formatTimestamp = (timestamp) => {
    // Convertir el timestamp a un objeto de fecha
    const dateObject = new Date(timestamp);

    // Obtener los componentes de fecha y hora
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();

    // Retornar la fecha y hora formateadas
    return `${date} ${time}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No hay mensajes disponibles</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAEAEA',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timestampText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});
