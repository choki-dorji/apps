import {CATEGORIES} from '../data/dummy_data';
import { FlatList } from 'react-native';
import CategoryGridTiles from '../components/CategoryGridTiles';




function CategoryScreen({navigation}){
    function renderCategoryItem(itemData){
        function pressHandler(){
            navigation.navigate('MealsOverView', {
                categoryId:itemData.item.id,
                
            });
        }
    
        return (
            <CategoryGridTiles title={itemData.item.title} color={itemData.item.color}
            onPress={pressHandler}
            />
        )
    }
    return <FlatList
    data={CATEGORIES}
    keyExtractor = {(item) => item.id}
    renderItem = {renderCategoryItem}
    numColumns={2}
    />
}

export default CategoryScreen;