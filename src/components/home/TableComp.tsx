import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Pen, Trash } from 'lucide-react'
import { UserContext } from '@/context/UserStorage';


function TableComp() {

    const {
        dadosBusca,
        setDeleteModal,
        setEditModal,
        setDadosretorno,
        setSelecionado,
        pegarTransacaoId,
        setTipo
    } = React.useContext(UserContext);

    return (
        <div>
            <Table className='text-md border-solid border-2 min-w-[620px] border-gray-300'>
                <TableHeader className=''>
                    <TableRow className=''>
                        <TableHead className="text-center ">Data</TableHead>
                        <TableHead className="text-center ">Descriçao</TableHead>
                        <TableHead className="text-center ">Valor</TableHead>
                        <TableHead className="text-center ">Categoria</TableHead>
                        <TableHead className="text-center ">Tipo pagamento</TableHead>
                        <TableHead className="text-center ">Tipo Transação</TableHead>
                        <TableHead className="text-center ">Ações</TableHead>
                    </TableRow>
                </TableHeader>
                {dadosBusca
                    ?
                    dadosBusca?.map((dados: any) => {
                        return (
                            <TableBody key={dados.id}>
                                <TableRow key={dados.id} className=''>
                                    <TableCell className="font-medium text-center"> {dados?.date} </TableCell>
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
                                                setTipo('editar')
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
    )
}

export default TableComp
