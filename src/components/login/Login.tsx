import React from 'react'
import Input from '../Input.tsx';
import useForm from '../../hooks/useForm';
import { UserContext } from '../../context/UserStorage';
import { Button } from '../ui/button.tsx';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card.tsx';
import picFinance from '../../assets/picFinance.jpg'

function Login() {
  const username = useForm();
  const password = useForm();
  //@ts-ignore
  const { userLogin, logado } = React.useContext(UserContext);

  async function handleSubmit(event: any) {
    event.preventDefault();
    if (username.validate() && password.validate()) {
      userLogin(username.value, password.value)
    }
  }

  return (
    <section className=' mx-auto max-w-screen-xl'>
      <Card className=''>
        <CardHeader>
        </CardHeader>
        <CardContent className='max-w-screen-xl flex gap-7'>
          <form className="flex flex-col justify-center w-full space-y-5 " action="" onSubmit={handleSubmit}>
            <h1 className='text-5xl' >LOGIN</h1>
            <Input label="Usuario" type="text" name="username" {...username} />
            <Input label="Senha" type="password" name="password" {...password} />
            <Button className='mt-5 w-full'>
              Entrar
            </Button>
          </form>
          <div className='border-solid border-r-4 border-gray-100 h-25 w-1'></div>
          <section>
            <img className='object-cover' src={picFinance} alt="" />
          </section>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Login;