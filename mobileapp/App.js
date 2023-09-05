import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { StyleSheet, Text, TextInput, View,Button, ScrollView, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/Goalinput';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoal, setCourseGoal] = useState([])
  
  function startAddGoalHandler(){
    setModalIsVisible(true)
  }

  function endAddGoalHandler(){
    setModalIsVisible(false)
  }


  function addGoalHandler(enteredGoalText){
    setCourseGoal((currentCourseGoal) => 
    [
      ...currentCourseGoal, 
      {text: enteredGoalText, id: Math.random().toString()},
    ]
    
    )
    endAddGoalHandler();
  }
  function deleteGoalhandler(id){
    setCourseGoal(currentCourseGoal=> {
      return currentCourseGoal.filter((goal)=>goal.id !==id)
    })
 }
  return (
    <>
    <StatusBar styles="light"/>
    <View style={styles.container}>
      <Button title="Add New Goal" color="#5e0acc"  onPress={startAddGoalHandler}/>
      {modalIsVisible && <GoalInput onCancel={endAddGoalHandler} onAdd={addGoalHandler} visible={modalIsVisible} />}
      
      <View style={styles.goal}>

      <FlatList data={courseGoal} 
      renderItem={(itemData) =>{
        return (
         <GoalItem text={itemData.item.text}  
         onDelete = {deleteGoalhandler}
         id={itemData.item.id}
         />
        )
      }}
      keyExtractor = {(item, index) =>{
        return item.id;
      }}
      />
        
    
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e085a',
    paddingTop: 50,
    paddingHorizontal: 16
  },
 
  goal:{
    flex:4,
  },
 
});
