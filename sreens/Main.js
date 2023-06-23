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
import styleNavBar from '../Styles/NavBarStyle';
import CalendarCard from '../componets/util/CalendarCard';


export default function Main({ navigation }) {
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
                            <ScrollView style={styles.Width100}>

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
                                        dataForCalendarCard={dataForCalendarCard} />
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
