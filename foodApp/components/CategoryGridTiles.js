import { View, Pressable, Text, StyleSheet, Platform} from "react-native";


function CategoryGridTiles({title, color, onPress}){
    return (
        <View style={[styles.gridItem]}>
            <Pressable  
            android_ripple={{color: '#ccc'}} style={({pressed})=>[styles.button, pressed ? styles.buttonPressed: null]}
            onPress={onPress}
            >
                <View style={[styles.innerContainer, , {backgroundColor: color}]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )

}

export default CategoryGridTiles;

const styles = StyleSheet.create({
    gridItem :{
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 4,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset:{width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 8,
        backgroundColor: "fff",
        overflow: Platform.OS === "android" ? "hidden" : "visible",
    },
    innerContainer:{
        flex: 1, 
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    button:{
        flex: 1
    },
    buttonPressed:{
        opacity: 0.5
    },

    title:{
        fontWeight: 'bold',
        fontSize: 18
    }
})