import React from 'react'
import { UserContext } from '@/context/UserStorage';
import MounthYear from './MounthYear';
import { DateContext } from '@/context/DateStorage';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import TableComp from './TableComp';
import ModalArea from './ModalArea';
import ResumeArea from './ResumeArea';
import CellTable from '../CellTable';
import { Button } from '../ui/button';


function Home() {

  const {
    setTipo,
    deletarTransacaoId,
    pegarBalanco,
    setBalance,
    pegarEntradas,
    pegarSaidas,
    setInflows,
    setOutflows,
    setDadosBusca,
    setDeleteModal,
    setEditModal,
    setSelecionado,
    setCreateModal,
    tipo,
    selecionado
  } = React.useContext(UserContext);

  const {
    getTransByDate,
    endDate,
    startDate,
    setRangeMounth,
    mesAtual,
    setMesAtual,
    pegarMesAtual
  } = React.useContext(DateContext)

  async function removeRow(id: number) {
    const token = window.localStorage.getItem('accessToken') || "";
    if (token && selecionado !== null) {
      // @ts-ignore
      let response: any = await deletarTransacaoId(token, id);
      setSelecionado(null);
      setDeleteModal(false);
      const load = async () => {
        setDadosBusca(await getTransByDate(startDate, endDate, token))
        setBalance(await pegarBalanco(startDate, endDate, token))
        setInflows(await pegarEntradas(startDate, endDate, token))
        setOutflows(await pegarSaidas(startDate, endDate, token))
      }
      load()
    }
  }

  async function editRow(id: number) {
    const token = window.localStorage.getItem('accessToken');
    setMesAtual(pegarMesAtual())
    setRangeMounth(mesAtual)
    if (token && selecionado !== null) {
      //@ts-ignore
      let response = await editTrans(token, id);
      setSelecionado(null);
      setEditModal(false);
      setTipo('editar')
    }
  }

  async function createRow() {
    const token = window.localStorage.getItem('accessToken') || "";
    if (token && selecionado !== null) {
      // @ts-ignore
      setTipo('criar')
      setSelecionado(null);
      setCreateModal(false);
      const load = async () => {
        setDadosBusca(await getTransByDate(startDate, endDate, token))
        setBalance(await pegarBalanco(startDate, endDate, token))
        setInflows(await pegarEntradas(startDate, endDate, token))
        setOutflows(await pegarSaidas(startDate, endDate, token))
        setTipo('criar')
      }
      load()
    }
  }
  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken') ?? "";
    setRangeMounth(mesAtual)
    window.localStorage.setItem('mes', mesAtual);
    const load = async () => {
      setDadosBusca(await getTransByDate(startDate, endDate, token))
      setBalance(await pegarBalanco(startDate, endDate, token))
      setInflows(await pegarEntradas(startDate, endDate, token))
      setOutflows(await pegarSaidas(startDate, endDate, token))
      console.log('rodando')
    }
    load()
  }, [tipo, mesAtual])


  return (
    <div className=' flex flex-col h-fit p-3 max-h-full justify-center '>

      <MounthYear />
      <ModalArea remove={removeRow} edit={editRow} criar={createRow} />

      <div className='md:hidden sm:block'>
        <div className='m-2'>
          <Button onClick={() => {
            setCreateModal(true)
            setTipo('criar')
          }}>Adicionar</Button>
        </div>
        <CellTable />
      </div>


      <div className='hidden md:block w-fit mt-4 m-auto rounded-md'>

        <ResumeArea />
        <div className='m-2'>
          <Button onClick={() => {
            setCreateModal(true)
            setTipo('criar')
          }}> Adicionar </Button>
        </div>
        {/* <InputField id={selecionado} tipo='criar' /> */}
        <div className=' space-y-2 '>

          <ScrollArea className="h-[650px] w-[1050px] rounded-md border p-4">
            <TableComp />
            <ScrollBar orientation="vertical" />
          </ScrollArea>

        </div>

      </div>

    </div >
  )
}

export default Home