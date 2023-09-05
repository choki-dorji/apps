import { View, Text, StyleSheet} from "react-native";
import Colors from "../constants/color";

function GuessLogItem({roundNumber, guess}){
    return (
        <View style={styles.listItem}>
            <Text>#{roundNumber}</Text>
            <Text>Opponents Guess: {guess}</Text>
        </View>
    )
}

export default GuessLogItem;

const styles = StyleSheet.create({
    listItem: {
        borderColor: Colors.primary800,
        borderWidth: 1, 
        borderRadius: 40, 
        padding: 12, 
        marginVertical: 8, 
        backgroundColor: Colors.accent500,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        // for andri\oid to get shadow
        elevation: 4,
        // for ios to get shadow
        shadowColor: "black", 
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.25, 
        shadowRadius:3,

        
    }
})