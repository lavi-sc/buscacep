//Bloco de importações do codigo
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css'; //estilo da pagina
import api from "./services/api" //importando api

function App(){
 //função app cria variaveis de comportamento 
  const [input, setInput] = useState(''); //variavel input, para mudar o valor da variavel se usa setInput
  const [cep, setCEP] = useState({}); //objeto vazio

  async function handleSearch (){ //funçaõ assicrona
     //cria a funçao para trazer as requesições api 

    if(input === ''){ //verifica se o usuario preencheu o com o cep 
      alert("Preencha algum CEP!") //verificação
      return;
    }
    try{ //executa a ação que eu quero, recebendo o valor da api e o valor digitado pelo usuario
      const response = await api.get(`${input}/json`) //json usado para finalizar minha requisição

      setCEP(response.data)
      setInput("") //finaliza zerando o valor do input
    }catch{ //caso o try da errado ele vai entrar no catch
      alert("Erro ao buscar CEP!")
      setInput("")
    }
  }

return( //retorna minha requisição, retornando uma pagina em react
  <div className="container">
  <h1 className="title">Buscador CEP</h1>
  //se houver erro o style não

  <div className="containerInput">
    <input
    type="text"
    placeholder="Digite seu CEP..." //onde o usuario escreve o CEP
    value={input} 
    onChange={(e) => setInput(e.target.value)} //funçao onChange captura tudo que é escrito pelo usuario  no Input
  />
  //on click chama a funçao
  <button className="buttonSearch" onClick={handleSearch}> //chama o parametro
    <FiSearch size={26} color="#FFF"/>   
  </button>
  </div>

  {Object.keys(cep).length > 0 && (
    <main className="main"> //verifica se tem alguma coisa no objeto cep
      <h2>CEP: {cep.cep}</h2> // os ceps é para informações que estão na variavel cep
      <span>Rua: {cep.logradouro}</span>
      <span>Complemento: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>{cep.localidade} - {cep.uf}</span>
      </main>
  )}
  </div>
);
}

export default App; //caso não exportar a aplicação não ir funcionar, pois a aplicação app se torna publica, se quiser ultilizar de outrar maneiras pode exportar.s
