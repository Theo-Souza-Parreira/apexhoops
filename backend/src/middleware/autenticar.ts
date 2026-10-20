import { Request, Response, NextFunction } from "express";
import { getAuth } from "firebase-admin/auth";

export async function autenticar(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const cabecalho = req.headers.authorization;

    if (!cabecalho || !cabecalho.startsWith("Bearer ")) {
        res.status(401).json({ erro: "Token ausente" });
        return;
    }

    try {
        const token = await getAuth().verifyIdToken(cabecalho.slice(7));
        res.locals.uid = token.uid; // o uid vem SEMPRE do token
        next();
    } catch {
        res.status(401).json({ erro: "Token inválido ou expirado" });
    }
}