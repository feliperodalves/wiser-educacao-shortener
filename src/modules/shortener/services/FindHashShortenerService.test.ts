import { addDays, subDays } from 'date-fns';
import FakeShortenerRepository from '@modules/shortener/repositories/fakes/FakeShortenerRepository';
import FindHashShortenerService from './FindHashShortenerService';
import AppError from '@utils/errors/AppError';

let fakeShortenerRepository: FakeShortenerRepository;
let findHashShortener: FindHashShortenerService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeShortenerRepository = new FakeShortenerRepository();
    findHashShortener = new FindHashShortenerService(fakeShortenerRepository);
  });

  it('should be able to get original url from a generated hash', async () => {
    const shortener = await fakeShortenerRepository.create({
      original_url: 'https://wisereducacao.com',
      shortener_hash: 'QWE123AS',
      expires_at: addDays(new Date(), 3),
    });

    const shortener_hash = await findHashShortener.execute({
      shortener_hash: 'QWE123AS',
    });

    expect(shortener_hash).toEqual(shortener);
  });

  it('should not be able to get original url from an expired generated hash', async () => {
    await fakeShortenerRepository.create({
      original_url: 'https://wisereducacao.com',
      shortener_hash: 'QWE123AS',
      expires_at: subDays(new Date(), 1),
    });

    await expect(
      findHashShortener.execute({
        shortener_hash: 'QWE123AS',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
