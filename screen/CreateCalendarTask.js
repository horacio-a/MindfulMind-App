import { StyleSheet, Switch, Text, View, FlatList, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from '../componets/Header';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import { useContext, useEffect, useRef, useState } from 'react';
import { Icon } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DayNewTasks } from '../context/DayNewTasks';
import SelectComponet from '../componets/util/SelectComponet';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { CalendarDateGlobalState } from '../context/DataGlobalState';
import { EXPO_PUBLIC_API_URL } from "@env"



export default function CreateCalendarTask({ navigation }) {
    const [Note, setNote] = useState('')
    const { DayTasks, setDayTasks } = useContext(DayNewTasks)
    const [Fecha, setFecha] = useState('')
    const [Title, setTitle] = useState('')
    const [titleMsgErr, settitleMsgErr] = useState('');

    const { CalendarData, SetCalendarData } = useContext(CalendarDateGlobalState);


    const [NotificacionTime, setNotificacionTime] = useState('Al momento')
    const [RepeatTime, setRepeatTime] = useState('Nunca')

    const [DataNotification, setDataNotification] = useState([])

    useEffect(() => {
        var fecha = new Date(DayTasks);
        console.log(fecha)
        // Obtener el día de la semana en texto
        var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var diaDeLaSemana = diasSemana[fecha.getUTCDay()];
        // Obtener el nombre del mes
        var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var mes = meses[fecha.getUTCMonth()];
        // Formatear el texto final
        var textoFormateado = diaDeLaSemana + ' ' + fecha.getUTCDate() + ', ' + mes + ' ' + fecha.getUTCFullYear();
        setFecha(textoFormateado)
    }, [])
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    const toggleSwitch = () => {
        if (Allday === false) {
            SetAllDat(true)
        } else {
            SetAllDat(false)
        }
    }
    const [colorPickerVisi, setcolorPickerVisi] = useState(false)
    const [colorSelect, setColorSelect] = useState('#E71818')
    const [Allday, SetAllDat] = useState(false)

    const [dateFrom, setDateFrom] = useState(new Date());
    const [modeFrom, setModeFrom] = useState('date');
    const [showFrom, setShowFrom] = useState(false);
    const [stringTimeFrom, setStringTimeFrom] = useState('08:00');
    const [intialHour, setintialHour] = useState('')

    const [dateTo, setDateTo] = useState(new Date());
    const [modeTo, setModeTo] = useState('date');
    const [showTo, setShowTo] = useState(false);
    const [stringTimeTo, setStringTimeTo] = useState('08:00');
    const [finishHour, setfinishHour] = useState('')

    useEffect(() => {
        const selectedDate = new Date()
        setDateTo(selectedDate)
        setDateFrom(selectedDate)

        let horas = selectedDate.getHours();
        let minutos = selectedDate.getMinutes();

        if (minutos.toString()[1] === undefined) {
            setStringTimeFrom(horas + ':0' + minutos)
            setStringTimeTo(horas + ':0' + minutos)

        } else {
            setStringTimeFrom(horas + ':' + minutos)
            setStringTimeTo(horas + ':' + minutos)

        }
    }, [])

    const showMode = (currentMode) => {
        setShowFrom(true);
        setModeFrom(currentMode);
    };

    const showModeTo = (currentMode) => {
        setShowTo(true);
        setModeTo(currentMode);
    };

    const showTimepickerFrom = () => {
        showMode('time');
    };

    const showTimepickerTo = () => {
        showModeTo('time');
    };


    const [itsOpenNotification, setitsOpenNotification] = useState(false)



    const onChangeFrom = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowFrom(false);
        setDateFrom(currentDate);
        let horas = selectedDate.getHours();
        let minutos = selectedDate.getMinutes();

        if (minutos.toString()[1] === undefined) {
            setStringTimeFrom(horas + ':0' + minutos)
        } else {
            setStringTimeFrom(horas + ':' + minutos)
        }
        if (selectedDate > dateTo) {
            onChangeTo('', selectedDate)
        }
    };

    const onChangeTo = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowTo(false);
        setDateTo(currentDate);
        let horas = selectedDate.getHours();
        let minutos = selectedDate.getMinutes();

        if (minutos.toString()[1] === undefined) {
            setStringTimeTo(horas + ':0' + minutos)
        } else {
            setStringTimeTo(horas + ':' + minutos)
        }
        if (selectedDate < dateFrom) {
            onChangeFrom('', selectedDate)
        }
    };

    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });



    const CreateTasks = async () => {
        let user = JSON.parse(await SecureStore.getItemAsync('userToken'))
        if (Title === '') {
            settitleMsgErr('Para crear una tarea necesitas escribir un titulo')
            setTimeout(() => {
                settitleMsgErr('')
            }, 2500);
            return
        }



        const response = await axios.post(`https://api.mindfulmind.com.ar/calendar/create`, {
            data: {
                "user": user.user,
                "Title": Title,
                "intialHour": DayTasks.split('T')[0] + 'T' + dateFrom.toISOString().split('T')[1],
                "finishHour": DayTasks.split('T')[0] + 'T' + dateTo.toISOString().split('T')[1],
                "idCalendar": "Calendario Principal",
                "description": Note,
                "date": DayTasks,
                "colorHex": colorSelect,
                "category": "principal"
            },
            info: {
                Allday: Allday,
                repeat: RepeatTime,
                NotificacionTime: NotificacionTime
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.data.request = true) {
            const respuesta = await axios.get(`https://api.mindfulmind.com.ar/getData/calendar/${user.user}/Calendario Principal`)
            SetCalendarData(respuesta.data)
            Redirect('Home')
        }
    }

    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                <Header back={true} Redirect={Redirect} />
                <View style={{ flex: 1, backgroundColor: '#000000' }} >
                    <View style={[style.Content, { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }]}>
                        <View style={style.conteinerTitle}>

                            <TextInput style={[style.input, { fontFamily: 'Lato_400Regular' }]}
                                maxFontSizeMultiplier={1.5}
                                placeholder="Titulo"
                                keyboardType="default"
                                placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                onChangeText={setTitle}
                            />
                            <TouchableOpacity style={[style.ButtonColorPicker, { backgroundColor: colorSelect }]}
                                onPress={() => {
                                    if (colorPickerVisi === false) {
                                        setcolorPickerVisi(true)
                                    } else {
                                        setcolorPickerVisi(false)
                                    }
                                }}>
                            </TouchableOpacity>

                        </View>
                        <View style={{ width: '100%', height: 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text maxFontSizeMultiplier={1.5} style={{ textAlign: 'center', color: '#fff', fontFamily: 'Lato_700Bold' }}>{titleMsgErr}</Text>
                        </View>
                        {
                            colorPickerVisi
                                ? <View style={style.ConteinerColorPicker}>
                                    <TouchableOpacity onPress={() => { setColorSelect('#E71818'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#E71818' }]}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColorSelect('#E7AD18'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#E7AD18' }]}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColorSelect('#B1E718'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#B1E718' }]}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColorSelect('#18E79C'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#18E79C' }]}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColorSelect('#18A9E7'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#18A9E7' }]}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColorSelect('#1845E7'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#1845E7' }]}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColorSelect('#6718E7'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#6718E7' }]}></TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setColorSelect('#A418E7'); setcolorPickerVisi(false) }} style={[style.UnitColorPicker, { backgroundColor: '#A418E7' }]}></TouchableOpacity>
                                </View>
                                : <></>
                        }
                        <View style={style.ConteinerSelectDate}>
                            <View style={style.TitleSelectDate}>
                                <Icon
                                    name='access-time'
                                    type='material'
                                    color={'#fff'}
                                    size={20}
                                />
                                <Text maxFontSizeMultiplier={1.5} style={style.textTitleSelectDate}>{Allday ? 'Seleciona el horario' : 'Todo el dia'}</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: colorSelect }}
                                    thumbColor={Allday ? '#f4f3f4' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={Allday}
                                    style={{ marginLeft: 75 }}
                                />
                            </View>
                            {
                                Allday
                                    ?
                                    <View style={style.ConteinerDay}>
                                        <View style={style.TitleDay}>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFFFFF', fontSize: 18 }}>
                                                {Fecha}
                                            </Text>
                                        </View>
                                        <View style={style.DaysHour}>
                                            <View style={style.DaysHourUnit}>
                                                <TouchableOpacity onPress={showTimepickerFrom}  >
                                                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
                                                        {stringTimeFrom}
                                                    </Text>
                                                    {showFrom && (
                                                        <DateTimePicker
                                                            testID="dateTimePicker"
                                                            value={dateFrom}
                                                            mode={modeFrom}
                                                            is24Hour={true}
                                                            onChange={onChangeFrom}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            </View>
                                            <View style={style.DaysHourUnit}>
                                                <TouchableOpacity onPress={showTimepickerTo}  >
                                                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
                                                        {stringTimeTo}
                                                    </Text>
                                                    {showTo && (
                                                        <DateTimePicker
                                                            testID="dateTimePicker"
                                                            value={dateTo}
                                                            mode={modeTo}
                                                            is24Hour={true}
                                                            onChange={onChangeTo}
                                                        />
                                                    )}
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                    </View>
                                    : <View>
                                        <View style={style.TitleDay}>
                                            <Text maxFontSizeMultiplier={1.5}
                                                style={{ color: '#FFFFFF', fontSize: 18 }}>
                                                {Fecha}
                                            </Text>
                                        </View>
                                    </View>
                            }
                        </View>

                        <View style={style.conteinerNofitify}>
                            <Icon
                                name='note-text-outline'
                                type='material-community'
                                color={'#fff'}
                                size={20}
                            />
                            <TextInput
                                maxFontSizeMultiplier={1.5}

                                placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                placeholder='Descripcion'
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={setNote}
                                style={[style.TextArea]} />
                        </View>
                        <View style={style.conteinerNofitify}>
                            <Icon
                                name='notifications-none'
                                type='material'
                                color={'#fff'}
                                size={20}
                            />
                            <TouchableOpacity style={style.TouchableOpenNotification} onPress={() => { Keyboard.dismiss(); setitsOpenNotification(true); setDataNotification({ Title: 'Notificacion', Data: ['Al momento', '10 minutos antes', '1 hora antes', '1 dia antes'] }) }}>
                                <Text maxFontSizeMultiplier={1.5}
                                    style={[style.TextArea]}>{NotificacionTime}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.conteinerNofitify}>
                            <Icon
                                name='repeat'
                                type='Feather'
                                color={'#fff'}
                                size={20}
                            />

                            <TouchableOpacity style={style.TouchableOpenNotification} onPress={() => { Keyboard.dismiss(); setitsOpenNotification(true); setDataNotification({ Title: 'Repeticion', Data: ['Nunca', 'Todas las semanas', 'Todos los meses', 'Todos los años'] }) }}>
                                <Text maxFontSizeMultiplier={1.5}
                                    style={[style.TextArea]}>{RepeatTime}</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={{ width: '100%', height: '7.5%', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { Redirect('Home') }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Lato_700Bold' }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { CreateTasks() }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text maxFontSizeMultiplier={1.5}
                                style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Lato_700Bold' }}>Guardar</Text>

                        </TouchableOpacity>

                    </View>
                </View>






                {itsOpenNotification
                    ? <View style={style.MainNotificacion}>
                        <View style={style.NotificacionContent}>
                            <View style={style.NotificacionTitle}>
                                <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', fontSize: 22, fontFamily: 'Lato_700Bold' }}> {DataNotification.Title}</Text>
                            </View>
                            <View style={{ height: '70%' }}>

                                {
                                    DataNotification.Data.map(data => (
                                        <TouchableOpacity key={data} onPress={() => {
                                            DataNotification.Title === 'Notificacion' ? setNotificacionTime(data) : setRepeatTime(data)
                                        }} style={style.NotificacionUnit}>
                                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#ffffff', width: '85%' }} >{data}</Text>
                                            <View style={{ width: 20, height: 20, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                {
                                                    DataNotification.Title === 'Notificacion'
                                                        ? (
                                                            data === NotificacionTime
                                                                ? <View style={{ width: 10, height: 10, borderRadius: 100, backgroundColor: '#fff' }}></View>
                                                                : <></>
                                                        )
                                                        : (
                                                            data === RepeatTime
                                                                ? <View style={{ width: 10, height: 10, borderRadius: 100, backgroundColor: '#fff' }}></View>
                                                                : <></>
                                                        )
                                                }

                                                <View style={style.BorderCheck}></View>

                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>


                            <TouchableOpacity onPress={() => { setitsOpenNotification(false) }} style={{ borderBottomLeftRadius: 10, borderBottomEndRadius: 10, backgroundColor: '#2C2C2C', width: '100%', height: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text maxFontSizeMultiplier={1.5} style={{ color: '#fff', }}>Hecho</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableWithoutFeedback onPress={() => { setitsOpenNotification(false) }} >
                            <View style={style.CloserWidthMax} ></View>
                        </TouchableWithoutFeedback>
                    </View>
                    : <></>
                }

            </>
        )
    }
}

const style = StyleSheet.create({
    TouchableOpenNotification: {
        width: '50%'
    },
    BorderCheck: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
        width: 20, height: 20,
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: 100,

    },
    NotificacionTitle: {
        width: '100%',
        height: '15%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    NotificacionUnit: {
        width: '90%',
        height: '10%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    NotificacionContent: {
        position: 'absolute',
        zIndex: 10,
        width: '85%',
        height: '55%',
        borderRadius: 10,
        backgroundColor: 'rgba(30, 30, 30, 1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CloserWidthMax: {
        width: '100%',
        height: '100%',
    },


    MainNotificacion: {
        zIndex: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    conteinerMain: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        // backgroundColor: '#fff'
    },
    List: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        top: '100%',
    },
    unitList: {
        width: '100%',
        height: '75%',
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    Content: {
        backgroundColor: '#1E1E1E',
        width: '100%',
        height: 650,
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    conteinerTitle: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: '100%',
        fontSize: 18,
        textAlign: 'left',
        borderBottomWidth: 3,
        borderBottomColor: '#F5F0F0',
        color: '#F5F0F0',
        marginBottom: 10
    },
    ButtonColorPicker: {
        width: 30,
        height: 30,
        marginLeft: 25,
        borderRadius: 100
    },
    ConteinerColorPicker: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    UnitColorPicker: {
        width: 20,
        height: 20,
        backgroundColor: '#fff',
        marginLeft: 20,
        borderRadius: 100,
    },
    ConteinerSelectDate: {
        width: '100%',
        height: 'auto',
    },
    TitleSelectDate: {
        width: '100%',
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textTitleSelectDate: {
        width: '50%',
        marginLeft: 25,
        color: '#fff',
        fontSize: 18
    },
    ConteinerDay: {
        width: '100%',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    TitleDay: {
        width: '100%',
        height: 35,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DaysHour: {
        width: '100%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    DaysHourUnit: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    conteinerNofitify: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
        height: 50

    },
    TextArea: {
        width: '75%',
        marginLeft: 15,
        color: '#FFFFFF',
        position: 'relative',
        zIndex: 5
    }

})