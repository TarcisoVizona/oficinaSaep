import postgres from "postgres";

const sql = postgres(
  "postgres://postgres:sesisenai@192.168.1.10:5432/OficinaSaep",
);

async function testarConexao() {
  try {
    const resultado = await sql`SELECT NOW();`;
    console.log("Conectado com sucesso! Hora no servidor:", resultado[0].now);
  } catch (erro) {
    console.error("Erro ao conectar ao banco de dados:", erro.message);
  }
}

testarConexao();

export default sql;
