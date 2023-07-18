import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styleNavBar from '../Styles/NavBarStyle';
import { Icon } from '@rneui/themed';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import Loading from '../screen/Loading'
import { useState } from 'react';
import { BackPageState } from '../context/BackPageState';
import { useContext } from 'react';


export default function NavBar({ Redirect, home, routine, calendar, text, settings }) {
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const [setnavIcon] = useState({
        home: home,
        routine: routine,
        calendar: calendar,
        text: text,
        settings: settings
    })
    const { BackPage, setBackPage } = useContext(BackPageState)




    if (!fontsLoaded) {
        return <Loading />;
    } else {
        return (
            <View style={styleNavBar.navBar}>
                <TouchableOpacity onPress={() => { Redirect('Home'); setBackPage('Home') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='home-filled'
                        type='material'
                        color={home ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={home ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Incio</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('RoutineScreen'); setBackPage('RoutineScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='format-list-bulleted'
                        type='material-community'
                        color={routine ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={routine ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Rutina</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('CalendarScreen'); setBackPage('CalendarScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='calendar-today'
                        type='material'
                        color={calendar ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={calendar ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Calendario</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('TextScreen'); setBackPage('TextScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='book'
                        type='material'
                        color={text ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={text ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Tus textos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('SettingScreen'); setBackPage('SettingScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='settings'
                        type='material'
                        color={settings ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={settings ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Ajustes</Text>
                </TouchableOpacity>
            </View>
        )
    }

}