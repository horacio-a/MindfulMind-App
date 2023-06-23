import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useContext, useState } from 'react';
import stylesLogin from '../../Styles/LoginStyle';
import Main from '../../sreens/Main';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { SesionGlobalState } from '../../context/SesionGlobalState';

import { Icon } from '@rneui/themed';
import { TextDateGlobalState } from "../../context/DataGlobalState";
import { CalendarDateGlobalState } from '../../context/DataGlobalState';
import { RoutineDateGlobalState } from '../../context/DataGlobalState';



import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import axios from 'axios';



export default function ComponetLogin({ Redirect, goRegister }) {
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

    const LoginFuntion = async () => {
        if (FormCheck() === true) {
            const response = await axios.post('http://31.220.17.121:3500/login', { user: User, password: Password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.authentication === true) {
                const data = JSON.stringify(response.data)
                await SecureStore.setItemAsync('userToken', data)
                const getAllData = async () => {
                    const respuesta = await axios.post('http://31.220.17.121:3500/mainDataInitial', {
                        "obj": {
                            "Calendar": {
                                "user": response.data.user,
                                "idCalendar": "Calendario Principal"
                            },
                            "Tasks": {
                                "user": response.data.user
                            },
                            "Text": {
                                "user": response.data.user
                            }
                        }
                    }, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    SetCalendarData(respuesta.data.CalendarData)
                    SetRoutineData(respuesta.data.TasksData)
                    SetTextData(respuesta.data.TextData)
                    console.log(respuesta.data.TextData)


                }
                getAllData()
                setsession(true)
            } else if (response.data.authentication === false) {
                setGeneralErrorMsg('No encontramos un usuario con esas credenciales')
                setTimeout(() => {
                    setGeneralErrorMsg('')
                }, 3500);
            }
        }



    }

    if (!fontsLoaded) {
        return <Main />;
    } else {
        return (
            <View style={stylesLogin.ConteinerInputs}>
                <TextInput style={[stylesLogin.input, { fontFamily: 'Lato_400Regular' }]}
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
                <TouchableOpacity>
                    <Text style={[stylesLogin.TextForgotPassword, { fontFamily: 'Lato_700Bold' }]}>
                        ¿Olvidaste tu Contraseña?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { goRegister() }}>
                    <Text style={[stylesLogin.TextForgotPassword, { fontFamily: 'Lato_700Bold' }]}>
                        Crear una cuenta
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={LoginFuntion} style={stylesLogin.ButtonSend}>
                    <Text style={[stylesLogin.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
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