import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import stylesCalendar from '../../Styles/CalendarsStyle';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../sreens/Loading'
import CalendarNumber from '../util/CalendarNumber';
import CalendarDays from '../util/CalendarDays';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
export default function Caledar() {
    const [calendar, setcalendar] = useState([])
    const [loading, setloading] = useState(true)
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    useEffect(() => {
        const getCalendar = async () => {
            const response = await axios.get('http://31.220.17.121:3500/calendar/Horacio/Calendario%20Principal')
            // console.log(response.data)

            setcalendar(response.data)
            setloading(false)
        }
        getCalendar()
    }, [])

    if (!fontsLoaded) {
        return <Loading />;
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
                                <Text maxFontSizeMultiplier={1.5} style={stylesCalendar.TitleMonth}>{calendar.data.month} {calendar.data.year}</Text>
                            </View>
                            <View style={stylesCalendar.BlockDays}>
                                <CalendarDays day={'lunes'} />
                                <CalendarDays day={'Martes'} />
                                <CalendarDays day={'Miercoles'} />
                                <CalendarDays day={'Jueves'} />
                                <CalendarDays day={'Viernes'} />
                                <CalendarDays day={'Sabado'} />
                                <CalendarDays day={'Domingo'} />

                            </View>
                            <View style={stylesCalendar.NumberCalendar}>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        key={calendar.days[0].id}
                                        data={calendar.days[0]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[1].id}
                                        data={calendar.days[1]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[2].id}
                                        data={calendar.days[2]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[3].id}
                                        data={calendar.days[3]}
                                    />

                                    <CalendarNumber
                                        key={calendar.days[4].id}
                                        data={calendar.days[4]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[5].id}
                                        data={calendar.days[5]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[6].id}
                                        data={calendar.days[6]}
                                    />


                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        key={calendar.days[7].id}
                                        data={calendar.days[7]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[8].id}
                                        data={calendar.days[8]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[9].id}
                                        data={calendar.days[9]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[10].id}
                                        data={calendar.days[10]}
                                    />

                                    <CalendarNumber
                                        key={calendar.days[11].id}
                                        data={calendar.days[11]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[12].id}
                                        data={calendar.days[12]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[13].id}
                                        data={calendar.days[13]}
                                    />

                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        key={calendar.days[14].id}
                                        data={calendar.days[14]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[15].id}
                                        data={calendar.days[15]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[16].id}
                                        data={calendar.days[16]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[17].id}
                                        data={calendar.days[17]}
                                    />

                                    <CalendarNumber
                                        key={calendar.days[18].id}
                                        data={calendar.days[18]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[19].id}
                                        data={calendar.days[19]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[20].id}
                                        data={calendar.days[20]}
                                    />

                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        key={calendar.days[21].id}
                                        data={calendar.days[21]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[22].id}
                                        data={calendar.days[22]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[23].id}
                                        data={calendar.days[23]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[24].id}
                                        data={calendar.days[24]}
                                    />

                                    <CalendarNumber
                                        key={calendar.days[25].id}
                                        data={calendar.days[25]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[26].id}
                                        data={calendar.days[26]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[27].id}
                                        data={calendar.days[27]}
                                    />
                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        key={calendar.days[28].id}
                                        data={calendar.days[28]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[29].id}
                                        data={calendar.days[29]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[30].id}
                                        data={calendar.days[30]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[31].id}
                                        data={calendar.days[31]}
                                    />

                                    <CalendarNumber
                                        key={calendar.days[32].id}
                                        data={calendar.days[32]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[33].id}
                                        data={calendar.days[33]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[34].id}
                                        data={calendar.days[34]}
                                    />
                                </View>
                                <View style={stylesCalendar.RowCalendar}>
                                    <CalendarNumber
                                        key={calendar.days[35].id}
                                        data={calendar.days[35]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[36].id}
                                        data={calendar.days[36]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[37].id}
                                        data={calendar.days[37]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[38].id}
                                        data={calendar.days[38]}
                                    />

                                    <CalendarNumber
                                        key={calendar.days[39].id}
                                        data={calendar.days[39]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[40].id}
                                        data={calendar.days[40]}
                                    />
                                    <CalendarNumber
                                        key={calendar.days[41].id}
                                        data={calendar.days[41]}
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