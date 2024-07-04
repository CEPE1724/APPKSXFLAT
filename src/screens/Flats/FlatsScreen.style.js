import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
  
    padding: 20,
    backgroundColor: '#F8F9FA', // Fondo gris claro
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DEE2E6', // Borde gris claro
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF', // Fondo blanco
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
    color: '#6C757D', // Gris oscuro
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#495057', // Gris medio
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderWidth: 1,
    borderColor: '#DEE2E6', // Borde gris claro
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  error: {
    color: '#E63946', // Rojo
    marginBottom: 20,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
