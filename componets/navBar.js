import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styleNavBar from '../Styles/NavBarStyle';
import { Icon } from '@rneui/themed';
import {
    useFonts,
    Lato_400Regular,
    Lato_700Bold,
} from '@expo-google-fonts/dev';
import Loading from '../sreens/Loading'
import { useState } from 'react';

export default function NavBar({ Redirect }) {
    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });
    const [navIcon, setnavIcon] = useState({
        home: true,
        routine: false,
        calendar: false,
        text: false,
        settings: false
    })





    if (!fontsLoaded) {
        return <Loading />;
    } else {
        return (
            <View style={styleNavBar.navBar}>
                <TouchableOpacity onPress={() => { Redirect('Home') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='home-filled'
                        type='material'
                        color={navIcon.home ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={navIcon.home ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Incio</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('RoutineScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='format-list-bulleted'
                        type='material-community'
                        color={navIcon.routine ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={navIcon.routine ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Rutina</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('CalendarScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='calendar-today'
                        type='material'
                        color={navIcon.calendar ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={navIcon.calendar ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Calendario</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('TextScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='book'
                        type='material'
                        color={navIcon.text ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={navIcon.text ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Tus textos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { Redirect('SettingScreen') }} style={styleNavBar.IconConteiner}>
                    <Icon
                        name='settings'
                        type='material'
                        color={navIcon.settings ? '#fff' : 'rgba(255, 255, 255, 0.5)'}
                        size={18}
                    />
                    <Text style={navIcon.settings ? styleNavBar.activetextNavBar : styleNavBar.textNavBar}>Ajustes</Text>
                </TouchableOpacity>
            </View>
        )
    }

}