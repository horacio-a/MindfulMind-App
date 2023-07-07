import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, BackHandler, Alert } from 'react-native';
import Header from '../componets/Header';
import stylesLogin from '../Styles/LoginStyle';
import ComponetLogin from '../componets/login/Login';
import ComponetRegister from '../componets/login/Register';
import { useState } from 'react';
import { SesionGlobalState } from '../context/SesionGlobalState';
import * as React from 'react';
import { useEffect } from 'react';

export default function Login({ navigation }) {
    const [statePasswordForgot, setStatePasswordForgot] = useState(true)
    useEffect(() => {
        const backAction = () => {
            Alert.alert('Espera', '¿Estas seguro que quieres salir?', [
                { text: 'Si', onPress: () => BackHandler.exitApp() },

                {
                    text: 'No',
                    onPress: () => null,
                    style: 'cancel',
                },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    const { session, setsession } = React.useContext(SesionGlobalState);
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    const [Login, setLogin] = useState(true)
    const goRegister = () => {
        setLogin(false)
    }
    const goLogin = () => {
        setLogin(true)
    }




    return (
        <View >

            <Header />
            <View style={stylesLogin.MainConteiner}>

                {
                    Login === true
                        ? <ComponetLogin Redirect={Redirect} goRegister={goRegister} />
                        : < ComponetRegister Redirect={Redirect} goLogin={goLogin} />
                }

            </View>
        </View>
    );
}







