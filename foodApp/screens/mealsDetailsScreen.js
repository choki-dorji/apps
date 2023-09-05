import { Text, View, Image, StyleSheet, ScrollView, Button} from "react-native";
import MealDetails from "../components/MealDetail";
import Subtitle from "../components/MealDetail/Subtitle";
import { MEALS } from "../data/dummy_data";
import List from "../components/MealDetail/List";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/iconbutton";
import { FavouriteContext } from '../store/context/favourites-context'

function MealsDetailScreen({route, navigation}){
    const favouriteMealsCtx = useContext(FavouriteContext)

    const mealId = route.params.mealId
    const selectedMeal = MEALS.find((meal)=> meal.id === mealId)

    
    const mealIsFavorite = favouriteMealsCtx.ids.includes(mealId)

    function changeFavouriteStatusHandler(){
        if(mealIsFavorite) {
            favouriteMealsCtx.removeFavourite(mealId)
        }else{
            favouriteMealsCtx.addFavourite(mealId);
        }
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:() =>{
                return (
                    <IconButton 
                    onPress={changeFavouriteStatusHandler}
                    icon={mealIsFavorite ? 'star' : 'star-outline'}
                    color='white'
                    />
                )
            }
        })
    }, [navigation, changeFavouriteStatusHandler])   
    
    return (
        <ScrollView>
        <View>
            <Image style={styles.image} source={{uri: selectedMeal.imageUrl}}/>
            <Text style={styles.title}>{selectedMeal.title}</Text>  
            
            <MealDetails 
            duration={selectedMeal.duration}
            complexity={selectedMeal.complexity}
            affordability = {selectedMeal.affordability}
            textStyles={styles.detailText}
            />

            <View style={styles.listOutputConatainer}>
                <View style={styles.listContainer}>
                <Subtitle>
                Ingredent
            </Subtitle>
            <List data={selectedMeal.ingredients}/>
            

            <Subtitle>
                Steps
            </Subtitle>
            <List data={selectedMeal.steps} />

                </View>
            </View>
            
           
        </View>
        </ScrollView>
    )
}

export default MealsDetailScreen;
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 350,
    },
    title:{
        fontWeight: 'bold',
        fontSize: 24, 
        textAlign: "center",
        color: 'white'
    }, 
    detailText:{
        color: 'white',
    },
    listContainer:{
        width: '80%'
    }, 
    listOutputConatainer:{
        alignItems: 'center',
    }
    
})