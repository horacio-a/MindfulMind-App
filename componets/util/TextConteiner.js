import { Text, View, TouchableOpacity } from "react-native";
import styleTextComp from "../../Styles/TextComStyle";
import { useEffect, useState } from "react";
import { TextSelect } from "../../context/TextSelect";
import { useContext } from "react";
export default function TextosConteiners({ data, Redirect }) {
    const [dayCreate, setdayCreate] = useState('')
    const { SelectedText, setSelectedText } = useContext(TextSelect)

    useEffect(() => {
        if (data.date !== null) {
            const time = new Date(data.date)
            setdayCreate(time.toLocaleDateString('es-AR'))
        }
    }, [])


    return (
        <TouchableOpacity onPress={() => { setSelectedText(data); Redirect('EditText') }} style={styleTextComp.ConteinerText}>
            <View style={styleTextComp.titleTextConteiner}>
                <View style={[styleTextComp.circleText, { backgroundColor: `${data.colorHex}` }]}></View>
                <Text maxFontSizeMultiplier={1.25} style={styleTextComp.titleText}>{data.title}</Text>

            </View>
            <Text style={styleTextComp.Text}>
                {((data.text).length > 325) ?
                    (((data.text).substring(0, 325 - 3)) + '...') :
                    data.text}
            </Text>
            <Text maxFontSizeMultiplier={1.25} style={styleTextComp.dateText}>{dayCreate}</Text>

        </TouchableOpacity>
    )
}