import { getRepository, Repository, MoreThanOrEqual } from 'typeorm';

import Shortener from '@modules/shortener/infra/typeorm/entities/Shortener';
import IShortenerRepository from '@modules/shortener/repositories/IShortenerRepository';
import ICreateShortenerDTO from '@modules/shortener/dtos/ICreateShortenerDTO';
import AppError from '@utils/errors/AppError';

class ShortenerRepository implements IShortenerRepository {
  private ormRepository: Repository<Shortener>;

  constructor() {
    this.ormRepository = getRepository(Shortener);
  }
  public async findByHash(
    shortener_hash: string,
  ): Promise<Shortener | undefined> {
    const findShortener = await this.ormRepository.findOne({
      where: { shortener_hash, expires_at: MoreThanOrEqual(new Date()) },
    });

    if (!findShortener) {
      throw new AppError('It was not possible to find a valid url', 404);
    }

    return findShortener;
  }

  public async create({
    original_url,
    shortener_hash,
    expires_at,
  }: ICreateShortenerDTO): Promise<Shortener> {
    const shortener = this.ormRepository.create({
      original_url,
      shortener_hash,
      expires_at,
    });

    await this.ormRepository.save(shortener);

    return shortener;
  }
}

export default ShortenerRepository;
