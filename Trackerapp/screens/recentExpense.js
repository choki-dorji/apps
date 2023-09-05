import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverLay from "../components/UI/ErrorOverlay";
import LoadingOverLay from "../components/UI/loadingOverlay";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpence(){
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()

    const expenseCtx = useContext(ExpenseContext);

    // const [fetchExpense, setFetchExpense] = useState([])
    useEffect(() =>{
        async function getExpenses(){
            setIsFetching(true)
            try{
                const expenses = await fetchExpenses();
                expenseCtx.setExpense(expenses)
            }catch(e){
                setError('Could not fetch expense')
            }
            
            setIsFetching(false)
            
        }
        getExpenses();
        
    }, [])



if(error && !isFetching){
    return (
        <ErrorOverLay message={error}  />
    )
}

if (isFetching){
    return(
        <LoadingOverLay />
    )
}

    const recentExpenses = expenseCtx.expenses.filter((expense)=>{
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7)
        return (expense.date >= date7daysAgo) && (expense.date <= today)
    })

    return(
        <ExpensesOutput 
        expenses={recentExpenses} 
        expensesPeriod="Last 7 Days" 
        fallbackText="No expenses registered for the last 7 days"
        />
    )
}

export default RecentExpence;