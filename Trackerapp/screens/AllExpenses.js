import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";

function AllExpences(){
    const expenseCtx = useContext(ExpenseContext);

    return(
       <ExpensesOutput 
       expenses={expenseCtx.expenses} 
       expensesPeriod="Total" 
       fallbackText="No Registerd expenses found"
       />
    )
}

export default AllExpences;