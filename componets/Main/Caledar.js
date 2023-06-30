import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import stylesCalendar from '../../Styles/CalendarsStyle';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../screen/Loading'
import CalendarNumber from '../util/CalendarNumber';
import CalendarDays from '../util/CalendarDays';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import LoadingCalendar from './LoadingCalendar';
import { CalendarDateGlobalState } from '../../context/DataGlobalState';

export default function Caledar({ setCalendarCardVisibility, setdateForCalendarCard }) {
    const { CalendarData, SetCalendarData } = useContext(CalendarDateGlobalState);
    const ActiveCard = (data) => {
        setdateForCalendarCard(data)
        setCalendarCardVisibility(true)
    }
    const [loading, setloading] = useState(true)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    useEffect(() => {
        setloading(false)

    }, [])
    if (!fontsLoaded) {
        return <LoadingCalendar />;
    } else {
        return (
            <>
                <View style={stylesCalendar.ConteinerTitle}>
                    <Text style={stylesCalendar.TitleMain}>Calendario principal</Text>
                </View>
                {
                    loading === false
                        ? (<View style={stylesCalendar.conteinerMain}>
                            <View style={stylesCalendar.BlockMonth}>
                                <Text maxFontSizeMultiplier={1.5} style={stylesCalendar.TitleMonth}>{CalendarData.data.month} {CalendarData.data.year}</Text>
                            </View>
                            <View style={stylesCalendar.BlockDays}>
                                <CalendarDays day={'Domingo'} />
                                <CalendarDays day={'lunes'} />
                                <CalendarDays day={'Martes'} />
                                <CalendarDays day={'Miercoles'} />
                                <CalendarDays day={'Jueves'} />
                                <CalendarDays day={'Viernes'} />
                                <CalendarDays day={'Sabado'} />

                            </View>
                            <View style={stylesCalendar.NumberCalendar}>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[0].id}
                                        data={CalendarData.days[0]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[1].id}
                                        data={CalendarData.days[1]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[2].id}
                                        data={CalendarData.days[2]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[3].id}
                                        data={CalendarData.days[3]}
                                    />

                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[4].id}
                                        data={CalendarData.days[4]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[5].id}
                                        data={CalendarData.days[5]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[6].id}
                                        data={CalendarData.days[6]}
                                    />


                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[7].id}
                                        data={CalendarData.days[7]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[8].id}
                                        data={CalendarData.days[8]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[9].id}
                                        data={CalendarData.days[9]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[10].id}
                                        data={CalendarData.days[10]}
                                    />

                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[11].id}
                                        data={CalendarData.days[11]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[12].id}
                                        data={CalendarData.days[12]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[13].id}
                                        data={CalendarData.days[13]}
                                    />

                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[14].id}
                                        data={CalendarData.days[14]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[15].id}
                                        data={CalendarData.days[15]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[16].id}
                                        data={CalendarData.days[16]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[17].id}
                                        data={CalendarData.days[17]}
                                    />

                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[18].id}
                                        data={CalendarData.days[18]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[19].id}
                                        data={CalendarData.days[19]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[20].id}
                                        data={CalendarData.days[20]}
                                    />

                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[21].id}
                                        data={CalendarData.days[21]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[22].id}
                                        data={CalendarData.days[22]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[23].id}
                                        data={CalendarData.days[23]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[24].id}
                                        data={CalendarData.days[24]}
                                    />

                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[25].id}
                                        data={CalendarData.days[25]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[26].id}
                                        data={CalendarData.days[26]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[27].id}
                                        data={CalendarData.days[27]}
                                    />
                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[28].id}
                                        data={CalendarData.days[28]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[29].id}
                                        data={CalendarData.days[29]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[30].id}
                                        data={CalendarData.days[30]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[31].id}
                                        data={CalendarData.days[31]}
                                    />

                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[32].id}
                                        data={CalendarData.days[32]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[33].id}
                                        data={CalendarData.days[33]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[34].id}
                                        data={CalendarData.days[34]}
                                    />
                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[35].id}
                                        data={CalendarData.days[35]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[36].id}
                                        data={CalendarData.days[36]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[37].id}
                                        data={CalendarData.days[37]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[38].id}
                                        data={CalendarData.days[38]}
                                    />

                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[39].id}
                                        data={CalendarData.days[39]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[40].id}
                                        data={CalendarData.days[40]}
                                    />
                                    <CalendarNumber
                                        ActiveCard={ActiveCard}
                                        key={CalendarData.days[41].id}
                                        data={CalendarData.days[41]}
                                    />
                                </View>
                            </View>
                        </View>)
                        : <></>
                }
            </>

        )
    }

}