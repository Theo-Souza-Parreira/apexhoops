import { createContext, useState, type ReactNode } from 'react'

interface AuthContextoTipo{
    emailUsuario: string;
    autenticar: (email: string) => void;
    sair: () => void;
}

export const AuthContext = createContext<AuthContextoTipo>({
    emailUsuario: '',
    autenticar: () => {},
    sair: () => {}
});

export const AuthProvider = ({Children}: {Children: ReactNode}) => {
    const [emailUsuario, setEmailUsuario] = useState('');

    const autenticar = (email: string) => {
        setEmailUsuario(email);
    };

    const sair = () => {
        setEmailUsuario('');
    };
    

    return(

        <AuthContext.Provider value={{ emailUsuario, autenticar, sair }}>
            {Children}
        </AuthContext.Provider>
    );
};