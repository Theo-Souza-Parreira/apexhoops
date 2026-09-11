import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { MenuLateral } from './MenuLateral';

/**
 * MainLayout: Define a estrutura visual global e fixa da aplicação.
 * Ele serve como uma "casca" que mantém elementos repetitivos (como Header e Footer) 
 * idênticos em várias páginas, mudando apenas o conteúdo central.
 */
function MainLayout2(){
    return (
        <div>
            <MenuLateral />
            <main>
                {/* * Outlet: É um componente do React Router que serve como um "espaço reservado". 
                  * É exatamente aqui que o conteúdo das rotas filhas (as páginas específicas) 
                  * será injetado e renderizado dinamicamente.
                  * Caso queira olhe em routes
                  */}
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout2;