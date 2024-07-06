import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import  {API_URLS} from "../config/apiConfig";
import axios from "axios";
const MessageCardModal = ({
  visible,
  message,
  onClose,
  avatar,
  city,
  streetName,
  streetNumber,
    flatId,
    userId,
    storedUserId
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [showToast, setShowToast] = useState({
    visible: false,
    type: "info",
    message: "",
  });

  const handleSendMessage = async () => {
    if (inputMessage.length < 5) {
      // Mostrar toast de error
      setShowToast({
        visible: true,
        type: "error",
        message: "El mensaje debe tener al menos 5 caracteres.",
      });
      setTimeout(() => setShowToast({ ...showToast, visible: false }), 3000); // Ocultar después de 3 segundos
      return;
    }

    // Mostrar toast de mensaje enviado correctamente
    setShowToast({
      visible: true,
      type: "success",
      message: "Mensaje enviado correctamente.",
    });

    try {
      console.log("Enviando mensaje...", API_URLS.putMessage);
      const url = API_URLS.putMessage; // URL de la API para enviar el mensaje (ajustar según tu implementación)
      const method = 'POST'; // Método PUT para actualizar

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: inputMessage,
          idFlat: flatId, // ID del flat (ajustar según tu implementación)
          _idUsuarioRecibe: userId, // ID del usuario que recibe el mensaje (ajustar según tu implementación)
          _idUsuarioEnvia: storedUserId, // ID del usuario que envía el mensaje (ajustar según tu implementación)
          city: city, // Ciudad del destinatario (ajustar según tu implementación)
          streetName: streetName, // Nombre de la calle del destinatario (ajustar según tu implementación)
          streetNumber: streetNumber, // Número de la calle del destinatario (ajustar según tu implementación)
        }),
      });

      if (!response.ok) {
        throw new Error("Error sending message");
      }
      console.log("Mensaje enviado:", inputMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    // Cerrar el modal después de enviar el mensaje y ocultar el toast
    setTimeout(() => {
      setShowToast({ ...showToast, visible: false });
      onClose();
    }, 3000); // Ocultar y cerrar después de 3 segundos
  };

  const renderAvatar = () => {
    if (!avatar) {
      return (
        <Image source={{ uri: avatar }} style={styles.avatarImage} />
      );
    } else {
      return (
        <FontAwesome name="user-circle" size={100} color="#CCCCCC" />
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="close" size={24} color="#333333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Nuevo Mensaje</Text>
          <View style={styles.avatarContainer}>{renderAvatar()}</View>
         <Text style={styles.detailText}>Ciudad: {city}</Text>
          <Text style={styles.detailText}>Calle: {streetName}-{streetNumber}</Text>
          <Text style={styles.messageText}>{message}</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Escribe tu mensaje aquí..."
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <FontAwesome name="send" size={24} color="white" />
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {showToast.visible && (
        <View
          style={[
            styles.toastContainer,
            showToast.type === "error" ? styles.errorToast : styles.successToast,
          ]}
        >
          <Text style={styles.toastText}>{showToast.message}</Text>
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semi-transparente
  },
  modalView: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    minWidth: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333333",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555555",
    textAlign: "center",
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666666",
  },
  messageText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#333333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "#333333",
  },
  sendButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 10,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "transparent",
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  toastContainer: {
    padding: 15,
    borderRadius: 10,
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  errorToast: {
    backgroundColor: "rgba(255, 0, 0, 0.8)",
  },
  successToast: {
    backgroundColor: "rgba(0, 128, 0, 0.8)",
  },
});

export default MessageCardModal;
