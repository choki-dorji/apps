import { View, Text, StyleSheet} from "react-native";

function Subtitle({children}){
return (
    <View style={styles.titleConatiner}>
            <Text style={styles.subtitle}>{children}</Text>
    </View> 

)
}

export default Subtitle;

const styles = StyleSheet.create({
    subtitle:{
        color: '#e2b497',
        fontSize: 18, 
        fontWeight: 'bold',
        textAlign: 'center',

    }, 
    titleConatiner:{
        margin:4,
        padding: 6, 
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2,
        marginHorizontal: 20,
        marginVertical: 4,
    }
})