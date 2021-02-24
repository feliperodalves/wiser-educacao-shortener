import FakeShortenerRepository from '@modules/shortener/repositories/fakes/FakeShortenerRepository';
import CreateShortenerService from './CreateShortenerService';

let fakeShortenerRepository: FakeShortenerRepository;
let createShortener: CreateShortenerService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeShortenerRepository = new FakeShortenerRepository();
    createShortener = new CreateShortenerService(fakeShortenerRepository);
  });

  it('should be able to create a new short url', async () => {
    const shortener = await createShortener.execute({
      original_url: 'https://wisereducacao.com',
    });

    expect(shortener).toHaveProperty('id');
    expect(shortener).toHaveProperty('shortener_hash');
  });
});
