import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

const LoadingWheel = ({ onTimerEnd }) => {
    const [secondsRemaining, setSecondsRemaining] = useState(120); // 2 minutes in seconds
    const progressAnim = useRef(new Animated.Value(0)).current;
    const colorAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setSecondsRemaining((prev) => {
                const newTime = prev - 1;
                if (newTime <= 0) {
                    clearInterval(interval);
                    onTimerEnd(); // Llama a la función de cierre cuando el tiempo llegue a cero
                }
                return newTime;
            });
        }, 1000);

        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 120000, // 2 minutes
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        Animated.timing(colorAnim, {
            toValue: 1,
            duration: 120000, // 2 minutes
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();

        return () => clearInterval(interval);
    }, [onTimerEnd]);

    const colorInterpolation = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(255, 255, 0)', 'rgb(255, 0, 0)'], // From yellow to red
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.loader,
                    {
                        borderColor: colorInterpolation,
                        transform: [
                            {
                                rotate: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                }),
                            },
                        ],
                    },
                ]}
            />
            <Text style={styles.timerText}>{secondsRemaining}s</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        width: 90,
        height: 90,
        borderWidth: 10,
        borderRadius: 50,
        borderTopColor: 'transparent',
        position: 'absolute',
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
    },
});

export default LoadingWheel;
