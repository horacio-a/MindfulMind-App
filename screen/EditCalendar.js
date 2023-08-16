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
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { CalendarSelect } from '../context/CalendarSelect'
import DeleteCalendarPopUp from '../componets/util/deleteCalendarPopUp';
import { CalendarDateGlobalState } from '../context/DataGlobalState';
import { EXPO_PUBLIC_API_URL } from "@env"
import { CaledarCardSelect } from '../context/CalendarCardSelect';

export default function EditarCalendar({ navigation }) {
    const Redirect = (url) => {
        navigation.navigate(url)
    }
    const { SelectedCalendar, setSelectedCalendar } = useContext(CalendarSelect);
    const [editAll, seteditAll] = useState(false)
    const [Note, setNote] = useState(SelectedCalendar.description)
    const [Fecha, setFecha] = useState('')
    const [Title, setTitle] = useState(SelectedCalendar.title)
    const [titleMsgErr, settitleMsgErr] = useState('');
    const { dataForCalendarCard, setdateForCalendarCard } = useContext(CaledarCardSelect)
    const [user, setUser] = useState('')
    const { CalendarData, SetCalendarData } = useContext(CalendarDateGlobalState);
    const [groupedTask, setgroupedTask] = useState(SelectedCalendar.groupedTask)

    useEffect(() => {
        async function changeuser() {
            let GetUser = JSON.parse(await SecureStore.getItemAsync('userToken'))
            setUser(GetUser)
        }
        changeuser()
    }, [])

    const [NotificacionTime, setNotificacionTime] = useState('')
    useEffect(() => {
        const diferencia = new Date(SelectedCalendar.intialHour).getTime() - SelectedCalendar.notificationFilter
        switch (diferencia) {
            case 600000:
                setNotificacionTime('10 minutos antes')
                break;
            case 3600000:
                setNotificacionTime('1 hora antes')
                break;
            case 86400000:
                setNotificacionTime('1 dia antes')
                break;
            default:
                setNotificacionTime('Al momento')
                break;
        }
    }, [])
    const [RepeatTime, setRepeatTime] = useState('Nunca')

    const [DataNotification, setDataNotification] = useState([])

    useEffect(() => {
        var fecha = new Date(SelectedCalendar.date);
        // Obtener el día de la semana en texto
        var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        var diaDeLaSemana = diasSemana[fecha.getUTCDay()];
        // Obtener el nombre del mes
        var meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var mes = meses[fecha.getUTCMonth()];
        // Formatear el texto final
        var textoFormateado = diaDeLaSemana + ' ' + fecha.getDate() + ', ' + mes + ' ' + fecha.getUTCFullYear();
        setFecha(textoFormateado)
    }, [])


    const toggleSwitch = () => {
        if (Allday === false) {
            SetAllDat(true)
        } else {
            SetAllDat(false)
        }
    }
    const [colorPickerVisi, setcolorPickerVisi] = useState(false)
    const [colorSelect, setColorSelect] = useState(SelectedCalendar.colorHex)
    const [Allday, SetAllDat] = useState(false)

    useEffect(() => {
        if (SelectedCalendar.intialHour.split('T')[1] === '00:00:00.000Z' && SelectedCalendar.finishHour.split('T')[1] === '23:59:59.999Z') {
            SetAllDat(false)
        } else {
            SetAllDat(true)

        }
    }, [])
    const [dateFrom, setDateFrom] = useState(new Date(SelectedCalendar.intialHour));
    const [modeFrom, setModeFrom] = useState('date');
    const [showFrom, setShowFrom] = useState(false);
    const [stringTimeFrom, setStringTimeFrom] = useState('08:00');
    const [intialHour, setintialHour] = useState('')

    const [dateTo, setDateTo] = useState(new Date(SelectedCalendar.finishHour));
    const [modeTo, setModeTo] = useState('date');
    const [showTo, setShowTo] = useState(false);
    const [stringTimeTo, setStringTimeTo] = useState('08:00');
    const [finishHour, setfinishHour] = useState('')
    const [itsOpenNotification, setitsOpenNotification] = useState(false)
    const [deletePopUp, setdeletePopUp] = useState(false)

    useEffect(() => {
        if (!(SelectedCalendar.intialHour.split('T')[1] === '00:00:00.000Z' && SelectedCalendar.finishHour.split('T')[1] === '23:59:59.999Z')) {
            const selectedDate = new Date(SelectedCalendar.intialHour)
            let horas = selectedDate.getHours();
            let minutos = selectedDate.getMinutes();

            if (minutos.toString()[1] === undefined) {
                setStringTimeFrom(horas + ':0' + minutos)
            } else {
                setStringTimeFrom(horas + ':' + minutos)
            }
        }

    }, [])

    useEffect(() => {
        if (!(SelectedCalendar.intialHour.split('T')[1] === '00:00:00.000Z' && SelectedCalendar.finishHour.split('T')[1] === '23:59:59.999Z')) {
            const selectedDate = new Date(SelectedCalendar.finishHour)
            let horas = selectedDate.getHours();
            let minutos = selectedDate.getMinutes();

            if (minutos.toString()[1] === undefined) {
                setStringTimeTo(horas + ':0' + minutos)
            } else {
                setStringTimeTo(horas + ':' + minutos)
            }

        }

    }, [])


    const notificationFilterGet = (text) => {
        let notificationFilter
        switch (text) {
            case '10 minutos antes':
                notificationFilter = new Date(dateFrom).getTime() - 600000
                break;
            case '1 hora antes':
                notificationFilter = new Date(dateFrom).getTime() - 3600000
                break;

            case '1 dia antes':
                notificationFilter = new Date(dateFrom).getTime() - 86400000
                break;

            default:
                notificationFilter = new Date(dateFrom).getTime()
                break;
        }
        return notificationFilter
    }

    const UpdateTasks = async () => {
        let data = {
            id: SelectedCalendar.id,
            GroupId: SelectedCalendar.GroupId,
            user: user.user,
            title: Title,
            description: Note,
            date: SelectedCalendar.date,
            intialHour: dateFrom.toISOString(),
            finishHour: dateTo.toISOString(),
            colorHex: colorSelect,
            category: SelectedCalendar.category,
            idCalendar: SelectedCalendar.idCalendar,
            notificationFilter: notificationFilterGet(NotificacionTime),
            groupedTask: SelectedCalendar.groupedTask,
        }
        let info = {
            Allday,
            NotificacionTime
        }


        if (!info.Allday) {
            data.intialHour = data.intialHour.split('T')[0] + 'T00:00:00.000Z'
            data.finishHour = data.finishHour.split('T')[0] + 'T23:59:59.999Z'
        }



        if (JSON.stringify(data) == JSON.stringify(SelectedCalendar)) {
            Redirect('Home')
        } else {
            let response
            delete data.groupedTask;
            if (editAll === false) {
                response = await axios.post(`https://api.mindfulmind.com.ar/calendar/update`, { data: data, info: editAll })
            }
            if (editAll === true) {
                response = await axios.post(`https://api.mindfulmind.com.ar/calendar/updategroup`, { data, info })
            }
            const newdata = response.data.days.findIndex((element) => element.fecha === SelectedCalendar.date)
            setdateForCalendarCard(response.data.days[newdata])
            SetCalendarData(response.data)
            Redirect('Home')

        }

    }


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

    const script = () => {
        Redirect('Home')
    }

    const deleteCalendarTasks = async () => {
        if (editAll === false) {
            let response = await axios.delete(`https://api.mindfulmind.com.ar/calendar/delete`, { data: { user: user.user, id: SelectedCalendar.id, idCalendar: SelectedCalendar.idCalendar } })
            const newdata = response.data.days.findIndex((element) => element.fecha === SelectedCalendar.date)
            setdateForCalendarCard(response.data.days[newdata])
            console.log(response.data)
            SetCalendarData(response.data)
        }
        if (editAll === true) {
            let response = await axios.delete(`https://api.mindfulmind.com.ar/calendar/deletegroup`, { data: { user: user.user, id: SelectedCalendar.GroupId, idCalendar: SelectedCalendar.idCalendar } })
            const newdata = response.data.days.findIndex((element) => element.fecha === SelectedCalendar.date)
            setdateForCalendarCard(response.data.days[newdata])
            SetCalendarData(response.data)
        }

        Redirect('Home')

    }


    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <>
                <Header back={true} script={script} Redirect={Redirect} />
                <View style={{ flex: 1, backgroundColor: '#000000' }} >
                    <View style={[style.Content, { borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }]}>
                        <View style={style.conteinerTitle}>

                            <TextInput style={[style.input, { fontFamily: 'Lato_400Regular' }]}
                                maxFontSizeMultiplier={1.5}
                                placeholder="Titulo"
                                keyboardType="default"
                                placeholderTextColor="rgba(245, 240, 240, 0.75)"
                                onChangeText={setTitle}
                                value={Title}
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
                            <TouchableOpacity style={[style.deleteBtn]}
                                onPress={() => {
                                    setdeletePopUp(true)
                                }}>
                                <Icon
                                    name='delete'
                                    color={'#FFFFFF'}
                                    size={30}
                                />
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
                                                <TouchableOpacity onPress={() => {
                                                    setShowFrom(true);
                                                    setModeFrom('time');
                                                }}  >
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
                                                <TouchableOpacity onPress={() => {
                                                    setShowTo(true);
                                                    setModeTo('time');
                                                }}  >
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
                        {
                            groupedTask
                                ? <View style={{
                                    width: '100%', height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 35,
                                }}>
                                    <View style={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                        <TouchableWithoutFeedback>
                                            <Icon
                                                name='information-outline'
                                                type='material-community'
                                                color={'#fff'}
                                                size={20}

                                            />
                                        </TouchableWithoutFeedback>

                                        <Text style={{ color: '#fff', marginLeft: 5 }}>¿Quieres editar todas los recordatorios?</Text>

                                    </View>
                                    <View style={{ width: '100%', height: '60%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => { seteditAll(false) }} style={editAll ? style.EditBtnDesactive : style.EditBtnActive}>
                                            <Text style={editAll ? { color: '#fff' } : { color: '#1e1e1e' }}>Editar solo este</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => { seteditAll(true) }} style={editAll ? style.EditBtnActive : style.EditBtnDesactive}>
                                            <Text style={editAll ? { color: '#1e1e1e' } : { color: '#fff' }}>Editar todos</Text>
                                        </TouchableOpacity>

                                    </View>


                                </View>
                                : <></>
                        }

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
                                value={Note}
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



                    </View>
                    <View style={{ width: '100%', height: '7.5%', flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { Redirect('Home') }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text maxFontSizeMultiplier={1.5} style={{ color: '#FFFFFF', fontSize: 18, fontFamily: 'Lato_700Bold' }}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { UpdateTasks() }} style={{ width: '50%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                {
                    deletePopUp
                        ? <DeleteCalendarPopUp setdeletePopUp={setdeletePopUp} deleteCalendarTasks={deleteCalendarTasks} />
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
        width: '70%',
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
    deleteBtn: {
        width: 30,
        height: 30,
        marginLeft: 25,
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
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
    },
    EditBtnActive: {
        width: '35%',
        height: '65%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderRadius: 5
    },

    EditBtnDesactive: {
        width: '35%',
        height: '65%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 5

    }

})