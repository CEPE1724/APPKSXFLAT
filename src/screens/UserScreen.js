import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export function UserScreen({ route }) {
    if (!route || !route.params || !route.params.type) {
        // Maneja el caso cuando los parámetros no están definidos
        return (
            <View style={styles.container}>
                <Text>Error: Parámetro 'type' no definido.</Text>
            </View>
        );
    }
    const currentDate = new Date().toISOString().split('T')[0];
    const maxBirthDate = '2003-12-31'; // Define el máximo permitido para la fecha de nacimiento
    const minBirthDate = '1920-01-01'; // Define el mínimo permitido para la fecha de nacimiento

    const [error, setError] = useState('');
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: currentDate,
        password: '',
        confirmPassword: '',
    });

    // Función para manejar el envío o validación del formulario (simulado)
    const handleSubmit = () => {
        if (user.firstName.length < 2 || user.lastName.length < 2) {
            setError('First name and last name must have at least two characters.');
            return;
        }
        if (!user.birthDate) {
            setError('Please select a birth date.');
            return;
        }
        if (!user.email || !validateEmail(user.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!user.password || user.password !== user.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Aquí puedes manejar la lógica para guardar o enviar el formulario
        setShowConfirmationDialog(true);
    };

    // Función para cerrar el diálogo de confirmación
    const handleCloseDialog = () => {
        setError('');
        setShowConfirmationDialog(false);
    };

    // Función para validar el formato del email
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
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
                        editable={true} // Aquí ajusta según la lógica de tu aplicación
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="group" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={user.lastName}
                        onChangeText={(text) => setUser({ ...user, lastName: text })}
                        editable={true} // Aquí ajusta según la lógica de tu aplicación
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
                        editable={true} // Aquí ajusta según la lógica de tu aplicación
                    />
                </View>
                <TouchableOpacity onPress={() => {}} style={styles.inputContainer}>
                    <FontAwesome name="calendar" size={24} color="#333" style={styles.icon} />
                    <Text style={styles.datePickerText}>{user.birthDate}</Text>
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <FontAwesome name="key" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={user.password}
                        onChangeText={(text) => setUser({ ...user, password: text })}
                        editable={true} // Aquí ajusta según la lógica de tu aplicación
                    />
                </View>
                <View style={styles.inputContainer}>
                    <FontAwesome name="key" size={24} color="#333" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={user.confirmPassword}
                        onChangeText={(text) => setUser({ ...user, confirmPassword: text })}
                        editable={true} // Aquí ajusta según la lógica de tu aplicación
                    />
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>

                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                ) : null}

                {/* Diálogo de confirmación */}
                {showConfirmationDialog && (
                    <View style={styles.dialogContainer}>
                        <Text style={styles.dialogText}>Confirmación de envío</Text>
                        {/* Agrega aquí los elementos del diálogo de confirmación */}
                        <TouchableOpacity style={styles.dialogButton} onPress={handleCloseDialog}>
                            <Text style={styles.dialogButtonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dialogButton} onPress={() => setShowConfirmationDialog(false)}>
                            <Text style={styles.dialogButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#333',
    },
    datePickerText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    errorContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#ffcccc',
        borderRadius: 5,
    },
    errorText: {
        color: 'red',
    },
    dialogContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
        alignItems: 'center',
    },
    dialogText: {
        fontSize: 18,
        marginBottom: 10,
    },
    dialogButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 5,
        marginTop: 10,
    },
    dialogButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default UserScreen;
