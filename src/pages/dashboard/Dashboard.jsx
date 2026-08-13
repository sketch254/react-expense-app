import Button from "../../components/reusable/button/button";
import { useAuth } from "../../context/AuthContext";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function Dashboard() {
    const { user, logout } = useAuth();

    return(
        <div>
            <header>
                <h1>Hello, {user?.name}</h1>
                <Button
                    variant="secondary"
                    onClick={logout}
                >logout</Button>
            </header>
            <hr />
            <ExpenseForm />
            <ExpenseList />
        </div>
    )

}

export default Dashboard;
