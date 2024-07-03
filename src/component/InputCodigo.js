import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingWheel from '../component/LoadingWheel';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { API_URLS } from "../config/apiConfig";
import Alert from './Alert';  // Ajusta la ruta según tu estructura de archivos

const InputCodigo = ({ navigation, onClose, email, password }) => {
    const [words, setWords] = useState(['', '', '', '', '']);
    const [timerEnded, setTimerEnded] = useState(false);
    const [timerEndFlag, setTimerEndFlag] = useState(false);
    const [alert, setAlert] = useState(null);
    const inputRefs = useRef([]);

    useEffect(() => {
        // Initialize inputRefs array
        inputRefs.current = inputRefs.current.slice(0, words.length);
    }, [words]);

    const handleChangeText = (index, text) => {
        if (text.length <= 1) {
            const newWords = [...words];
            newWords[index] = text.toUpperCase(); // Convertir a mayúscula
            setWords(newWords);

            // Auto-focus to next TextInput if current length is 1 and index is not last
            if (text.length === 1 && index < words.length - 1) {
                inputRefs.current[index + 1]?.focus(); // Focus next TextInput
            }
        }
    };

    useEffect(() => {
        if (timerEndFlag) {
            setTimerEnded(true);
        }
    }, [timerEndFlag]);

    useEffect(() => {
        if (timerEnded) {
            onClose();
        }
    }, [timerEnded]);

    const handleTimerEnd = () => {
        setTimerEndFlag(true);
    };

    const handleValidate = async () => {
        const codigo = words.join('');
        try {
            const response = await getValCodigo(email, codigo);
          
            if (response.status === 200) {
                const responseCrearUsuario = await postCrearUsuario(email, password);
        
                if (responseCrearUsuario.status === 201) {
                    setAlert({ message: 'Usuario Creado', type: 'success' });
                
                    // Mostrar la alerta por 2 segundos (2000 milisegundos)
                    setTimeout(() => {
                        onClose();
                        //navigation.navigate('Login'); // Redirigir al usuario a la pantalla de Login
                    }, 2000);
                } else {
                    setAlert({ message: 'Error al crear usuario', type: 'error' });
                }
            } else {
                setAlert({ message: 'Codigo Invalido', type: 'error' });
            }
        } catch (error) {
            setAlert({ message: 'Error al validar código', type: 'error' });
        }
    };

    const getValCodigo = async (email, codigo) => {
        try {
            const url = API_URLS.getValCodigo(email, codigo);
            const response = await axios.get(url);
            return response;
        } catch (error) {
            setAlert({ message: 'Error al validar código', type: 'error' });
            throw error;
        }
    };

    const postCrearUsuario = async (email, password) => {
        try {
            const response = await axios.post(API_URLS.postSignUp, { email, password });
            return response;
        } catch (error) {
            throw error;
        }
    }

    return (
        <View style={styles.container}>
            {alert && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onDismiss={() => setAlert(null)}
                />
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Icon name="times" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Codigo de Validación</Text>
            <Text>Ingresa tu Clave digital enviada a tu Email: {email}</Text>

            <View style={styles.inputRow}>
                {words.map((word, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        placeholder={`${index + 1}`}
                        value={word}
                        onChangeText={(text) => handleChangeText(index, text)}
                        maxLength={1}
                        keyboardType="default" // Use "numeric" if you want to restrict to numbers only
                        autoCapitalize="characters" // Convertir a mayúsculas automáticamente
                        autoFocus={index === 0 ? true : undefined} // Autofocus en el primer TextInput
                        onSubmitEditing={() => Keyboard.dismiss()} // Ocultar teclado al terminar
                    />
                ))}
            </View>
            <Text>Es personal y puedes usarla para la validación de tu email.</Text>
            <Text>La clave expira en 2 minutos</Text>
            <LoadingWheel onTimerEnd={handleTimerEnd} />
            <Button title="Validar" onPress={handleValidate} />
            <Text>¡No la compartas con nadie!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white', // Change the background color to white
        borderRadius: 10,
        height: 400,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        textAlign: 'center',
        borderRadius: 5,
    },
});

export default InputCodigo;
