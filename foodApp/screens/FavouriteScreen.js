import { useContext } from "react";
import { Text,StyleSheet, View } from "react-native";
import MealList from "../components/MealList/MealList";
import { FavouriteContext } from "../store/context/favourites-context";
import { MEALS } from "../data/dummy_data";

function FavouriteScreen(){
    const favouriteMealsCtx = useContext(FavouriteContext);
    const favouriteMeals = MEALS.filter((meal) =>
     favouriteMealsCtx.ids.includes(meal.id))
     
     if(favouriteMeals.length === 0){
        return(
            <View style={styles.rootContainer}>
                <Text style={styles.text}>You have no Favourite Meals Yet</Text>
            </View>
        )
     }
    return (
       <MealList items={favouriteMeals} />
    )
}

export default FavouriteScreen;

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    text:{
        fontSize: 18, 
        fontWeight: 'bold',
        color: 'white',
        
    }
})