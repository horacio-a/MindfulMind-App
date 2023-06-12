import stylesCalendar from '../../Styles/CalendarsStyle';
import { StyleSheet, Text, View, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';

export default function CalendarNumber(props) {
    const data = props.data

    return (
        <TouchableOpacity style={[
            data.Today ? stylesCalendar.ConteinerUnitToday : stylesCalendar.ConteinerUnit
        ]}>
            <Text maxFontSizeMultiplier={1.5} style={
                [!data.ThisMount ? stylesCalendar.opacityLow : (data.Today ? stylesCalendar.TextNumberToday : stylesCalendar.TextNumber)]}>
                {data.number}
            </Text>
            {
                data.requestTask
                    ? <View style={[!data.ThisMount ? stylesCalendar.circuloOpacityLow : (data.Today ? stylesCalendar.circuloToday : stylesCalendar.circulo)]}></View>
                    : <></>
            }

        </TouchableOpacity>
    )

}