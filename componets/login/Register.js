import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import stylesLogin from '../../Styles/LoginStyle';
import Main from '../../sreens/Main';

import {
    useFonts,
    Nunito_400Regular,
    Lato_400Regular,
    Lato_700Bold,
    Inter_900Black,
} from '@expo-google-fonts/dev';

import { Icon } from '@rneui/themed';
import axios from 'axios';


export default function ComponetRegister({ Redirect, goLogin }) {
    const [secureState1, setsecureState1] = useState(true)
    const [secureState2, setsecureState2] = useState(true)
    const [icon1, setIcon1] = useState('visibility-off')
    const [icon2, setIcon2] = useState('visibility-off')

    const [User, onChangeUser] = useState('');
    const [Email, onChangeEmail] = useState('');
    const [Password, onChangePassword] = useState('');
    const [ConfirmPassword, onChangeConfirmPassword] = useState('');


    const [emailError, setemailError] = useState('')
    const [UserError, setUserError] = useState('')
    const [PasswordError, setPasswordError] = useState('')
    const [ConfirmPasswordError, setConfirmPasswordError] = useState('')


    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const ChangeVisibility1 = () => {
        if (secureState1 === true) {
            setsecureState1(false)
            setIcon1('visibility')
        }
        if (secureState1 === false) {
            setsecureState1(true)
            setIcon1('visibility-off')
        }
    }
    const ChangeVisibility2 = () => {
        if (secureState2 === true) {
            setsecureState2(false)
            setIcon2('visibility')
        }
        if (secureState2 === false) {
            setsecureState2(true)
            setIcon2('visibility-off')
        }
    }

    const checkEmptyForm = () => {
        if (Email === '') {
            setemailError('Ingrese su email por favor')
            setTimeout(() => {
                setemailError('')
            }, 4000);
        }
        if (User === '') {
            setUserError('Ingrese un usuario por favor')
            setTimeout(() => {
                setUserError('')
            }, 4000);
        }

        if (Password === '') {
            setPasswordError('Ingrese su contraseña por favor')
            setTimeout(() => {
                setPasswordError('')
            }, 4000);
        }
        if (ConfirmPassword === '') {
            setConfirmPasswordError('Confirme su contraseña por favor')
            setTimeout(() => {
                setConfirmPasswordError('')
            }, 4000);
        }
    }

    const sendRegister = async () => {

        checkEmptyForm()

        if (Password != '' && ConfirmPassword != '' && Email != '' && User != '') {

            if (Password == ConfirmPassword) {
                let obj = JSON.stringify({
                    user: User,
                    password: Password,
                    email: Email
                })
                const data = await axios.post('http://31.220.17.121:3500/register', { obj }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (data.data.userCreate === false) {
                    if (data.data.error.email === true) {
                        setemailError('Email ya registrado')
                        setTimeout(() => {
                            setemailError('')
                        }, 4000);
                    }
                    if (data.data.error.user === true) {
                        setUserError('Usuario ya registrado eligi otro por favor')
                        setTimeout(() => {
                            setUserError('')
                        }, 4000);
                    }
                }
            } else {
                setPasswordError('Las Contraseñas no coinciden')
                setConfirmPasswordError('Las Contraseñas no coinciden')

                setTimeout(() => {
                    setPasswordError('')
                    setConfirmPasswordError('')

                }, 3500);

            }


        }
    }


    if (!fontsLoaded) {
        return <Main />;
    } else {
        return (
            <ScrollView>
                <View style={[stylesLogin.ConteinerInputs, { marginTop: 0 }]}>
                    <TextInput style={[stylesLogin.input, { fontFamily: 'Lato_400Regular' }]}
                        onChangeText={onChangeEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                        placeholderTextColor="rgba(245, 240, 240, 0.75)"
                    />
                    <View style={stylesLogin.conteinerInputError}>
                        <Text style={stylesLogin.textInputError}>{emailError}</Text>
                    </View>
                    <TextInput style={[stylesLogin.input, { fontFamily: 'Lato_400Regular' }]}
                        onChangeText={onChangeUser}
                        placeholder="Usuario"
                        keyboardType="default"
                        placeholderTextColor="rgba(245, 240, 240, 0.75)"
                    />
                    <View style={stylesLogin.conteinerInputError}>
                        <Text style={stylesLogin.textInputError}>{UserError}</Text>
                    </View>
                    <View style={stylesLogin.conteinerInputPassword}>
                        <TextInput style={[stylesLogin.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                            onChangeText={onChangePassword}
                            placeholder="Contraseña"
                            keyboardType="default"
                            placeholderTextColor="rgba(245, 240, 240, 0.75)"
                            secureTextEntry={secureState1}
                        />

                        <View style={stylesLogin.ChangeVisibility}>
                            <TouchableWithoutFeedback onPress={ChangeVisibility1}>
                                <Icon
                                    name={icon1}
                                    color={'#fff'} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={stylesLogin.conteinerInputError}>
                        <Text style={stylesLogin.textInputError}>{PasswordError}</Text>
                    </View>

                    <View style={stylesLogin.conteinerInputPassword}>
                        <TextInput style={[stylesLogin.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                            onChangeText={onChangeConfirmPassword}
                            placeholder="Confirma Contraseña"
                            name='user'
                            keyboardType="default"
                            placeholderTextColor="rgba(245, 240, 240, 0.75)"
                            secureTextEntry={secureState2}
                        />
                        <View style={stylesLogin.ChangeVisibility}>
                            <TouchableWithoutFeedback onPress={ChangeVisibility2}>
                                <Icon
                                    name={icon2}
                                    color={'#fff'} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <View style={stylesLogin.conteinerInputError}>
                        <Text style={stylesLogin.textInputError}>{ConfirmPasswordError}</Text>
                    </View>

                    <TouchableOpacity onPress={() => { goLogin() }}>
                        <Text style={[stylesLogin.TextForgotPassword, { fontFamily: 'Lato_700Bold' }]}>
                            Ya tengo una cuenta
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { sendRegister() }} style={stylesLogin.ButtonSend}>
                        <Text style={[stylesLogin.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                            Enviar
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={stylesLogin.ConteinerScroll}></View>

            </ScrollView>

        )
    }

}

