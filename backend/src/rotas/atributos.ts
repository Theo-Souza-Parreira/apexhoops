import { Router } from "express";

import { CONFIG } from "../config";
import { banco } from "../firebase";
import { autenticar } from "../middleware/autenticar";
import { calcularAtributos } from "../servicos/atributos";
import { RegistroTreino } from "../tipos/Treino";

export const rotaAtributos = Router();

rotaAtributos.get("/atributos", autenticar, async (_req, res) => {
    try {
        const uid = res.locals.uid as string;

        const consulta = await banco
            .collection("usuarios")
            .doc(uid)
            .collection("registros")
            .orderBy("data", "desc")
            .limit(CONFIG.registrosConsiderados)
            .get();

        const registros = consulta.docs.map((d) => d.data() as RegistroTreino);

        res.json({
            versaoCalculo: CONFIG.versaoCalculo,
            registrosConsiderados: registros.length,
            atributos: calcularAtributos(registros),
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao calcular os atributos" });
    }
});