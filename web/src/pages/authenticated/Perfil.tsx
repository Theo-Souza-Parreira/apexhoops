import estilos from './Perfil.module.css'
import img from '../../assets/img/Perfil.png'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import { IoArrowBackOutline } from "react-icons/io5";

type FormValues = {
    nome: string
    email: string
    telefone: string
    peso: string
    altura: string
    dataNascimento: string
    posicao: string
    mao: string
}

const perfilSchema = z.object({
    nome: z
        .string()
        .min(3, { message: 'O nome deve conter no mínimo 3 caracteres.' }),

    email: z
        .email({ message: 'Informe um e-mail válido.' }),

    telefone: z
        .string()
        .min(10, { message: 'Informe um telefone válido.' }),

    peso: z
        .string()
        .min(1, { message: 'Informe seu peso.' }),

    altura: z
        .string()
        .min(1, { message: 'Informe sua altura.' }),

    dataNascimento: z
        .string()
        .min(1, { message: 'Selecione sua data de nascimento.' }),

    posicao: z
        .string()
        .min(1, { message: 'Selecione sua posição.' }),

    mao: z
        .string()
        .min(1, { message: 'Selecione sua mão dominante.' }),
})

export function Perfil() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>({
        resolver: zodResolver(perfilSchema)
    })

    const navegacao = useNavigate()

    const salvarPerfil = (data: FormValues) => {
        console.log(data)
    }

    const sair = () =>{
        navegacao('/')
    }

    const voltar = () =>{
        navegacao('/status')
    }

    return (
        <div className={estilos.conteiner}>

            <button
                type="button"
                className={estilos.voltar}
                onClick={voltar}
            >
                <IoArrowBackOutline className={estilos.iconeVoltar} />
                Voltar
            </button>

            <div className={estilos.imgperfil}>
                <img src={img} alt="Perfil" />
            </div>

            <form
                className={estilos.formulario}
                onSubmit={handleSubmit(salvarPerfil)}
            >

                <input
                    {...register('nome')}
                    className={estilos.campo}
                    placeholder="Nome"
                />
                {errors.nome && <p className={estilos.mensagem}>{errors.nome.message}</p>}

                <input
                    {...register('email')}
                    className={estilos.campo}
                    placeholder="Email"
                />
                {errors.email && <p className={estilos.mensagem}>{errors.email.message}</p>}

                <input
                    {...register('telefone')}
                    className={estilos.campo}
                    placeholder="Telefone"
                />
                {errors.telefone && <p className={estilos.mensagem}>{errors.telefone.message}</p>}

                <input
                    {...register('peso')}
                    className={estilos.campo}
                    placeholder="Peso (kg)"
                />
                {errors.peso && <p className={estilos.mensagem}>{errors.peso.message}</p>}

                <input
                    {...register('altura')}
                    className={estilos.campo}
                    placeholder="Altura (cm)"
                />
                {errors.altura && <p className={estilos.mensagem}>{errors.altura.message}</p>}

                <label className={estilos.titulo}>Data de nascimento</label>

                <input
                    type="date"
                    className={estilos.data}
                    {...register('dataNascimento')}
                />
                {errors.dataNascimento && (<p className={estilos.mensagem}>{errors.dataNascimento.message}</p>)}

                <select
                    {...register('posicao')}
                    className={estilos.select}
                >
                    <option value="">Selecione a posição</option>
                    <option value="armador">Armador</option>
                    <option value="ala-armador">Ala-Armador</option>
                    <option value="ala">Ala</option>
                    <option value="ala-pivo">Ala-Pivô</option>
                    <option value="pivo">Pivô</option>
                </select>
                {errors.posicao && (<p className={estilos.mensagem}>{errors.posicao.message}</p>)}

                <select
                    {...register('mao')}
                    className={estilos.select}
                >
                    <option value="">Selecione a mão dominante</option>
                    <option value="direita">Direita</option>
                    <option value="esquerda">Esquerda</option>
                </select>
                {errors.mao && (<p className={estilos.mensagem}>{errors.mao.message}</p>)}

                <button className={estilos.botao}>
                    Confirmar
                </button>

                <button className={estilos.sair} onClick={sair}>
                <IoLogOutOutline className={estilos.icone} />
                    Sair
                </button>

            </form>

        </div>
    )
}