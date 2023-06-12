import stylesCalendar from '../../Styles/CalendarsStyle';
import { Text, View, } from 'react-native';

export default function CalendarDays(props) {
    return (
        <View style={stylesCalendar.BlockTitleDays}>
            <Text allowFontScaling={false} style={stylesCalendar.TitleDays}>{props.day}</Text>
        </View>
    )

}