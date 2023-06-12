import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../componets/Header';
import NavBar from '../componets/navBar';
import Routine from '../componets/Main/Routine';
import Caledar from '../componets/Main/Caledar';
import { SesionGlobalState } from '../context/SesionGlobalState';
import * as React from 'react';
import TextComponent from '../componets/Main/TextComponent';

import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect } from 'react';



export default function Main({ navigation }) {
    const { session, setsession } = useContext(SesionGlobalState);

    const ExitSession = async () => {
        await SecureStore.deleteItemAsync('userToken')
        setsession(false)
    }
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    useEffect(() => {
        const IsUserRegister = async () => {
            const userToken = await SecureStore.getItemAsync('userToken')
        };

        IsUserRegister();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView style={styles.Width100}>

                <View style={styles.bigblock}>
                    <Routine Redirect={Redirect} />

                    <Caledar />
                    <TextComponent />

                    <TouchableOpacity onPress={() => { ExitSession() }} style={styles.exitButton}>
                        <Text style={{ color: '#fff' }}>
                            Exit Button

                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <NavBar Redirect={Redirect}
                home={true}
                routine={false}
                calendar={false}
                text={false}
                settings={false} />
        </SafeAreaView>
    );
}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    bigblock: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',

    },
    Width100: {
        width: '100%',
    },
    exitButton: {
        margin: 3,
        width: '85%',
        height: 100,
        backgroundColor: '#1E1E1E',
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
