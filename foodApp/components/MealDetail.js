import {Text, View, StyleSheet} from 'react-native'

function MealDetails({duration, complexity, affordability, style, textStyles}){
   return(
    <View style={[styles.details, style]}>
                    <Text style={[styles.detailItem, textStyles]}>{duration} minutes</Text>
                    <Text style={[styles.detailItem, textStyles]}>{complexity.toUpperCase()}</Text>
                    <Text style={[styles.detailItem, textStyles]}>{affordability.toUpperCase()}</Text>        
    </View>
   )
}
export default MealDetails;

const styles = StyleSheet.create({
    details:{
        flexDirection: 'row',
        alignItems: 'center',
        padding:8,
        justifyContent: 'center',

    }, 
    detailItem:{
        marginHorizontal: 4,
        fontSize: 12
    },
})