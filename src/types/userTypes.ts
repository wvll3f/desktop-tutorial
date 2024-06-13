export type dadosType = {
  id: number;
  description: string;
  price: number;
  category: number;
  metodoPagamento: string;
  type: String;
  createTimeStamp: string;
  user: String;
}[];


export type dadosInput = {
  description: string;
  price: number;
  category: number;
  type: String;
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