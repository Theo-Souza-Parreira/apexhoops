import "dotenv/config";
import app from "./app";

const porta = Number(process.env.PORT ?? 3000);

app.listen(porta, "0.0.0.0", () => {
    console.log(`API rodando em http://localhost:${porta}`);
});