import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [clave, setClave] = useState("")
    const [emailError, setEmailError] = useState("")
    const [claveError, setClaveError] = useState("")
    const [response, setResponse] = useState("")

    //const [users, setUsers] = useState([])

    
    const navigate = useNavigate();

    const onButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setClaveError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === clave) {
            setClaveError("Please enter a password")
            return
        }

        if (clave.length < 7) {
            setClaveError("The password must be 8 characters or longer")
            return
        }
        
        // Check if email has an account associated with it
        checkAccountExists(accountExists => { 
            console.log("accountExist: " + response)})   

        
        console.log(response)
        if (response.dataValues.length > 0) {
            console.log(response.dataValues.length)
            console.log("Redireccionamos a una vista nueva")
            window.confirm("Welcome to a secure plataform feel free to report the abuse: " + email)
            navigate('/Report');
        } else {
            window.confirm("An account does not exist with this email address: " + email + ". Do you want to create a new account?")
        }
    }
    
    // Call the server API to check if the given email ID already exists
    const checkAccountExists = (callback) => {
        console.log(email," ", clave)
        fetch("http://localhost:3000/getUsuarioLogin", { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email,clave})
        })
        .then(r => r.json())
        .then(data => {setResponse(data)})
        .then(r => {
            callback(response)
        })

    }

    // Log in a user using email and clave
    const logIn = () => {
        console.log("llegando al login")
        fetch("http://localhost:3000/getUsuario", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({email, clave})
        })
        .then(r => r.json())
        .then(r => {
            if ('success' === r.message) {
                localStorage.setItem("user", JSON.stringify({email, token: r.token}))
                props.setLoggedIn(true)
                props.setEmail(email)
                navigate("/")
            } else {
                window.alert("Wrong email or clave")
            }
        })
    }
    
    return <div className={"mainContainer"}>
        <div className={"titleContainer"}>
            <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                value={clave}
                placeholder="Enter your clave here"
                onChange={ev => setClave(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{claveError}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
            <input
                className={"inputButton"}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>
}

export default Login