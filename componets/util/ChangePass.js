
import { StyleSheet, Image, Text, TextInput, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { useContext, useEffect, useState } from 'react';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export default function ChangePass({ setChangePassContent, ChangeProfilePicture, Redirect }) {
    const [MsgError, setMsgError] = useState('')

    const [secureState, setsecureState] = useState(true)
    const [secureState1, setsecureState1] = useState(true)
    const [secureState2, setsecureState2] = useState(true)

    const [icon, setIcon] = useState('visibility-off')
    const [icon1, setIcon1] = useState('visibility-off')
    const [icon2, setIcon2] = useState('visibility-off')

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



    const [Password, onChangePassword] = useState('')
    const [NewPassword, onChangeNewPassword] = useState('')
    const [NewPassword2, onChangeNewPassword2] = useState('')

    const [loading, setloading] = useState(true)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    const changePassword = async () => {
        if (NewPassword !== NewPassword2) {
            setMsgError('La nueva contraseña no coincide')
            setTimeout(() => {
                setMsgError('')
            }, 3500);
        } else {
            const user = JSON.parse(await SecureStore.getItemAsync('userToken'))
            const data = {
                oldpassword: Password,
                newpassword: NewPassword,
                email: user.email,
                user: user.user
            }
            const respose = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/UserSetting/changePasswordWithPass`, { data }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (respose.data.err === false) {
                setChangePassContent(false)
            } else if (respose.data.err === true) {
                setMsgError(respose.data.errMsg)
                setTimeout(() => {
                    setMsgError('')
                }, 3500);
            }
        }
    }

    if (!fontsLoaded) {
        return <></>;
    } else {

        return (
            <View style={style.Back}>
                <View style={style.conteiner}></View>
                <View style={style.card}>
                    <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFFFFF', textAlign: 'center', fontFamily: 'Lato_700Bold', marginVertical: 20, fontSize: 20 }}>Cambia tu contraseña</Text>

                    <ScrollView>
                        <View style={{ width: '100%', height: 500, alignItems: 'center', paddingTop: 25 }}>

                            <View style={[style.conteinerInputPassword, { fontFamily: 'Lato_700Bold' }]}>
                                <TextInput style={[style.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                                    maxFontSizeMultiplier={1.5}
                                    onChangeText={onChangePassword}
                                    placeholder="Tu contraseña actual"
                                    keyboardType="default"
                                    placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                    secureTextEntry={secureState}
                                />
                                <View style={style.ChangeVisibility}>
                                    <TouchableWithoutFeedback onPress={ChangeVisibility}>
                                        <Icon
                                            name={icon}
                                            color={'#fff'} />
                                    </TouchableWithoutFeedback>
                                </View>

                            </View>

                            <View style={[style.conteinerInputPassword, { fontFamily: 'Lato_700Bold' }]}>
                                <TextInput style={[style.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                                    maxFontSizeMultiplier={1.25}
                                    onChangeText={onChangeNewPassword}
                                    placeholder="Tu nueva contraseña"
                                    keyboardType="default"
                                    placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                    secureTextEntry={secureState1}
                                />
                                <View style={style.ChangeVisibility}>
                                    <TouchableWithoutFeedback onPress={ChangeVisibility1}>
                                        <Icon
                                            name={icon1}
                                            color={'#fff'} />
                                    </TouchableWithoutFeedback>
                                </View>

                            </View>
                            <View style={[style.conteinerInputPassword, { fontFamily: 'Lato_700Bold' }]}>
                                <TextInput style={[style.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                                    maxFontSizeMultiplier={1.5}
                                    onChangeText={onChangeNewPassword2}
                                    placeholder="Confirma tu nueva contraseña"
                                    keyboardType="default"
                                    placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                    secureTextEntry={secureState2}
                                />
                                <View style={style.ChangeVisibility}>
                                    <TouchableWithoutFeedback onPress={ChangeVisibility2}>
                                        <Icon
                                            name={icon2}
                                            color={'#fff'} />
                                    </TouchableWithoutFeedback>
                                </View>


                            </View>

                            <View style={{ width: '100%', height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontFamily: 'Lato_700Bold', fontSize: 16 }}>
                                    {MsgError}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => { changePassword() }} style={style.ButtonSend}>
                                <Text maxFontSizeMultiplier={1.5} style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                                    Enviar
                                </Text>
                            </TouchableOpacity>

                        </View>

                        <View></View>

                    </ScrollView>

                </View>
                <TouchableWithoutFeedback onPress={() => { setChangePassContent(false) }} >
                    <View style={style.CloserWidthMax} ></View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const style = StyleSheet.create({
    textAddNewText: {
        marginLeft: 5,
        color: '#fff',
        fontFamily: 'Lato_400Regular',
        fontSize: 13,

    },
    ButtomAdd: {
        backgroundColor: 'rgba(30, 30, 30, 1)',

        width: '85%',
        height: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        marginBottom: '5%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddBar: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    singleTask: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        marginTop: 5
    },
    MainContent: {
        width: '85%',
        height: '70%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',

    },
    titleCard: {
        fontFamily: 'Lato_400Regular',
        color: '#FFFFFF',
        fontSize: 22,
        marginLeft: 5,
        textTransform: 'capitalize'
    },
    LineaTitle: {
        width: '85%',
        height: 1,
        backgroundColor: '#fff',
    },
    titleCardConteiner: {
        width: '85%',
        height: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    Back: {
        width: '100%',
        height: 900,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        justifyContent: 'center', alignItems: 'center',

        zIndex: 0,
    },
    card: {
        position: 'absolute',
        zIndex: 10,
        width: '85%',
        height: 500,
        borderRadius: 10,
        backgroundColor: 'rgba(30, 30, 30, 1)',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    CloserWidthMax: {
        width: '100%',
        height: '100%',
    },

    conteinerInputPassword: {
        width: '100%',
        height: '10%',
        marginBottom: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputPassword: {
        width: '70%',
        height: '100%',
        fontSize: 18,
        textAlign: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F5F0F0',
        color: '#F5F0F0',
        marginLeft: '10%'
    },
    ChangeVisibility: {
        width: '15%',
        height: '100%',
        color: '#F5F0F0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    ButtonSend: {
        marginTop: 20,
        width: '35%',
        height: '8.5%',
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
});


