import React, {useState, useEffect, createContext} from "react";

import {useNavigate} from "react-router-dom";


export const Authcontext = createContext();

export const AuthProvider = ({children}) =>{

    //Navegar diretamente para uma pagina
    const navigate = useNavigate();

    const [user, setUser] =  useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        
        // recuperar o utilizador para que assim que a pagina for atualizada não seja perdida a informação de login
        const recoverUser = localStorage.getItem("user");
        
        // se o utilizador existir
        //vamos setar o utilizador com o valor dado pelo localStorage
        if(recoverUser){
        
            setUser(JSON.parse(recoverUser));
       
        }
       
        setLoading(false);
    }, []);

    // uma arrow function que recebe como parametros o email , password e a resposta do servidor
    const login = (email, password, response) =>{

        // setar um array
        const loggedUser = {

            //id vai ter o valor que veio do servidor na posição 0 o codigo
            id: response.data[0].codigo,

            email: response.data[0].email

        }

        //Guardar os valores do utilizador no localStorage do navegador mas os dados tem de ser uma String
        // mas como o loggedUser é um array temos de o transformar em uma String usando o JSON.Stringify
        localStorage.setItem("user", JSON.stringify(loggedUser));

        if(email === response.data[0].email && password === response.data[0].password){
            
            setUser(loggedUser);
            
            navigate("/");
        }    
    }

    const logout = () =>{
        
        // se o utilizador fizer logout temos de eleminar os dados que estão guardados no localStorage
        localStorage.removeItem("user");
        
        setUser(null);
    
        navigate("/Login");
    };
    
    return(
        <Authcontext.Provider value={{authenticated: !!user, user,loading, login, logout}}>
        {children}
        </Authcontext.Provider>
    )

}