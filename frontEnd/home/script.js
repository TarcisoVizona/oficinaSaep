const inputNomeCliente = document.querySelector("#inputNomeCliente");
const inputCfpCliente = document.querySelector("#inputCpfCliente");
const inputTelefoneCliente = document.querySelector("#inputTelefoneCliente");
const inputEnderecoCliente = document.querySelector("#inputEnderecoCliente");
const btnCadCliente = document.querySelector("#btnCadCliente");

const inputDataServico = document.querySelector("#inputDataServico");
const inputDescServico = document.querySelector("#inputDescServico");
const inputTipoServico = document.querySelector("#inputTipoServico");
const inputValorServico = document.querySelector("#inputValorServico");
const inputClienteServico = document.querySelector("#inputClienteServico");
const inputIdVeiculo = document.querySelector("#inputIdServico");
const btnCadServico = document.querySelector("#btnCadServico");

const inputPlacaCarro = document.querySelector("#inputPlacaCarro");
const inputMarcaCarro = document.querySelector("#inputMarcaCarro");
const inputModeloCarro = document.querySelector("#inputModeloCarro");
const inputAnoCarro = document.querySelector("#inputAnoCarro");
const inputCorCarro = document.querySelector("#inputCorCarro");
const inputClienteCarro = document.querySelector("#inputClienteCarro");
const btnCadVeiculo = document.querySelector("#btnCadVeiculo");

const clientesNav = document.querySelector("#clientesNav");
const servicosNav = document.querySelector("#servicosNav");
const veiculosNav = document.querySelector("#veiculosNav");
const logout = document.querySelector("#logout");

clientesNav.addEventListener("click", async () => {
  return (window.location.href = "../clientes/index.html");
});

servicosNav.addEventListener("click", async () => {
  return (window.location.href = "../servicos/index.html");
});

veiculosNav.addEventListener("click", async () => {
  return (window.location.href = "../veiculos/index.html");
});

logout.addEventListener("click", async () => {
  localStorage.removeItem("cargo");
  localStorage.removeItem("id_user");

  return (window.location.href = "../login/index.html");
});

btnCadCliente.addEventListener("click", async () => {
  const nome = inputNomeCliente.value;
  const cpf = inputCfpCliente.value;
  const telefone = inputTelefoneCliente.value;
  const endereco = inputEnderecoCliente.value;

  const resposta = await fetch("http://localhost:3000/cadastrarClientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome_cliente: nome,
      cpf_cliente: cpf,
      telefone_cliente: telefone,
      endereco_cliente: endereco,
    }),
  });

  if (resposta.status == 201) {
    alert("Cadastro realizado com sucesso!");
    return window.location.reload();
  } else {
    return alert("Não foi possível realizar cadastro!");
  }
});

btnCadServico.addEventListener("click", async () => {
  const dataEntrada = inputDataServico.value;
  const desc = inputDescServico.value;
  const tipo = inputTipoServico.value;
  const valor = inputValorServico.value;
  const cliente = inputClienteServico.value;
  const idVeiculo = inputIdVeiculo.value;

  const resposta = await fetch("http://localhost:3000/cadastrarServicos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dataEntrada_servico: dataEntrada,
      descricao_servico: desc,
      tipo_servico: tipo,
      valor_servico: valor,
      id_usuario: cliente,
      id_veiculo: idVeiculo,
    }),
  });

  if (resposta.status == 201) {
    alert("Serviço criado com sucesso!");
    return window.location.reload();
  } else {
    console.log(data);
    return alert("Não foi possível criar serviço!");
  }
});

btnCadVeiculo.addEventListener("click", async () => {
  const placa = inputPlacaCarro.value;
  const marca = inputMarcaCarro.value;
  const modelo = inputModeloCarro.value;
  const ano = inputAnoCarro.value;
  const cor = inputCorCarro.value;
  const cliente = inputClienteCarro.value;

  const resposta = await fetch("http://localhost:3000/cadastrarVeiculos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      placa_carro: placa,
      marca_carro: marca,
      modelo_carro: modelo,
      ano_carro: ano,
      cor_carro: cor,
      id_usuario: cliente,
    }),
  });

  if (resposta.status == 201) {
    alert("Veículo cadastrado com sucesso!");
    return window.location.reload();
  } else {
    console.log(data);
    return alert("Não foi possível cadastrar veículo!");
  }
});
