export default interface ICreateShortenerDTO {
  original_url: string;
  shortener_hash: string;
  expires_at: Date;
}
