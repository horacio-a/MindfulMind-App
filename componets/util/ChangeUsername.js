
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

export default function ChangeUsername({ setChangeUsernameContent, setUser }) {
    const [successfulMsg, setsuccessfulMsg] = useState(false)
    const [MsgError, setMsgError] = useState('')

    const [secureState, setsecureState] = useState(true)


    const [icon, setIcon] = useState('visibility-off')


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





    const [Password, onChangePassword] = useState('')
    const [Username, onChangeUsername] = useState('')

    const [loading, setloading] = useState(true)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    const changeUsername = async () => {

        const user = JSON.parse(await SecureStore.getItemAsync('userToken'))
        const data = {
            password: Password,
            newUser: Username,
            email: user.email,
            user: user.user
        }
        const respose = await axios.post('http://31.220.17.121:3500/changeUsername', { data }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (respose.data.err === false) {
            setUser(Username)
            setsuccessfulMsg(true)
            user.user = Username
            await SecureStore.setItemAsync('userToken', JSON.stringify(user))

        } else if (respose.data.err === true) {
            setMsgError(respose.data.errMsg)
            setTimeout(() => {
                setMsgError('')
            }, 3500);
        }

    }

    if (!fontsLoaded) {
        return <></>;
    } else {

        return (
            <View style={style.Back}>
                <View style={style.conteiner}></View>
                {
                    successfulMsg
                        ? <View style={style.card}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{ color: '#FFF', fontFamily: 'Lato_700Bold', fontSize: 20 }}>Tu nombre de usuario ahora es {Username}</Text>
                                <TouchableOpacity onPress={() => { setChangeUsernameContent(false) }} style={[style.ButtonSend, { height: 55, marginBottom: 50, width: 100 }]}>
                                    <Text style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                                        Genial
                                    </Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                        : <View style={style.card}>
                            <Text style={{ color: '#FFFFFF', textAlign: 'center', fontFamily: 'Lato_700Bold', marginVertical: 50, fontSize: 20 }}>Cambia tu nombre de usuario</Text>

                            <View style={{ width: '100%', height: 500, alignItems: 'center', paddingTop: 100 }}>

                                <View style={[style.conteinerInputPassword, { fontFamily: 'Lato_700Bold' }]}>
                                    <TextInput style={[style.inputPassword, { fontFamily: 'Lato_400Regular' }]}
                                        onChangeText={onChangePassword}
                                        placeholder="Tu contraseña"
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
                                    <TextInput style={[style.inputPassword, { fontFamily: 'Lato_400Regular', marginLeft: 0 }]}
                                        onChangeText={onChangeUsername}
                                        placeholder="Tu nuevo nombre de usuario"
                                        keyboardType="default"
                                        placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                    />


                                </View>


                                <View style={{ width: '100%', height: 25, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#fff', fontFamily: 'Lato_700Bold', fontSize: 16 }}>
                                        {MsgError}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => { changeUsername() }} style={style.ButtonSend}>
                                    <Text style={[style.TextButtonSend, { fontFamily: 'Lato_700Bold' }]}>
                                        Enviar
                                    </Text>
                                </TouchableOpacity>

                            </View>


                        </View>
                }

                <TouchableWithoutFeedback onPress={() => { setChangeUsernameContent(false) }} >
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


