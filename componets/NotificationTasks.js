import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';


export default function NotificationTasks({ setvisibilityNotification, DataForDelete, CancelOrden, Title }) {
    const [LoadingState, setLoadingState] = useState(false)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const [user, setuser] = useState('')

    const deleteTasks = () => {

    }


    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                {
                    LoadingState
                        ? (<View style={stylesHeader.Back}>
                        </View >)
                        : (<View style={stylesHeader.Back}>
                            <View style={stylesHeader.Notification}>
                                <View style={stylesHeader.ConteinerTitle}>
                                    <Text style={{
                                        color: '#fff',
                                        fontFamily: 'Lato_700Bold',
                                        fontSize: 18,
                                        marginBottom: 5
                                    }}>Espera</Text>
                                    <Text style={{
                                        color: '#fff',
                                        fontFamily: 'Lato_400Regular',
                                        fontSize: 16,
                                    }}>{Title}</Text>
                                </View>
                                <View style={stylesHeader.ConteinerButtom}>
                                    <TouchableOpacity onPress={() => { setvisibilityNotification(false) }} style={stylesHeader.ButtomLeft}>
                                        <Text style={stylesHeader.TextButtom}>No</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { Title === '¿Seguro quieres eliminar esta tarea?' ? deleteTasks() : CancelOrden() }} style={stylesHeader.ButtomRight}>
                                        <Text style={stylesHeader.TextButtom}>Si</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>)

                }
            </>

        )
    }



}


const stylesHeader = StyleSheet.create({
    Back: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Notification: {
        width: '65%',
        height: '20%',
        borderRadius: 10,
        backgroundColor: '#1E1E1E',

    },
    ConteinerTitle: {
        width: '100%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ConteinerButtom: {
        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'row'
    },
    ButtomLeft: {
        width: '50%',
        height: '100%',
        borderRightColor: '#747272',
        borderRightWidth: 1,
        borderTopColor: '#747272',
        borderTopWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtomRight: {
        width: '50%',
        height: '100%',
        borderLeftColor: '#747272',
        borderLeftWidth: 1,
        borderTopColor: '#747272',
        borderTopWidth: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TextButtom: {
        color: '#fff',
        fontFamily: 'Lato_400Regular',
        fontSize: 16,
    }


});