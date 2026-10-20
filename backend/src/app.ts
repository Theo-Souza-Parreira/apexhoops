import cors from "cors";
import express from "express";

import { rotaAtributos } from "./rotas/atributos";

const app = express();

// O app de celular não usa CORS; só o site precisa estar nesta lista
const origensPermitidas = (process.env.ORIGEM_WEB ?? "").split(",").filter(Boolean);

app.use(cors({ origin: origensPermitidas }));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true });
});

app.use("/v1", rotaAtributos);

export default app;