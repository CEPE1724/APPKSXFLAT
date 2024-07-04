import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container: {
      padding: 20,
      borderRadius: 15, // Borde redondeado
    },
    flatContainer: {
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "green", // Fondo blanco
        shadowColor: "blue",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
         
        
      },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f8f9fa", // Fondo blanco
    },
    flatName: {
      fontSize: 15,
      fontWeight: "bold",
      color: "#00796b", // Verde oscuro
    },
    flatDescription: {
      fontSize: 12,
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
      
      