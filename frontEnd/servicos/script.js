window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/historicoServicos");
  const servico = await resposta.json();
  console.log(servico);
  listarServicos(servico);
});

async function editar(id) {
  const servico = await fetch(`http://localhost:3000/historicoServicos/${id}`);
  const servicoParams = await servico.json();
  const datas = {
    dataentrada_servico: prompt(
      "Data de entrada do serviço",
      servicoParams.dataentrada_servico,
    ),
    descricao_servico: prompt("Descrição", servicoParams.descricao_servico),
    tipo_servico: prompt("Tipo de serviço", servicoParams.tipo_servico),
    status_servico: prompt("Status ", servicoParams.status_servico),
    valor_servico: prompt("Valor", servicoParams.valor_servico),
  };

  const resposta = await fetch(`http://localhost:3000/atualizarServico/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(datas),
  });

  if (resposta.status == 200) {
    return window.location.reload();
  }
}

async function deletar(id) {
  const resposta = await fetch(`http://localhost:3000/deleteServico/${id}`, {
    method: "DELETE",
  });
  if (resposta.status == 200) {
    return window.location.reload();
  }
}

async function listarServicos(servico) {
  const vazia = document.querySelector("#vazia");

  servico.forEach((servico) => {
    vazia.innerHTML += `
        <div id="servicos">
            <h2>${servico.id_servico}</h2>
            <h2>${servico.dataentrada_servico}</h2>
            <h2>${servico.descricao_servico}</h2>
            <h2>${servico.tipo_servico}</h2>
            <h2>${servico.status_servico}</h2>
            <h2>${servico.valor_servico}</h2>
            <h2>${servico.id_usuario}</h2>
            <h2>${servico.id_veiculo}</h2>
            <button onclick="deletar(${servico.id_servico})">🗑️</button>
            <button onclick='editar(${servico.id_servico})'>✏️</button>
        </div>
        `;
  });
}
