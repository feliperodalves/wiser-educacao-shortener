import Shortener from '@modules/shortener/infra/typeorm/entities/Shortener';

import ICreateShortenerDTO from '@modules/shortener/dtos/ICreateShortenerDTO';

export default interface IShortenerRepository {
  create({
    original_url,
    shortener_hash,
    expires_at,
  }: ICreateShortenerDTO): Promise<Shortener>;
  findByHash(shortener_hash: string): Promise<Shortener | undefined>;
}
