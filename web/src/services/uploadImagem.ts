const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export async function enviarImagem(arquivo: File): Promise<string> {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("As configurações do Cloudinary não foram definidas.");
  }

  const dados = new FormData();
  dados.append("file", arquivo);
  dados.append("upload_preset", UPLOAD_PRESET);

  const resposta = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: dados,
    },
  );

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(
      resultado.error?.message || "Não foi possível enviar a imagem.",
    );
  }

  return resultado.secure_url;
}
