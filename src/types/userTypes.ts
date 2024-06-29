export type dadosType = {
  id: number;
  description: string;
  price: number;
  category: string;
  metodoPagamento: string;
  type: string;
  date: string;
  user: string;
};

export interface Item {
  date: Date;
  category: string;
  title: string;
  value: number;
};


export type dadosInput = {
  description: string;
  price: number;
  category: number;
  type: String;
};
export type dadosInputField = {
  description: string;
  price: number;
  category: string;
  type: string;
  metodoPagamento:string;
};

export type bodyTransacaoType = {
  description: string;
  price: number;
  category: String;
  type: String;
  token: String;
}

export type responseMetodostype = {
  id: number;
  name: string;
}

export const dadosExemplo = {
  description: '',
  price: 0,
  category: '',
  type: '',
  metodoPagamento:'',
}