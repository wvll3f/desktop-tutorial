import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { dadosExemplo } from '../types/userTypes'
import { UserContext } from '@/context/UserStorage';
import InputField from './InputField';
import { Pen, Trash } from 'lucide-react';
import Modal from './Modal';
import { Card, CardDescription, CardTitle } from './ui/card';

function Home() {

  const {
    setTipo,
    dadosRetorno,
    setDadosretorno,
    userTrans,
    pegarTransacaoId,
    deletarTransacaoId,
    pegarBalanco,
    balance,
    setBalance,
    pegarEntradas,
    pegarSaidas,
    inflows,
    outflows,
    setInflows,
    setOutflows,
    dadosBusca,
    setDadosBusca,
    setDeleteModal,
    setEditModal,
    editModal,
    deleteModal
  } = React.useContext(UserContext);

  const [selecionado, setSelecionado] = React.useState<number>(156484651894);

  async function removeRow(id: number) {
    const token = window.localStorage.getItem('accessToken') || "";
    if (token && selecionado !== 156484651894) {
      // @ts-ignore
      let response: any = await deletarTransacaoId(token, id);
      setSelecionado(156484651894);
      setDeleteModal(false);
    }
    const load = async () => {
      setDadosBusca(await userTrans(token))
      setBalance(await pegarBalanco(token))
      setInflows(await pegarEntradas(token))
      setOutflows(await pegarSaidas(token))
    }
    load()
  }
  async function editRow(id: number) {
    const token = window.localStorage.getItem('accessToken');
    if (token && selecionado !== 156484651894) {
      //@ts-ignore
      let response = await deletarTransacaoId(token, id);
      setSelecionado(156484651894);
      setEditModal(false);
      setTipo('criar')
    }
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken') ?? "";
    const load = async () => {
      setDadosBusca(await userTrans(token))
      setBalance(await pegarBalanco(token))
      setInflows(await pegarEntradas(token))
      setOutflows(await pegarSaidas(token))
      console.log("feito a busca")
    }
    load()
  }, [])


  return (
    <div>
      <Modal
        selecionado={selecionado}
        type='excluir'
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        action={removeRow}
      />

      <Modal
        selecionado={selecionado}
        type='editar'
        open={editModal}
        onClose={() => {
          setEditModal(false)
          setDadosretorno(dadosExemplo)
        }}
        action={editRow}
        dados={dadosRetorno && dadosRetorno}
      />

      <div className='m-auto rounded-md w-3/4 bg-gray-100'>

        <div className='flex justify-center space-x-5 mb-6'>
          <Card className=' w-1/6 flex flex-col justify-center items-center p-3'>
            <CardTitle>Entradas</CardTitle>
            {
              inflows && <CardDescription className='text-2xl text-blue-500' >R$ {inflows}</CardDescription>
            }
          </Card>
          <Card className=' w-1/6 flex flex-col justify-center items-center p-3'>
            <CardTitle>Saidas</CardTitle>
            {
              outflows && <CardDescription className='text-2xl text-orange-500' >R$ {outflows}</CardDescription>
            }
          </Card>
          <Card className=' w-1/6 flex flex-col justify-center items-center p-3'>
            <CardTitle>Balanço</CardTitle>
            {
              balance
                ? <CardDescription className='text-2xl text-red-500' >R$ {balance}</CardDescription>
                : <CardDescription className='text-2xl text-green-500' >R$ {balance}</CardDescription>
            }
          </Card>
        </div>
        <InputField id={selecionado} tipo='criar' />

        <div className='space-y-2'>
          <Table className='text-md border-solid border-2 border-gray-300'>
            <TableCaption className='text-md font-bold' >Lista de transaçoes</TableCaption>
            <TableHeader className=''>
              <TableRow className=''>
                <TableHead className="text-center">Data</TableHead>
                <TableHead className="text-center">Descriçao</TableHead>
                <TableHead className="text-center">Valor</TableHead>
                <TableHead className="text-center">Categoria</TableHead>
                <TableHead className="text-center">Tipo pagamento</TableHead>
                <TableHead className="text-center">Tipo Transação</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            {dadosBusca
              ?
              dadosBusca.map((dados) => {
                return (
                  <TableBody key={dados.id}>
                    <TableRow key={dados.id} className=''>
                      <TableCell className="font-medium text-center"> {dados.createTimeStamp} </TableCell>
                      <TableCell className="font-medium text-center"> {dados.description} </TableCell>
                      <TableCell className="font-medium text-center"> R$ {dados.price} </TableCell>
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
                          const token = window.localStorage.getItem('accessToken') ?? "";
                          const load = async () => {
                            setEditModal(true)
                            setSelecionado(dados.id)
                            if (setDadosretorno) setDadosretorno(await pegarTransacaoId(token, dados.id))
                          }
                          load()
                        }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )
              })
              :
              <TableBody >
                <TableRow className=''>
                  <TableCell className="font-medium text-center"></TableCell>
                  <TableCell className="font-medium text-center"></TableCell>
                  <TableCell className="font-medium text-center"></TableCell>
                  <TableCell className="font-medium text-center"></TableCell>
                  <TableCell className="font-medium text-center"></TableCell>
                  <TableCell className="font-medium text-center"></TableCell>
                  <TableCell className="font-medium text-center flex justify-center gap-2 cursor-pointer">
                    <Trash />
                    <Pen />
                  </TableCell>
                </TableRow>
              </TableBody>
            }
          </Table>
        </div>

      </div>
    </div >
  )
}

export default Home