import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import Header from '../componets/Header';
import NavBar from '../componets/navBar';
import Routine from '../componets/Main/Routine';
import Caledar from '../componets/Main/Caledar';
import { SesionGlobalState } from '../context/SesionGlobalState';
import TextComponent from '../componets/Main/TextComponent';
import AlterTaskNotification from '../componets/util/AlterTaskNotification';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Loading from './Loading';
import styleNavBar from '../Styles/NavBarStyle';
import CalendarCard from '../componets/util/CalendarCard';
import { RoutineDateGlobalState, CalendarDateGlobalState, TextDateGlobalState } from '../context/DataGlobalState';
import { BackPageState } from '../context/BackPageState';


export default function Main({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const { CalendarData, SetCalendarData } = useContext(CalendarDateGlobalState);
    const { routineData, SetRoutineData } = useContext(RoutineDateGlobalState);
    const { TextData, SetTextData } = useContext(TextDateGlobalState);
    const { BackPage, setBackPage } = useContext(BackPageState)


    const onRefresh = useCallback(() => {
        setRefreshing(true);
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
            console.log(response.data)
            SetCalendarData(response.data.CalendarData)
            SetRoutineData(response.data.TasksData)
            SetTextData(response.data.TextData)
            setRefreshing(false);
        }
        getAllData()

    }, []);



    const [user, setuser] = useState('')
    const { session, setsession } = useContext(SesionGlobalState);
    const [notificationVisibility, setNotificationVisibility] = useState(false)
    const [CalendarCardVisibility, setCalendarCardVisibility] = useState(false)
    const [dataForCalendarCard, setdateForCalendarCard] = useState('')

    const [dataForNotification, setdateForNotification] = useState('')
    const [loading, setloading] = useState(true)

    const Redirect = (url) => {
        navigation.navigate(url)
    }
    useEffect(() => {
        async function getuser() {
            if (session) {
                setuser(JSON.parse(await SecureStore.getItemAsync('userToken')))
                setTimeout(() => {
                    setloading(false)
                }, 1000);
            }

        }
        getuser()
    }, [])

    useEffect(() => {
        setBackPage('Home')
    }, [])

    const SendAlter = (task) => {
        setdateForNotification(task)
        setNotificationVisibility(true)
    }


    return (
        <>
            {
                loading
                    ? <Loading />
                    : (
                        <View style={styles.container}>
                            <Header />
                            <ScrollView style={styles.Width100}
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }>

                                <View style={styles.bigblock}>
                                    <Routine
                                        Redirect={Redirect}
                                        SendAlter={SendAlter}
                                    />

                                    <Caledar setCalendarCardVisibility={setCalendarCardVisibility}
                                        setdateForCalendarCard={setdateForCalendarCard}
                                    />

                                    <TextComponent />

                                    <View style={styleNavBar.navBar}></View>
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
                                CalendarCardVisibility
                                    ? <CalendarCard
                                        setCalendarCardVisibility={setCalendarCardVisibility}
                                        dataForCalendarCard={dataForCalendarCard}
                                        Redirect={Redirect} />

                                    : <></>
                            }
                            {
                                notificationVisibility
                                    ? <AlterTaskNotification
                                        dataForNotification={dataForNotification}
                                        setNotificationVisibility={setNotificationVisibility}

                                    />
                                    : <></>
                            }


                        </View>
                    )
            }
        </>

    );


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
