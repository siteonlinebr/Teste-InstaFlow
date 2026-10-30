# Sistema de Micro-Feedback Inteligente (Google Analytics + E-mail Opcional)

Implementação de um componente elegante de micro-avaliação pós-download de 1 clique, integrado diretamente aos eventos em tempo real do **Google Analytics 4 (GA4)** e com canal direto para envio de sugestões ao e-mail oficial **`contatocuriosidadesincriveis6@gmail.com`**.

---

## 🎯 Objetivos & Decisões Confirmadas

> [!IMPORTANT]
> - **Experiência do Usuário (1 Clique)**: O card de avaliação surge suavemente logo após o usuário baixar suas imagens convertidas (individualmente ou em pacote ZIP).
> - **Rastreamento em Tempo Real no Google Analytics (GA4)**: Cada voto dispara um evento nativo `user_feedback` com métricas detalhadas (nota, formato convertido, sentimento e contagem de itens).
> - **Canal de E-mail para Sugestões (Opcional)**: Se o usuário quiser elogiar ou pedir uma funcionalidade (ex: conversão de vídeos, novos formatos), ele pode enviar uma mensagem em 1 clique direto para o e-mail oficial do grupo.
> - **Sem Custo de Servidor**: Funciona 100% no navegador (Client-Side), sem banco de dados pago ou backend adicional.

---

## 📐 Design & Experiência de Uso (UX)

### 1. Gatilho de Exibição
O card surge com uma animação suave (`animate-fadeIn`) logo abaixo da barra de controle ou no rodapé do item convertido assim que o download é disparado:

```
┌────────────────────────────────────────────────────────────────────────┐
│  🎉 Download concluído! Como foi sua experiência com a conversão?      │
│                                                                        │
│  [ 😍 Excelente! ]   [ ⚡ Super Rápido! ]   [ 👍 Boa ]   [ 😕 Teve problema ] │
└────────────────────────────────────────────────────────────────────────┘
```

### 2. Estado Após o 1º Clique (Registro Imediato no Google Analytics)
Assim que o visitante clica em qualquer uma das opções:
1. O evento é enviado instantaneamente para o **Google Analytics 4**:
   - `event_name`: `user_feedback`
   - `sentiment`: `'excelente'` | `'rapido'` | `'boa'` | `'problema'`
   - `format`: formato utilizado (ex: `'webp'`, `'pdf'`, etc.)
   - `timestamp`: data e hora do evento.
2. A tela muda para agradecimento com espaço opcional para mensagem:
   ```
   ┌────────────────────────────────────────────────────────────────────┐
   │  ✓ Muito obrigado pelo feedback! Cada voto ajuda o ecossistema FHG. │
   │                                                                    │
   │  Quer deixar uma sugestão para os próximos recursos? (Opcional)    │
   │  [ Escreva uma mensagem rápida...                                ] │
   │  [ Enviar Mensagem por E-mail ✉️ ]              [ Concluir ✕ ]     │
   └────────────────────────────────────────────────────────────────────┘
   ```

---

## 🛠️ Arquitetura Técnica

### 1. Novo Componente React: `src/components/FeedbackBanner.tsx`
- Estado local controlado (`rating`, `submitted`, `isExpanded`).
- Prevenção de spam: armazena no `localStorage` para não ficar incomodando o mesmo usuário a cada download consecutivo.
- Botão de fechar `✕` discreto a qualquer momento.

### 2. Integração com o Google Analytics 4 (GA4)
- Função utilitária no serviço: `trackFeedbackEvent(sentiment, format, count)`.
- Compatibilidade segura com `window.gtag` (testando existência antes da chamada).

### 3. Integração de E-mail
- Abertura de mensagem ou envio para `contatocuriosidadesincriveis6@gmail.com` com título pré-configurado: `[PixelShift Feedback] Sugestão / Avaliação de Usuário`.

### 4. Conexão nos Gatilhos de Download
- Acionado no clique de:
  - Botão individual "Baixar Imagem".
  - Botão global "Baixar Todas (.ZIP)".

---

## 🚀 Etapas de Implementação

1. **Criar `src/components/FeedbackBanner.tsx`**:
   - Interface moderna com glassmorphism, botões interativos e feedback tátil.
2. **Conectar Gatilhos no `App.tsx` e `imageConverter.ts`**:
   - Disparar a exibição do banner quando o download for efetuado com sucesso.
3. **Verificação & Compilação**:
   - Testar o envio de eventos no GA4.
   - Executar `npm run build` e sincronizar `dist/` e `docs/` para o GitHub Pages.
