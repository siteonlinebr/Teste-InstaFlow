import { SupportedOutputFormat, ActiveToolMode } from '../types/converter.ts';

export interface LandingPageConfig {
  path: string;
  slug: string;
  title: string;
  navLabel: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  badge: string;
  targetFormat: SupportedOutputFormat;
  defaultQuality: number;
  activeMode: ActiveToolMode;
  defaultWidth?: number;
  defaultHeight?: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  features: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export const LANDING_PAGES: Record<string, LandingPageConfig> = {
  '/': {
    path: '/',
    slug: 'home',
    title: 'PixelShift - Conversor de Imagens & PDF',
    navLabel: 'Início',
    heroTitle: 'Conversor & Otimizador Universal de',
    heroHighlight: 'Imagens e Documentos em Lote',
    heroSubtitle:
      'Converta fotos, gere PDFs, crie favicons ICO e comprima para WEBP ou AVIF. Processamento 100% no seu navegador com privacidade total.',
    badge: '100% Gratuito · Seguro no Navegador · Sem Limites',
    targetFormat: 'webp',
    defaultQuality: 0.85,
    activeMode: 'convert',
    metaTitle: 'PixelShift – Conversor de Imagens & PDF Grátis em Lote',
    metaDescription:
      'Converta e comprima imagens em lote no navegador com privacidade 100% local. Suporte para WEBP, JPG, PNG, AVIF, ICO e PDF. Grátis, sem limites e sem cadastro.',
    keywords:
      'conversor de imagens, converter foto em pdf, converter png para ico, converter imagem para avif, converter jpg para webp, converter png para jpg, comprimir fotos online',
    features: [
      {
        title: '8 Formatos Suportados',
        description: 'WEBP, JPG, PNG, AVIF, ICO, PDF, GIF e BMP com decodificação direta.',
      },
      {
        title: 'Redimensionamento em Pixels',
        description: 'Defina largura e altura exatas ou use proporções padrão de redes sociais.',
      },
      {
        title: 'Privacidade Absoluta',
        description: 'Suas imagens nunca saem do seu aparelho nem trafegam por servidores.',
      },
    ],
    faqs: [
      {
        question: 'O que é um conversor de imagem e como ele funciona?',
        answer:
          'Um conversor de imagem é uma ferramenta digital que transforma o formato codificado de um arquivo gráfico em outro (por exemplo, de PNG para JPG, WEBP, AVIF ou PDF). Ele decodifica os pixels originais e os reorganiza de acordo com os algoritmos do formato de destino.',
      },
      {
        question: 'As minhas imagens são enviadas para algum servidor?',
        answer:
          'Não! 100% da conversão acontece no seu próprio navegador através das APIs nativas de Canvas do HTML5 e Web Workers. As fotos permanecem estritamente na memória temporária do seu aparelho.',
      },
    ],
  },

  '/converter-png-para-jpg': {
    path: '/converter-png-para-jpg',
    slug: 'converter-png-para-jpg',
    title: 'Converter PNG para JPG',
    navLabel: 'PNG para JPG',
    heroTitle: 'Converter PNG para JPG Online',
    heroHighlight: 'Rápido, Grátis e com Fundo Limpo',
    heroSubtitle:
      'Transforme imagens PNG pesadas em arquivos JPG leves e universalmente compatíveis. Escolha a cor de fundo para preencher áreas transparentes.',
    badge: 'Alta Compatibilidade · Redução de Peso · Fundo Customizável',
    targetFormat: 'jpeg',
    defaultQuality: 0.9,
    activeMode: 'convert',
    metaTitle: 'Converter PNG para JPG Online Grátis - PixelShift',
    metaDescription:
      'Converta imagens PNG para JPG em segundos com privacidade 100% local. Suporte a remoção de transparência com fundo branco ou preto. Grátis e sem limites.',
    keywords:
      'converter png para jpg, transformar png em jpg, mudar formato png para jpeg, png to jpg gratis, conversor png online',
    features: [
      {
        title: 'Fundo de Transparência Sem Erros',
        description: 'Evite bordas pretas escolhendo preenchimento branco puro ou preto elegante.',
      },
      {
        title: 'Até 70% Menos Peso',
        description: 'Arquivos JPG são ideais para fotos de produtos, câmeras e formulários.',
      },
      {
        title: 'Conversão em Lote Instantânea',
        description: 'Arraste dezenas de PNGs e baixe todos juntos em um arquivo ZIP.',
      },
    ],
    faqs: [
      {
        question: 'O que acontece com a transparência do PNG ao converter para JPG?',
        answer:
          'Como o formato JPG não possui suporte a canal alfa (transparência), o PixelShift preenche as áreas transparentes com a cor de sua preferência (por padrão, fundo branco limpo), evitando artefatos pretos.',
      },
      {
        question: 'Vou perder qualidade convertendo PNG para JPG?',
        answer:
          'O JPG utiliza compressão com perdas para fotos realistas. No PixelShift, a qualidade padrão é ajustada em 90%, o que mantém a nitidez visual idêntica ao olho humano enquanto reduz drasticamente o tamanho do arquivo.',
      },
    ],
  },

  '/converter-jpg-para-png': {
    path: '/converter-jpg-para-png',
    slug: 'converter-jpg-para-png',
    title: 'Converter JPG para PNG',
    navLabel: 'JPG para PNG',
    heroTitle: 'Converter JPG para PNG Sem Perdas',
    heroHighlight: 'Fidelidade Gráfica e Alta Resolução',
    heroSubtitle:
      'Converta fotos JPG em formato PNG com compressão sem perdas (lossless). Ideal para design gráfico, ilustrações e edição profissional.',
    badge: 'Qualidade Sem Perdas · Suporte a Camadas · Grátis',
    targetFormat: 'png',
    defaultQuality: 1.0,
    activeMode: 'convert',
    metaTitle: 'Converter JPG para PNG Online Grátis Sem Perdas - PixelShift',
    metaDescription:
      'Converta fotos JPG para formato PNG sem perder nenhum detalhe. Processamento rápido direto no navegador sem enviar arquivos para a nuvem.',
    keywords:
      'converter jpg para png, transformar jpg em png, jpg to png online, converter foto em png alta qualidade',
    features: [
      {
        title: 'Compressão Lossless',
        description: 'O algoritmo PNG mantém 100% da fidelidade das cores e bordas nítidas.',
      },
      {
        title: 'Pronto para Edição',
        description: 'Perfeito para importar no Photoshop, Figma, Canva e softwares vetoriais.',
      },
      {
        title: 'Download Seguro',
        description: 'Seus arquivos permanecem privados no seu computador ou smartphone.',
      },
    ],
    faqs: [
      {
        question: 'Converter JPG para PNG melhora a qualidade da imagem?',
        answer:
          'Não melhora a qualidade além da foto original, mas impede que ela se degrade em edições futuras, pois o PNG é um formato sem perdas.',
      },
      {
        question: 'O fundo do JPG vai ficar transparente automaticamente?',
        answer:
          'O formato JPG original já vem com fundo sólido (branco ou colorido). Ao converter para PNG, a imagem passa a aceitar transparência caso você a recorte em editores.',
      },
    ],
  },

  '/converter-para-webp': {
    path: '/converter-para-webp',
    slug: 'converter-para-webp',
    title: 'Converter para WEBP',
    navLabel: 'Converter para WEBP',
    heroTitle: 'Converter Imagens para WEBP',
    heroHighlight: 'Reduza até 80% do Peso para Sites Rápidos',
    heroSubtitle:
      'Adote o formato oficial do Google para internet. Ganhe nota 100 no Google PageSpeed mantendo fundo transparente e nitidez cristalina.',
    badge: 'Recomendado pelo Google · Alta Velocidade · SEO Score 100',
    targetFormat: 'webp',
    defaultQuality: 0.85,
    activeMode: 'convert',
    metaTitle: 'Converter Imagens para WEBP Online Grátis - PixelShift',
    metaDescription:
      'Converta PNG, JPG e GIF para WEBP online. Diminua o peso do seu site em até 80% com o formato moderno do Google. 100% gratuito e privado.',
    keywords:
      'converter para webp, png para webp, jpg para webp, comprimir webp online, otimizar fotos pagespeed webp',
    features: [
      {
        title: 'Economia Extrema de Dados',
        description: 'Até 80% mais leve que JPG e PNG, acelerando o carregamento de qualquer site.',
      },
      {
        title: 'Suporte a Fundo Transparente',
        description: 'Preserva a transparência do PNG com uma fração do tamanho original.',
      },
      {
        title: 'Melhoria no Ranking do Google',
        description: 'Sites mais velozes ganham posições de destaque nas buscas orgânicas.',
      },
    ],
    faqs: [
      {
        question: 'Por que o formato WEBP é melhor que JPG e PNG?',
        answer:
          'O WEBP combina as melhores características de ambos: ele suporta transparência como o PNG e comprime fotos fotográficas com mais eficiência do que o JPG, resultando em arquivos minúsculos.',
      },
      {
        question: 'Todos os navegadores abrem WEBP?',
        answer:
          'Sim! Mais de 97% dos navegadores globais (Chrome, Safari, Edge, Firefox, Android e iOS) possuem compatibilidade nativa completa com WEBP.',
      },
    ],
  },

  '/converter-foto-para-pdf': {
    path: '/converter-foto-para-pdf',
    slug: 'converter-foto-para-pdf',
    title: 'Converter Foto para PDF',
    navLabel: 'Foto para PDF',
    heroTitle: 'Converter Fotos e Imagens para PDF',
    heroHighlight: 'Documentos Portáveis de Alta Resolução',
    heroSubtitle:
      'Transforme fotos de contratos, recibos, comprovantes e fotos normais em documentos PDF oficiais prontos para envio por e-mail, bancos e órgãos públicos.',
    badge: 'Documento Padrão 1.4 · Alta Resolução · Sem Cadastro',
    targetFormat: 'pdf',
    defaultQuality: 0.9,
    activeMode: 'convert',
    metaTitle: 'Converter Foto e Imagem em PDF Online Grátis - PixelShift',
    metaDescription:
      'Transforme fotos e imagens (JPG, PNG, WEBP) em arquivo PDF limpo e nítido. Ideal para documentos, formulários do governo e bancos. 100% grátis.',
    keywords:
      'converter foto em pdf, transformar imagem em pdf, foto para pdf online gratis, jpg to pdf celular, criar pdf de foto',
    features: [
      {
        title: 'Compatibilidade Oficial',
        description: 'PDF padrão 1.4 aceito por bancos, universidades, órgãos públicos e impressoras.',
      },
      {
        title: 'Sem Marcas d Água',
        description: 'Documento limpo e profissional, sem nenhuma marca ou restrição de uso.',
      },
      {
        title: 'Segurança e Sigilo',
        description: 'Seus documentos não sobem para nenhum servidor. Conversão 100% no seu dispositivo.',
      },
    ],
    faqs: [
      {
        question: 'Posso converter fotos tiradas do celular em PDF?',
        answer:
          'Com certeza! Basta selecionar a foto da sua galeria ou câmera e escolher "PDF". O arquivo é gerado instantaneamente no tamanho e resolução ideais para anexos.',
      },
      {
        question: 'O PDF fica com boa qualidade para leitura?',
        answer:
          'Sim. O PixelShift preserva a resolução nativa da câmera do seu celular, garantindo que textos de contratos, recibos e notas fiscais fiquem perfeitamente legíveis.',
      },
    ],
  },

  '/criar-favicon-ico': {
    path: '/criar-favicon-ico',
    slug: 'criar-favicon-ico',
    title: 'Criar Favicon ICO',
    navLabel: 'Criar Favicon ICO',
    heroTitle: 'Gerador de Favicon ICO Online',
    heroHighlight: 'Crie Ícones para Sites e Windows em 1 Clique',
    heroSubtitle:
      'Transforme qualquer logotipo PNG ou imagem em um arquivo de ícone .ico autêntico de 32-bits com preservação de fundo transparente.',
    badge: 'Favicon 32-bits · Canal Alfa Transparente · Padrão Windows & Web',
    targetFormat: 'ico',
    defaultQuality: 1.0,
    activeMode: 'resize',
    defaultWidth: 32,
    defaultHeight: 32,
    metaTitle: 'Criar Favicon ICO Online Grátis (Ícone para Sites) - PixelShift',
    metaDescription:
      'Transforme imagens e logos em favicon ICO com fundo transparente para aba do navegador e sistemas Windows. 100% gratuito e rápido.',
    keywords:
      'criar favicon ico, gerador de favicon online, converter png para ico, transformar foto em icone, favicon generator brasil',
    features: [
      {
        title: 'Ícone Binário Real',
        description: 'Gera um arquivo .ico legítimo com cabeçalho de diretório de ícones de 32-bits.',
      },
      {
        title: 'Fundo Transparente',
        description: 'Mantém a transparência alfa perfeita para a barra de abas dos navegadores.',
      },
      {
        title: 'Dimensões Padrão',
        description: 'Ideal para 16x16, 32x32, 48x48 e 64x64 pixels.',
      },
    ],
    faqs: [
      {
        question: 'O que é um favicon e para que serve?',
        answer:
          'O favicon é aquele pequeno ícone exibido na aba do navegador ao lado do título da página e nos favoritos. Ele fortalece o reconhecimento da sua marca na web.',
      },
      {
        question: 'Qual o melhor tamanho para um favicon?',
        answer:
          'O tamanho padrão mais utilizado é 32x32 pixels, pois garante nitidez tanto em telas comuns quanto em displays Retina de alta densidade.',
      },
    ],
  },

  '/converter-para-avif': {
    path: '/converter-para-avif',
    slug: 'converter-para-avif',
    title: 'Converter para AVIF',
    navLabel: 'Converter para AVIF',
    heroTitle: 'Converter Imagens para AVIF',
    heroHighlight: 'A Mais Alta Tecnologia de Compressão da Web',
    heroSubtitle:
      'Experimente a tecnologia baseada no codec AV1. Reduza até 30% a mais do que o WEBP mantendo fidelidade de cores HDR e nitidez surpreendente.',
    badge: 'Nova Geração Web · Codec AV1 · Ultra Leve',
    targetFormat: 'avif',
    defaultQuality: 0.85,
    activeMode: 'convert',
    metaTitle: 'Converter Imagens para AVIF Online Grátis - PixelShift',
    metaDescription:
      'Converta imagens para AVIF online. O formato mais moderno da internet que supera o WEBP e JPG em compressão e nitidez visual.',
    keywords:
      'converter para avif, png para avif, jpg para avif, conversor avif online, tecnologia av1 imagem',
    features: [
      {
        title: 'Supera o WEBP',
        description: 'Arquivos até 30% menores que o WEBP com menos artefatos de compressão.',
      },
      {
        title: 'Profundidade de Cores',
        description: 'Suporte a ampla gama de cores e canal alfa com precisão milimétrica.',
      },
      {
        title: 'Futuro da Internet',
        description: 'Adotado pelos maiores players de streaming e tecnologia do mundo.',
      },
    ],
    faqs: [
      {
        question: 'O que torna o AVIF superior ao WEBP e JPEG?',
        answer:
          'O AVIF utiliza os algoritmos de compressão modernos do codec de vídeo AV1, conseguindo descartar redundâncias invisíveis ao olho humano sem criar desfoque.',
      },
      {
        question: 'Vale a pena usar AVIF hoje?',
        answer:
          'Sim! Praticamente todos os navegadores modernos já suportam AVIF nativamente, permitindo que seu site carregue no piscar de olhos.',
      },
    ],
  },

  '/comprimir-imagem': {
    path: '/comprimir-imagem',
    slug: 'comprimir-imagem',
    title: 'Comprimir Imagem',
    navLabel: 'Comprimir Imagem (Reduzir KB)',
    heroTitle: 'Comprimir Imagens Online Grátis',
    heroHighlight: 'Reduza o Tamanho em KB Sem Perder Qualidade',
    heroSubtitle:
      'Diminua o peso das suas fotos para enviar por e-mail, WhatsApp, redes sociais ou otimizar seu site. Compressão inteligente com prévia em tempo real.',
    badge: 'Redução de até 85% · Controle de Qualidade · 100% Grátis',
    targetFormat: 'webp',
    defaultQuality: 0.7,
    activeMode: 'compress',
    metaTitle: 'Comprimir Imagem Online Grátis - Reduzir Tamanho em KB - PixelShift',
    metaDescription:
      'Comprima fotos JPG, PNG e WEBP online sem perder qualidade. Reduza o tamanho em KB em lote no navegador com privacidade total.',
    keywords:
      'comprimir imagem online, reduzir tamanho da foto em kb, diminuir peso imagem, compressor de fotos gratis, otimizar fotos lote',
    features: [
      {
        title: 'Redução Drástica de KB',
        description: 'Reduza fotos de 10MB para menos de 800KB mantendo a beleza original.',
      },
      {
        title: 'Comparador Antes e Depois',
        description: 'Veja a foto original e a foto comprimida lado a lado com slider interativo.',
      },
      {
        title: 'Processamento Seguro',
        description: 'Sem upload para a nuvem. Suas fotos de família ou trabalho ficam seguras.',
      },
    ],
    faqs: [
      {
        question: 'Como funciona a compressão de imagem sem perder qualidade?',
        answer:
          'O compressor remove metadados desnecessários da câmera e reamostra frequências de cores sutis que o olho humano não consegue distinguir, preservando a nitidez.',
      },
      {
        question: 'Posso comprimir várias fotos de uma vez?',
        answer:
          'Sim! Você pode arrastar dezenas de fotos ao mesmo tempo e comprimir todo o lote em segundos com download em arquivo ZIP.',
      },
    ],
  },

  '/redimensionar-imagem': {
    path: '/redimensionar-imagem',
    slug: 'redimensionar-imagem',
    title: 'Redimensionar Imagem',
    navLabel: 'Redimensionar em Pixels',
    heroTitle: 'Redimensionar Imagens em Pixels',
    heroHighlight: 'Defina Largura e Altura Exatas em Segundos',
    heroSubtitle:
      'Ajuste o tamanho das fotos para Instagram (1080x1080), Stories/Reels (1080x1920), YouTube (1280x720) ou defina suas medidas personalizadas com proporção travada.',
    badge: 'Largura x Altura Exatas · Presets de Redes Sociais · Mantém Proporção',
    targetFormat: 'jpeg',
    defaultQuality: 0.9,
    activeMode: 'resize',
    defaultWidth: 1080,
    defaultHeight: 1080,
    metaTitle: 'Redimensionar Imagem Online em Pixels (Largura x Altura) - PixelShift',
    metaDescription:
      'Redimensione imagens em pixels com proporção automática. Presets para Instagram, YouTube e medidas personalizadas. Grátis e sem limites.',
    keywords:
      'redimensionar imagem em pixels, mudar tamanho foto largura altura, redimensionar fotos instagram, mudar resolucao imagem online',
    features: [
      {
        title: 'Presets de Redes Sociais',
        description: 'Atalhos em 1 clique para Instagram 1:1, Stories 9:16, YouTube 16:9 e Full HD.',
      },
      {
        title: 'Trava de Proporção Inteligente',
        description: 'Altere a largura e a altura é calculada automaticamente para não distorcer.',
      },
      {
        title: 'Alta Nitidez na Reamostragem',
        description: 'Algoritmo de interpolação bicúbica de alta qualidade visual.',
      },
    ],
    faqs: [
      {
        question: 'O que significa manter a proporção (aspect ratio)?',
        answer:
          'Significa que quando você altera a largura da imagem, a altura é recalculada proporcionalmente na mesma escala, evitando que a foto fique esticada ou achatada.',
      },
      {
        question: 'Quais os tamanhos padrão para redes sociais?',
        answer:
          'Feed Instagram quadrado: 1080x1080px. Stories e Reels: 1080x1920px. Thumbnail YouTube: 1280x720px. Imagens para sites: 1920x1080px.',
      },
    ],
  },
};
