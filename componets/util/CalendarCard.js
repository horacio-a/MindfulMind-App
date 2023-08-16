
import { StyleSheet, Button, Text, TextInput, View, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import OutsidePressHandler from 'react-native-outside-press';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { useContext, useState } from 'react';
import TaskCalendar from './TaskCalendar';
import { Icon } from '@rneui/themed';
import { DayNewTasks } from '../../context/DayNewTasks';
import { CaledarCardSelect } from '../../context/CalendarCardSelect';
import { useEffect } from 'react';

export default function CalendarCard({ setCalendarCardVisibility, Redirect }) {
    const { DayTasks, setDayTasks } = useContext(DayNewTasks)
    const { dataForCalendarCard, setdateForCalendarCard } = useContext(CaledarCardSelect)
    const [data, setdata] = useState('')
    useEffect(() => {
        setdata(dataForCalendarCard)
    }, [dataForCalendarCard])

    const [loading, setloading] = useState(true)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    if (!fontsLoaded) {
        return <></>;
    } else {

        return (
            <View style={style.Back}>
                <View style={style.conteiner}></View>
                <View style={style.card}>
                    <View style={style.titleCardConteiner}>
                        <Text maxFontSizeMultiplier={1.5} style={[style.titleCard, { fontFamily: 'Lato_700Bold', fontSize: 24, }]}>{dataForCalendarCard.number}</Text>
                        <Text maxFontSizeMultiplier={1.5} style={[style.titleCard, {}]}>{data.diaSemana}</Text>
                    </View>
                    <View style={style.LineaTitle}></View>
                    <View style={style.MainContent}>
                        {
                            data.Tasks
                                ? (
                                    <FlatList
                                        style={{ width: '100%' }}
                                        data={data.Tasks}
                                        renderItem={({ item }) => <TaskCalendar data={item} Redirect={Redirect} />}
                                        key={item => item.id}
                                    />
                                )
                                : <View style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFFFFF', fontSize: 18 }}>Aun no tienes tareas </Text>
                                </View>

                        }
                    </View>
                    <View style={style.AddBar}>
                        <TouchableOpacity onPress={() => { Redirect('CreateCalendarTask'); setDayTasks(data.fecha); setCalendarCardVisibility(false) }} style={style.ButtomAdd}>
                            <Icon
                                name='pluscircleo'
                                type="antdesign"
                                color='#fff'
                                size={18}
                            />
                            <Text maxFontSizeMultiplier={1.5} style={style.textAddNewText}>Crear un Recordatorio</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => { setCalendarCardVisibility(false) }} >
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


