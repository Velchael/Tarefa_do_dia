## Projeto Tarefa do Dia

Este é um projeto full-stack para gerenciar tarefas diárias. O backend foi desenvolvido em Node.js e utiliza um banco de dados MySQL chamado "tarefadodia" com duas tabelas, "users" e "tasks", enquanto o frontend é baseado em tecnologias web padrão.

## Pré-requisitos
Certifique-se de ter instalado o seguinte em seu computador:

Node.js https://nodejs.org/  
MySQL Server  https://dev.mysql.com/downloads/mysql/ (certifique-se de ter um servidor MySQL em execução)
video Youtube como instalar Mysql https://youtu.be/-Dp-IGEDnYA?si=u02fnJHgmVO8-he8

## Etapas para Executar o Projeto

Clonar o Repositório:

Abrir o pront de comando do terminal de sua maquina local y cria uma pasta com o comando mkdir:

  mkdir tarefa

  git clone https://github.com/Velchael/Tarefa_do_dia.git 

Acessar o Diretório do Projeto com visual estudio code:

  cd tarefa

Configuração do Backend:

  Vá para o diretório /backend:

  cd backend

Instale as dependências do backend com:

  npm install
  Configure as variáveis de ambiente. Copie .env.example para um novo arquivo chamado .env e certifique-se de configurar as variáveis de ambiente relacionadas à conexão com seu banco de dados MySQL:
  

  MYSQL_HOST=nome_do_host
  MYSQL_USER=nome_do_usuário
  MYSQL_PASSWORD=senha
  MYSQL_DATABASE=tarefadodia

  ATEÇÂO os campos nome_do_host, nome_do_usuário, senha são provisto no momento de instalar Mysql Server

# Crie o banco de dados e as tabelas no MySQL. Você pode abrir o MySQL Workbench ou seu cliente MySQL preferido e executar o seguinte script SQL:


CREATE DATABASE tarefadodia;
USE tarefadodia;

-- Criar a tabela "users"
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

-- Criar a tabela "tasks"
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `created_at` varchar(45) NOT NULL,
  `registeruser` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`registeruser`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


# Por fim, inicie o servidor backend com:

  npm run dev

# A partir da raiz do projeto, navegue até o diretório /frontend:
  
  Configuração do Frontend:
  cd ../frontend
  Abra o arquivo index.HTML em seu navegador para acessar a interface do frontend. Você pode fazer isso arrastando o arquivo para o navegador ou usando uma extensão de servidor local, se estiver usando um editor como o VS Code.