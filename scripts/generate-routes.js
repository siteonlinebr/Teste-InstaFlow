import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const routes = [
  {
    path: 'converter-png-para-jpg',
    metaTitle: 'Converter PNG para JPG Online Grátis - PixelShift',
    metaDescription: 'Converta imagens PNG para JPG em segundos com privacidade 100% local. Suporte a remoção de transparência com fundo branco ou preto. Grátis e sem limites.',
    keywords: 'converter png para jpg, transformar png em jpg, mudar formato png para jpeg, png to jpg gratis, conversor png online',
  },
  {
    path: 'converter-jpg-para-png',
    metaTitle: 'Converter JPG para PNG Online Grátis Sem Perdas - PixelShift',
    metaDescription: 'Converta fotos JPG para formato PNG sem perder nenhum detalhe. Processamento rápido direto no navegador sem enviar arquivos para a nuvem.',
    keywords: 'converter jpg para png, transformar jpg em png, jpg to png online, converter foto em png alta qualidade',
  },
  {
    path: 'converter-para-webp',
    metaTitle: 'Converter Imagens para WEBP Online Grátis - PixelShift',
    metaDescription: 'Converta PNG, JPG e GIF para WEBP online. Diminua o peso do seu site em até 80% com o formato moderno do Google. 100% gratuito e privado.',
    keywords: 'converter para webp, png para webp, jpg para webp, comprimir webp online, otimizar fotos pagespeed webp',
  },
  {
    path: 'converter-foto-para-pdf',
    metaTitle: 'Converter Foto e Imagem em PDF Online Grátis - PixelShift',
    metaDescription: 'Transforme fotos e imagens (JPG, PNG, WEBP) em arquivo PDF limpo e nítido. Ideal para documentos, formulários do governo e bancos. 100% grátis.',
    keywords: 'converter foto em pdf, transformar imagem em pdf, foto para pdf online gratis, jpg to pdf celular, criar pdf de foto',
  },
  {
    path: 'criar-favicon-ico',
    metaTitle: 'Criar Favicon ICO Online Grátis (Ícone para Sites) - PixelShift',
    metaDescription: 'Transforme imagens e logos em favicon ICO com fundo transparente para aba do navegador e sistemas Windows. 100% gratuito e rápido.',
    keywords: 'criar favicon ico, gerador de favicon online, converter png para ico, transformar foto em icone, favicon generator brasil',
  },
  {
    path: 'converter-para-avif',
    metaTitle: 'Converter Imagens para AVIF Online Grátis - PixelShift',
    metaDescription: 'Converta imagens para AVIF online. O formato mais moderno da internet que supera o WEBP e JPG em compressão e nitidez visual.',
    keywords: 'converter para avif, png para avif, jpg para avif, conversor avif online, tecnologia av1 imagem',
  },
  {
    path: 'comprimir-imagem',
    metaTitle: 'Comprimir Imagem Online Grátis - Reduzir Tamanho em KB - PixelShift',
    metaDescription: 'Comprima fotos JPG, PNG e WEBP online sem perder qualidade. Reduza o tamanho em KB em lote no navegador com privacidade total.',
    keywords: 'comprimir imagem online, reduzir tamanho da foto em kb, diminuir peso imagem, compressor de fotos gratis, otimizar fotos lote',
  },
  {
    path: 'redimensionar-imagem',
    metaTitle: 'Redimensionar Imagem Online em Pixels (Largura x Altura) - PixelShift',
    metaDescription: 'Redimensione imagens em pixels com proporção automática. Presets para Instagram, YouTube e medidas personalizadas. Grátis e sem limites.',
    keywords: 'redimensionar imagem em pixels, mudar tamanho foto largura altura, redimensionar fotos instagram, mudar resolucao imagem online',
  },
];

const distIndexPath = path.join(rootDir, 'dist', 'index.html');
if (!fs.existsSync(distIndexPath)) {
  console.error('Arquivo dist/index.html não encontrado! Execute vite build antes.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(distIndexPath, 'utf-8');

for (const route of routes) {
  let routeHtml = templateHtml;

  // Substitui meta tags específicas da rota
  routeHtml = routeHtml.replace(/<title>.*?<\/title>/, `<title>${route.metaTitle}</title>`);
  routeHtml = routeHtml.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${route.metaDescription}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${route.metaTitle}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${route.metaDescription}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="https://conversordeimagem.site/${route.path}" />`
  );
  routeHtml = routeHtml.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="https://conversordeimagem.site/${route.path}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta name="keywords" content=".*?" \/>/,
    `<meta name="keywords" content="${route.keywords}" />`
  );

  // Ajusta caminhos relativos de assets para funcionarem dentro do subdiretório
  routeHtml = routeHtml.replace(/href="\.\/assets\//g, 'href="../assets/');
  routeHtml = routeHtml.replace(/src="\.\/assets\//g, 'src="../assets/');
  routeHtml = routeHtml.replace(/href="\.\/favicon\./g, 'href="../favicon.');
  routeHtml = routeHtml.replace(/href="\.\/site\.webmanifest"/g, 'href="../site.webmanifest"');

  // Grava em docs/[route]/index.html
  const docsRouteDir = path.join(rootDir, 'docs', route.path);
  fs.mkdirSync(docsRouteDir, { recursive: true });
  fs.writeFileSync(path.join(docsRouteDir, 'index.html'), routeHtml, 'utf-8');

  // Grava também na raiz [route]/index.html
  const rootRouteDir = path.join(rootDir, route.path);
  fs.mkdirSync(rootRouteDir, { recursive: true });
  fs.writeFileSync(path.join(rootRouteDir, 'index.html'), routeHtml, 'utf-8');

  console.log(`✓ Rota estática gerada: /${route.path}`);
}

console.log('Todas as 8 rotas de SEO foram geradas com sucesso!');
