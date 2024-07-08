import React from 'react'
import { UserContext } from '@/context/UserStorage';
import InputField from './InputField';
import MounthYear from './MounthYear';
import { DateContext } from '@/context/DateStorage';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import TableComp from './TableComp';
import ModalArea from './ModalArea';
import ResumeArea from './ResumeArea';


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
      let response = await deletarTransacaoId(token, id);
      setSelecionado(null);
      setEditModal(false);
      setTipo('criar')
    }
  }

  React.useEffect(() => {
    const token = window.localStorage.getItem('accessToken') ?? "";
    setRangeMounth(mesAtual)
    window.localStorage.setItem('mes', mesAtual);
    const load = async () => {
      setBalance(await pegarBalanco(startDate, endDate, token))
      setInflows(await pegarEntradas(startDate, endDate, token))
      setOutflows(await pegarSaidas(startDate, endDate, token))
      setDadosBusca(await getTransByDate(startDate, endDate, token))
    }
    load()
  }, [mesAtual])


  return (
    <div className=' flex max-h-screen '>

      <ModalArea remove={removeRow} edit={editRow} />

      <div className='w-fit mt-4 m-auto rounded-md flex flex-col'>

        <ResumeArea />
        
        <InputField id={selecionado} tipo='criar' />
        
        <MounthYear />

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