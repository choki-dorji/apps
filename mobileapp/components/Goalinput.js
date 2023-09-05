import {View, Text, StyleSheet, TextInput, Button, Modal, Image} from 'react-native'
import {useState} from 'react'

function GoalInput(props){
    const [enteredGoalText, setEnteredGoalText] = useState('')

    function goalInputHandler(enteredText){
        setEnteredGoalText(enteredText)
      }

    function addGoalHandler(){
        props.onAdd(enteredGoalText);
        setEnteredGoalText('')
    }
    return(
        <Modal visible={props.visible} animationType="slide">
        <View style={styles.search}>
            <Image style = {styles.image}source={require('../assets/images/download.png')} />
        <TextInput
         placeholder='Your Course Goal! '
         style={styles.Textinput}
         onChangeText={goalInputHandler}
         value={enteredGoalText}
         />

         <View style={styles.buttonContainer}>
            

            <View style={styles.button}>
                <Button 
                title="Cancel"
                onPress={props.onCancel}
                color="#f31282"
               
                />

            </View>
            <View style={styles.button}>
                <Button 
                title="Add Goal"
                onPress={addGoalHandler}
                color="#5e0acc"
                />
            </View>
           
        
        </View>
       
      </View>
      </Modal>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    search: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
       backgroundColor: '#311b6b',
       padding: 16
      },
      Textinput: {
        paddingLeft: 16,
        borderWidth: 1, 
        borderColor: '#ccc',
        width: '88%',
        height:40,
        borderRadius: 6,
        color: '#120438',
        backgroundColor: "#e4d0ff",
        borderColor: "#e4d0ff"
      },
      buttonContainer:{
        marginTop: 16,
        flexDirection: 'row'
      }, 
      button:{
        width: 100,
        marginHorizontal: 8
      }, 
      image:{
        width: 100,
        height: 100,
        margin: 20
      }
})