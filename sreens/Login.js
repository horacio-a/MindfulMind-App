import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Header from '../componets/Header';
import stylesLogin from '../Styles/LoginStyle';
import ComponetLogin from '../componets/login/Login';
import ComponetRegister from '../componets/login/Register';
import { useState } from 'react';
import { SesionGlobalState } from '../context/SesionGlobalState';
import * as React from 'react';

export default function Login({ navigation }) {
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
        <View style={stylesLogin.MainConteiner}>
            <Header />
            {
                Login === true
                    ? <ComponetLogin Redirect={Redirect} goRegister={goRegister} />
                    : <ComponetRegister Redirect={Redirect} goLogin={goLogin} />
            }
        </View>
    );
}







