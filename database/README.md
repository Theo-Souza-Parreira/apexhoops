# Banco de Dados — ApexHoops

O banco de dados do ApexHoops é baseado no **Cloud Firestore**, integrado ao Firebase.

## Entidade principal

### usuarios

Cada documento representa um atleta e utiliza o UID fornecido pelo Firebase Authentication como identificador.

Principais dados armazenados:

- `codigo`: UID do usuário no Firebase;
- `nome`: nome do atleta;
- `email`: e-mail utilizado no login;
- `permissao`: nível de permissão da conta;
- `dataNascimento`: data de nascimento;
- `altura`: altura do atleta;
- `peso`: peso do atleta;
- `posicao`: posição em quadra;
- `mao`: mão dominante;
- `nivel`: nível técnico;
- `experiencia`: experiência no basquete.

A autenticação fica sob responsabilidade do Firebase Authentication, enquanto os dados complementares do perfil ficam no Firestore.
