import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Alert } from 'react-native';
import Header from '../componets/Header';
import { useContext, useState, useEffect } from 'react';

export default function ForgetPassword({ navigation }) {
    const Redirect = (url) => {
        navigation.navigate(url)
    }
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
    return (
        <View>
            <Header back={true} Redirect={Redirect} />
            <View style={style.conteinerMain}>

            </View>
        </View>
    )
}

const style = StyleSheet.create({
    conteinerMain: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1E1E1E'
    }
})