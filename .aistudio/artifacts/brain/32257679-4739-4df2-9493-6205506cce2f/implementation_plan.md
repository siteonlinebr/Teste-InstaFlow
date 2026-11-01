# Modal Centralizado de Feedback Pós-Download (Pop-up com Blur & Auto-fechamento)

Substituição da barra superior por um **modal centralizado moderno tipo aplicativo** com fundo escurecido e desfoque (*backdrop-blur*), acionado apenas 1 vez por sessão após o download, com registro imediato no Google Analytics (GA4), mensagem opcional e fechamento automático inteligente em 2 segundos.

---

## 🎯 Decisões Confirmadas & Comportamento

> [!IMPORTANT]
> 1. **Frequência (1x por Sessão)**:
>    - O modal só abre **uma única vez** por visita/sessão (controlado via `sessionStorage`). Se o usuário converter e baixar 20 vezes depois, ele não será incomodado novamente.
> 2. **Visual & Presença de App (Pop-up com Blur)**:
>    - Centralizado na tela com bordas arredondadas elegantes (`rounded-2xl`), sombreamento profundo e fundo com desfoque de vidro fosco (`backdrop-blur-md bg-black/70`).
>    - Pode ser fechado a qualquer momento com tecla `Esc`, botão `✕` ou clicando fora do pop-up.
> 3. **Fluxo Rápido de 1 Clique + Auto-fechamento em 2s**:
>    - Na tela inicial do pop-up, o visitante vê os 4 botões de sentimento e uma caixinha discreta para mensagem opcional.
>    - Ao clicar em um dos botões:
>      - O evento `user_feedback` é disparado imediatamente no **Google Analytics 4**.
>      - Se o usuário não digitou texto, surge a mensagem de agradecimento com indicador visual e o pop-up **se fecha sozinho após 2 segundos**.
> 4. **Canal de E-mail para Mensagem Opcional**:
>    - Se o usuário preencher o campo de texto antes de votar ou durante o agradecimento, ele pode clicar em "Enviar Mensagem", abrindo o cliente de e-mail pré-configurado para `contatocuriosidadesincriveis6@gmail.com`.

---

## 🎨 Design do Modal (`FeedbackModal.tsx`)

```
┌────────────────────────────────────────────────────────────────────────┐
│  [Ícone Sparkles]  Como foi sua conversão?                      [ ✕ ] │
│  Seu voto nos ajuda a manter a ferramenta gratuita e veloz             │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   [ 😍 Excelente! ]   [ ⚡ Super Rápido! ]   [ 👍 Boa ]   [ ❌ Problema ]│
│                                                                        │
│   Sua sugestão ou comentário (Opcional):                               │
│   ┌──────────────────────────────────────────────────────────────────┐ │
│   │ Ex: Gostaria de converter vídeos, mais opções de corte...         │ │
│   └──────────────────────────────────────────────────────────────────┘ │
│                                                                        │
│   [✓ Voto registrado! Fechando em 2s...]            [Enviar Mensagem]  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Arquitetura Técnica

### 1. Novo Componente: `src/components/FeedbackModal.tsx`
- Substitui o antigo banner horizontal.
- Controla o estado de abertura, temporizador de 2 segundos com cancelamento ao digitar e desfoque de fundo.
- Bloqueia rolagem do fundo quando ativo (`overflow-hidden` no body) e responde ao `Escape`.

### 2. Integração no `src/App.tsx`
- Verificação de sessão:
  ```ts
  const hasSeenFeedback = sessionStorage.getItem('pixelshift_feedback_session');
  if (!hasSeenFeedback) {
    setShowFeedbackModal(true);
    sessionStorage.setItem('pixelshift_feedback_session', 'true');
  }
  ```
- Disparado em:
  - `handleDownloadAllZip` (download do lote completo).
  - `onDownload` de qualquer imagem individual em `ImageItemCard`.

### 3. Métricas no Google Analytics (GA4)
- Parâmetros registrados em cada clique:
  - `sentiment_value`: `'excelente'`, `'rapido'`, `'boa'`, `'problema'`.
  - `format_used`: formato de saída (`webp`, `jpg`, `pdf`, etc.).
  - `has_custom_message`: `true` ou `false`.

---

## 📋 Próximos Passos
1. Criar o componente `src/components/FeedbackModal.tsx`.
2. Remover o antigo banner em linha e acoplar o modal no `src/App.tsx`.
3. Executar compilação de produção (`npm run build`) e sincronizar na raiz e em `/docs`.
