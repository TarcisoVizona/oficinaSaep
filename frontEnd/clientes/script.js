window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/clientes");
  const cliente = await resposta.json();
  console.log(cliente);
  listarClientes(cliente);
});

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
            <button onclick='editar(${cliente.id_cliente})'>✏️</button>
        </div>
        `;
  });
}
