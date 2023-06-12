import { Text, View, TouchableOpacity } from "react-native";
import styleTextComp from "../../Styles/TextComStyle";

export default function TextosConteiners({ data }) {
    return (
        <View style={styleTextComp.ConteinerText}>
            <Text style={styleTextComp.titleText}>{data.title}</Text>
        </View>
    )
}