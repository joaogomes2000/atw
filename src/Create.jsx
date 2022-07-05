import React, {useContext} from "react";

import { Authcontext } from "./Auth";

import { Link } from "react-router-dom";

import { useState } from "react";

import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Create = () =>{

  const { logout } = useContext(Authcontext)

  const handleLogout = () =>{

    logout();

  }

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [nome, setNome] = useState("");

  const handleSumbit = (e) =>{

    e.preventDefault();

    if(nome && email && password){

      axios.post("http://localhost:3001/Create", {

      nome: nome,

      email: email,

      password: password,

    }).then((response) =>{

      console.log(response.data);

      toast.success("Utilizador inserido")

    })

  }else{

    toast.error("Tem de inserir em todos os campos")

  }
   
    }
      return (
        <body>
          
          <header>
          
            <nav>
          
              <Link to="/">CRUD</Link>
              
              <div>
              
                <ul>
              
                  <li>
                  
                    <Link to="/"> Home</Link>
                 
                  </li>
                 
                  <li>
                    
                    <Link to="/Listagem">Listagem </Link>
                  
                  </li>
                  
                  <li>
                    
                    <Link to="/Create">Criar Novo</Link>
                  
                  </li>
                  
                  <li>
                    
                    <button onClick={handleLogout}>Terminar sess&atilde;o</button>
                  
                  </li>
                
                </ul>
        
              </div>
            </nav>

          </header>
      
          <main>     
            
            <div>
            
              <legend>CR<strong>Update</strong>D</legend>
            
            </div>

            <div>
              <p> nome</p>
              <input
                id="nome" 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)}
              ></input>
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
              <ToastContainer />
            </div>
      
            <footer>
              
              <p>&copy; 2021 Jos&eacute; Monteiro</p>
            
            </footer>

          </main>	
        
        </body>
    );
}

export default Create