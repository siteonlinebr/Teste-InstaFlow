# Efeito de Gradiente Fluido e Onda de Letras no Título (H1)

Implementação de animação cinética e cromática no destaque principal do título ("com velocidade máxima"), combinando um gradiente fluido em degradê azul, ciano e violeta com uma sutil onda de flutuação sincronizada entre as letras.

## Decisões Confirmadas pelo Usuário

> [!IMPORTANT]
> - **Estilo de Cores**: Gradiente fluido contínuo transitando suavemente entre azul elétrico, ciano neon e violeta profundo.
> - **Movimento das Letras**: Onda suave sequencial, onde cada caractere flutua verticalmente com atraso progressivo (*stagger delay*), criando uma onda viva e moderna sem poluição visual.

---

## 1. Visão Geral e Conceito Visual

O objetivo é transformar a parte final do título principal (`<h1>`) em um ponto focal de alto impacto estético, transmitindo a sensação de agilidade, tecnologia de ponta e processamento em tempo real do PixelShift.

```
┌────────────────────────────────────────────────────────────────────────┐
│  Converta e comprima imagens em lote                                  │
│                                                                        │
│  c   o   m       v   e   l   o   c   i   d   a   d   e       m   á   ...│
│  ▲   │   │       │   │   │   │   │   │   │   │   │   │       │   │   │ │
│  │   ▼   │       ▲   │   ▼   │   ▲   │   ▼   │   ▲   │       ▼   ▲   │ │
│  [ Onda Vertical Suave ] + [ Gradiente Fluido: Índigo ➔ Ciano ➔ Violeta ]│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Experiência do Usuário e Design Visual

- **Paleta de Gradiente Contínuo**:
  - Índigo Elétrico (`#6366F1`)
  - Ciano Cristalino (`#06B6D4`)
  - Violeta Vibrante (`#8B5CF6`)
  - Azul Celeste (`#38BDF8`)
- **Técnica de Renderização**:
  - `background-size: 300% 300%` com deslocamento contínuo de posição de fundo (`background-position`) em loop infinito de 4 segundos.
  - `-webkit-background-clip: text` e `color: transparent` para que as cores fiquem restritas à tipografia.
- **Movimento em Onda das Letras**:
  - Decomposição da frase `"com velocidade máxima"` em caracteres individuais envolvidos em spans `inline-block`.
  - Animação CSS pura com aceleração via GPU (`transform: translateY(-4px)` e `will-change: transform`).
  - Cálculo de `animationDelay` de `index * 0.07s` para que a onda viaje continuamente da esquerda para a direita.
  - Preservação correta de espaços (`\u00A0` e `mr-1.5`) para garantir responsividade perfeita em celulares sem quebrar palavras ao meio.

---

## 3. Decisões Técnicas e Arquitetura

- **CSS Puro vs. Biblioteca Externa**:
  - *Abordagem Escolhida*: Animação em CSS nativo através do Tailwind CSS e `@keyframes` em `src/index.css`.
  - *Motivo*: Desempenho máximo (60-120 FPS direto na GPU), zero impacto no peso do bundle JavaScript e compatibilidade universal em qualquer navegador móvel.
- **Sincronização com o Deploy (GitHub Pages & Google Cloud)**:
  - Recompilação automática de `dist/` e `docs/` para que a alteração seja publicada imediatamente tanto no link do Google quanto em `https://conversordeimagem.site/`.

---

## 4. Etapas de Execução

1. **Configuração dos Keyframes em `src/index.css`**:
   - Criar `@keyframes waveFloat` para a flutuação vertical (-4px a 0px).
   - Criar `@keyframes gradientFlow` para o deslocamento contínuo do gradiente de cores.
2. **Atualização do Componente de Título em `src/App.tsx`**:
   - Criar subcomponente ou mapeamento de caracteres para a frase `"com velocidade máxima"`.
   - Aplicar classes de estilo e cálculo de atraso em cascata.
3. **Validação e Compilação**:
   - Testar legibilidade e fluidez em telas desktop e mobile.
   - Executar `npm run build` e sincronizar pastas `dist/` e `docs/`.
