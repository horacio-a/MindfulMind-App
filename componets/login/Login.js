import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Alert } from 'react-native';
import { useContext, useState } from 'react';
import stylesLogin from '../../Styles/LoginStyle';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { SesionGlobalState } from '../../context/SesionGlobalState';

import { Icon } from '@rneui/themed';
import { TextDateGlobalState } from "../../context/DataGlobalState";
import { CalendarDateGlobalState } from '../../context/DataGlobalState';
import { RoutineDateGlobalState } from '../../context/DataGlobalState';
import { BackPageState } from '../../context/BackPageState';
import { GetAllDataFuntion } from '../../context/GetAllData';

import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import axios from 'axios';
import { useEffect } from 'react';
import { EXPO_PUBLIC_API_URL } from "@env"



export default function ComponetLogin({ Redirect, goRegister }) {
    const [btnDisabled, setbtnDisabled] = useState(false)
    const { BackPage, setBackPage } = useContext(BackPageState)
    const { session, setsession } = React.useContext(SesionGlobalState);
    const [ErrorUserMsg, setErrorUserMsg] = useState('')
    const [ErrorPasswordMsg, setErrorPasswordMsg] = useState('')
    const [username, setusername] = useState('')
    const { routineData, SetRoutineData } = useContext(RoutineDateGlobalState);
    const { CalendarData, SetCalendarData } = useContext(CalendarDateGlobalState);
    const { TextData, SetTextData } = useContext(TextDateGlobalState);
    const [GeneralErrorMsg, setGeneralErrorMsg] = useState('')
    const [secureState, setsecureState] = useState(true)
    const [icon, setIcon] = useState('visibility-off')
    const [User, onChangeUser] = useState('');
    const [Password, onChangePassword] = useState('');
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    const ChangeVisibility = () => {
        if (secureState === true) {
            setsecureState(false)
            setIcon('visibility')
        }
        if (secureState === false) {
            setsecureState(true)
            setIcon('visibility-off')
        }
    }

    const FormCheck = () => {
        let fail = false
        if (User === '') {
            setErrorUserMsg('Por favor ingrese su usuario')
            setTimeout(() => {
                setErrorUserMsg('')
            }, 3500);
            fail = true
        }
        if (Password === '') {
            setErrorPasswordMsg('Por favor ingrese su contraseña')
            setTimeout(() => {
                setErrorPasswordMsg('')
            }, 3500);
            fail = true
        }
        if (fail === true) {
            return false

        }
        return true
    }


    const PasswordForgot = () => {
        setStatePasswordForgot(false)
    }

    const LoginFuntion = async () => {
        setbtnDisabled(true)

        if (FormCheck() === true) {
            const response = await axios.post(`https://api.mindfulmind.com.ar/login/login`, { user: User, password: Password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.data.authentication === true) {
                const data = JSON.stringify(response.data)
                if (response.data.tutorial === 0) {
                    await SecureStore.setItemAsync('userToken', data)
                    const respuesta = (await GetAllDataFuntion())
                    SetCalendarData(respuesta.CalendarData)
                    SetRoutineData(respuesta.TasksData)
                    SetTextData(respuesta.TextData)
                    Redirect('TutorialForNewUser')
                } else {
                    await SecureStore.setItemAsync('userToken', data)
                    const respuesta = (await GetAllDataFuntion())
                    SetCalendarData(respuesta.CalendarData)
                    SetRoutineData(respuesta.TasksData)
                    SetTextData(respuesta.TextData)
                    setsession(true)
                }

            } else if (response.data.authentication === false) {
                setGeneralErrorMsg(response.data.errMsg)
                setTimeout(() => {
                    setGeneralErrorMsg('')
                }, 3500);
            }
        }
        setbtnDisabled(false)

    }



    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <View style={stylesLogin.ConteinerInputs}>
                <TextInput style={[stylesLogin.input, { fontFamily: 'Lato_400Regular' }]}
                    maxFontSizeMultiplier={1.5}
                    onChangeText={onChangeUser}
                    placeholder="Usuario"
                    keyboardType="default"
                    placeholderTextColor="rgba(245, 240, 240, 0.75)"
                />
                <View style={stylesLogin.conteinerInputError}>
                    <Text maxFontSizeMultiplier={1.25} style={stylesLogin.textInputError}>{ErrorUserMsg}</Text>
                </View>
                <View style={[stylesLogin.conteinerInputPassword, { fontFamily: 'Lato_700Bold' }]}>
                    <TextInput style={[stylesLogin.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                        maxFontSizeMultiplier={1.5}
                        onChangeText={onChangePassword}
                        placeholder="Contraseña"
                        keyboardType="default"
                        placeholderTextColor="rgba(245, 240, 240, 0.75)"
                        secureTextEntry={secureState}
                    />
                    <View style={stylesLogin.ChangeVisibility}>
                        <TouchableWithoutFeedback onPress={ChangeVisibility}>
                            <Icon
                                name={icon}
                                color={'#fff'} />
                        </TouchableWithoutFeedback>
                    </View>

                </View>
                <View style={stylesLogin.conteinerInputError}>
                    <Text maxFontSizeMultiplier={1.2} style={stylesLogin.textInputError}>{ErrorPasswordMsg}</Text>
                </View>
                <TouchableOpacity onPress={() => { Redirect('ForgetPassword'); setBackPage('SignIn') }}>
                    <Text maxFontSizeMultiplier={1.5} style={[stylesLogin.TextForgotPassword, { fontFamily: 'Lato_700Bold' }]}>
                        ¿Olvidaste tu Contraseña?
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('ForgetUser'); setBackPage('SignIn') }}>
                    <Text maxFontSizeMultiplier={1.5} style={[stylesLogin.TextForgotPassword, { fontFamily: 'Lato_700Bold' }]}>
                        ¿Olvidaste tu usuario?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { goRegister() }}>
                    <Text maxFontSizeMultiplier={1.5} style={[stylesLogin.TextForgotPassword, { fontFamily: 'Lato_700Bold' }]}>
                        Crear una cuenta
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={btnDisabled} onPress={LoginFuntion} style={stylesLogin.ButtonSend}>
                    <Text maxFontSizeMultiplier={1.5} style={[stylesLogin.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                        Enviar
                    </Text>
                </TouchableOpacity>
                <View style={stylesLogin.conteinerGeneralError}>
                    <Text maxFontSizeMultiplier={1.5} style={[stylesLogin.TextGeneralError, { fontFamily: 'Lato_700Bold' }]}>
                        {GeneralErrorMsg}
                    </Text>
                </View>
            </View>
        )
    }

}