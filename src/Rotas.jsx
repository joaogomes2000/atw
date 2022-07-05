import React, { useContext } from "react";

import { BrowserRouter as Router,
    Route,
     Routes,
     Navigate
       } from "react-router-dom";

import LoginPage from "./Login";

import HomePage from './HomePage';

import Listagem from "./Listagem";

import Update from "./Update";

import Create from "./Create";

import { AuthProvider, Authcontext } from "./Auth";



const Rotas = () =>{

    const Private = ({children}) =>{
        const { authenticated, loading} = useContext(Authcontext);

        if(loading) {
            return <div className="loading"> Carregando</div>
        }

        if(!authenticated){
            return <Navigate to="/login"/>
        }
        return children;
    }

   return(
       <Router>
        <AuthProvider>
           <Routes>
               <Route exact path="/Login" element={<LoginPage />} />
               <Route exact path="/" element={<Private> <HomePage /> </Private>} />
               <Route exact path="/Listagem" element={<Private> <Listagem/> </Private>} />
               <Route exact path="/Update/:id" element= {<Private> <Update /> </Private>} />
               <Route exact path="/Create" element={<Private> <Create/></Private>} />
           </Routes>
        </AuthProvider>
       </Router>
   );
}

export default Rotas;