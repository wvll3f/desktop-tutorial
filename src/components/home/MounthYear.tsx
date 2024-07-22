import { Button } from '../ui/button'
import React from 'react';
import { DateContext } from '@/context/DateStorage';
import { UserContext } from '@/context/UserStorage';


function MounthYear() {

    const { setRangeMounth, formatdate, getTransByDate, startDate, endDate, mesAtual, setMesAtual } = React.useContext(DateContext);
    const { setDadosBusca, setTipo } = React.useContext(UserContext);

    React.useEffect(() => {
        const token = window.localStorage.getItem('accessToken') || '';
        const load = async () => {
            setRangeMounth(mesAtual)
            setDadosBusca(await getTransByDate(startDate, endDate, token))
        }
        load()
    }, [])

    const handlePrevMonth = () => {
        let [year, month] = mesAtual.split('-')
        var newDate: any = new Date(parseInt(year), parseInt(month) - 1, 1);
        newDate.setMonth(newDate.getMonth() - 1);
        newDate = formatdate(newDate)
        setMesAtual(newDate)
        setRangeMounth(newDate)
        setTipo('criar')
    }

    const handleNextMonth = () => {
        let [year, month] = mesAtual.split('-')
        var newDate: any = new Date(parseInt(year), parseInt(month) - 1, 1);
        newDate.setMonth(newDate.getMonth() + 1);
        newDate = formatdate(newDate)
        setMesAtual(newDate)
        setRangeMounth(newDate)
        setTipo('criar')
    }

    return (
        <div className='flex items-center space-x-3 justify-center mb-2' >
            <Button onClick={handlePrevMonth} className='p-3 h-5 text-center'> &lt; </Button>
            <h3 className='font-bold' > {mesAtual} </h3>
            <Button onClick={handleNextMonth} className='p-3 h-5'> &gt; </Button>
        </div>
    )
}

export default MounthYear