const inputEmail = document.querySelector("#inputEmail");
const inputSenha = document.querySelector("#inputSenha");
const btnEntrar = document.querySelector("#btnEntrar");

//login de usuario
btnEntrar.addEventListener("click", async () => {
  const email = inputEmail.value;
  const senha = inputSenha.value;

  const resposta = await fetch("http://localhost:3000/loginUsuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      senha: senha,
    }),
  });

  if (resposta.status == 200) {
    const usuario = await resposta.json();
    localStorage.setItem("id_user", usuario.id_usuario);
    localStorage.setItem("cargo", usuario.cargo_usuario);
    if (usuario.cargo_usuario == "administrador") {
      return (window.location.href = "../Dashboard/dashboard.html");
    }
    return (window.location.href = "../home/index.html");
  } else {
    alert("Usuario ou senha incorretos");
  }
});
