import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../componets/Header';
import NavBar from '../componets/navBar';
import Routine from '../componets/Main/Routine';
import Caledar from '../componets/Main/Caledar';
import { SesionGlobalState } from '../context/SesionGlobalState';
import TextComponent from '../componets/Main/TextComponent';
import AlterTaskNotification from '../componets/util/AlterTaskNotification';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading';


export default function Main({ navigation }) {
    const { session, setsession } = useContext(SesionGlobalState);
    const [notificationVisibility, setNotificationVisibility] = useState(false)
    const [dataForNotification, setdateForNotification] = useState('')
    const [loading, setloading] = useState(true)

    const [routineData, SetRoutineData] = useState([])
    const [CalendarData, SetCalendarData] = useState([])
    const [TextData, SetTextData] = useState([])

    const Redirect = (url) => {
        navigation.navigate(url)
    }

    useEffect(() => {
        const getAllData = async () => {
            let user = JSON.parse(await SecureStore.getItemAsync('userToken'))
            const response = await axios.post('http://31.220.17.121:3500/mainDataInitial', {
                "obj": {
                    "Calendar": {
                        "user": user.user,
                        "idCalendar": "Calendario Principal"
                    },
                    "Tasks": {
                        "user": user.user
                    },
                    "Text": {
                        "user": user.user
                    }
                }
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            SetCalendarData(response.data.CalendarData)
            SetRoutineData(response.data.TasksData)
            SetTextData(response.data.TextData)
            setloading(false)
        }
        getAllData()
    }, [])
    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <View style={styles.container}>
                <Header />
                <ScrollView style={styles.Width100}>

                    <View style={styles.bigblock}>
                        <Routine Redirect={Redirect}
                            setNotificationVisibility={setNotificationVisibility}
                            setdateForNotification={setdateForNotification}
                            routineData={routineData}
                        />

                        {/* <Caledar />
    
                        <TextComponent /> */}


                    </View>

                </ScrollView>
                <NavBar Redirect={Redirect}
                    home={true}
                    routine={false}
                    calendar={false}
                    text={false}
                    settings={false}
                />

                {
                    notificationVisibility
                        ? <AlterTaskNotification
                            dataForNotification={dataForNotification}
                            setNotificationVisibility={setNotificationVisibility}
                        />
                        : <></>
                }


            </View>
        );
    }

}







const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    bigblock: {
        width: '100%',
        height: 'auto',
        alignItems: 'center',

    },
    Width100: {
        width: '100%',
    },
    exitButton: {
        margin: 3,
        width: '85%',
        height: 100,
        backgroundColor: '#1E1E1E',
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
