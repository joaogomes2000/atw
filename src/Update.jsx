import React, {useContext} from "react";
import { Authcontext } from "./Auth";
import { useParams,Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () =>{
      const estadoinicial = {
        nome: "",
        email: "", 
    }
    const [estado, setEstado] = useState(estadoinicial);
  const {id} = useParams();
  const [novonome, setNovonome] = useState("");
  const [novoemail, setNovoemail] = useState("");
  const carregar_dados = async () =>{
    axios.get(`http://localhost:3001/Listagem/${id}`).then((resp)=>
    setEstado({...resp.data[0]}) )

}
useEffect(()=>{
  carregar_dados();
})
    const {nome, email} = estado

    const { logout } = useContext(Authcontext)
    const handleLogout = () =>{
        logout();
    }

    const update = () =>{
      if(novonome && novoemail){
        axios.post(`http://localhost:3001/Update/${id}`,{
              novonome: novonome,
              novoemail: novoemail,
            }).then((response) =>{
                console.log(response)
                toast.success("contacto atualizado")
                setTimeout(()=> carregar_dados());
            })
      }else{
        if(novonome){
            axios.post(`http://localhost:3001/Update/${id}`,{
              novonome: novonome,
              novoemail: estado.email,
            }).then((response) =>{
                console.log(response)
                toast.success("contacto atualizado")
                setTimeout(()=> carregar_dados());
            })
        }
        if(novoemail){
          axios.post(`http://localhost:3001/Update/${id}`,{
            novonome: estado.nome,
            novoemail: novoemail,
          }).then((response) =>{
            console.log(response)
            toast.success("contacto atualizado")
            setTimeout(()=> carregar_dados());
        })
        }
      }
      if(!novonome && !novoemail){
        toast.error("Tem de inserir valores em pelo menos um dos campos")
      }
    }

    return(
        <body>
        <header>
          <nav>
            <Link to="/">CRUD</Link>
            <div>
              <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/Listagem">Listagem</Link>
                </li>
                <li >
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
                <div>
                  <label for="nome">Nome </label>
                  <div>
                  <label> {nome} </label>
                  <input
                 id="nome" 
                 type="text" 
                 name="nome"
                 placeholder="insira um novo nome"
                 value={novonome} 
                 onChange={(e) => setNovonome(e.target.value)}
          
                />
                    {/* <input name="nome" type="text" value="<?php echo $row['nome'];?>" placeholder="Nome"/> */}
                  </div>
                </div>
                <div>
           
  
                   <label for="email">Email </label> 
                   <div>
                   <label> {email}</label>
                  <input
                 id="email" 
                 name="email"
                 type="email" 
                 value={novoemail} 
                 placeholder="Insira um novo email"
                 onChange={(e) => setNovoemail(e.target.value)}
           
                ></input>  
                  
                  </div> 
                </div>
                <div>
                  <div>
                    <div>
                        <input name="codigo" type="hidden" value="<?PHP echo $codigo; ?>" />
                        <button onClick={update} >Alterar</button>
                        <Link to="/Listagem">Voltar &agrave; Lista</Link>
                        <ToastContainer />
                    </div>
                  </div>
                </div>
          </div>
    
          <footer>
            <p>&copy; 2021 Jos&eacute; Monteiro</p>
          </footer>

        </main>	
        </body>

    )

}

export default Update