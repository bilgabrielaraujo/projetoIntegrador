import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (cpf, nome, email) => {
    let sql = 'SELECT * FROM usuario';
    const conditions = [];
    const values = [];

    if (cpf) {
        conditions.push('cpf = ?');
        values.push(cpf);
    }

    if (nome) {
        conditions.push('LOWER(nome) LIKE ?');
        values.push(`%${nome.toLowerCase()}%`);
    }

    if (email) {
        conditions.push('email = ?');
        values.push(email);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);

    // Não retornar senhas dos usuários
    return rows.map(({ senha, ...usuario }) => usuario);
};

export const create = async (usuarioData) => {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
        usuarioData.senha,
        saltRounds
    );

    const newUsuario = {
        ...usuarioData,
        senha: hashedPassword,
    };

    await db.query('INSERT INTO usuario SET ?', newUsuario);

    const { senha, ...usuarioSemSenha } = newUsuario;

    return usuarioSemSenha;
};

export const update = async (cpf, usuarioData) => {
    const dadosAtualizados = { ...usuarioData };

    if (dadosAtualizados.senha) {
        dadosAtualizados.senha = await bcrypt.hash(
            dadosAtualizados.senha,
            10
        );
    }

    const [result] = await db.query(
        'UPDATE usuario SET ? WHERE cpf = ?',
        [dadosAtualizados, cpf]
    );

    return result.affectedRows > 0;
};

export const remove = async (cpf) => {
    const [result] = await db.query(
        'DELETE FROM usuario WHERE cpf = ?',
        [cpf]
    );

    return result.affectedRows > 0;
};