import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { useState } from 'react';

export default function TaskCalendar({ data }) {

    const time = new Date(data.date).toLocaleTimeString('es-AR').slice(0, 5)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <View style={Styles.ConteinerMain}>
                <Text style={Styles.Text}> {time}</Text>
                <View style={[Styles.separador, { backgroundColor: data.colorHex }]}></View>
                <Text style={Styles.Text}>{data.title}</Text>
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    ConteinerMain: {
        width: '100%',
        height: '15%',
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',

        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Text: {
        color: '#FFFFFF',
        fontFamily: 'Lato_400Regular',
    },
    separador: {
        width: 3.5,
        height: '65%',
        margin: 7.5,
        borderRadius: 2

    }

});

