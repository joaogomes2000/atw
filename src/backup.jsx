import React, {useContext} from "react";
import { Authcontext } from "./Auth";
import { useParams,Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
 import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = () =>{
    const { logout } = useContext(Authcontext)
    const {nome, setNome} = useState("");
    const {email, setEmail} = useState("");
    //const [uti, setUti] = useState(nome, email);
    const {id} = useParams();
    const handleLogout = () =>{
        logout();
    }

    useEffect(()=>{
        axios.get(`http://localhost:3001/Listagem/${id}`).then((resp)=>
            setNome({...resp.data[0].nome})
            //alert(nome);
            //alert(email)
           //// console.log("ola",uti.nome)
            //setNome(resp.data[0].nome)
           // console.log("adeus", nome)
        )
    },[id])



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
                  <a href="read.php">Listagem</a>
                </li>
                <li >
                  <a href="create.php">Criar Novo</a>
                </li>
                <li>
                <button onClick={handleLogout}>Terminar sess&atilde;o</button>
                </li>
              </ul>
    
        
              {/* <form role="form" name="frmPesquisa" method="post" action="read.php">
                <input type="text" placeholder="Pesquisa" aria-label="Search" name="pesquisa"/>
                <button type="submit">Pesquisar</button>
              </form> */}
    
            </div>
          </nav>

        </header>
    
        <main>     
          <div>
            <legend>CR<strong>Update</strong>D</legend>
        </div>
    
        <div>

              <div >
                <h4>Info!</h4>
                <hr/>
                Os dados foram atualizados com sucesso.
              </div>

                <div>
                <h4>Alerta!</h4>
                  <hr/>
                  {/* <p><?PHP echo $nomeErr ?></p> */}
                  {/* <p><?PHP echo $emailErr ?></p>  */}
                </div>

        </div>
    
        <div>
            <form name="frmInserir" method="post" action="">
                <div>
                  <label for="nome">Nome </label>
                  <div>
                  <input
                 id="nome" 
                 type="text" 
                 value={nome || ""} 
                onChange={(e) => setNome(e.target.value)}
                />
                    {/* <input name="nome" type="text" value="<?php echo $row['nome'];?>" placeholder="Nome"/> */}
                  </div>
                </div>
                <div>
                  <label for="email">Email </label> 
                  <div>
                  <input
                 id="email" 
                 type="email" 
                 value={email || ""} 
                onChange={(e) => setEmail(e.target.value)}
                /> 
                    {/* { <input name="email" type="email" value="<?php echo $row['email'];?>" placeholder="Email"/> } */}
                  </div> 
                </div>
                <div>
                  <div>
                    <div>
                        <input name="codigo" type="hidden" value="<?PHP echo $codigo; ?>" />
                        <button name="alterar" type="submit" >Alterar</button>
                        <button name="limpar" type="reset" >Limpar</button>
                        <a href="read.php">Voltar &agrave; Lista</a>
                    </div>
                  </div>
                </div>
            </form>
          </div>
    
          <footer>
            <p>&copy; 2021 Jos&eacute; Monteiro</p>
          </footer>

        </main>	
        </body>

    )

}

export default Update