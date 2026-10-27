# InstaFlow — Baixador de Vídeos do Instagram

Aplicação web para download de Reels, publicações em vídeo, Stories e carrosséis do Instagram em alta definição (MP4) e áudio (MP3) em 1 clique.

## 🚀 Como Executar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor em desenvolvimento
npm run dev
```

Acesse em `http://localhost:3000`.

## 📦 Como Publicar no GitHub Pages (Sem Tela Branca)

O projeto já está configurado com `base: './'` no `vite.config.ts`, permitindo que os scripts e estilos sejam carregados corretamente em qualquer subdiretório do GitHub Pages.

1. Gere o build de produção:
   ```bash
   npm run build
   ```
2. O conteúdo pronto para publicação estática estará na pasta `dist/`.
3. Nas configurações do seu repositório no GitHub (**Settings > Pages**), selecione a branch e a pasta onde os arquivos da pasta `dist/` estão publicados (ou use uma GitHub Action para deploy automático do Vite).
