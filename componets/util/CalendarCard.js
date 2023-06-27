
import { StyleSheet, Button, Text, TextInput, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { useState } from 'react';
import TaskCalendar from './TaskCalendar';


export default function CalendarCard({ setCalendarCardVisibility, dataForCalendarCard }) {
    const [loading, setloading] = useState(true)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    if (!fontsLoaded) {
        return <></>;
    } else {

        return (
            <View style={stylesHeader.Back}>
                <View style={stylesHeader.conteiner}></View>
                <View style={stylesHeader.card}>
                    <View style={stylesHeader.titleCardConteiner}>
                        <Text style={[stylesHeader.titleCard, { fontFamily: 'Lato_700Bold', fontSize: 24, }]}>{dataForCalendarCard.number}</Text>
                        <Text style={[stylesHeader.titleCard, {}]}>{dataForCalendarCard.diaSemana}</Text>
                    </View>
                    <View style={stylesHeader.LineaTitle}></View>
                    <View style={stylesHeader.MainContent}>

                        {
                            dataForCalendarCard.Tasks
                                ? (
                                    dataForCalendarCard.Tasks.map(Tasks => (
                                        <TaskCalendar
                                            key={Tasks.id}
                                            data={Tasks} />
                                    ))
                                )
                                : <Text>Goal</Text>
                        }
                    </View>
                    <View style={stylesHeader.AddBar}>
                        <></>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => { setCalendarCardVisibility(false) }} >
                    <View style={stylesHeader.CloserWidthMax} ></View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const stylesHeader = StyleSheet.create({
    AddBar: {
        width: '100%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    card: {
        position: 'absolute',
        zIndex: 10,
        width: '85%',
        height: '55%',
        borderRadius: 10,
        backgroundColor: 'rgba(30, 30, 30, 1)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    CloserWidthMax: {
        width: '100%',
        height: '100%',

    },

    ConteinerTitle: {
        width: '100%',
        height: '70%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ConteinerButtom: {
        backgroundColor: '#1E1E1E',

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


