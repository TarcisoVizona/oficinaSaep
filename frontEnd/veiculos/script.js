window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/veiculos");
  const veiculo = await resposta.json();
  console.log(veiculo);
  listarVeiculos(veiculo);
});

async function listarVeiculos(veiculo) {
  const vazia = document.querySelector("#vazia");

  veiculo.forEach((veiculo) => {
    vazia.innerHTML += `
        <div id="veiculos">
            <h2>${veiculo.id_carro}</h2>
            <h2>${veiculo.placa_carro}</h2>
            <h2>${veiculo.marca_carro}</h2>
            <h2>${veiculo.modelo_carro}</h2>
            <h2>${veiculo.ano_carro}</h2>
            <h2>${veiculo.cor_carro}</h2>
            <h2>${veiculo.id_usuario}</h2>
            <button onclick="deletar(${veiculo.id_carro})">🗑️</button>
            <button onclick='editar(${veiculo.id_carro})'>✏️</button>
        </div>
        `;
  });
}
