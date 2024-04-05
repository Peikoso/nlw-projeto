let participantes = [
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    dataInscricao: new Date(2024, 2, 23, 14, 45),
    dataCheckIn: new Date(2024, 2, 26, 10, 30)
  },
  {
    nome: "Carlos Oliveira",
    email: "carlos.o@example.com",
    dataInscricao: new Date(2024, 2, 24, 10, 0),
    dataCheckIn: new Date(2024, 2, 26, 15, 20)
  },
  {
    nome: "Fernanda Souza",
    email: "fernanda.s@example.com",
    dataInscricao: new Date(2024, 2, 25, 18, 30),
    dataCheckIn: new Date(2024, 2, 27, 9, 45)
  },
  {
    nome: "Paulo Santos",
    email: "paulo.s@example.com",
    dataInscricao: new Date(2024, 2, 26, 9, 15),
    dataCheckIn: new Date(2024, 2, 27, 14, 10)
  },
  {
    nome: "Juliana Lima",
    email: "juliana.l@example.com",
    dataInscricao: new Date(2024, 2, 27, 13, 0),
    dataCheckIn: null
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel.a@example.com",
    dataInscricao: new Date(2024, 2, 28, 20, 45),
    dataCheckIn: null
  },
  {
    nome: "Amanda Costa",
    email: "amanda.c@example.com",
    dataInscricao: new Date(2024, 2, 29, 17, 30),
    dataCheckIn: new Date(2024, 3, 1, 9, 15)
  },
  {
    nome: "Lucas Ferreira",
    email: "lucas.f@example.com",
    dataInscricao: new Date(2024, 2, 30, 12, 15),
    dataCheckIn: new Date(2024, 3, 1, 14, 50)
  },
  {
    nome: "Mariana Oliveira",
    email: "mariana.o@example.com",
    dataInscricao: new Date(2024, 2, 31, 15, 0),
    dataCheckIn: null
  }
]
const criarNovoParticipante = (participantes) => {
  const dataInscricao = dayjs(Date.now()).to(participantes.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participantes.dataCheckIn)

  if(participantes.dataCheckIn == null){
    dataCheckIn = `
      <button
        data-email="${participantes.email}"
        onclick="fazerCheckIn(event)"
      >
      Confirmar check-in
      </button>
    `
  }

  return `  
  <tr>
    <td>
      <strong>
        ${participantes.nome}
      </strong>
      <br>
      <small>
        ${participantes.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  // repetição
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  // substituir informação do  HTML
  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste){
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) =>{
  const msgConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(msgConfirmacao) == false){
    return
  }

  const participante = participantes.find((p) => 
   p.email == event.target.dataset.email
  )
  participante.dataCheckIn = new Date()
  atualizarLista(participantes)
}

