import { autenticacao } from "@/services/Firebase";

const URL_BASE = process.env.EXPO_PUBLIC_API_URL || "http://192.168.100.38:3000";

export async function chamarApi<T>(caminho: string): Promise<T> {
    const token = await autenticacao.currentUser?.getIdToken();
    if (!token) throw new Error("Usuário não autenticado");

    const resposta = await fetch(`${URL_BASE}${caminho}`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return resposta.json();
}