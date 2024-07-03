import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_URLS } from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function FlatsScreen() {
  const [flats, setFlats] = useState({
    city: '',
    streetName: '',
    streetNumber: '',
    areaSize: '',
    hasAc: false,
    yearBuilt: '',
    rentPrice: '',
    dateAvailable: new Date().toISOString().slice(0, 10),
    user: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        setFlats(prevFlats => ({ ...prevFlats, user: userId }));
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const requiredFields = [
        { value: flats.city, label: "City" },
        { value: flats.streetName, label: "Street name" },
        { value: flats.streetNumber, label: "Street number" },
        { value: flats.areaSize, label: "Area size" },
        { value: flats.yearBuilt, label: "Year built" },
        { value: flats.rentPrice, label: "Rent price" },
        { value: flats.dateAvailable, label: "Date available" }
      ];

      const isEmpty = requiredFields.some(field => field.value.trim() === '');
      if (isEmpty) {
        setError("Complete all required fields");
        setLoading(false);
        return;
      }

      const response = await fetch(API_URLS.postCreateFlat, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flats)
      });

      if (!response.ok) {
        const responseData = await response.json();
        setError(responseData.message || 'Error submitting the form');
        setLoading(false);
        return;
      }

      Alert.alert('Success', 'Flat created successfully');
      setFlats({
        city: '',
        streetName: '',
        streetNumber: '',
        areaSize: '',
        hasAc: false,
        yearBuilt: '',
        rentPrice: '',
        dateAvailable: new Date().toISOString().slice(0, 10),
        user: flats.user
      });

      setError('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting the form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.inputGroup}>
        <Icon name="location-city" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={flats.city}
          onChangeText={text => setFlats({ ...flats, city: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="add-road" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Street name"
          value={flats.streetName}
          onChangeText={text => setFlats({ ...flats, streetName: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="signpost" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Street number"
          value={flats.streetNumber}
          onChangeText={text => setFlats({ ...flats, streetNumber: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="fit-screen" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Area size"
          keyboardType="numeric"
          value={flats.areaSize}
          onChangeText={text => setFlats({ ...flats, areaSize: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="date-range" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Year built"
          keyboardType="numeric"
          value={flats.yearBuilt}
          onChangeText={text => setFlats({ ...flats, yearBuilt: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="price-change" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Rent price"
          keyboardType="numeric"
          value={flats.rentPrice}
          onChangeText={text => setFlats({ ...flats, rentPrice: text })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="event-note" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Date Available"
          value={flats.dateAvailable}
          onChangeText={text => setFlats({ ...flats, dateAvailable: text })}
        />
      </View>

      <View style={styles.switchGroup}>
        <Text>Has AC</Text>
        <Switch
          value={flats.hasAc}
          onValueChange={value => setFlats({ ...flats, hasAc: value })}
        />
      </View>

      <Button title="Submit" onPress={handleSubmit} />

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    padding: 7,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
    color: '#6c757d',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#495057',
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  error: {
    color: '#e63946',
    marginBottom: 20,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

export default FlatsScreen;
