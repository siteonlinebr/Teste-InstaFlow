# Política de Privacidade & Termos de Uso (Padrão FHG)

Implementação de um modal interativo e responsivo de **Política de Privacidade** e **Termos de Uso**, adaptando a estrutura oficial do ecossistema *Curiosidades Incríveis* para o *PixelShift* e o *Future Horizon Group (FHG)*, garantindo conformidade com a LGPD e preparando o site para aprovação no Google AdSense.

## Decisões Confirmadas pelo Usuário

> [!IMPORTANT]
> - **Formato de Exibição**: Modal interativo de abertura instantânea na própria página, mantendo o usuário imerso sem recarregamentos ou redirecionamentos.
> - **Padrão de Conteúdo**: Adaptação direta da política de privacidade do *Curiosidades Incríveis*, customizada com as características técnicas do *PixelShift* (processamento 100% local no navegador) e chancela do *Future Horizon Group (FHG)*.

---

## 1. Visão Geral e Estrutura dos Termos

O modal exibirá duas abas/seções claras para os visitantes e auditores do Google AdSense:

```
┌────────────────────────────────────────────────────────────────────────┐
│  🔒 Privacidade & Termos · Future Horizon Group (FHG)              [✕] │
├────────────────────────────────────────────────────────────────────────┤
│  [ Aba: Política de Privacidade ]     [ Aba: Termos de Uso ]           │
│                                                                        │
│  • Zero Venda de Dados: Privacidade inegociável                        │
│  • Processamento 100% Local: Fotos nunca saem do dispositivo          │
│  • Google Analytics (G-HZNZ6824F7): Métricas agregadas e anônimas      │
│  • Cookies Técnicos: Armazenamento exclusivo de preferências locais    │
│  • Conformidade LGPD & GDPR: Direitos de titular resguardados          │
│  • Ecossistema FHG: Governança pelo Future Horizon Group              │
│  • Contato Oficial: zeusagar.2018@gmail.com                            │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Experiência do Usuário e Design Visual

- **Estética & Atmosfera**:
  - Backdrop em *glassmorphism* com desfoque de fundo (`backdrop-blur-md bg-black/80`).
  - Cartão central em `#0F1422` com bordas sutis em `border-white/10` e sombra profunda `shadow-2xl`.
  - Tipografia de alta legibilidade (`DM Sans` e `Plus Jakarta Sans`) com espaçamento confortável para leitura no mobile e desktop.
- **Interatividade & Acessibilidade**:
  - Fechamento intuitivo com tecla `Esc`, botão `✕` no topo ou clique fora do modal.
  - Gatilhos de abertura integrados discretamente no rodapé (`Footer`) com links "Política de Privacidade" e "Termos de Uso".
  - Scroll interno suave com barra de rolagem estilizada (`scrollbar-thin`).

---

## 3. Decisões Técnicas e Conformidade

- **Componente Dedicado (`src/components/PrivacyPolicyModal.tsx`)**:
  - Isolamento completo da lógica de exibição em componente React controlado por estado.
- **Conformidade para Google AdSense e LGPD**:
  - Presença explícita da menção ao rastreamento anônimo do Google Analytics (`G-HZNZ6824F7`), conformidade com a LGPD e dados do operador (*Future Horizon Group*).
- **Zero Impacto no Desempenho**:
  - Renderização condicional para não sobrecarregar a árvore do DOM quando o modal estiver fechado.
- **Sincronização com o Build**:
  - Atualização do pipeline de compilação em `dist/`, `docs/` e `index.html`.

---

## 4. Etapas de Execução

1. **Criação do Componente `PrivacyPolicyModal.tsx`**:
   - Desenvolver o modal com abas alternáveis (Privacidade / Termos de Uso).
   - Inserir o texto padronizado com os dados específicos do PixelShift e FHG.
2. **Integração no `App.tsx` e `Footer.tsx`**:
   - Adicionar estado global `isPrivacyOpen` e `initialTab` no `App.tsx`.
   - Adicionar links clicáveis no `Footer.tsx` para abrir o modal diretamente na aba solicitada.
3. **Validação, Compilação e Sincronização**:
   - Testar abertura, leitura e fechamento em celulares e desktops.
   - Executar `npm run build` e sincronizar pastas `dist/` e `docs/`.
