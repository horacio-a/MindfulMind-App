import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import Header from '../componets/Header';
import NavBar from '../componets/navBar';
import { SesionGlobalState } from '../context/SesionGlobalState';
import { useContext } from 'react';
import { Icon } from '@rneui/themed';

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

            <View style={styles.MainConteiner}>

                <TouchableOpacity onPress={() => { ExitSession() }} style={styles.exitButton}>
                    <Icon
                        name={'logout'}
                        color={'#fff'}
                        style={{ marginLeft: 25 }} />
                    <Text style={{ color: '#fff', fontSize: 16, marginLeft: 10 }}>
                        Cerrar Session
                    </Text>
                </TouchableOpacity>
            </View>

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
    MainConteiner: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-end'
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
        height: 50,
        backgroundColor: '#D01B13',
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 5
    }
});
