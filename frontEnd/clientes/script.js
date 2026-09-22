window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/clientes");
  const cliente = await resposta.json();
  console.log(cliente);
  listarClientes(cliente);
});

async function editar(id) {
  const cliente = await fetch(`http://localhost:3000/clientes/${id}`);
  const clienteParams = await cliente.json();
  const datas = {
    nome_cliente: prompt("Nome do cliente", clienteParams.nome_cliente),
    cpf_cliente: prompt("CPF do cliente", clienteParams.cpf_cliente),
    telefone_cliente: prompt(
      "Telefone do cliente",
      clienteParams.telefone_cliente,
    ),
    endereco_cliente: prompt(
      "Endereço do cliente ",
      clienteParams.endereco_cliente,
    ),
  };

  const resposta = await fetch(`http://localhost:3000/atualizarCliente/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(datas),
  });

  if (resposta.status == 200) {
    return window.location.reload();
  }
}

async function deletar(id) {
  const resposta = await fetch(`http://localhost:3000/deleteCliente/${id}`, {
    method: "DELETE",
  });
  if (resposta.status == 200) {
    return window.location.reload();
  }
}

async function listarClientes(cliente) {
  const vazia = document.querySelector("#vazia");

  cliente.forEach((cliente) => {
    vazia.innerHTML += `
        <div id="clientes">
            <h2>${cliente.id_cliente}</h2>
            <h2>${cliente.nome_cliente}</h2>
            <h2>${cliente.cpf_cliente}</h2>
            <h2>${cliente.telefone_cliente}</h2>
            <h2>${cliente.endereco_cliente}</h2>
            <button onclick="deletar(${cliente.id_cliente})">🗑️</button>
            <button onclick="editar(${cliente.id_cliente})">✏️</button>
        </div>
        `;
  });
}
