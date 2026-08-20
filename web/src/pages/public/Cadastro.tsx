import estilos from './Cadastro.module.css'
import { TbLogin2 } from "react-icons/tb";
import { useForm } from 'react-hook-form'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { type UsuarioTipo } from '../../types/Usuario';
import { useNavigate } from 'react-router-dom'

type FormValues = {
    nome: string
    email: string
    senha: string
}

const cadastroSchema = z.object({
    nome: z.string()
        .min(2, { message: 'O nome deve conter no mínimo 2 caracteres.' }),

    email: z.email({ message: 'Informe um e-mail válido.' }),

    senha: z.string()
        .min(6, { message: 'A senha deve conter entre 6 a 18 caracteres.' })
        .max(18, { message: 'A senha deve conter entre 6 a 18 caracteres.' })
})

export function Cadastro() {

    const {
        register, handleSubmit, formState: { errors }
    } = useForm<FormValues>(
        {resolver: zodResolver(cadastroSchema)}
    )

    const dadosUsuario: UsuarioTipo = {
        nome: '',
        email: '',
        senha: '',
        numero: ''
    }

    const navegacao = useNavigate()

    const autenticarUsuario = (data: FormValues) => {

        dadosUsuario.nome = data.nome
        dadosUsuario.email = data.email
        dadosUsuario.senha = data.senha
        navegacao('/')
    }

    const voltar = () => {
        navegacao('/login')
    }

    return (

        <div className={estilos.conteiner}>

            <h1 className={estilos.titulo}>
                <span>Apex</span> <span className={estilos.hoops}>Hoops</span>
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
                {errors.nome && <p className={estilos.mensagem}>{errors.nome.message}</p>}

                <input
                    {...register('email')}
                    className={estilos.campo}
                    placeholder='Email'
                />
                {errors.email && <p className={estilos.mensagem}>{errors.email.message}</p>}

                <input
                    {...register('senha')}
                    className={estilos.campo}
                    placeholder='Senha'
                    type='password'
                />
                {errors.senha && <p className={estilos.mensagem}>{errors.senha.message}</p>}

                <button
                    className={estilos.botao}
                >
                    <TbLogin2 className={estilos.icone} />
                    Cadastrar
                </button>

                <button
                    type='button'
                    className={estilos.novoUsuario}
                    onClick={voltar}
                >
                    Voltar
                </button>

            </form>
        </div>
    )
}