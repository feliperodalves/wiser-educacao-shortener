import { uuid } from 'uuidv4';
import { isAfter } from 'date-fns';

import IShortenerRepository from '@modules/shortener/repositories/IShortenerRepository';
import ICreateShortenerDTO from '@modules/shortener/dtos/ICreateShortenerDTO';

import Shortener from '@modules/shortener/infra/typeorm/entities/Shortener';
import AppError from '@utils/errors/AppError';

class ShortenerRepository implements IShortenerRepository {
  private shorteners: Shortener[] = [];

  public async findByHash(
    shortener_hash: string,
  ): Promise<Shortener | undefined> {
    const findShortener = this.shorteners.find(
      shortener =>
        shortener.shortener_hash === shortener_hash &&
        isAfter(shortener.expires_at, new Date()),
    );

    if (!findShortener) {
      throw new AppError('It was not possible to find a valid url', 404);
    }

    return findShortener;
  }

  public async create({
    original_url,
    expires_at,
    shortener_hash,
  }: ICreateShortenerDTO): Promise<Shortener> {
    const shortener = new Shortener();

    Object.assign(shortener, {
      id: uuid(),
      original_url,
      expires_at,
      shortener_hash,
    });

    this.shorteners.push(shortener);

    return shortener;
  }
}

export default ShortenerRepository;
