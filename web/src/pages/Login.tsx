import estilos from './Login.module.css'
import { TbLogin2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import { useForm } from 'react-hook-form'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { type UsuarioTipo } from '../tipos/Usuario';
import { useNavigate } from 'react-router-dom'

type FormValues = {
    email: string
    senha: string
}

const loginSchema = z.object({

    email: z.email({message: 'Informe um e-mail válido.'}),

    senha: z.string()
            .min(6, {message: 'A senha deve conter entre 6 a 18 caracteres.'})
            .max(18, {message: 'A senha deve conter entre 6 a 18 caracteres.'})
})

export function Login(){

    const { 
        register, handleSubmit, formState:{errors} 
    } = useForm<FormValues>(
        {resolver: zodResolver(loginSchema)}
    )

    const dadosUsuario: UsuarioTipo = {
        nome: '',
        email: '',
        senha: '',
        numero: ''
    }

    const navegacao = useNavigate()

    const autenticarUsuario = (data: FormValues) => {

        dadosUsuario.email = data.email
        dadosUsuario.senha = data.senha

        navegacao('home')

    }

    const novoUsuario = ()=>{
        navegacao('cadastro')
    }

    return(
        
        <div className={estilos.conteiner}>

            <h1 className={estilos.titulo}>
                <span>Apex</span> <span className={estilos.hoops}>Hoops</span>
            </h1>

            <form 
                className={estilos.formulario}
                onSubmit={handleSubmit(autenticarUsuario)}
            >
                
                <input 
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='Email'
                />
                { errors.email && <p className={estilos.mensagem}>{errors.email.message}</p> }

                <input 
                    {...register('senha')}
                    className={estilos.campo}
                    placeholder='Senha'      
                    type='password'      
                />
                { errors.senha && <p className={estilos.mensagem}>{errors.senha.message}</p> }
              
                <button 
                    className={estilos.botao}
                >
                    <TbLogin2 className={estilos.icone}/>
                    Entrar
                </button> 

                <button 
                    className={estilos.novoUsuario}
                    onClick={novoUsuario}
                >
                    <FaUser className={estilos.icone}/>
                    Cadastre-se
                </button>

            </form>
        </div>
    )
}