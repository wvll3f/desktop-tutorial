import React from 'react'
import { Card, CardDescription, CardTitle } from '../ui/card'
import { UserContext } from '@/context/UserStorage'

function ResumeArea() {

    const { inflows, outflows, balance } = React.useContext(UserContext)
    const [font, setFont]=React.useState('text-2xl');
    const [fontTitle, setFontTitle]=React.useState('');
    

window.addEventListener("resize", () => {
  const viewportWidth = window.innerWidth;
  if(viewportWidth < 768){
      setFont('text-md')
      setFontTitle('text-xl')  
  }else{
    setFontTitle('')
    setFont('text-2xl')  
  }
});


    return (

        <div className={' flex justify-center space-x-5 mb-6'}>

            <Card className=' flex flex-col justify-center items-center p-3'>
                <CardTitle className={fontTitle} >Entradas</CardTitle>
                {
                    inflows && <CardDescription className={`${font} text-blue-500`}  >R$ {inflows}</CardDescription>
                }
            </Card>
            <Card className=' flex flex-col justify-center items-center p-3'>
                <CardTitle className={fontTitle} >Saidas</CardTitle>
                {
                    outflows && <CardDescription className={`${font} text-orange-500`}  >R$ {outflows}</CardDescription>
                }
            </Card>
            <Card className=' flex flex-col justify-center items-center p-3'>
                <CardTitle className={fontTitle} >Balanço</CardTitle>
                {
                    balance?.toString().includes('-')
                        ? <CardDescription className={`${font} text-red-500`}  >R$ {balance}</CardDescription>
                        : <CardDescription className={`${font} text-green-500`}  >R$ {balance}</CardDescription>
                }
            </Card>
        </div>


    )
}

export default ResumeArea