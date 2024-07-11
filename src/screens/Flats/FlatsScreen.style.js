import { StyleSheet } from "react-native";
import Theme from "../../component/themes"; // Asegúrate de ajustar la ruta de importación según la ubicación de tu tema

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Theme.colors.background, // Utiliza el color de fondo del tema
  },
  icon: {
    marginRight: 10,
    color: Theme.colors.text, // Utiliza el color de texto del tema
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Theme.colors.background, // Utiliza el color de fondo del tema
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF', // Color de fondo blanco específico
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Theme.colors.text, // Utiliza el color de texto del tema
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF', // Color de fondo blanco específico
    borderWidth: 1,
    borderColor: Theme.colors.background, // Utiliza el color de fondo del tema
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  error: {
    color: Theme.colors.error, // Utiliza el color de error del tema
    marginBottom: 20,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
