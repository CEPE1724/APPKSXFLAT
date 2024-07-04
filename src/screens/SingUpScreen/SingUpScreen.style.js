import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Fondo semi-transparente
        borderRadius: 10,
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        width: '100%',
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
        color: '#91a150',
        fontSize: 14,
        marginTop: 10,
    },
    errorText: {
        color: 'red',
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

