import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const config = dotenv.config();

dotenvExpand(config);
