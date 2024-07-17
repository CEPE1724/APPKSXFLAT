import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ImageUploadComponent = ({ isLoading, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        disabled={isLoading}
      >
        <Icon name="photo-camera" size={24} style={styles.icon} />
        <Text style={styles.buttonText}>
          {isLoading ? "Loading..." : "Select Image"}
        </Text>
      </TouchableOpacity>
      {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  buttonText: {
    marginLeft: 10,
  },
  icon: {
    color: "#555555",
  },
});

export default ImageUploadComponent;
