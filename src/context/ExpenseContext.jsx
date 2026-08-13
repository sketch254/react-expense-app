import { createContext, useContext, useReducer,  useEffect } from "react"

const ExpenseContext = createContext(null)

function getInitialState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            return { expenses: JSON.parse(saved) };
        }
    } catch (e) {
        console.warn("Could not load expenses from localStorage", e);
    }
    return { 
        expenses: [] 
    };
}

function expenseReducer(state, action){
    switch (action.type){
        case "SET_EXPENCES":
            return {
                ...state, expense :  action.payload
            }
        case "ADD_EXPENCE":
            return {
                ...state, expense : [...state.expence, action.payload]
            }
        case "UPDATE_EXPENCE":
            return {
                ...state, expense : state.expences.map((elem) => (
                    elem.id === action.payload.id ? action.payload : elem
                ))
            }
        case "DELETE_EXPENCE":
            return {
                ...state, expense : state.expences.filter((elem) => (
                    elem.id !== action.payload.id
                ))
            }
        default:
            return state;
    }
}

export function ExpenseProvider({ children }){
    const [state, dispatch] = useReducer(expenseReducer, undefined, getInitialState)


    useEffect(() => {
        localStorage.setItem("expense", JSON.stringify(state.expenses));
    }, [state.expenses]);

    function addExpense(expence){
        dispatch({
            type: "ADD_EXPENCE",
            payload: {
                ...expence,
                id: Date.now() // to make expense unique
            }
        })
    }

    function updateExpense(expence){
        dispatch({
            type: "UPDATE_EXPENCE",
            payload: expence
        })
    }

    function deleteExpense(id){
        dispatch({
            type: "DELETE_EXPENCE",
            payload: id
        })
    }

    function setExpenses(list){
        dispatch({
            type: "SET_EXPENCES",
            payload: list
        })

    }

    const value = { 
        expense : state.expense,
        addExpense,
        updateExpense,
        deleteExpense,
        setExpenses
    }

    return <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
}

// custom hook
export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used inside ExpenseProvider");
  }
  return context;
}
