import React, {useContext} from "react";

import { Authcontext } from "./Auth";

import { Link } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Criação de uma função
const Listagem = () =>{

  // criar uma constante que vai usar a função logout criada noutro ficheiro
    const { logout } = useContext(Authcontext)
    
    // criar uma função para chamar o logout
    const handleLogout = () =>{
        logout();
    }

    // criação de um estado para dar valores a uma variavel
    const [registos, setRegistos] = useState("");

    const [uti, setUti] = useState([]);

    //criação de uma função asincrona que sempre que for chamada vai verificar os dados na base dedados
    const carregar_dados = async () =>{

      //Requesição a pagina para obter dados
      // Com o await ele não vai executar os outros comando enquanto este não terminar a execusao
        const response = await axios.post("http://localhost:3001/Listagem")

        //dar valores ao registo e ao utilizador
        setRegistos(response.data.length)
        setUti(response.data)
    }

    // usado para estar sempre atento a mudança de variaveis assim atualizando automaticamente
    // sem ser necessario uma atualização da pagina
    useEffect(()=>{
        carregar_dados();
    }, [])

    // uma função com um parametro ID
    // esta funçãp vai primeiro perguntar ao utilizador se tem a certeza que quer eleminar o utilizador com aquele ID
    // se sim executa o codigo
    const eleminar = (id) =>{
   
        if(window.confirm(`Tem a certeza que deseja eliminar o utilizador com o id = ${id} ?`)){

          // manda como parametro o id para a pagina
            axios.post(`http://localhost:3001/eliminar/${id}`); 

            // usado para criar uma barra de notificação neste caso de sucesso
            toast.success("contacto eleminado")

            // usado para que assim que a função for executada ele vai chamar o carregar_Dados
            // Para assim as variaveis serem atualizadas
            setTimeout(()=> carregar_dados());
        }

    }

return( 
    
  <div>
    <header>

      <nav>
        <Link to="/" > CRUD </Link>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Listagem" >Listagem</Link>
            </li>
            <li>
              <Link to="/Create">Criar Novo</Link>
            </li>
            <li>
                <button onClick={handleLogout}>Terminar sess&atilde;o</button>
            </li>
          </ul>


          <form  name="frmPesquisa" method="post" action="read.php">
            <input type="text" placeholder="Pesquisa" aria-label="Search" name="pesquisa"/>
            <button type="submit">Pesquisar</button>
          </form>

        </div>
      </nav>
  
    </header>

    <main>     
      <div>  
        <div>

          <legend>C<strong>Read</strong>UD</legend>
        
        </div>

        <div>        
          <p>Foram encontrado(s) {registos} registo(s).</p>
        </div>

        <div>
          <table border="1px" align="center">
            <tr> 
              <td> codigo </td>  
              <td> nome</td>
              <td> email </td>
              <td> alterar</td>
              <td> eleminar</td>
            </tr>
            <tbody>
              {
                uti.map((val, index) =>{
                  return( 
                          <tr key = {val.codigo}> 
                            <td>
                              <strong>{val.codigo}</strong>
                            </td>
                            <td>
                              <strong> {val.nome}  </strong>
                            </td>
                            <td>   
                              <strong>  {val.email}</strong> 
                            </td>
                            <td>
                              <Link to={`/Update/${val.codigo}`}>
                                <button >  <strong> ALTERAR </strong> </button>
                              </Link>
                            </td>              
                            <td>
                              <button  onClick={()=>eleminar(val.codigo)}>  <strong>  ELIMINAR</strong> </button>
                              <ToastContainer/>
                            </td>        
                          </tr>
                        )//return
                          
                        })        
                }
            </tbody>
          </table>         

        </div>
      </div>



        <footer>
          <p>&copy; 2021 Jos&eacute; Monteiro</p>
        </footer>

    </main>
  </div>

)

}
export default Listagem;