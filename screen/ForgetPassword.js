import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Alert } from 'react-native';
import Header from '../componets/Header';
import { useContext, useState, useEffect } from 'react';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import axios from 'axios';
export default function ForgetPassword({ navigation }) {
    const [Email, setEmail] = useState('')
    const [authEmail, setauthEmail] = useState(false)
    const [authCod, setauthCod] = useState(false)
    const [msgGeneral, setmsgGeneral] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [ConfirmNewPassword, setConfirmNewPassword] = useState('')
    const [Cod, setCod] = useState('')
    const [errorMsg, seterrorMsg] = useState('')
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const Redirect = (url) => {
        navigation.navigate(url)
    }

    const sendEmail = async () => {

        if (Email !== '') {
            const respose = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/ForgetPassword/Authcod/forgetpassword`, {
                "data": {
                    "user": Email,
                    "email": Email
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (respose.data.error) {
                seterrorMsg(respose.data.error)
                setTimeout(() => {
                    seterrorMsg('')
                }, 3500);
            } else {
                setCod(respose.data.code)
                setauthEmail(true)
            }
        } else {
            seterrorMsg('Complete su email')
            setTimeout(() => {
                seterrorMsg('')
            }, 3500);
        }

    }
    const CheckAuthCode = async () => {
        const respose = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/ForgetPassword/checkAuthcode`, {
            "data": {
                "token": Cod,
                "email": Email
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (respose.data.Authcode) {
            setauthCod(true)
        } else {
            seterrorMsg('Codigo incorrecto')
            setTimeout(() => {
                seterrorMsg('')
            }, 3500);

        }


    }
    const changePassword = async () => {
        if (newPassword === ConfirmNewPassword) {
            const respose = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/ForgetPassword/ChangePassword`, {
                "data": {
                    "token": Cod,
                    "email": Email,
                    "password": newPassword
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(respose.data)
            if (respose.data.error) {
                seterrorMsg(respose.data.msg)

            } else {
                setmsgGeneral(true)
            }
        } else {
            console.log('hola')
            seterrorMsg('Las contraseñas no coinciden')
        }
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


    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                <Header back={true} Redirect={Redirect} />
                {
                    authEmail
                        ? (
                            authCod
                                ? (
                                    msgGeneral
                                        ?
                                        <View style={[style.conteinerMain, , { display: 'flex', justifyContent: 'center', alignItems: 'center' }]}>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFF', fontFamily: 'Lato_700Bold', fontSize: 20, textAlign: 'center' }}>Felicitaciones, tu contraseña fue cambiada</Text>
                                            <TouchableOpacity onPress={() => { Redirect('SignIn') }} style={[style.ButtonSend, { height: 55, marginBottom: 50 }]}>
                                                <Text maxFontSizeMultiplier={1.5} style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold', textAlign: 'center' }]}>
                                                    Volver al login
                                                </Text>
                                            </TouchableOpacity>
                                        </View>

                                        : <View style={style.conteinerMain}>
                                            <Text maxFontSizeMultiplier={1.5} style={style.Title}>Ingrese su nueva contraseña</Text>
                                            <View style={style.ConteinerInput}>
                                                <TextInput maxFontSizeMultiplier={1.5} style={[style.inputPassword,]}
                                                    onChangeText={setNewPassword}
                                                    placeholder="Nueva contraseña"
                                                    keyboardType="default"
                                                    placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                                />
                                                <TextInput maxFontSizeMultiplier={1.5} style={[style.inputPassword,]}
                                                    onChangeText={setConfirmNewPassword}
                                                    placeholder="Confirme su contraseña"
                                                    keyboardType="default"
                                                    placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                                />
                                                <View style={style.conteinerTextError}>
                                                    <Text maxFontSizeMultiplier={1.5} style={style.TextError}>{errorMsg}</Text>
                                                </View>
                                                <TouchableOpacity onPress={() => { changePassword() }} style={style.ButtonSend}>
                                                    <Text maxFontSizeMultiplier={1.5} style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                                                        Enviar
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                )
                                : <View style={style.conteinerMain}>
                                    <Text maxFontSizeMultiplier={1.5} style={style.Title}>Ingrese el codigo que fue enviando a tu Email</Text>
                                    <View style={style.ConteinerInput}>
                                        <TextInput maxFontSizeMultiplier={1.5} style={[style.inputPassword,]}
                                            onChangeText={setCod}
                                            placeholder="Codigo de autenticacion"
                                            keyboardType="default"
                                            placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                        />
                                        <View style={style.conteinerTextError}>
                                            <Text maxFontSizeMultiplier={1.5} style={style.TextError}>{errorMsg}</Text>
                                        </View>
                                        <TouchableOpacity maxFontSizeMultiplier={1.5} onPress={() => { CheckAuthCode() }} style={style.ButtonSend}>
                                            <Text style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                                                Enviar
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                        )
                        : <View style={style.conteinerMain}>
                            <Text maxFontSizeMultiplier={1.5} style={style.Title}>Ingrese su Email para recuperar tu cuenta</Text>
                            <View style={style.ConteinerInput}>
                                <TextInput maxFontSizeMultiplier={1.5} style={[style.inputPassword,]}
                                    onChangeText={setEmail}
                                    placeholder="Email"
                                    keyboardType="default"
                                    placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                />
                                <View style={style.conteinerTextError}>

                                    <Text maxFontSizeMultiplier={1.5} style={style.TextError}>{errorMsg}</Text>

                                </View>
                                <TouchableOpacity onPress={() => { sendEmail() }} style={style.ButtonSend}>
                                    <Text maxFontSizeMultiplier={1.5} style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                                        Enviar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                }


            </>
        )
    }

}

const style = StyleSheet.create({
    conteinerTextError: {
        width: '50%',
        height: 35,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextError: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Lato_700Bold',

    },
    Title: {
        color: '#FFFFFF',
        width: '85%',
        textAlign: 'center',
        fontSize: 18,
        marginTop: '35%',
        fontFamily: 'Lato_700Bold'
    },
    conteinerMain: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    ConteinerInput: {
        marginTop: '20%',
        width: '85%',
        height: 135,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputPassword: {
        width: '100%',
        height: '50%',
        fontSize: 18,
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F5F0F0',
        color: '#F5F0F0',
        fontFamily: 'Lato_400Regular'

    },
    ButtonSend: {
        marginTop: 20,
        width: '35%',
        height: '35%',
        borderWidth: 1.5,
        borderColor: '#F5F0F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextButtonSend: {
        color: '#F5F0F0',
        fontSize: 14,
    },
})

