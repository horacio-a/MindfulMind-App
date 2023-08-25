import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, BackHandler, Alert } from 'react-native';
import Header from '../componets/Header';
import { useContext, useState, useEffect } from 'react';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import axios from 'axios';



export default function ForgetUser({ navigation }) {
    const [btnDisabled, setbtnDisabled] = useState(false)
    const [Email, setEmail] = useState('')
    const [authEmail, setauthEmail] = useState(false)
    const [errorMsg, seterrorMsg] = useState('')
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const Redirect = (url) => {
        navigation.navigate(url)
    }

    const sendEmail = async () => {
        setbtnDisabled(true)
        if (Email !== '') {
            const respose = await axios.post(`https://api.mindfulmind.com.ar/ForgetPassword/forgetUser`, {
                "user": Email,
                "email": Email
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
                setauthEmail(true)
            }
        } else {
            seterrorMsg('Complete su email')
            setTimeout(() => {
                seterrorMsg('')
            }, 3500);
        }
        setbtnDisabled(false)

    }
    useEffect(() => {
        const backAction = () => {
            Redirect('SignIn')
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
                        ? <View style={[style.conteinerMain, , { display: 'flex', justifyContent: 'center', alignItems: 'center' }]}>
                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFF', fontFamily: 'Lato_700Bold', fontSize: 20, textAlign: 'center' }}>Su usuario ya fue enviado al email de la cuenta</Text>
                            <TouchableOpacity onPress={() => { Redirect('SignIn') }} style={[style.ButtonSend, { height: 55, marginBottom: 50 }]}>
                                <Text maxFontSizeMultiplier={1.5} style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold', textAlign: 'center' }]}>
                                    Volver al login
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : <View style={style.conteinerMain}>
                            <Text maxFontSizeMultiplier={1.5} style={style.Title}>Ingrese su Email para recuperar tu usuario</Text>
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
                                <TouchableOpacity disabled={btnDisabled} onPress={() => { sendEmail() }} style={style.ButtonSend}>
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

