import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    background: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
    },
    container: {
        width: '90%',
        padding: 40,
        backgroundColor: 'rgba(240, 255, 240, 0.5)', // Fondo transparente
        borderRadius: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 2.25,
        shadowRadius: 6.84,
        elevation: 7,
        transform: [{ translateY: -30 }], // Efecto de elevación
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: 'center',
        color: '#2b2453',
        //fontFamily: 'system-ui',
        fontWeight: 'bold', // O 'normal' según lo que necesites
    },
    input: {
        height: 36,
        width: '100%',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderWidth: 4,
        borderColor: '#2b2453', // Borde gris claro
        borderRadius: 10,
        backgroundColor: '#E0E0E0', // Fondo gris claro
    },
    inputPassword: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        position: 'relative',
    },
    loginText: {
        color: '#2b2453',
        fontSize: 16,
        marginTop: 10,
    },
    errorText: {
        color: '#8b0a50',
        marginBottom: 10,
    },
    toggleButton: {
        position: 'absolute',
        top: 0,
        right: 10,
        zIndex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
});
