# InstaFlow — Baixador Rápido de Vídeos do Instagram (Full-Stack)

Aplicação web full-stack de alta performance focada em praticidade para download direto de Reels, publicações em vídeo, Stories e carrosséis do Instagram, hospedada nativamente no ambiente com backend ativo do Google AI Studio (Cloud Run) com servidor Node.js/Express e proxy de streaming com cabeçalho de download direto em 1 clique.

---

### Decisões Confirmadas com o Usuário

- **Ambiente de Hospedagem e Teste**: Utilização do ambiente online nativo do AI Studio (Cloud Run), que possui suporte integral a Node.js e Express rodando na porta 3000, eliminando as limitações de hospedagens puramente estáticas como o GitHub Pages.
- **Link Direto de Acesso e Teste**: Disponível e ativo via Shared App URL (`https://ais-pre-iwb34u2mn3pe4bdmrcytqd-729791826344.us-east1.run.app`).
- **Arquitetura de Extração**: Backend próprio em Node.js (`server.ts`) com rotas de API dedicadas e proxy de streaming (`/api/download`) que injeta `Content-Disposition: attachment` para salvar arquivos MP4 e áudio MP3 diretamente no dispositivo.

---

## 1. Visão Geral e Conceito do Produto

### Por que o Backend é Essencial para o Instagram
Diferente de uma página estática comum:
1. **Contorno de CORS**: O navegador do usuário bloqueia requisições `fetch` diretas para os servidores do Instagram por motivos de segurança (CORS). O backend Node.js realiza a requisição no servidor com headers de navegador reais (`User-Agent`, `Referer`), contornando o bloqueio do browser.
2. **Download Forçado vs. Abertura de Player**: A Meta bloqueia o atributo HTML `download` em links diretos do seu CDN (`cdninstagram.com` e `fbcdn.net`). Nosso servidor recebe o fluxo de bytes e o envia ao cliente com cabeçalhos de anexo (`attachment`), fazendo com que o navegador salve o arquivo de imediato no armazenamento local (computador ou rolo de câmera do smartphone).

---

## 2. Experiência do Usuário e Design Visual

### Fluxos Principais
1. **Entrada e Colagem com 1 Toque**:
   - Botão "Colar" com integração direta à API `navigator.clipboard`.
   - Atalhos com 1 toque para demonstrações reais de teste imediato (Reel de Viagem, Carrossel de Fotografia, Gastronomia e Fitness).
2. **Player e Hub de Mídia**:
   - Player HTML5 embutido para reprodução imediata com controles customizados.
   - No caso de carrosséis, seletor de miniaturas com navegação de slides e opções de download individual ou em lote.
   - Metadados sem pílulas decorativas estáticas (Zero-Pill discipline), com contadores de curtidas e comentários em numerais tabulares (`tabular-nums`).
3. **Downloads em 1 Clique**:
   - `Baixar Vídeo (MP4 HD)`: CTA primário em gradiente vibrante estilo Instagram.
   - `Áudio (MP3)`: Download isolado da trilha sonora.
   - `Capa (JPG)`: Download da imagem de capa em alta definição.
   - `Copiar Link`: Cópia do link direto com feedback em toast animado.
4. **Histórico Local de Downloads**:
   - Gaveta lateral rápida mantida no `localStorage`, permitindo reproduzir e baixar novamente qualquer mídia já processada sem novo consumo de rede.

### Identidade Visual
- Fundo obsidiana profundo (`#07080C`) com superfícies em ardósia escura (`#0E1018`, `#141624`).
- Acentos em gradiente clássico do Instagram (`#833AB4` -> `#FD1D1D` -> `#F77737`).
- Tipografia premium: `Plus Jakarta Sans` para títulos e `DM Sans` para leitura e controles.

---

## 3. Decisões Técnicas e Arquitetura

### 1. Separação de Rotas Full-Stack
- **`server.ts`**:
  - Servidor Express rodando na porta 3000, com `vite.middlewares` integrado em desenvolvimento e servindo a pasta `dist` em produção.
  - Endpoint `POST /api/instagram/extract`: Extração multi-camadas (oEmbed + raspagem de HTML captioned + fallback de amostragem resiliente).
  - Endpoint `GET /api/download`: Proxy de streaming seguro com sanitização contra SSRF, repasse de `Content-Length` e cabeçalho `Content-Disposition: attachment`.
- **`vite.config.ts`**:
  - Configurado com `base: './'` para garantir que se o usuário desejar exportar ou espelhar os assets estáticos no GitHub, não haja problema de links quebrados ou tela branca.

---

## 4. Diagrama da Arquitetura

```
┌────────────────────────────────────────────────────────┐
│               Frontend React 19 (InstaFlow)            │
│  - UrlInputBar (Detecção de Clipboard, Auto-Paste)     │
│  - MediaPreviewCard (Player HTML5, Metadados)         │
│  - CarouselViewer (Navegação de Slides, Downloads)     │
│  - HistoryDrawer (Downloads recentes em localStorage)  │
└────────────────────────────────────────────────────────┘
                           │
                 /api/instagram/extract
                 /api/download?url=...&filename=...
                           ▼
┌────────────────────────────────────────────────────────┐
│            Backend Express no AI Studio (Cloud Run)    │
│  - Validação e Sanitização de URLs                     │
│  - Extração de Metadados Públicos e Streams            │
│  - Proxy de Streaming com Content-Disposition          │
└────────────────────────────────────────────────────────┘
```

### Próximos Passos
Com o plano aprovado, o ambiente do AI Studio já está pronto para uso e testes imediatos no link fornecido.
