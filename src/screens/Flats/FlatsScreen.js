import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Switch, Button, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URLS } from '../../config/apiConfig';
import { styles } from './FlatsScreen.style';
export function FlatsScreen({ route }) {
  const { userId } = route.params;
  console.log('userId', userId);
  const [flats, setFlats] = useState({
    city: '',
    streetName: '',
    streetNumber: '',
    areaSize: '',
    hasAc: false,
    yearBuilt: '',
    rentPrice: '',
    dateAvailable: new Date().toISOString().slice(0, 10), // Formato ISO yyyy-mm-dd
    user: userId || '' // Inicializar con userId si está disponible
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        if (!userId) {
          const storedUserId = await AsyncStorage.getItem('userId');
          
          if (storedUserId) {
            setFlats(prevFlats => ({ ...prevFlats, user: storedUserId }));
          }
        }

        if (route.params.type === 'update') {
          
          setIsUpdate(true);
          fetchFlatDetails(flats.user); // Pasar flats.user como userId
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, [userId, route.params.type]);

  const fetchFlatDetails = async (id) => {
    setLoading(true);
    console.log('id', id);
    try {
      const response = await fetch(API_URLS.getfindFullFlatById(id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Error fetching flat details');
      }
      const data = await response.json();
      setFlats({
        city: data.city || '',
        streetName: data.streetName || '',
        streetNumber: data.streetNumber || '',
        areaSize: data.areaSize || '',
        hasAc: data.hasAc || false,
        yearBuilt: data.yearBuilt || '',
        rentPrice: data.rentPrice || '',
        dateAvailable: data.dateAvailable ? new Date(data.dateAvailable).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        user: data.user || flats.user
      });
      setError('');
    } catch (error) {
      console.error('Error fetching flat details:', error);
      setError('Error fetching flat details');
    } finally {
      setLoading(false);
    }
  };

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
       
      const url = isUpdate ? `${API_URLS.putUpdateFlats(userId)}` : API_URLS.postCreateFlat;
       const method = isUpdate ? 'PUT' : 'POST';
     

      const response = await fetch(url, {
        method: method,
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

      Alert.alert('Success', `Flat ${isUpdate ? 'updated' : 'created'} successfully`);
      if (!isUpdate) {
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
      }
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
