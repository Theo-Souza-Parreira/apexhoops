import { Router } from "express";

import { banco } from "../firebase";
import { autenticar } from "../middleware/autenticar";
import { calcularAtributos } from "../servicos/atributos";
import { recomendarTreino, PerfilUsuario } from "../servicos/recomendacao";
import { CATALOGO } from "../catalogo";
import { RegistroTreino } from "../tipos/Treino";
import { CONFIG } from "../config";

export const rotaTreinos = Router();

rotaTreinos.get("/treinos/recomendado", autenticar, async (_req, res) => {
    try {
        const uid = res.locals.uid as string;

        // 1. Perfil do usuário
        const perfilSnap = await banco.collection("usuarios").doc(uid).get();
        if (!perfilSnap.exists) {
            res.status(404).json({ erro: "Usuário não encontrado" });
            return;
        }
        const perfil = perfilSnap.data() as PerfilUsuario;

        // 2. Últimos registros → atributos
        const registrosSnap = await banco
            .collection("usuarios")
            .doc(uid)
            .collection("registros")
            .orderBy("data", "desc")
            .limit(CONFIG.registrosConsiderados)
            .get();

        const registros = registrosSnap.docs.map(
            (d) => d.data() as RegistroTreino
        );
        const atributos = calcularAtributos(registros);

        // 3. Recomendação
        const treino = recomendarTreino(perfil, atributos, CATALOGO);

        res.json(treino);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao recomendar o treino" });
    }
});