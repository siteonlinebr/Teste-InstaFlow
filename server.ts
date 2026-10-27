import express from 'express';
import type { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  // O ambiente Cloud Run usa Nginx na porta 8080 e repassa para DEFAULT_APP_PORT (3000)
  const PORT = Number(process.env.DEFAULT_APP_PORT) || 3000;

  app.use(express.json());

  // Rota de Health Check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'PixelShift Image Converter & Optimizer',
      mode: process.env.NODE_ENV || 'development',
    });
  });

  // Configuração do ambiente Vite / Produção
  const isProd = process.env.NODE_ENV === 'production';
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.join(distPath, 'index.html'));

  if (isProd && hasDist) {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PixelShift Server rodando em http://0.0.0.0:${PORT}`);
  });
}

startServer();
