# ApexHoops Mobile

Aplicação mobile do projeto ApexHoops, desenvolvida com **React Native + Expo + TypeScript**.

## Estrutura

- `app/`: telas e rotas gerenciadas pelo **Expo Router**;
- `components/`: componentes reutilizáveis;
- `constants/`: constantes de cores e tipografia;
- `context/`: estado global de autenticação;
- `hooks/`: hooks da aplicação;
- `services/`: integração com Firebase;
- `types/`: interfaces e tipos TypeScript.

## Requisitos atendidos

- navegação baseada em Expo Router;
- estilização com `StyleSheet.create`;
- paleta de cores centralizada em `constants/Cores.ts`;
- fontes e tamanhos centralizados em `constants/Fontes.ts`;
- ícones com `react-native-vector-icons`;
- autenticação por Firebase Authentication;
- persistência da sessão local;
- proteção das telas autenticadas;
- tela Sobre com objetivo, funcionalidades e integrantes;
- configurações do Firebase por variáveis de ambiente.

## Execução

```bash
npm install
npx expo start
```

Antes de executar, copie `.env.example` para o arquivo de ambiente local e preencha os valores do projeto Firebase.
