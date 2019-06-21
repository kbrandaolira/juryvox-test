## Juryvox Airlines: A treta no ar acontece aqui

### `Como rodar o projeto?`

1- Instale o NODE.JS

2- Instale o GITHUB

3- Clone o Projeto através da URL https://github.com/kbrandaolira/juryvox-test.git

4- Instale o JSON Server para simular a API através do comando npm install -g json-server

5- Utilize o comando json-server --watch db.json no arquivo db.json dentro da pasta juryvox-test/flight-project/db. 

6- Na raiz do projeto utilize o comando npm start. 

## Componentes Criados

### `Flights`

Lista todos os voos em formato de tabela com as açõs de criar, editar e excluir.

### `FlightSelect`

Serve para desenhar um select de voos já cadastrados. Recebe o parâmetro defaultValue que serve para definir um valor padrão.

### `FlightUpdate`

Caso o parâmetro flightId seja passado ele renderizará um botão de editar, caso ao contrário renderiza um botão verde (success) de criação. Ao clicar no botão abrirá um modal para salvar ou editar um voo.

### `Footer`

Renderiza o footer da aplicação.

### `Header`

Renderiza o cabeçalho com o menu da aplicação.

### `Passengers`

Lista todos os passageiros em formato de tabela com as açõs de criar, editar e excluir.

### `PassengerSelect`

Serve para desenhar um select de passageiros já cadastrados. Recebe o parâmetro defaultValue que serve para definir um valor padrão.

### `PassengerUpdate`

Caso o parâmetro passengerId seja passado ele renderizará um botão de editar, caso ao contrário renderiza um botão verde (success) de criação. Ao clicar no botão abrirá um modal para salvar ou editar um passageiro.

### `Tickets`

Lista todos os tickets em formato de tabela com as açõs de criar, editar e excluir.

### `TicketUpdate`

Caso o parâmetro ticketId seja passado ele renderizará um botão de editar, caso ao contrário renderiza um botão verde (success) de criação. Ao clicar no botão abrirá um modal para salvar ou editar um ticket.

## Observações

**Obs1: Existe um arquivo de propriedade chamado properties.js que tem a constante de conexão com o servidor que é http://localhost:3000**

**Obs2: As rotas são definidas no arquivo routes.js**

**Obs3: O arquivo prototype.pdf possui a prototipação das telas, ele está dentro da pasta documents**