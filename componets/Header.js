import { StyleSheet, Text, View, Image } from 'react-native';
import stylesHeader from '../Styles/HeaderStyle.js'

export default function Header() {
    return (
        <View style={stylesHeader.header}>
            <View style={stylesHeader.conteinerMenuHeader}></View>
            <View style={stylesHeader.conteinerImgHeader}>
                <Image source={require('../img/xswhite.png')} style={stylesHeader.imgHeader} />
            </View>
        </View>
    )
}