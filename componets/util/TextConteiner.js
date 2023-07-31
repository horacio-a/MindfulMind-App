import { Text, View, TouchableOpacity } from "react-native";
import styleTextComp from "../../Styles/TextComStyle";

export default function TextosConteiners({ data }) {
    return (
        <View style={styleTextComp.ConteinerText}>
            <Text style={styleTextComp.titleText}>{data.title}</Text>
            <Text style={styleTextComp.Text}>
                {((data.text).length > 325) ?
                    (((data.text).substring(0, 325 - 3)) + '...') :
                    data.text}
            </Text>
        </View>
    )
}