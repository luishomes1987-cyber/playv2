# SiteCampeonato - Deploy na Netlify

## Pré-requisitos

1. Conta na [Netlify](https://netlify.com)
2. Aplicação Discord criada no [Discord Developer Portal](https://discord.com/developers/applications)

## Configuração do Discord OAuth

1. Vai ao [Discord Developer Portal](https://discord.com/developers/applications)
2. Cria uma nova aplicação ou usa uma existente
3. Vai a **OAuth2** > **General**
4. Copia o **Client ID** e **Client Secret**
5. Em **Redirects**, adiciona:
   - `https://teu-site.netlify.app/api/discord/callback`
   - `http://localhost:3000/api/discord/callback` (para desenvolvimento)

## Variáveis de Ambiente na Netlify

Na Netlify, vai a **Site settings** > **Environment variables** e adiciona:

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_DISCORD_CLIENT_ID` | Client ID da aplicação Discord |
| `DISCORD_CLIENT_SECRET` | Client Secret da aplicação Discord |

## Deploy

### Opção 1: Deploy via Git

1. Faz push do código para GitHub/GitLab
2. Conecta o repositório na Netlify
3. Configura as variáveis de ambiente
4. Deploy automático

### Opção 2: Deploy Manual

1. Executa `npm run build` localmente
2. Faz upload da pasta `.next` na Netlify

## Desenvolvimento Local

\`\`\`bash
# Instalar dependências
npm install

# Criar ficheiro .env.local
echo "NEXT_PUBLIC_DISCORD_CLIENT_ID=teu_client_id" >> .env.local
echo "DISCORD_CLIENT_SECRET=teu_client_secret" >> .env.local

# Iniciar servidor de desenvolvimento
npm run dev
\`\`\`

## Estrutura do Projeto

- `/app` - Páginas Next.js (App Router)
- `/components` - Componentes React
- `/lib` - Utilitários e contextos
- `/public` - Ficheiros estáticos

## Funcionalidades

- **Loja** - Produtos com categorias e raridades
- **Perfil** - Inventário do utilizador com produtos aprovados
- **Admin** - Painel para gerir updates e pagamentos
- **Discord Auth** - Login via Discord OAuth2
