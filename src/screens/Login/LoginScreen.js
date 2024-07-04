import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { API_URLS } from '../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './LoginScreen.style';
export function LoginScreen({ navigation, setIsLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch(API_URLS.postSignIn, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.status === 200) {
                // Guardar el token en el almacenamiento local
                await AsyncStorage.setItem('token', data.token);
                await AsyncStorage.setItem('userId', data.user._id);
                console.log(data.user._id);
               // await AsyncStorage.setItem('userId', data._id);

                // Actualizar el estado de autenticación
               

                // Mostrar mensaje de éxito
                setAlert({ message: 'Inicio de sesión exitoso', type: 'success' });

                // Redirigir al usuario después de mostrar la alerta por 2 segundos
                setTimeout(() => {
                    setAlert(null); // Limpiar alerta
                    setIsLoggedIn(true);
                    //navigation.navigate('Dashboard'); // Redirigir a la pantalla de Dashboard
                }, 2000);
            } else {
                // Mostrar mensaje de error
                setAlert({ message: 'Error al iniciar sesión', type: 'error' });
            }
        } catch (error) {
            // Manejo de errores
            setAlert({ message: 'Error al iniciar sesión', type: 'error' });
            console.error('Error:', error);
        }
    };


    const handleForgotPassword = () => {
        console.log('Forgot Password');
    };

    return (
        <ImageBackground
            source={require('../../../assets/LoginS.png')} // Reemplaza con tu imagen de fondo
            style={styles.background}
        >
            <View style={styles.container}>
                <Image 
                    source={require('../../../assets/favicon.png')}  // Reemplaza con la URL de tu imagen de logo
                    style={styles.logo}
                />
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <Button title="Login" onPress={handleLogin} />
                {alert && <Text style={alert.type === 'success' ? styles.successText : styles.errorText}>{alert.message}</Text>}
                <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>¿Olvidaste tu password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpText}>¿No tienes una cuenta? Regístrate</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

