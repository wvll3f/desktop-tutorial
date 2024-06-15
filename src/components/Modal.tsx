import React from 'react'
import { Button } from './ui/button';

interface modalType {
    open: boolean;
    onClose: () => void;
    children: any;
}

function Modal({ open, onClose, children }: modalType) {
    return (
        <div onClick={onClose}
            className={`fixed z-10 inset-0 flex justify-center items-center transition-colors
                ${open ? "visible bg-black/20" : " invisible"}`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-xl shadow p-6 transition-all
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
            >
                <Button variant='outline' onClick={onClose} className='fixed top-2 border-none right-2 rounded-xl'>X</Button>
                {children}
            </div>
        </div>
    )
}

export default Modal