import React from 'react'
import Input from './Input'
import { Button } from './ui/button'
import useForm from '@/hooks/useForm'
import { UserContext } from '@/context/UserStorage'
import { dadosExemplo, dadosInputField, responseMetodostype } from '@/types/userTypes'
import { DateContext } from '@/context/DateStorage'

interface InputFieldProps {
    id: number;
    tipo: string;
    dados?: dadosInputField;
}

function InputField({ id }: InputFieldProps) {
    const { tipo,
        criarTrans,
        pegarBalanco,
        pegarMetodos,
        pegarCategorias,
        setBalance,
        editTrans,
        setDadosretorno,
        userTrans,
        setDadosBusca,
        setEditModal,
        setDeleteModal,
        setInflows,
        setOutflows,
        pegarEntradas,
        pegarSaidas,
        dadosRetorno,
        dadosBusca
    } = React.useContext(UserContext);

    const {startDate, endDate, getTransByDate} = React.useContext(DateContext)

    const description = useForm();
    const price = useForm();
    const dataTransacao = useForm();
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

        const load = async () => {
            if (token && id != 156484651894 && tipo == 'editar') {
                editTrans(description.value, price.value, category, type, metodoPagemento, token, id);
            }
            if (token && tipo == 'criar') {
                if (description.validate() && price.validate() && category) {
                    criarTrans(description.value, price.value, category, type, dataTransacao.value, metodoPagemento, token);
                }
            }
            setBalance(await pegarBalanco(token))
            setDadosBusca(await getTransByDate(startDate,endDate,token))
            setInflows(await pegarEntradas(token))
            setOutflows(await pegarSaidas(token))
            description.setValue('')
            price.setValue('')
            setCategory('')
            setMetodoPagamento('')
            setType('')
            setCategory('');
            setDadosBusca(await getTransByDate(startDate,endDate,token))
            setEditModal(false)
            setDeleteModal(false)
            if (setDadosretorno) setDadosretorno(dadosExemplo)
        }
        load()
    }

    React.useEffect(() => {
        const token = window.localStorage.getItem('accessToken') ?? "";
        const load = async () => {
            setBalance(await pegarBalanco(token))
            await getCategorias()
            await getMetodos()
        }
        load()
    }, [dadosBusca])

    React.useEffect(() => {
        if (dadosRetorno) {
            price.setValue(dadosRetorno.price || 0)
            description.setValue(dadosRetorno.description || '')
            setCategory(dadosRetorno.category || '')
            setMetodoPagamento(dadosRetorno.metodoPagamento || '')
            setType(dadosRetorno.type || '')
        }
    }, [dadosRetorno])

    return (
        <form className={`${tipo != "editar" ?' flex justify-center items-center w-full space-x-4 mb-2' :
            'flex flex-col items-start justify-center'
            }`}
            onSubmit={handleSubmit} >
            <Input label="Descrição" type="text" name="descriptio" {...description} />
            <Input label="Preço" type="number" name="price" {...price} />
            <Input label="Data" type="date" name="data" {...dataTransacao} />
            <select title='Categorias' className={tipo == 'editar' ? 'h-10 rounded-md p-2 mb-4' : 'h-10 rounded-md p-2'} value={category || ''} onChange={(e) => setCategory(e.target.value)}>
                {categList.map((tipo: string, id: number) => (
                    <option key={id} value={tipo || ''}>
                        {tipo || ''}
                    </option>
                ))}

            </select>
            <select title='Metodos de pagamento' className={tipo == 'editar' ? 'h-10 rounded-md p-2 mb-4' : 'h-10 rounded-md p-2'} value={metodoPagemento || ''} onChange={(e) => setMetodoPagamento(e.target.value)}>
                {metodo.map((tipo: string, id: number) => (
                    <option key={id} value={tipo || ''}>
                        {tipo || ''}
                    </option>
                ))}
            </select>
            <select title='Tipo de transação' className={tipo == 'editar' ? 'h-10 rounded-md p-2 mb-4' : 'h-10 rounded-md p-2'} value={type || ''} onChange={(e) => setType(e.target.value)}>
                <option value="">Tipo transação</option>
                {tipoList.map((tipo: string, id: number) => (
                    <option key={id} value={tipo || ''}>
                        {tipo || ''}
                    </option>
                ))}
            </select>

            <Button className=''> Enviar </Button>
        </form>
    )

}
export default InputField;