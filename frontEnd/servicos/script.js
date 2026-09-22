window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/historicoServicos");
  const servico = await resposta.json();
  console.log(servico);
  listarServicos(servico);
});

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
