import React, { useState, useContext } from "react";
import { Authcontext } from "./Auth";
import Axios from "axios";
const LoginPage = () =>{
    const { login} = useContext(Authcontext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginstatus, setLoginstatus] = useState("");

    const handleSumbit = (e) =>{
        e.preventDefault();

        Axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        }).then((response) =>{
            console.log(response.data);
            if(response.data === "utilizador não encontrado tente novamente"){
                setLoginstatus(response.data)
            }else{
                login(email, password, response);
            }
        })
    }
    return (
    <div id="login">
        <form className="form" >
            <div className="field">
                <p> email</p>
                <input
                 id="email" 
                 type="email" 
                 value={email} 
                onChange={(e) => setEmail(e.target.value)}
                ></input>
                <p> password </p>
                <input id="password" type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <br></br>
                <button id="submit" type='submit'onClick={handleSumbit}>
                enviar
                </button>
            </div>
            <h1> {loginstatus}</h1>
        </form>
    </div>
    );
}
export default LoginPage;