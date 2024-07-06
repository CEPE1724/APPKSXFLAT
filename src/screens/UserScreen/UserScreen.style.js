import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0', // Fondo gris claro
    },
    scrollView: {
        flexGrow: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff', // Fondo blanco
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    icon: {
        marginRight: 10,
        color: '#6c757d', // Color gris oscuro
        width: 26,
        height: 29,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333', // Color de texto gris oscuro
    },
    datePickerText: {
        fontSize: 16,
        color: '#333', // Color de texto gris oscuro
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF', // Azul
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center', // Alineado al centro horizontalmente
    },
    submitButtonText: {
        color: '#fff', // Texto blanco
        fontSize: 16,
        textAlign: 'center',
    },
    errorContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ffcccc', // Rojo claro
        borderRadius: 8,
    },
    errorText: {
        color: '#e63946', // Rojo oscuro
    },
    dialogContainer: {
        backgroundColor: '#fff', // Fondo blanco
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    dialogText: {
        fontSize: 18,
        marginBottom: 10,
    },
    dialogButton: {
        backgroundColor: '#007BFF', // Azul
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 10,
    },
    dialogButtonText: {
        color: '#fff', // Texto blanco
        fontSize: 16,
        textAlign: 'center',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    optionButton: {
        backgroundColor: '#007BFF', // Azul
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
    },
    optionButtonText: {
        color: '#fff', // Texto blanco
        fontSize: 16,
        textAlign: 'center',
    },
    selectedOption: {
        backgroundColor: '#0056b3', // Azul oscuro cuando seleccionado
    },
    togglePasswordButton: {
        backgroundColor: '#6c757d', // Gris oscuro
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginTop: 20,
        alignSelf: 'center', // Alineado al centro horizontalmente
    },
    togglePasswordButtonText: {
        color: '#fff', // Texto blanco
        fontSize: 16,
        textAlign: 'center',
    },
});
