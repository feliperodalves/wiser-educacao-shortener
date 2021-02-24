import { addDays } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import { customAlphabet } from 'nanoid';

import Shortener from '@modules/shortener/infra/typeorm/entities/Shortener';
import IShortenerRepository from '@modules/shortener/repositories/IShortenerRepository';

interface IRequest {
  original_url: string;
}

@injectable()
class CreateShortenerService {
  constructor(
    @inject('ShortenerRepository')
    private shortenerRepository: IShortenerRepository,
  ) {}

  public async execute({ original_url }: IRequest): Promise<Shortener> {
    const expiringTime = Number(process.env.EXPIRING_TIME) || 3;
    const expires_at = addDays(new Date(), expiringTime);

    const nanoid = customAlphabet(
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      8,
    );
    const shortener_hash = nanoid();

    const shortener = await this.shortenerRepository.create({
      original_url,
      shortener_hash,
      expires_at,
    });

    return shortener;
  }
}

export default CreateShortenerService;
