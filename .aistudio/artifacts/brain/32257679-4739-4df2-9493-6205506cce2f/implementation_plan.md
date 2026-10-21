# InstaFlow — Baixador Rápido de Vídeos do Instagram

Aplicação web focada em velocidade máxima e conveniência para download de Reels, publicações em vídeo, Stories e carrosséis do Instagram em alta definição (MP4) e áudio (MP3), com detecção de links da área de transferência e download direto em 1 clique.

---

### Decisões Confirmadas com o Usuário

- **Formatos e mídias suportadas**: Reels, publicações de vídeo no feed, Stories e carrosséis com múltiplos itens (galeria com download individual ou em lote).
- **Recurso de praticidade central**: Detecção inteligente de link no clipboard com botão de colar em 1 clique, validação instantânea, preview do vídeo e download com stream direto sem redirecionamentos indesejados.
- **Identidade visual**: Dark mode sofisticado em tons obsidiana e ardósia profunda (`#0A0B10`), com iluminação e acentos inspirados na paleta do Instagram (gradiente magenta, púrpura e âmbar quente), tipografia moderna e zero poluição visual.

---

## 1. Visão Geral e Conceito do Produto

### O que a aplicação faz
O **InstaFlow** elimina as fricções típicas de sites de download (anúncios invasivos, múltiplos passos confusos e abas de propaganda):
1. O usuário copia um link do Instagram no celular ou computador.
2. Ao acessar a aplicação, clica no botão "Colar do Clipboard" (ou dá Ctrl+V). O link é validado em milissegundos.
3. A aplicação obtém metadados reais, thumbnail em alta definição, autor, legenda e lista de mídias (única ou carrossel).
4. Em 1 clique, o download do arquivo MP4 HD inicia imediatamente através do proxy de streaming com cabeçalho `Content-Disposition: attachment`.
5. Há opções adicionais para baixar áudio extraído (MP3), selecionar mídias específicas de um carrossel e consultar o histórico local recente de downloads salvos.

### Público-Alvo e Contexto de Uso
- Usuários comuns e criadores de conteúdo que precisam salvar inspirações, memes ou materiais para edição offline.
- Experiência otimizada tanto para telas mobile (onde o fluxo de copiar link no app do Instagram e abrir o navegador é a regra) quanto para desktop em 1440px.

---

## 2. Experiência do Usuário e Design Visual

### Fluxos Principais
1. **Entrada Expressa**:
   - Hero dinâmico com campo de busca proeminente, botão com ícone de área de transferência "Colar link" e disparo automático ao colar.
   - Pílula/seletor funcional de exemplos rápidos para teste imediato caso o usuário queira testar sem ter um link em mãos.
2. **Preview e Seleção de Mídia**:
   - Card com player de vídeo integrado ou visualizador de carrossel deslizante.
   - Informações do autor (`@usuario`), descrição e duração.
   - Botão primário vibrante de alta visibilidade: `Baixar Vídeo (HD .mp4)`.
   - Ações secundárias: `Baixar Apenas Áudio (.mp3)` e opções de resolução quando disponíveis.
3. **Carrosséis / Múltiplas Mídias**:
   - Grid/Carrossel interativo com miniaturas navegáveis, permitindo baixar todos os itens compactados ou individualmente.
4. **Histórico Local e Praticidade**:
   - Gaveta/painel de downloads recentes armazenados localmente no navegador (IndexedDB/localStorage), permitindo rever o vídeo e baixar novamente sem nova requisição.

### Identidade Visual e Estilo
- **Paleta de Cores (Regra 60-30-10)**:
  - *60% Fundo Neutro*: Preto obsidiana (`#07080C`) e ardósia ultra-escura (`#0F1117`).
  - *30% Superfícies Estruturais*: Cards escuros com bordas sutis de 1px (`rgba(255,255,255,0.08)`), fundos com leve desfoque translúcido (`backdrop-blur-md`).
  - *10% Acentos Vibrantes*: Gradiente Instagram característico (`from-[#833AB4] via-[#FD1D1D] to-[#FCB045]`) aplicado estritamente no CTA primário, destaques sutis e halos de iluminação radial.
- **Tipografia**:
  - Títulos: `Plus Jakarta Sans` ou `Outfit` para um toque moderno e arrojado.
  - Corpo e controles: `DM Sans` com excelente legibilidade e sem quebras de linha em botões.
  - Métricas e tempos: numerais tabulares monoespaçados (`tabular-nums`).
