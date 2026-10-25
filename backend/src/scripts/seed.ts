import "dotenv/config";
import { banco } from "../firebase";
import { CATALOGO } from "../catalogo";

// ⚠️ ID de TESTE — Rick Astley (nunca sai do ar).
// Substitua quando os vídeos reais estiverem prontos, adicionando o campo
// `videoUrl: "<id-real>"` em cada exercício do catalogo.ts.
const VIDEO_TESTE = "dQw4w9WgXcQ";

async function popular() {
    console.log(`Inserindo ${CATALOGO.length} exercícios em exercicios/...`);

    for (const exercicio of CATALOGO) {
        const { id, ...dados } = exercicio;

        await banco.collection("exercicios").doc(id).set(
            {
                ...dados,
                // Se o exercício já tem videoUrl próprio, respeita;
                // senão, aplica o ID de teste
                videoUrl: dados.videoUrl ?? VIDEO_TESTE,
            },
            { merge: true }
        );

        console.log(`  ✓ ${id}`);
    }

    console.log("Catálogo populado com sucesso.");
}

popular()
    .then(() => process.exit(0))
    .catch((erro) => {
        console.error("Erro ao popular catálogo:", erro);
        process.exit(1);
    });