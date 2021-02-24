import { injectable, inject } from 'tsyringe';

import Shortener from '@modules/shortener/infra/typeorm/entities/Shortener';
import IShortenerRepository from '@modules/shortener/repositories/IShortenerRepository';

interface IRequest {
  shortener_hash: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('ShortenerRepository')
    private shortenerRepository: IShortenerRepository,
  ) {}

  public async execute({
    shortener_hash,
  }: IRequest): Promise<Shortener | undefined> {
    const shortener = await this.shortenerRepository.findByHash(shortener_hash);

    return shortener;
  }
}

export default ListProvidersService;
