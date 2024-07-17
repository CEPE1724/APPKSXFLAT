import { StyleSheet } from "react-native";
import Theme from "../../component/themes"; // Asegúrate de ajustar la ruta de importación según la ubicación de tu tema

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Theme.colors.background,
  },
  icon: {
    marginRight: 10,
    color: Theme.colors.text,
  },
  icongps: {
    color: "green", // Color personalizado para el ícono de GPS
  },
  largeInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Theme.colors.background,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Theme.colors.background,
    borderRadius: 10,
    padding: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Theme.colors.text,
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Theme.colors.background,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  error: {
    color: Theme.colors.error,
    marginBottom: 20,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
