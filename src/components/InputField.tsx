import React from 'react'
import Input from './Input'
import { Button } from './ui/button'
import useForm from '@/hooks/useForm'
import { UserContext } from '@/context/UserStorage'
import { dadosExemplo, dadosInputField, responseMetodostype } from '@/types/userTypes'

interface InputFieldProps {
    id: number;
    tipo: string;
    dados?: dadosInputField;
}

function InputField({ id, tipo, dados }: InputFieldProps) {
    const { criarTrans, pegarBalanco, pegarMetodos, pegarCategorias, setBalance, editTrans, dadosRetorno, setDadosretorno } = React.useContext(UserContext);
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

    async function getMetodos() {
        const token = window.localStorage.getItem('accessToken')
        if (token) {
            let responseMetodos: Array<responseMetodostype> = await pegarMetodos(token);
            if (metodosList.length === 1) {
                responseMetodos.forEach((metod) => { metodosList.push(metod.name) })
                setMetodo(metodosList);
            }
        }
    }
    async function getCategorias() {
        const token = window.localStorage.getItem('accessToken')
        if (token) {
            let responseCategorias: Array<responseMetodostype> = await pegarCategorias(token);
            if (metodosList.length === 1) {
                responseCategorias.forEach((categoria) => { categoriaList.push(categoria.name) })
                setCategList(categoriaList)
            }
        }
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        const token = window.localStorage.getItem('accessToken') ?? "";

        if (token && id == 156484651894 && tipo != 'editar') {

            console.log(description.value, price.value, category, type, metodoPagemento);
            if (description.validate() && price.validate() && category) {
                criarTrans(description.value, price.value, category, type, metodoPagemento, token);
            }
            setBalance(await pegarBalanco(token))
            description.setValue('')
            price.setValue('')
            setCategory('')
            setMetodoPagamento('')
            setType('')
            setCategory('');

        }

        if (token && id != 156484651894 && tipo == 'editar') {

            editTrans(description.value, price.value, category, type, metodoPagemento, token, id);

            setBalance(await pegarBalanco(token))
            description.setValue('')
            price.setValue('')
            setCategory('')
            setMetodoPagamento('')
            setType('')
            setCategory('');
            if (setDadosretorno) setDadosretorno(dadosExemplo)
        }

    }

    React.useEffect(() => {
        const token = window.localStorage.getItem('accessToken') ?? "";
        const load = async () => {
            setBalance(await pegarBalanco(token))
            await getCategorias()
            await getMetodos()
        }
        load()
    }, [])

    React.useEffect(() => {
        if (dadosRetorno) {
            price.setValue(dadosRetorno.price)
            description.setValue(dadosRetorno.description)
            setCategory(dadosRetorno.category)
            setMetodoPagamento(dadosRetorno.metodoPagamento)
            setType(dadosRetorno.type)
            
        }
    }, [dadosRetorno])

    return (
        <form className={`${tipo != "editar" ? 'flex justify-center items-center space-x-8 mb-2' :
            'flex flex-col items-start justify-center'
            }`}
            onSubmit={handleSubmit} >
            <Input label="Descrição" type="text" name="descriptio" {...description} />
            <Input label="Preço" type="number" name="price" {...price} />
            <select className={tipo == 'editar' ? 'h-10 rounded-md p-2 mb-4' : 'h-10 rounded-md p-2'} value={category} onChange={(e) => setCategory(e.target.value)}>
                {categList.map((tipo: string, id: number) => (
                    <option key={id} value={tipo}>
                        {tipo}
                    </option>
                ))}

            </select>
            <select className={tipo == 'editar' ? 'h-10 rounded-md p-2 mb-4' : 'h-10 rounded-md p-2'} value={metodoPagemento} onChange={(e) => setMetodoPagamento(e.target.value)}>
                {metodo.map((tipo: string, id: number) => (
                    <option key={id} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>
            <select className={tipo == 'editar' ? 'h-10 rounded-md p-2 mb-4' : 'h-10 rounded-md p-2'} value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Tipo transação</option>
                {tipoList.map((tipo: string, id: number) => (
                    <option key={id} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>

            {tipo == 'criar' ? <Button className=''> Adicionar </Button> : <Button className='bg-red-500 fixed right-21 bottom-9'> Editar </Button>}
        </form>
    )

}
export default InputField;