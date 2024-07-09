import { UserContext } from '@/context/UserStorage';
import React from 'react'
import { dadosExemplo } from '../../types/userTypes';
import Modal from './Modal';

interface modalType {
    remove?: (id: number) => void;
    edit?: (id: number) => void;
    criar?: (id: number) => void;
}

function ModalArea( {remove, edit, criar}:modalType ) {

    const {
        setDeleteModal,
        setEditModal,
        setDadosretorno,
        setCreateModal,
        createModal,
        selecionado,
        deleteModal,
        editModal,
        dadosRetorno
    } = React.useContext(UserContext);


    return (

        <div>
            <Modal
                selecionado={selecionado}
                type='excluir'
                open={deleteModal}
                onClose={() => setDeleteModal(false)}
                action={remove}
            />
            <Modal
                selecionado={null}
                type='criar'
                open={createModal}
                onClose={() => setCreateModal(false)}
                action={criar}
            />

            <Modal
                selecionado={selecionado}
                type='editar'
                open={editModal}
                onClose={() => {
                    setEditModal(false)
                    setDadosretorno(dadosExemplo)
                }}
                action={edit}
                dados={dadosRetorno && dadosRetorno}
            />
        </div>
    )
}

export default ModalArea