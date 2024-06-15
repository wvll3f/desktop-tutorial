import useForm from '@/hooks/useForm';
import React from 'react'

interface FormStorageProps {
    children: React.ReactNode;
};
interface FormProps {
    useForm:(type?: any) => {
        value: any;
        setValue: React.Dispatch<any>;
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        error: string;
        validate: () => boolean;
        onBlur: () => boolean;
    };
}
interface FormContextProps {
    setMetodo: React.Dispatch<React.SetStateAction<number>>;
    setCategList: React.Dispatch<React.SetStateAction<number>>;
    setType: React.Dispatch<React.SetStateAction<number>>;
    setCategory: React.Dispatch<React.SetStateAction<number>>;
    setMetodoPagamento: React.Dispatch<React.SetStateAction<number>>;
    useForm: FormProps;
    description:FormProps;
};

export const FormContext = React.createContext({});
export const FormStorage: React.FC<FormStorageProps> = ({ children }) => {

    const description = useForm();
    const price = useForm();
    const [metodo, setMetodo] = React.useState<Array<string>>([]);
    const [categList, setCategList] = React.useState<Array<string>>([]);
    const [type, setType] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [metodoPagemento, setMetodoPagamento] = React.useState('');
    const tipoList = ['E', 'S'];
    const metodosList = ['Tipo Pagamento'];
    const categoriaList = ['Categoria'];



    return (
        <FormContext.Provider value={{}} >
            {children}
        </FormContext.Provider>)
}
