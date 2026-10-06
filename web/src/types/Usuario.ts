// Usuario.ts

export type Posicao =
  | "Armador"
  | "Ala-armador"
  | "Ala"
  | "Ala-pivô"
  | "Pivô";

export type NivelAtleta =
  | "Iniciante"
  | "Intermediário"
  | "Avançado";

export type MaoDominante =
  | "Direita"
  | "Esquerda"
  | "Ambidestra";

export type UsuarioTipo = {
  uid: string;

  nome: string;
  email: string;

  cidade?: string;

  posicao?: Posicao;
  nivel?: NivelAtleta;

  altura?: number;
  peso?: number;

  dataNascimento?: string;

  maoDominante?: MaoDominante;

  frasePerfil?: string;
  fotoPerfil?: string;

  focoPrincipal?: string;
  descricaoFoco?: string;

  prioridadeTecnica?: string;
  prioridadeFisica?: string;

  sessoesSemanais?: number;

  perfilCompleto: boolean;
}