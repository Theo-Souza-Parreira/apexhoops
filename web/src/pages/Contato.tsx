import estilos from './Contato.module.css'
import { useForm } from 'react-hook-form'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { type UsuarioTipo } from '../types/Usuario';
import { useNavigate } from 'react-router-dom'

type FormValues = {
    email: string
    nome: string
    numero: string
    mensagem: string
}

const contatoSchema = z.object({

    email: z.email({message: 'Informe um e-mail válido.'}),

    nome: z.string()
            .min(2, {message: 'Informe um nome válido.'}),

    numero: z.string()
            .min(8, { message: 'Informe um número válido.' }),

    mensagem: z.string()
            .min(10, { message: 'A mensagem deve ter pelo menos 10 caracteres' })
})

export function Contato(){

    const { 
        register, handleSubmit, formState:{errors} 
    } = useForm<FormValues>(
        {resolver: zodResolver(contatoSchema)}
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
        dadosUsuario.nome = data.nome
        dadosUsuario.numero = data.numero

        navegacao('home')

    }

    return(
        <div className={estilos.conteiner}>

            <h1 className={estilos.titulo}>
                Contato
            </h1>

            <form 
                className={estilos.formulario}
                onSubmit={handleSubmit(autenticarUsuario)}
            >
                
                <input 
                    {...register('nome')}
                    className={estilos.campo}
                    placeholder='Nome'
                />
                { errors.nome && <p className={estilos.mensagem}>{errors.nome.message}</p> }
                
                <input 
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='Email'
                />
                { errors.email && <p className={estilos.mensagem}>{errors.email.message}</p> }

                <input 
                    {...register('numero')}
                    className={estilos.campo}
                    placeholder='Número'
                />
                {errors.numero && <p className={estilos.mensagem}>{errors.numero.message}</p>}

                <textarea
                    {...register('mensagem')}
                    placeholder= 'Digite sua mensagem'
                    rows={6}
                />
                {errors.mensagem && <p className={estilos.mensagem}>{errors.mensagem.message}</p>}
              
                <button 
                    className={estilos.botao}
                >
                    Enviar
                </button> 

            </form>

        </div>
    )
}