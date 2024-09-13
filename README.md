# Sistema de Gerenciamento de Ocorrências (Backend)

Este projeto é a API do sistema de gerenciamento de ocorrências escolares, desenvolvida com **NestJS** e **Prisma**.

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/code-samba/os-backend.git
```

2. Instale as dependências:
```bash
npm install
```

## Configuração

Antes de executar a aplicação, configure as variáveis criando um arquivo `.env` na raiz do projeto, certifique-se de adicionar o URL do banco de dados correto.

### .env.example
```env
JWT_SECRET=
DATABASE_URL=
```

Após configurar a URL do banco, para montar as migrações, execute:

```bash
npx prisma migrate dev
```

## Executando a aplicação

Para inicializar o servidor de desenvolvimento, ultilize:

```bash
npm run start:dev
```

[Samba Code](https://sambacode.com.br) © 2024