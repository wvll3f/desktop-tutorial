import React, { ReactNode } from 'react'
import { GET_USER, TOKEN_POST, GET_TRANS, TRANS_POST, GET_BALANCE, GET_METODOSPAGAMENTO, GET_CATEGORIAS, GET_TRANS_ID, DELETE_TRANS_ID, GET_INFLOWS, GET_OUTFLOWS, EDIT_TRANS_ID } from '../helpers/api';
import { useNavigate } from 'react-router-dom';
import { dadosInputField, dadosType } from '@/types/userTypes';

interface UserStorageProps {
  children: ReactNode;
};
interface UserContextProps {
  userLogin: (username: string, password: string) => void;
  userTrans: (token: string) => any;
  pegarBalanco: (startDate:string, endDate:string, token: string) => any;
  pegarEntradas: (startDate:string, endDate:string, token: string) => any;
  pegarSaidas: (startDate:string, endDate:string, token: string) => any;
  pegarMetodos: (token: string) => any;
  pegarCategorias: (token: string) => any;
  criarTrans: (description: string, price: number, category: string, type: string,date: string, token: string, metodoPagamento: string) => void;
  deletarTransacaoId: (token: string, id: number) => void;
  pegarTransacaoId: (token: string, id: number) => any;
  setBalance: React.Dispatch<React.SetStateAction<string>>;
  setEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInflows: React.Dispatch<React.SetStateAction<string>>;
  setOutflows: React.Dispatch<React.SetStateAction<string>>;
  setDadosretorno: React.Dispatch<React.SetStateAction<dadosInputField>>;
  editTrans: (description: string, price: number, category: string, type: string, token: string, metodoPagamento: string, id: number) => void;
  setTipo: React.Dispatch<React.SetStateAction<string>>;
  setData:React.Dispatch<React.SetStateAction<any>>;
  setDadosBusca:React.Dispatch<React.SetStateAction<Array<dadosType>>>;
  dadosBusca?:Array<dadosType> | undefined;
  tipo: string;
  logado: boolean;
  editModal: boolean;
  deleteModal: boolean;
  balance: string;
  inflows: string;
  outflows: string;
  dadosRetorno?: dadosInputField;
  data: {
    username: string;
    roles: string;
  };
};

export const UserContext = React.createContext<UserContextProps>({} as UserContextProps);
export const UserStorage: React.FC<UserStorageProps> = ({ children }) => {


  const [dadosBusca, setDadosBusca] = React.useState<dadosType[]>([]);
  const [tipo, setTipo] = React.useState<string>('');
  const [data, setData] = React.useState({ username: 'Login/Criar', roles: '' });
  const [logado, setLogado] = React.useState(false);
  const [balance, setBalance] = React.useState("0.00");
  const [inflows, setInflows] = React.useState("0.00");
  const [outflows, setOutflows] = React.useState("0.00");
  const [dadosRetorno, setDadosretorno] = React.useState({} as dadosInputField);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const navigate = useNavigate();

  async function getUser(token: string) {
    const { url, option } = GET_USER(token);
    const response = await fetch(url, option);
    const json = await response.json();
    setData(json);
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
    }else{
      setLogado(false)
      setData({ username: 'Login/Criar', roles: '' })
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
  async function criarTrans(description: string, price: number, category: string, type: string,date: string, metodoPagamento: string, token: string) {
    const { url, option } = TRANS_POST({ description, price, category, type,date, metodoPagamento }, token);
    // @ts-ignore
    const response = await fetch(url, option);
  }
  async function pegarBalanco(startDate:string, endDate:string, token: string) {
    const { url, option } = GET_BALANCE(startDate, endDate, token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json;
    } else {
      return "0.00"
    }
  }
  async function pegarEntradas(startDate:string, endDate:string, token: string) {
    const { url, option } = GET_INFLOWS(startDate, endDate, token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json;
    } else {
      return "0.00"
    }
  }
  async function pegarSaidas(startDate:string, endDate:string, token: string) {
    const { url, option } = GET_OUTFLOWS(startDate, endDate, token);
    const response = await fetch(url, option);
    const json = await response.json();
    if (json) {
      return json;
    } else {
      return "0.00"
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
      const { url, option } = EDIT_TRANS_ID(token, id, { description, price, category, type, metodoPagamento });
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
      setTipo,
      setData,
      setDadosBusca,
      setDeleteModal,
      setEditModal,
      deleteModal,
      editModal,
      dadosBusca,
      tipo,
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
