import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: 'Token não fornecido'});
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({message: 'Token inválido'});
    }

    const [scheme, token] = parts;
    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({message: 'Token mal formatado'});
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        console.error('JWT_SECRET não configurado.');
        return res.status(500).json({ message: 'Erro de configuração do servidor.' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token inválido'});
        }
        req.userCpf = decoded.cpf;
        req.userEmail = decoded.email;
        next();
    });


}
export default authMiddleware;