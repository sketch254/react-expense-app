import { use, useState } from "react";

import Login from "../../components/auth/Login";
import Signup from "../../components/auth/Signup";
import "./AuthPage.css";

function AuthPage(){
    const [prefill, setPrefill] = useState({
        name: "",
        email: ""
    })

    function handleSignupComplete(name, email){
        setPrefill({name, email})
    }

    return(
        <div className="auth-page">
            <div className="auth-page__panel">
                <Login prefillName={prefill.name} prefillEmail={prefill.email} />
            </div>

            <div aria-hidden="true" className="auth-page__divider" />

            <div className="auth-page__panel">
                <Signup onSignupComplete={handleSignupComplete} />
            </div>
        </div>
    )

}

export default AuthPage
