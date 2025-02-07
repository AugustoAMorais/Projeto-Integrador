# MEDKIT

## 📌 Sobre o Projeto

O **MEDKIT** é uma aplicação desenvolvida para auxiliar pacientes na gestão de seus documentos hospitalares, proporcionando mais praticidade e organização. O sistema permite que os usuários registrem e acompanhem informações essenciais sobre sua saúde, incluindo:

- **Histórico de Vacinas**: Carteira digital para armazenar o nome das vacinas e a data de aplicação.
- **Alarmes para Medicamentos**: Definição de lembretes para a administração de remédios, com horário e nome do medicamento.
- **Dicas de Saúde**: Blog com receitas saudáveis para incentivar um estilo de vida melhor.
- **Alergias e Doenças**: Registro de alergias e doenças preexistentes, como diabetes.
- **Receitas Médicas**: Upload de fotos de receitas médicas, incluindo nome do medicamento e data de expiração.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Autenticação**: JWT (JSON Web Token)
- **Criptografia de Senhas**: bcrypt
- **Banco de Dados**: MySQL (via Workbench)

---

## 📥 Instalação e Execução

### 🔧 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)

### 📌 Passos para Rodar o Projeto

1. **Clone o repositório**

```bash
    git clone https://github.com/seu-usuario/medkit.git
```

2. **Acesse a pasta do projeto**

```bash
    cd medkit
```

3. **Instale as dependências**

```bash
    npm install
```

4. **Instale o Node.js** (caso não tenha instalado globalmente)

```bash
    npm install node
```

5. **Configure o banco de dados**
   - Crie um banco de dados no MySQL Workbench.
   - Configure as credenciais no arquivo de conexão do backend.

6. **Inicie o servidor**

```bash
    node server.js
```

7. **Acesse a aplicação**
   - O backend rodará na porta **3000**.
   - O frontend pode ser acessado pelo navegador (se houver uma interface web integrada).

---

## 📌 Endpoints da API

| Método | Rota                  | Descrição                            |
| ------ | --------------------- | ------------------------------------ |               
| GET    | `/listar-alarmes`     | Retorna todos os alarmes cadastrados |
| DELETE | `/deletar-alarme/:id` | Remove um alarme específico          |

---

## 📜 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e contribuir com melhorias!

Desenvolvido por **[Augusto Aleandre, Augusto Rodrigues e Guilherme Rodrigues](https://github.com/um1augusto, https://github.com/GuiVargasRodrigues, https://github.com/AugustoAMorais)**.

