import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00796B', // Color principal de Banco Guayaquil
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ translateY: -20 }], // Efecto de elevación
  },
  logo: {
    width: 120, // Ajusta el ancho según la relación de aspecto de tu logo
    height: 120, // Ajusta la altura según la relación de aspecto de tu logo
    marginBottom: 20,
    resizeMode: 'contain', // Ajusta la escala de la imagen
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#004D40', // Verde oscuro de Banco Guayaquil
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BDBDBD', // Borde gris claro
    borderRadius: 5,
    backgroundColor: '#E0E0E0', // Fondo gris claro
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#004D40', // Verde oscuro de Banco Guayaquil
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF', // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});
