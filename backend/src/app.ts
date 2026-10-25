import cors from "cors";
import express from "express";

import { rotaAtributos } from "./rotas/atributos";
import { rotaTreinos } from "./rotas/treinos";

const app = express();

const origensPermitidas = (process.env.ORIGEM_WEB ?? "").split(",").filter(Boolean);

app.use(cors({ origin: origensPermitidas }));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true });
});

app.use("/v1", rotaAtributos);
app.use("/v1", rotaTreinos);

export default app;