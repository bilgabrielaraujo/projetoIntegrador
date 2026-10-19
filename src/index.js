import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//Lembra de importar as rotas aqui
import authRoutes from './routes/authRoutes.js';
import usuarioRoute from './routes/usuarioRoute.js'

const app = express();
const porta = 3333;
app.listen(porta, () => {
  console.log(`Server is running on http://localhost:${porta}/api`)
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: ['http://localhost:3333', 'https://meudominio.com'],
    methods: 'GET,POST,DELETE,PUT,PATCH',
    credentials: true
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

//Disponibilizar pasta public
app.use(express.static(path.join(__dirname, '..','public')));

//ROTAS
//Rota que serve o html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'pages', 'home.html'))
});

//Rotas para API
const apiPrefix = '/dj';
 app.use(`${apiPrefix}/login`, authRoutes);
 app.use(`${apiPrefix}/usuarios`, usuarioRoute);


//Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado');
});