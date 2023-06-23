import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
} from "react-native"; import stylesMain from '../../Styles/MainStyle';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get("window");
import React, { useEffect } from "react";
import stylesCalendar from '../../Styles/CalendarsStyle';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient)

export default function LoadingCalendar() {
    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear.inOut,
                useNativeDriver: true,
            }),
        ).start();
    });

    const translateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-width * 2, width * 2],
    });


    return (
        <>
            <View style={stylesCalendar.ConteinerTitle}>
                <View style={stylesCalendar.LoadingTitleMain}>
                    <AnimatedLG
                        colors={["#a0a0a0", "#b0b0b0", "#b0b0b0", "#a0a0a0"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            ...StyleSheet.absoluteFill,
                            transform: [{ translateX: translateX }],
                        }}
                    />
                </View>
            </View>
            <View style={stylesCalendar.LoadingconteinerMain}>
                <AnimatedLG
                    colors={["#a0a0a0", "#b0b0b0", "#b0b0b0", "#a0a0a0"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={{
                        ...StyleSheet.absoluteFill,
                        transform: [{ translateX: translateX }],
                    }}
                />
            </View>
        </>

    )
}



