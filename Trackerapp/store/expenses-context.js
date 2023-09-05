import { createContext, useReducer } from "react";
import { add } from "react-native-reanimated";


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: (description, amount, date) => {},
    setExpense: ((expense) => {}),
    deleteExpense: (id) => {},
    updateExpense: (id, description, amount, date) => {},
});

function expenseReducer(state, action){
    switch(action.type){
        case "ADD":
            // generating unique ramdom number
            return [action.payload,...state];
        
            case 'SET':
                const inverted = action.payload.reverse();
                return inverted;
        
            case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data} 
            const updatedExpenses = [...state]

            updatedExpenses[updatableExpenseIndex] = updatedItem
            return updatedExpenses;
        default:
            return state
    }
}


function ExpeneseContextProvider({ children }){
    const [expensesState, dispatch] = useReducer(expenseReducer,[]);

    function setExpense(expense){
        dispatch({type: 'SET', payload: expense})
    }

    function addExpense(expensesData){
        dispatch({ type: "ADD", payload: expensesData })
    }
    function deleteExpense(id){
        dispatch({ type: "DELETE", payload:id })
    }
    function updateExpense(id, expensesData){
        dispatch({ type: "UPDATE", payload:{id: id, data: expensesData} })
    }
    
    const value = {
        setExpense: setExpense,
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense

    }
    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}


export default ExpeneseContextProvider;