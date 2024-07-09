import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { UserContext } from '@/context/UserStorage'

interface resumeProps {
    classn: string;
}

function ResumeArea() {

    const { inflows, outflows, balance } = React.useContext(UserContext)

    return (

        <div className={' flex justify-center space-x-5 mb-6 bg-red-400 '}>

            <Card className=' flex flex-col justify-center items-center p-3'>
                <CardTitle>Entradas</CardTitle>
                {
                    inflows && <CardDescription className='text-2xl text-blue-500' >R$ {inflows}</CardDescription>
                }
            </Card>
            <Card className=' flex flex-col justify-center items-center p-3'>
                <CardTitle>Saidas</CardTitle>
                {
                    outflows && <CardDescription className='text-2xl text-orange-500' >R$ {outflows}</CardDescription>
                }
            </Card>
            <Card className=' flex flex-col justify-center items-center p-3'>
                <CardTitle>Balanço</CardTitle>
                {
                    balance?.toString().includes('-')
                        ? <CardDescription className='text-2xl text-red-500' >R$ {balance}</CardDescription>
                        : <CardDescription className='text-2xl text-green-500' >R$ {balance}</CardDescription>
                }
            </Card>
        </div>


    )
}

export default ResumeArea