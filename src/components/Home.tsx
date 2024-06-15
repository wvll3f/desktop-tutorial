import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import Input from './Input';
import { dadosType } from '../types/userTypes'
import { UserContext } from '@/context/UserStorage';
import useForm from '@/hooks/useForm';
import InputField from './InputField';
import { Pen, Trash } from 'lucide-react';
import { Button } from './ui/button';
import Modal from './Modal';

function Home() {

  const { userTrans, deletarCategoriasId, pegarBalanco, setBalance } = React.useContext(UserContext);
  const [dados, setDados] = React.useState<dadosType>();
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [selecionado, setSelecionado] = React.useState<number | null>();
  const buscar = useForm();

  async function removeRow(id: number) {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      let response: any = await deletarCategoriasId(token, id);
      console.log(response)
      setSelecionado(null);
      setDeleteModal(false);
    }
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken') ?? "";
    const load = async () => {
      setDados(await userTrans(token));
      setBalance(await pegarBalanco(token))
    }
    load()
  }, [dados])

  return (
    <div>
      <Modal open={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className='space-x-2 space-y-3 flex flex-col p-3'>
          <h1 className='text-center font-bold text-3xl'> Excluir?</h1>
          <p>Tem certeza que deseja deletar a linha selecionada?</p>
          <Button variant='destructive' onClick={(e) => {
            e.stopPropagation()
            if (selecionado) removeRow(selecionado)
          }}>
            Sim
          </Button>

          <Button onClick={
            (e) => {
              e.stopPropagation()
              setDeleteModal(false)
            }
          }>Não</Button>
        </div>
      </Modal >
      <Modal open={editModal} onClose={() => setEditModal(false)}>
        <div className='space-x-2 space-y-3 flex flex-col p-3'>
          <h1 className='text-center font-bold text-3xl'> Editar</h1>
          
          <Button variant='destructive' onClick={(e) => {
            e.stopPropagation()
          }}>
            Sim
          </Button>

          <Button onClick={
            (e) => {
              e.stopPropagation()
              setEditModal(false)
            }
          }>Não</Button>
        </div>
      </Modal >

      <div className='m-auto rounded-md w-2/3 bg-gray-100'>
        <InputField />

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
                      <TableCell className="font-medium text-center flex justify-center gap-2 cursor-pointer">
                        <Trash onClick={() => {
                          setDeleteModal(true)
                          setSelecionado(dados.id)
                        }}
                        />
                        <Pen onClick={() => {
                          setEditModal(true)
                          setSelecionado(dados.id)
                        }} 
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )
              })
              : null
            }
          </Table>
        </div>

      </div>
    </div >
  )
}

export default Home