import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Alert = ({ message, type, color, onDismiss }) => {
    const opacity = new Animated.Value(1);

    useEffect(() => {
        // Start a timer to fade out the alert after 4 seconds
        const timer = setTimeout(() => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                if (onDismiss) onDismiss();
            });
        }, 4000);

        // Clear the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    const getBackgroundColor = () => {
        if (color) return color;
        switch (type) {
            case 'success':
                return 'green';
            case 'error':
                return 'red';
            default:
                return 'grey';
        }
    };

    return (
        <Animated.View style={[styles.container, { backgroundColor: getBackgroundColor(), opacity }]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 500,
        left: '10%',
        right: '10%',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    text: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default Alert;
