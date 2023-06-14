import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import Loading from '../../sreens/Loading'
import axios from 'axios';


export default function AlterTaskNotification({ setNotificationVisibility, dataForNotification }) {
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    const AlterTask = async (task) => {
        setNotificationVisibility(false)
        console.log(task)
        const obj = JSON.stringify(task)
        const response = await axios.post('http://31.220.17.121:3500/completeTask', { obj }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response.data)
    }

    if (!fontsLoaded) {
        return <Loading />;
    } else {
        return (
            <View style={stylesHeader.Back}>
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
                        }}>¿Terminaste tu Tarea?</Text>
                    </View>
                    <View style={stylesHeader.ConteinerButtom}>
                        <TouchableOpacity onPress={() => { setNotificationVisibility(false) }} style={stylesHeader.ButtomLeft}>
                            <Text style={stylesHeader.TextButtom}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { AlterTask(dataForNotification) }} style={stylesHeader.ButtomRight}>
                            <Text style={stylesHeader.TextButtom}>Si</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
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