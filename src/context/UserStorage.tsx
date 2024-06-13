import React, { ReactNode } from 'react'
import { GET_USER, TOKEN_POST, GET_TRANS, TRANS_POST, GET_BALANCE, GET_METODOSPAGAMENTO, GET_CATEGORIAS, GET_TRANS_ID, DELETE_TRANS_ID } from '../helpers/api';
import { useNavigate } from 'react-router-dom';
import { dadosType } from '@/types/userTypes';

interface UserStorageProps {
  children: ReactNode;
};

interface UserContextProps {
  userLogin: (username: string, password: string) => void;
  userTrans: (token: string) => object;
  pegarBalanco: (token: string) => any;
  pegarMetodos: (token: string) => any;
  pegarCategorias: (token: string) => any;
  criarTrans: (description: string, price: number, category: string, type: string, token: string, metodoPagamento: string) => void;
  deletarCategoriasId:(token:string, id:number) => void;
  pegarCategoriasId:(token: string, id:number) => any;
  data: {
    username: string;
    roles: string;
  } | null;
};

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps);
export const UserStorage: React.FC<UserStorageProps> = ({ children }) => {

  
  const [data, setData] = React.useState(null);
  // @ts-ignore
  const [login, setLogin] = React.useState<boolean>(false);
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
      const token = window.localStorage.getItem('accessToken')
      if (token) {
        // @ts-ignore
        const response = getUser(token)
          .catch(() => {
            navigate('/login')
          })
      }
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
      navigate('/')
    }
  }

  async function userTrans(token: string): Promise<dadosType> {
    const { url, option } = GET_TRANS(token);
    const response = await fetch(url, option);
    const json = await response.json();
    return json as dadosType;
  }

  async function criarTrans(description: string, price: number, category: string, type: string, metodoPagamento:string, token: string) {
    const { url, option } = TRANS_POST({ description, price, category, type, metodoPagamento }, token);
    // @ts-ignore
    const response = await fetch(url, option);
  }

  async function pegarBalanco(token: string) {
    const { url, option } = GET_BALANCE(token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json.toFixed(2) as number;
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
  async function pegarCategoriasId(token: string, id:number) {
    const { url, option } = GET_TRANS_ID(token, id);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json;
    } else {
      return null
    }
  }
  async function deletarCategoriasId(token: string, id:number) {
    const { url, option } = DELETE_TRANS_ID(token, id);
    // @ts-ignore
    const response = await fetch(url, option);
  }

  return (
    <UserContext.Provider value={{ userLogin, 
                                  userTrans, 
                                  criarTrans, 
                                  pegarBalanco,
                                  pegarMetodos,
                                  pegarCategorias,
                                  deletarCategoriasId,
                                  pegarCategoriasId, 
                                  data }} >
      {children}
    </UserContext.Provider>)
}
