import { UserContext } from '@/context/UserStorage';
import { Pen, Trash } from 'lucide-react';
import React from 'react'

function CellTable() {

    const {
        dadosBusca,
        setDeleteModal,
        setEditModal,
        setDadosretorno,
        setSelecionado,
        pegarTransacaoId,
    } = React.useContext(UserContext);

    return (
        <div className=' relative w-full'>
            {dadosBusca
                ?
                dadosBusca?.map((dados: any) => {
                    return (
                        <div key={dados.id} className='border border-solid border-gray-200 m-2' >

                            <div className='relative flex flex-col gap-1 p-3 mt-4 mb-3 max-w-68'>
                                <div className='flex absolute top-0 right-2 -mt-3 '>
                                    <Pen className='h-4' onClick={() => {
                                        const token = window.localStorage.getItem('accessToken') ?? "";
                                        const load = async () => {
                                            setEditModal(true)
                                            setSelecionado(dados.id)
                                            if (setDadosretorno) setDadosretorno(await pegarTransacaoId(token, dados.id))
                                        }
                                        load()
                                    }} />
                                    <Trash className='h-4' onClick={() => {
                                        setDeleteModal(true)
                                        setSelecionado(dados.id)
                                    }} />
                                </div>
                                <section className='flex gap-1 justify-start'>
                                    <p className="text-base font-bold ">Data :</p>
                                    <p className=" text-base mr-2"> {dados?.date} </p>
                                    <p className="text-base font-bold">Categoria</p>
                                    <p className="text-base"> {dados.category} </p>
                                </section>

                                <section className='flex gap-1 justify-start'>
                                    <p className="text-base font-bold">Descriçao</p>
                                    <p className="text-base mr-2"> {dados.description} </p>
                                    <p className="text-base font-bold">Valor</p>
                                    <p className="text-base"> R$ {dados.price} </p>
                                </section>

                                <div className='flex absolute bottom-0 left-3 -mb-2 gap-2'>
                                    <p className={dados?.type == "S" ? 'text-red-700 text-xs' : 'text-green-700 text-xs'}>{dados?.type == "S" ? "Saida" : "Entrada"} </p>
                                    <p className=" text-xs"> {dados.metodoPagamento} </p>
                                </div>

                            </div>

                            <hr className='' />
                        </div>
                    )
                })
                : null
            }

        </div>
    )
}

export default CellTable