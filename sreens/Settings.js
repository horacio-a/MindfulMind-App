import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Header from '../componets/Header';
import NavBar from '../componets/navBar';
import { SesionGlobalState } from '../context/SesionGlobalState';
import { useContext } from 'react';

export default function SettingScreen({ navigation }) {
    const { session, setsession } = useContext(SesionGlobalState);

    const Redirect = (url) => {
        navigation.navigate(url)
    }
    const ExitSession = async () => {
        await SecureStore.deleteItemAsync('userToken')
        setsession(false)
    }
    return (
        <>
            <Header />
            <Text>settings</Text>
            <TouchableOpacity onPress={() => { ExitSession() }} style={styles.exitButton}>
                <Text style={{ color: '#fff' }}>
                    Exit Button

                </Text>
            </TouchableOpacity>
            <NavBar
                Redirect={Redirect}
                home={false}
                routine={false}
                calendar={false}
                text={false}
                settings={true} />
        </>
    )
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
