import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Input from './Input';
import { dadosType } from '../types/userTypes'
import { UserContext } from '@/context/UserStorage';
import useForm from '@/hooks/useForm';
import InputField from './InputField';
import { Pen, Trash } from 'lucide-react';

function Home() {

  const [dados, setDados] = React.useState<dadosType>();
  const { userTrans, pegarBalanco } = React.useContext(UserContext);
  const buscar = useForm();

  async function pegarTrans() {
    const token = window.localStorage.getItem('accessToken')
    if (token) {
      let response: any = await userTrans(token);
      response ? setDados(response) : null;
    }
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken')
    pegarTrans()
    if(token) pegarBalanco(token)
  }, [])

  return (
    <div>

      <div className='m-auto rounded-md w-2/3 bg-gray-100'>
        <InputField/>

        <div className='space-y-2'>
          <Input label="Buscar" type="text" name="busca" {...buscar}></Input>

          <Table className='text-md p-3 border-solid border-2 border-gray-300'>
            <TableCaption className='m-5 text-md font-bold' >Lista de transaçoes</TableCaption>
            <TableHeader className='w-7'>
              <TableRow className='w-7'>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Descriçao</TableHead>
                <TableHead className="text-center">Valor</TableHead>
                <TableHead className="text-center">Categoria</TableHead>
                <TableHead className="text-center">Tipo pagamento</TableHead>
                <TableHead className="text-center">Tipo Transação</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            {dados ?
              dados.map((dados) => {
                return (
                  <TableBody key={dados.id}>
                    <TableRow key={dados.id} className='w-5'>
                      <TableCell className="font-medium text-center"> {dados.createTimeStamp} </TableCell>
                      <TableCell className="font-medium text-center"> {dados.description} </TableCell>
                      <TableCell className="font-medium text-center"> R$ {dados.price.toFixed(2)} </TableCell>
                      <TableCell className="font-medium text-center"> {dados.category} </TableCell>
                      <TableCell className="font-medium text-center"> {dados.metodoPagamento} </TableCell>
                      <TableCell className="font-medium text-center"> {dados.type == "S" ? "Saida" : "Entrada"} </TableCell>
                      <TableCell className="font-medium text-center flex justify-center gap-2 cursor-pointer"> <Trash /> <Pen/></TableCell>
                    </TableRow>
                  </TableBody>
                )
              })
              : null
            }
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Home