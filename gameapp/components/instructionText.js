import { Text, StyleSheet } from "react-native";
import Colors from "../constants/color";
function InstructionText({children, style}){
    return (
        <Text style={[styles.InstructionText, style]}>{children}</Text>
    )
}

export default InstructionText;

const styles = StyleSheet.create({
    InstructionText:{
        // fontFamily: 'open-sans',
        fontSize: 24, 
        color: Colors.accent500
    }
})