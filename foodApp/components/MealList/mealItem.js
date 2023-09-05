import { View, Pressable, Text, Image, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import MealDetails from '../MealDetail';

function MealItem({id, title, imageUrl, duration, complexity, affordability}){
    const navigation = useNavigation();
    
    function selectMealItemhandler(){
        navigation.navigate('MealDetails', {
            mealId : id
        })
    }

    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{color: '#ccc'}}
            style={({pressed})=>pressed ? styles.buttonPressed: null}
            onPress={selectMealItemhandler}
            >
                <View>
                    <Image source={{uri: imageUrl}} style={styles.image}/>
                    <Text style={styles.text}>{title}</Text>
                </View>
                <MealDetails 
                duration={duration} 
                affordability={affordability}
                complexity={complexity}
                />
                
            </Pressable>
           
        </View>
    )
}

export default MealItem;

const styles = StyleSheet.create({
    mealItem:{
        margin: 16, 
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 4,

    },
    image:{
        width: '100%', 
        height: 200,
    }, 
    text:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:18,
        margin: 8
    },
   
    buttonPressed:{
        opacity: 0.5,
    }
})