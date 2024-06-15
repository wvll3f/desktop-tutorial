import React from 'react'
import Input from './Input'
import { Button } from './ui/button'
import { Card, CardDescription, CardTitle } from './ui/card'
import useForm from '@/hooks/useForm'
import { UserContext } from '@/context/UserStorage'
import { responseMetodostype } from '@/types/userTypes'

function InputField() {
    const { criarTrans, pegarBalanco, pegarMetodos, pegarCategorias,balance, setBalance } = React.useContext(UserContext);
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
        if (token) {
            console.log(description.value, price.value, category, type, metodoPagemento);
            if (description.validate() && price.validate() && category) {
                criarTrans(description.value, price.value, category, type, metodoPagemento, token);
            }
        }
        setBalance(await pegarBalanco(token))
        description.setValue('')
        price.setValue('')
        setCategory('')
        setMetodoPagamento('')
        setType('')
        setCategory('');
    }

    React.useEffect(() => {
        const token = window.localStorage.getItem('accessToken') ?? "";
        const load = async () =>{
            setBalance(await pegarBalanco(token))
            await getCategorias()
            await getMetodos()
        }
        load()
    }, [])

    return (
        <form className='flex justify-center items-center space-x-8 mb-2' onSubmit={handleSubmit} >
            <Input label="Descrição" type="text" name="descriptio" {...description} />
            <Input label="Preço" type="number" name="price" {...price} />

            <select className='h-10 rounded-md p-2' value={category} onChange={(e) => setCategory(e.target.value)}>
                {categList.map((tipo: string, id: number) => (
                    <option key={id} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>

            <select className='h-10 rounded-md p-2' value={metodoPagemento} onChange={(e) => setMetodoPagamento(e.target.value)}>
                {metodo.map((tipo: string, id: number) => (
                    <option key={id} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>
            <select className='h-10 rounded-md p-2' value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Tipo transação</option>
                {tipoList.map((tipo: string, id: number) => (
                    <option key={id} value={tipo}>
                        {tipo}
                    </option>
                ))}
            </select>
            <Button className=''> Adicionar </Button>

            <Card className=' w-1/6 flex flex-col justify-center items-center p-3'>
                <CardTitle>Balanço</CardTitle>
                {
                    balance < 0
                        ?
                        <CardDescription className='text-2xl text-red-500' >R$ {balance}</CardDescription>
                        :
                        <CardDescription className='text-2xl text-green-500' >R$ {balance}</CardDescription>
                }
            </Card>

        </form>
    )
}

export default InputField