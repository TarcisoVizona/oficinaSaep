window.addEventListener("load", async () => {
  const resposta = await fetch("http://localhost:3000/veiculos");
  const veiculo = await resposta.json();
  console.log(veiculo);
  listarVeiculos(veiculo);
});

async function editar(id) {
  const veiculo = await fetch(`http://localhost:3000/veiculos/${id}`);
  const veiculoParams = await veiculo.json();
  const datas = {
    placa_carro: prompt("Placa do carro", veiculoParams.placa_carro),
    marca_carro: prompt("Marca do carro", veiculoParams.marca_carro),
    modelo_carro: prompt("Modelo do carro", veiculoParams.modelo_carro),
    ano_carro: prompt("Ano do carro", veiculoParams.ano_carro),
    cor_carro: prompt("Cor do carro", veiculoParams.cor_carro),
  };

  const resposta = await fetch(`http://localhost:3000/atualizarVeiculo/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(datas),
  });

  if (resposta.status == 200) {
    return window.location.reload();
  }
}

async function deletar(id) {
  const resposta = await fetch(`http://localhost:3000/deleteVeiculo/${id}`, {
    method: "DELETE",
  });
  if (resposta.status == 200) {
    return window.location.reload();
  }
}

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
            <h2>${veiculo.id_cliente}</h2>
            <button onclick="deletar(${veiculo.id_carro})">🗑️</button>
            <button onclick='editar(${veiculo.id_carro})'>✏️</button>
        </div>
        `;
  });
}
