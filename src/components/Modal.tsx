import { Button } from './ui/button';
import InputField from './InputField';
import { dadosInputField } from '@/types/userTypes';
import { UserContext } from '@/context/UserStorage';
import React from 'react';

interface modalType {
    open: boolean;
    onClose: () => void;
    type: string;
    action?: (id: number) => void;
    selecionado: number;
    dados?: dadosInputField;
}

function Modal({ type, open, onClose, action, selecionado }: modalType) {

    const { tipo,setTipo, dadosRetorno } = React.useContext(UserContext);

    React.useEffect(()=>{
        if(open === true){
            setTipo('editar')
        }else{
            setTipo('criar')
        }
    },[open])

    return (
        <div onClick={onClose}
            className={`fixed z-10 inset-0 flex justify-center items-center transition-colors
                ${open ? "visible bg-black/90" : " invisible"}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
            >
                <Button variant='outline' onClick={onClose} className='fixed top-2 border-none right-2 rounded-xl'>X</Button>
                <div className='space-x-2 space-y-3 flex flex-col p-3 items-end'>
                    {
                        type == 'editar'
                            ?
                            <div className='space-y-3 flex flex-col p-3 items-start gap-1'>
                                <h3 className='text-center font-bold text-xl'> Deseja editar essa transação?</h3>
                                <InputField id={selecionado} dados={dadosRetorno && dadosRetorno} tipo={tipo}></InputField>
                            </div>
                            :
                            <div className='space-y-3 flex flex-col p-2 items-start gap-1'>
                                <h3 className='text-center font-bold text-xl'> Deseja excluir essa transação?</h3>
                                <p>Tem certeza que deseja deletar a linha selecionada?</p>
                            </div>
                    }

                    {
                        type == 'editar' ?
                            <div className={"flex h-full justify-center space-x-2"}>

                                <Button onClick={
                                    (e) => {
                                        e.stopPropagation()
                                        onClose()
                                    }
                                }>Cancelar</Button>
                            </div>
                            :
                            <div className="flex justify-end space-x-2">

                                <Button variant='destructive' onClick={(e) => {
                                    e.stopPropagation()
                                    if (selecionado && action) action(selecionado)
                                }}>
                                    Continue
                                </Button>

                                <Button onClick={
                                    (e) => {
                                        e.stopPropagation()
                                        onClose()
                                    }
                                }>Cancelar</Button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Modal