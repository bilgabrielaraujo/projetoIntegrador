import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../db/db.js';

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({
                message: 'E-mail e senha são obrigatórios.'
            });
        }

        const [rows] = await db.query(
            'SELECT * FROM usuario WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'E-mail ou senha inválidos.'
            });
        }

        const usuario = rows[0];

        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaCorreta) {
            return res.status(401).json({
                message: 'E-mail ou senha inválidos.'
            });
        }

    const payload = { cpf: usuario.cpf, email: usuario.email };

    const JWT_SECRET = 'frase_muito_secreta_e_longa';

    const token = jwt.sign({ payload }, JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: 'Login bem-sucedido', token: token });
} catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }

};