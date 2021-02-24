import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateShortenerService from '@modules/shortener/services/CreateShortenerService';
import FindHashShortenerService from '@modules/shortener/services/FindHashShortenerService';

export default class ShortenerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { url } = req.body;
    const host = process.env.API_URL || `http://localhost:${process.env.PORT}`;

    const createShortener = container.resolve(CreateShortenerService);
    const shortener = await createShortener.execute({
      original_url: url,
    });

    const shortener_url = `${host}/${shortener.shortener_hash}`;

    return res.json({ newUrl: shortener_url });
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const { shortener_hash } = req.params;

    const findHashShortener = container.resolve(FindHashShortenerService);
    const shortener = await findHashShortener.execute({ shortener_hash });

    return res.json({ url: shortener?.original_url });
  }
}
