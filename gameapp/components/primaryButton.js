import {View, Text, Pressable, StyleSheet } from 'react-native'
import Colors from '../constants/color';
    function PrimaryButton({children, onPress}){
        function pressedButton(){
            console.log('pressed')
        }
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
            style={styles.buttonInnerContainer} 
            onPress={onPress} 
            android_ripple={{color: Colors.primary600}}
            
            >
            
                <Text style={styles.buttonText}>{children}</Text>
            
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28, 
        margin: 4,
        overflow: 'hidden',
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical:8, 
        paddingHorizontal:16,
        evelation: 2, //shadow on andriod
    }, 
    buttonText: {
        color: 'white',
        textAlign: 'center',
    }
})