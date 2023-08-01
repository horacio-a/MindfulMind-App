import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, RefreshControl } from 'react-native';
import Header from '../../componets/Header';
import NavBar from '../../componets/navBar';
import Routine from '../../componets/Main/Routine';
import Caledar from '../../componets/Main/Caledar';
import { SesionGlobalState } from '../../context/SesionGlobalState';
import TextComponent from '../../componets/Main/TextComponent';
import AlterTaskNotification from '../../componets/util/AlterTaskNotification';
import * as SecureStore from 'expo-secure-store';
import { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Loading from '../Loading';
import styleNavBar from '../../Styles/NavBarStyle';
import CalendarCard from '../../componets/util/CalendarCard';
import { RoutineDateGlobalState, CalendarDateGlobalState, TextDateGlobalState } from '../../context/DataGlobalState';
import { BackPageState } from '../../context/BackPageState';
import { GetAllDataFuntion } from '../../context/GetAllData';
import { Icon } from '@rneui/themed';
import styleTextComp from '../../Styles/TextComStyle';

export default function Main({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const { CalendarData, SetCalendarData } = useContext(CalendarDateGlobalState);
    const { routineData, SetRoutineData } = useContext(RoutineDateGlobalState);
    const { TextData, SetTextData } = useContext(TextDateGlobalState);
    const { BackPage, setBackPage } = useContext(BackPageState)


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const response = (await GetAllDataFuntion())
        SetRoutineData(response.TasksData)
        SetCalendarData(response.CalendarData)
        SetTextData(response.TextData)

        setRefreshing(false);
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
                                nestedScrollEnabled={true}
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


                                    <TextComponent Redirect={Redirect} />

                                    <View style={{ width: '85%', marginTop: 50, marginBottom: 10 }}>
                                        <TouchableOpacity onPress={() => Redirect('SettingScreen')} style={styleTextComp.addnewText}>
                                            <Icon
                                                name='settings'
                                                type="AntDesign"
                                                color='#fff'
                                            />
                                            <Text style={styleTextComp.textAddNewText}>Configuraciones</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>

                            </ScrollView>
                            {/* <NavBar Redirect={Redirect}
                                home={true}
                                routine={false}
                                calendar={false}
                                text={false}
                                settings={false}
                            /> */}


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
