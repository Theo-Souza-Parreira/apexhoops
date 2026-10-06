# Backend — ApexHoops

O ApexHoops utiliza o Firebase como back-end compartilhado entre as aplicações Web e Mobile.

## Serviços utilizados

- **Firebase Authentication:** cadastro, login e encerramento de sessão usando e-mail e senha.
- **Cloud Firestore:** armazenamento dos dados de perfil dos atletas e informações utilizadas pelas aplicações.
- **Variáveis de ambiente:** as configurações do Firebase não ficam fixadas no código-fonte. A Web utiliza variáveis `VITE_FIREBASE_*` e a Mobile utiliza `EXPO_PUBLIC_FIREBASE_*`.

## Fluxo de autenticação

1. O usuário cria uma conta com e-mail e senha.
2. O Firebase Authentication cria a credencial.
3. Os dados complementares do atleta são armazenados no Firestore.
4. No login, a credencial é validada pelo Firebase.
5. A Web protege as rotas autenticadas e a Mobile protege as telas por meio do fluxo do Expo Router.
6. O logout encerra a sessão do Firebase e limpa a sessão local da aplicação Mobile.

As aplicações Web e Mobile compartilham o mesmo projeto Firebase, garantindo que os dados e a autenticação estejam centralizados.
