import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';


export default function Loading() {
    const [text, settext] = useState('')

    const deleteuser = async () => {
        try {
            const userToken = await SecureStore.getItemAsync('userToken')
        } catch (error) {

            settext('Error: ' + error)
            try {
                SecureStore.deleteItemAsync('userToken')
            } catch (error) {
                settext('Error: ' + error)
            }
        }

    }
    useEffect(() => {
        deleteuser()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../img/mwhite.png')} style={styles.Img} />
            <ActivityIndicator size="large" color={'#fff'} style={styles.Loading} />
            <Text style={{ color: '#fff' }}>{text}</Text>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        marginTop: Constants.statusBarHeight,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Img: {
        width: 210,
        height: 210

    },

    bigblock: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',

    },
    Width100: {
        width: '100%',
    }
});
