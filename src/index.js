import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//Lembra de importar as rotas aqui


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET,POST,PUT,PATCH,DELETE',
    credentials: true
};

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'home.html'));
});

const apiPrefix = '/davyjonesLibrary/';

app.use((err,req,res,next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado no servidor!');
});

const PORTA = process.env.PORT
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta  ${PORTA}`)
});