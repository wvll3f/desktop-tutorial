import { UserContext } from '@/context/UserStorage';
import React from 'react'

function Balance() {
    const [balance, setBalance] = React.useState(0);
    const { pegarBalanco } = React.useContext(UserContext);

    async function getBalance() {
        const token = window.localStorage.getItem('accessToken')
        if (token) {
            let response: any = await pegarBalanco(token);
            response ? setBalance(response) : setBalance(0)
        }
    }

    React.useEffect(() => {
        getBalance()
    }, [])

    return (
        <h1 className=' mr-7 mt-5 text-end text-3xl font-bold'>Balanço:{balance}</h1>
    )
}

export default Balance