- **Disciplina Anti-Slop**:
  - Sem badges falsos ou tags estáticas envoltas em pílulas decorativas.
  - Sem falsos contadores de "status do servidor" ou métricas alucinadas.
  - Controles diretos em linguagem natural ("Colar", "Baixar Vídeo", "Limpar", "Baixar Áudio").

---

## 3. Decisões do Produto e Alternativas Técnicas

### 1. Mecanismo de Download Direto vs. Abertura em Nova Aba
- **Abordagem Escolhida**: Implementar um endpoint proxy de download `/api/download?url=...&filename=...` no backend Express integrado.
- **Por quê**: Navegadores móveis e navegadores modernos com CORS bloqueiam o atributo `download` em URLs de CDNs de terceiros (como os servidores de CDN do Instagram/Facebook), abrindo o player de vídeo na mesma aba em vez de salvar o arquivo. O proxy de streaming força o download direto com o nome do arquivo correto (`insta_video.mp4`).
- **Alternativas descartadas**: Apenas links `<a href target="_blank">`, que frustram o usuário ao obrigá-lo a tocar e segurar para salvar.

### 2. Motor de Extração de Mídia e Resiliência
- **Abordagem Escolhida**: Extração server-side modular que analisa a estrutura do link (Reel, Post, Story), consulta endpoints de metadados públicos e HTML oEmbed com suporte a fallback inteligente e demonstração integrada para desenvolvimento/teste.
- **Por quê**: Reduz bloqueios de CORS e garante que requisições ocorram com cabeçalhos apropriados.

### 3. Persistência de Histórico Local
- **Abordagem Escolhida**: `localStorage` no cliente com limite das últimas 20 mídias processadas.
- **Por quê**: Preserva total privacidade do usuário, funciona offline e não requer banco de dados externo ou autenticação para uma ferramenta utilitária rápida.

---

## 4. Arquitetura Técnica e Estrutura de Componentes

```
┌────────────────────────────────────────────────────────┐
│                      InstaFlow UI                      │
│ ┌────────────────────────────────────────────────────┐ │
│ │ TopBar Contract (Wordmark, Nav Links, Guia Rápido) │ │
│ └────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Hero Section: Input Express com Botão Colar        │ │
│ │  - Clipboard Detection API (navigator.clipboard)   │ │
│ │  - Validação em tempo real de links Instagram      │ │
│ │  - Amostras de teste rápido (Reel, Carrossel, Post)│ │
│ └────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Preview Card & Media Hub                           │ │
│ │  - Video Player customizado com controle de volume │ │
│ │  - Seletor de Carrossel (caso múltiplo)            │ │
│ │  - Botão de Download 1-Clique (MP4 HD)             │ │
│ │  - Botão de Extração de Áudio (MP3)                │ │
│ └────────────────────────────────────────────────────┘ │
│ ┌────────────────────────────────────────────────────┐ │
│ │ Histórico Local & Recursos de Produtividade        │ │
│ │  - Downloads recentes salvos                       │ │
│ │  - Como funciona & FAQ interativo                  │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
                           │
                 Requisição /api/extract
                 Stream /api/download
                           ▼
┌────────────────────────────────────────────────────────┐
│           Express Backend Middleware / Proxy           │
│  - /api/extract: Parsing de URLs do Instagram          │
│  - /api/download: Stream de bytes com attachment       │
│  - Sanitização de URLs e prevenção de SSRF             │
└────────────────────────────────────────────────────────┘
```

### Componentes Principais
1. **`Navbar`**: Logo com gradiente sutil, links rápidos para Como Usar, Formatos Suportados e FAQ.
2. **`UrlInputBar`**: Campo de texto com botão de colar automático da área de transferência, botão de limpar e botão de ação primária.
3. **`MediaPreviewCard`**: Exibição do vídeo com player HTML5, miniatura, metadados (nome do autor, avatar, duração, data aproximada) e botões de download.
4. **`CarouselViewer`**: Navegador para posts de múltiplas mídias com indicadores de slides e downloads seletivos.
5. **`RecentHistoryDrawer`**: Lista dos últimos vídeos analisados com pré-visualização e atalho de novo download.
6. **`HowItWorksSection` & `FaqSection`**: Guia simples em 3 passos para Reels, Stories e Carrosséis.

### Próximos Passos
Após a aprovação deste plano, iniciaremos a implementação do backend proxy e da interface completa com os recursos de praticidade solicitados.
