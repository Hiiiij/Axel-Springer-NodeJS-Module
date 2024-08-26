import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';


const router = express.Router()

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const port = process.env.PORT || 4000;
export const customMsg = process.env.CUSTOM_MESSAGE || `Hello, what's up!`;
export const sslCert = path.join(__dirname, '..', 'server.cert');
export const sslKey = path.join(__dirname, '..', 'server.key');


router.get('/', (reg: Request, res: Response) => {
  res.send(customMsg);
});
router.post('/', (reg: Request, res: Response));
