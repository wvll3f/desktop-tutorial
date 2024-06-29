import { Button } from './ui/button'
import React from 'react';
import { DateContext } from '@/context/DateStorage';


function MounthYear() {

    const { pegarMesAtual, currentDate } = React.useContext(DateContext);

    React.useEffect(()=> {
        pegarMesAtual()
    }, [])

    return (
        <div className='flex items-center space-x-3 justify-center mb-2' >
            <Button className='p-3 h-5 text-center'> &lt; </Button>
            <h3>{currentDate}</h3>
            <Button className='p-3 h-5'> &gt; </Button>
        </div>
    )
}

export default MounthYear