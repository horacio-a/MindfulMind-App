import { StyleSheet, Switch, Text, View, FlatList, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
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




export default function CreateCalendarTask({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [Note, setNote] = useState('')
    const { DayTasks, setDayTasks } = useContext(DayNewTasks)
    const [Fecha, setFecha] = useState('')
    const dataList = ['Al momento', '10 minutos antes', '1 hora antes', '1 dia antes']

    const [openSelect, setOpenSelect] = useState(false)
    const [openSelect2, setOpenSelect2] = useState(false)



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
        var textoFormateado = diaDeLaSemana + ' ' + fecha.getDate() + ', ' + mes + ' ' + fecha.getUTCFullYear();
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

    const [dateTo, setDateTo] = useState(new Date());
    const [modeTo, setModeTo] = useState('date');
    const [showTo, setShowTo] = useState(false);
    const [stringTimeTo, setStringTimeTo] = useState('08:00');

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
    };

    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    if (!fontsLoaded) {
        return <></>;
    } else {
        return (
            <View style={style.MainConteiner}>
                <Header back={true} Redirect={Redirect} />
                <View style={style.Content}>
                    <View style={style.conteinerTitle}>

                        <TextInput style={[style.input, { fontFamily: 'Lato_400Regular' }]}
                            placeholder="Titulo"
                            keyboardType="default"
                            placeholderTextColor="rgba(245, 240, 240, 0.75)"
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
                            <Text style={style.textTitleSelectDate}>{Allday ? 'Seleciona el horario' : 'Todo el dia'}</Text>
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
                                        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
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
                                        <Text style={{ color: '#FFFFFF', fontSize: 18 }}>
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
                            placeholderTextColor="rgba(245, 240, 240, 0.75)"
                            placeholder='Nota'
                            multiline={true}
                            numberOfLines={4}
                            style={[style.TextArea]} />
                    </View>

                    <View style={style.conteinerNofitify}>
                        <Icon
                            name='notifications-none'
                            type='material'
                            color={'#fff'}
                            size={20}
                        />

                    </View>

                    <View style={style.conteinerNofitify}>
                        <Icon
                            name='repeat'
                            type='Feather'
                            color={'#fff'}
                            size={20}
                        />

                    </View>
                </View>

                {itsOpenNotification
                    ? <View style={style.MainNotificacion}>
                        <View style={style.NotificacionContent}>
                            <Text></Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => { console.log('hola') }} >
                            <View style={style.CloserWidthMax} ></View>
                        </TouchableWithoutFeedback>
                    </View>
                    : <></>
                }

            </View>
        )
    }
}

const style = StyleSheet.create({
    NotificacionContent: {
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
    MainConteiner: {
        flex: 1,
        alignItems: 'center',
    },
    Content: {
        backgroundColor: '#1E1E1E',
        width: '100%',
        height: '90%',
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