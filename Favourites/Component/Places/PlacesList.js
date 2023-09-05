import { FlatList, Text, StyleSheet, View } from "react-native"
import { Colors } from "../../constants/colors"
import PlaceItem from "./PlaceItem"

function PlacesList({places}){
    if(!places || places.length === 0){
        return(
            <View style={styles.fallBackcontainer}>
                <Text style={styles.fallBackText}>No places added yet - start adding some!</Text>
            </View>
        )
    }
    <FlatList
        data={places}
        keyExtractor={(item) => item.id}
        renderItem={(item)=> <PlaceItem place={item} />}
    />
}

export default PlacesList

const styles = StyleSheet.create({
    fallBackcontainer:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    fallBackText:{
        fontSize: 16,
        color: Colors.primary200
    }
})