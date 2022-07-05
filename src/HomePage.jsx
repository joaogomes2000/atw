import React, {useContext} from "react";

import { Authcontext } from "./Auth";

import { Link } from "react-router-dom";

const HomePage = () =>{

  // usa o logout definido no utro ficheiro
    const { logout } = useContext(Authcontext)
   
    // função para chamar a função criada no outro ficheiro
    const handleLogout = () =>{
        logout();
    }

return( 
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

        <div>

          <div>

            <div>
              
              <div>

                <h5>A aplica&ccedil;&atilde;o</h5>
              
              </div>
              
              <div>
              
                <p>A aplica&ccedil;&atilde;o CRUD destina-se exemplificar a aplica&ccedil;&atilde;o de v&aacute;rios conhecimentos na ado&ccedil;&atilde;o de PHP. 
                Por exemplo, vari&aacute;veis, ciclos, decis&otilde;es, formul&aacute;rios, manuten&ccedil;&atilde;o de bases de dados, etc.</p>
              
              </div>
            </div>

          </div>

          <div>
          
            <div>
          
              <div>
          
                <h5>A abordagem</h5>
          
              </div>
          
              <div>
          
                <p>Os exemplos documentados seguem uma abordagem procedimental.</p>
          
              </div>
          
            </div>
          
          </div>  
          
          <div>
          
            <div>
          
              <div>
          
                <h5>Sugest&otilde;es</h5>
          
              </div>
          
              <div>
          
                <p>Sugest&otilde;es de desenvolvimento futuro: migrar para orienta&ccedil;&atilde;o a objetos ou para orienta&ccedil;&atilde;o a dados.</p>
          
              </div>
          
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
export default HomePage;