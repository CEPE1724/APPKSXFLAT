import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { styles } from './UserScreen.style';
import { API_URLS } from '../../config/apiConfig';

export function UserScreen({ route }) {
    if (!route || !route.params || !route.params.type || !route.params.userId) {
        return (
            <View style={styles.container}>
                <Text>Error: Parámetros incorrectos.</Text>
            </View>
        );
    }

    const currentDate = new Date();
    const [error, setError] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthdate: currentDate,
        password: '',
        confirmPassword: '',
        userType: 'Landors',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log('route.params.userId', API_URLS.getFindUserID(route.params.userId))
                const response = await axios.get(API_URLS.getFindUserID(route.params.userId));
                if (response.status === 200) {
                    const userData = response.data;
                    console.log('userData', userData.birthdate);
                    setUser({
                        firstName: userData.firstName || '',
                        lastName: userData.lastName || '',
                        email: userData.email || '',
                        birthdate: userData.birthdate ? new Date(userData.birthdate) : currentDate, // Aquí se corrige birthdate a userData.birthdate
                        confirmPassword: '',
                        userType: userData.rol || 'Landors',
                    });
    
                    setShowPasswordFields(userData.userType === 'Admin');
                } else {
                    console.error('User data not found in response:', response);
                    setError('User data not found. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again.');
            }
        };
    
        fetchUserData();
    }, [route.params.userId]);
    

    const handleOptionPress = (type) => {
        setUser({ ...user, userType: type });
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || user.birthdate;
        setShowDatePicker(Platform.OS === 'ios');

        const selectedDateObject = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

        setUser({ ...user, birthdate: selectedDateObject });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    };

    const handleSubmit = async () => {
        try {
            if (user.firstName.length < 2 || user.lastName.length < 2) {
                setError('First name and last name must have at least two characters.');
                return;
            }
            if (!user.birthdate) {
                setError('Please select a birth date.');
                return;
            }
            if (!user.email || !validateEmail(user.email)) {
                setError('Please enter a valid email address.');
                return;
            }

            // Validación de la contraseña
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{7,}$/;
            if (showPasswordFields && !passwordRegex.test(user.password)) {
                setError('Password must have at least 7 characters including uppercase letters and special characters.');
                return;
            }

            if (showPasswordFields && user.password !== user.confirmPassword) {
                setError('Passwords do not match.');
                return;
            }

            if (!isAgeValid(user.birthdate)) {
                setError('You must be between 18 and 70 years old to register.');
                return;
            }

            // Objeto con los datos a enviar en la actualización
            console.log('actualizar', user.birthdate);
            const updateData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                birthdate: user.birthdate.toISOString(),
                rol: user.userType,
                password: user.password,

            };

            // Añadir contraseña si está presente
          /*  if (showPasswordFields && user.password) {
                updateData.password = user.password;
            }*/

            // Realizar la solicitud PUT para actualizar el usuario
            const response = await axios.put(API_URLS.postCrearUsuario(route.params.userId), updateData);

            if (response.status === 200) {
                setError('User updated successfully.');
            } else {
                console.error('Failed to update user:', response);
                setError('Failed to update user. Please try again.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Error updating user. Please try again.');
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const isAgeValid = (birthdate) => {
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        return age >= 18 && age < 70;
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <FontAwesome name="user" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={user.firstName}
                        onChangeText={(text) => setUser({ ...user, firstName: text })}
                        editable={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="group" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={user.lastName}
                        onChangeText={(text) => setUser({ ...user, lastName: text })}
                        editable={true}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="envelope" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={user.email}
                        onChangeText={(text) => setUser({ ...user, email: text })}
                        editable={true}
                    />
                </View>
                <TouchableOpacity onPress={showDatePickerModal} style={styles.inputContainer}>
                    <FontAwesome name="calendar" size={24} color="#333" style={styles.icon} />
                    <Text style={styles.datePickerText}>{user.birthdate.toISOString().split('T')[0]}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={user.birthdate}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                {showPasswordFields && (
                    <>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="key" size={24} color="#333" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                value={user.password}
                                onChangeText={(text) => setUser({ ...user, password: text })}
                                editable={true}
                            />
                            <TouchableOpacity onPress={toggleShowPassword}>
                                <FontAwesome name={showPassword ? 'eye-slash' : 'eye'} size={24} color="#333" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <FontAwesome name="key" size={24} color="#333" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                secureTextEntry={!showPasswordConfirmation}
                                value={user.confirmPassword}
                                onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
                                editable={true}
                            />
                            <TouchableOpacity onPress={toggleShowPasswordConfirmation}>
                                <FontAwesome name={showPasswordConfirmation ? 'eye-slash' : 'eye'} size={24} color="#333" style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </>
                )}
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={[styles.optionButton, user.userType === 'Admin' && styles.selectedOption]}
                        onPress={() => handleOptionPress('Admin')}
                    >
                        <Text style={styles.optionButtonText}>Admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.optionButton, user.userType === 'Landors' && styles.selectedOption]}
                        onPress={() => handleOptionPress('Landors')}
                    >
                        <Text style={styles.optionButtonText}>Landors</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.optionButton, user.userType === 'Renters' && styles.selectedOption]}
                        onPress={() => handleOptionPress('Renters')}
                    >
                        <Text style={styles.optionButtonText}>Renters</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.togglePasswordButton}
                    onPress={() => setShowPasswordFields(!showPasswordFields)}
                >
                    <Text style={styles.togglePasswordButtonText}>
                        {showPasswordFields ? 'Hide Password Fields' : 'Show Password Fields'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}
            </View>
        </ScrollView>
    );
}
