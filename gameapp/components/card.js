import {View, StyleSheet, Dimensions} from 'react-native'
import Colors from '../constants/color';

function Card({children}){
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )

}

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputContainer:{
        justifyContent:'center',
        alignItems: 'center',
        padding:16, 
        marginHorizontal: 24,
        borderRadius: 6,
        marginTop: deviceWidth < 380 ? 18 : 36, 
        backgroundColor: Colors.primary800,
        elevation: 4

    }, 
})