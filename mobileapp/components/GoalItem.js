import {StyleSheet, View, Text, Pressable} from 'react-native';

function GoalItem(props) {

    return (
        // (works only in andriod)ripple was some thing like hightlight when the cursor is take on it
            
        <View style={styles.showText}>
            <Pressable android_ripple={{color: '#dddddd'}} onPress={props.onDelete.bind(this, props.id)}>
            <Text style={{color: '#fff', padding: 8, }} >{props.text}</Text>
            </Pressable>
        </View>
        
  )
}

export default GoalItem;

const styles = StyleSheet.create({
    showText: {
        margin: 8, 
        borderRadius: 6, 
        backgroundColor: '#5e0acc',
      },
})