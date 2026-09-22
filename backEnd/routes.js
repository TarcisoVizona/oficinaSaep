import express from "express";
import sql from "./database.js";

const rotas = express.Router();

rotas.get("/clientes", async (req, res) => {
  try {
    const resposta = await sql`SELECT * FROM clientes`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.log("Erro ao visualizar histórico de serviços:" + error);
  }
});

rotas.get("/clientes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resposta = await sql`SELECT * FROM clientes WHERE id_cliente = ${id}`;
    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.log("Erro ao visualizar histórico de serviços:" + error);
  }
});

rotas.get("/historicoServicos", async (req, res) => {
  try {
    const resposta = await sql`SELECT * FROM servicos`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.log("Erro ao visualizar histórico de serviços:" + error);
  }
});

rotas.get("/historicoServicos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resposta = await sql`SELECT * FROM servicos WHERE id_servico = ${id}`;
    return res.status(200).json(resposta[0]);
  } catch (error) {
    console.log("Erro ao visualizar histórico de serviços:" + error);
  }
});

rotas.get("/veiculos", async (req, res) => {
  try {
    const resposta = await sql`SELECT * FROM veiculos`;
    return res.status(200).json(resposta);
  } catch (error) {
    console.log("Erro ao visualizar histórico de serviços:" + error);
  }
});

rotas.get("/veiculos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const resposta = await sql`SELECT * FROM veiculos WHERE id_carro = ${id}`;
    return res.status(200).json(resposta[0]);
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
      return res.status(200).json(usuario);
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
    id_cliente,
  } = req.body;

  try {
    await sql`INSERT INTO veiculos 
    (
    placa_carro, 
    marca_carro, 
    modelo_carro,
    ano_carro,
    cor_carro,
    id_cliente
    ) VALUES (
    ${placa_carro},
    ${marca_carro},
    ${modelo_carro},
    ${ano_carro},
    ${cor_carro},
    ${id_cliente}
    )`;

    return res.status(201).json("Veículo cadastrado com sucesso!");
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return res.status(500).json(`Erro ao cadastrar serviço! ${error}`);
  }
});

rotas.put("/atualizarCliente/:id", async (req, res) => {
  const { id } = req.params;
  const { nome_cliente, cpf_cliente, telefone_cliente, endereco_cliente } =
    req.body;

  try {
    const resposta = await sql`UPDATE clientes SET 
nome_cliente = ${nome_cliente}, 
cpf_cliente = ${cpf_cliente},
telefone_cliente = ${telefone_cliente},
endereco_cliente = ${endereco_cliente}
WHERE id_cliente = ${id}
`;

    return res.status(200).json("Cliente atualizado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Não foi possível atualizar cliente!");
  }
});

rotas.put("/atualizarServico/:id", async (req, res) => {
  const { id } = req.params;
  const {
    dataentrada_servico,
    descricao_servico,
    tipo_servico,
    status_servico,
    valor_servico,
  } = req.body;

  try {
    const resposta = await sql`UPDATE servicos SET 
dataentrada_servico = ${dataentrada_servico}, 
descricao_servico = ${descricao_servico},
tipo_servico = ${tipo_servico},
status_servico = ${status_servico},
valor_Servico = ${valor_servico}
WHERE id_servico = ${id}
`;

    return res.status(200).json("Serviço atualizado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Não foi possível atualizar serviço!");
  }
});

rotas.put("/atualizarVeiculo/:id", async (req, res) => {
  const { id } = req.params;
  const { placa_carro, marca_carro, modelo_carro, ano_carro, cor_carro } =
    req.body;

  try {
    const resposta = await sql`UPDATE veiculos SET 
placa_carro = ${placa_carro}, 
marca_carro = ${marca_carro},
modelo_carro = ${modelo_carro},
ano_carro = ${ano_carro},
cor_carro = ${cor_carro}
WHERE id_carro = ${id}
`;

    return res.status(200).json("Veículo atualizado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Não foi possível atualizar veículo!");
  }
});

rotas.delete("/deleteCliente/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sql`DELETE FROM clientes WHERE id_cliente = ${id}`;
    return res.status(200).json("Cliente deletado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Não foi possível deletar cliente!");
  }
});

rotas.delete("/deleteServico/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sql`DELETE FROM servicos WHERE id_servico = ${id}`;
    return res.status(200).json("Serviço deletado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Não foi possível deletar serviço!");
  }
});

rotas.delete("/deleteVeiculo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await sql`DELETE FROM veiculos WHERE id_carro = ${id}`;
    return res.status(200).json("Carro deletado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).json("Não foi possível deletar carro!");
  }
});

export default rotas;
