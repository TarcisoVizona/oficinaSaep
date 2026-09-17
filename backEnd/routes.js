import express from "express";
import sql from "./database.js";

const rotas = express.Router();

rotas.get("/historicoServicos", async (req, res) => {
  try {
    const resposta = await sql`SELECT * FROM servicos`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.log("Erro ao visualizar histórico de serviços:" + error);
  }
});

rotas.post("/loginUsuario", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario =
      await sql`SELECT * FROM usuarios where email_usuario = ${email} AND senha_usuario = ${senha}`;

    if (usuario.length != 0) {
      return res.status(200).json(usuario[0]);
    } else {
      return res.status(401).json("Email ou senha incorretos!");
    }
  } catch (error) {
    console.log("Erro ao realizar login de usuario:" + Error);
  }
});

rotas.post("/cadastrarClientes", async (req, res) => {
  const { nome_cliente, cpf_cliente, telefone_cliente, endereco_cliente } =
    req.body;

  try {
    await sql`INSERT INTO clientes (nome_cliente, cpf_cliente, telefone_cliente,endereco_cliente) 
    VALUES (
    ${nome_cliente},
    ${cpf_cliente},
    ${telefone_cliente},
    ${endereco_cliente} 
    )`;

    return res.status(201).json("Cliente cadastrado com sucesso!");
  } catch (error) {
    return res.status(500).json("Erro ao cadastrar cliente!");
  }
});

rotas.post("/cadastrarVeiculos", async (req, res) => {
  const {
    placa_carro,
    marca_carro,
    modelo_carro,
    ano_carro,
    cor_carro,
    id_usuario,
  } = req.body;

  try {
    await sql`INSERT INTO veiculos 
    (
    placa_carro, 
    marca_carro, 
    modelo_carro,
    ano_carro,
    cor_carro,
    id_usuario
    ) VALUES (
    ${placa_carro},
    ${marca_carro},
    ${modelo_carro},
    ${ano_carro},
    ${cor_carro},
    ${id_usuario}
    )`;

    return res.status(201).json("Veículo cadastrado com sucesso!");
  } catch (error) {
    return res.status(500).json("Erro ao cadastrar veículo!");
  }
});

rotas.post("/cadastrarServicos", async (req, res) => {
  const {
    dataEntrada_servico,
    descricao_servico,
    tipo_servico,
    valor_servico,
    id_usuario,
    id_veiculo,
  } = req.body;

  try {
    await sql`INSERT INTO servicos
    (
    dataEntrada_servico,
    descricao_servico, 
    tipo_servico,
    valor_servico,
    id_usuario,
    id_veiculo
    ) VALUES (
    ${dataEntrada_servico},
    ${descricao_servico},
    ${tipo_servico},
    ${valor_servico},
    ${id_usuario},
    ${id_veiculo}
    )`;

    return res.status(201).json("Serviço cadastrado com sucesso!");
  } catch (error) {
    return res.status(500).json("Erro ao cadastrar serviço!");
  }
});

export default rotas;
