import React, { ReactNode } from 'react'
import { GET_USER, TOKEN_POST, GET_TRANS, TRANS_POST, GET_BALANCE, GET_METODOSPAGAMENTO, GET_CATEGORIAS, GET_TRANS_ID, DELETE_TRANS_ID, GET_INFLOWS, GET_OUTFLOWS, EDIT_TRANS_ID } from '../helpers/api';
import { useNavigate } from 'react-router-dom';
import { dadosInput, dadosInputField, dadosType } from '@/types/userTypes';

interface UserStorageProps {
  children: ReactNode;
};
interface UserContextProps {
  userLogin: (username: string, password: string) => void;
  userTrans: (token: string) => any;
  pegarBalanco: (token: string) => any;
  pegarEntradas: (token: string) => any;
  pegarSaidas: (token: string) => any;
  pegarMetodos: (token: string) => any;
  pegarCategorias: (token: string) => any;
  criarTrans: (description: string, price: number, category: string, type: string, token: string, metodoPagamento: string) => void;
  deletarTransacaoId: (token: string, id: number) => void;
  pegarTransacaoId: (token: string, id: number) => any;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  setInflows: React.Dispatch<React.SetStateAction<number>>;
  setOutflows: React.Dispatch<React.SetStateAction<number>>;
  setDadosretorno: React.Dispatch<React.SetStateAction<dadosInputField>>;
  editTrans: (description: string, price: number, category: string, type: string, token: string, metodoPagamento: string, id:number) => void;
  logado: boolean;
  balance: number;
  inflows: number;
  outflows: number;
  dadosRetorno?:dadosInputField;
  data: {
    username: string;
    roles: string;
  };
};

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps);
export const UserStorage: React.FC<UserStorageProps> = ({ children }) => {

  // @ts-ignore
  const [login, setLogin] = React.useState<boolean>(false);
  const [data, setData] = React.useState({ username: 'Login/Criar', roles: '' });
  const [logado, setLogado] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [inflows, setInflows] = React.useState(0);
  const [outflows, setOutflows] = React.useState(0);
  const [dadosRetorno, setDadosretorno] = React.useState({} as dadosInputField);
  const navigate = useNavigate();

  async function getUser(token: string) {
    const { url, option } = GET_USER(token);
    const response = await fetch(url, option);
    const json = await response.json();
    setData(json);
    setLogin(true);
    if (response.status === 200) {
      navigate('/')
    }
  }
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('accessToken') ?? "";
      if (token) {
        // @ts-ignore
        const response = getUser(token)
          .catch(() => {
            navigate('/login')
          })
      }
      pegarBalanco(token);
    }
    autoLogin();
  }, [])

  async function userLogin(username: string, password: string) {
    const { url, option } = TOKEN_POST({ username, password });
    const response = await fetch(url, option);
    const json = await response.json();
    window.localStorage.setItem('accessToken', json.accessToken);
    getUser(json.accessToken)
    if (response.status === 200) {
      setLogado(true)
      navigate('/')
    }
  }
  async function userTrans(token: string): Promise<dadosType> {
    const { url, option } = GET_TRANS(token);
    const response = await fetch(url, option);
    if (response.status !== 200) {
      navigate('/login')
    }
    const json = await response.json();
    return json as dadosType;
  }
  async function criarTrans(description: string, price: number, category: string, type: string, metodoPagamento: string, token: string) {
    const { url, option } = TRANS_POST({ description, price, category, type, metodoPagamento }, token);
    // @ts-ignore
    const response = await fetch(url, option);
  }
  async function pegarBalanco(token: string) {
    const { url, option } = GET_BALANCE(token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      setBalance(json)
      return json as number;
    } else {
      return null
    }
  }
  async function pegarEntradas(token: string) {
    const { url, option } = GET_INFLOWS(token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      setInflows(json)
      return json as number;
    } else {
      return null
    }
  }
  async function pegarSaidas(token: string) {
    const { url, option } = GET_OUTFLOWS(token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      setOutflows(json)
      return json as number;
    } else {
      return null
    }
  }
  async function pegarMetodos(token: string) {
    const { url, option } = GET_METODOSPAGAMENTO(token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json;
    } else {
      return null
    }
  }
  async function pegarCategorias(token: string) {
    const { url, option } = GET_CATEGORIAS(token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json;
    } else {
      return null
    }
  }
  async function pegarTransacaoId(token: string, id: number) {
    const { url, option } = GET_TRANS_ID(token, id);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json;
    } else {
      return null
    }
  }
  async function deletarTransacaoId(token: string, id: number) {
    const { url, option } = DELETE_TRANS_ID(token, id);
    // @ts-ignore
    const response = await fetch(url, option);
  }
  async function editTrans(description: string, price: number, category: string, type: string, metodoPagamento: string, token: string, id: number) {
    if (description && price && category && type && metodoPagamento && token) {
      // const body = { description, price, category, type, metodoPagamento }
      const { url, option } = EDIT_TRANS_ID( token, id, { description , price , category , type , metodoPagamento } );
      console.log(option+' ' + url)
      // @ts-ignore
      const response = await fetch(url, option);
    }
    // @ts-ignore
  }
  return (
    <UserContext.Provider value={{
      userLogin,
      userTrans,
      criarTrans,
      pegarBalanco,
      pegarEntradas,
      pegarSaidas,
      pegarMetodos,
      pegarCategorias,
      pegarTransacaoId,
      deletarTransacaoId,
      editTrans,
      setBalance,
      setInflows,
      setOutflows,
      setDadosretorno,
      logado,
      balance,
      inflows,
      outflows,
      dadosRetorno,
      data
    }} >
      {children}
    </UserContext.Provider>)
}
