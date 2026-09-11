import db from '../db/db.js';
import bcrypt from 'bcrypt';

export const findAll = async (cpf, nome, email) => {
    let sql = 'SELECT * FROM usuario';
    const conditions = [];
    const valeus = [];
    if (cpf) {
        conditions.push('cpf = ?');
        valeus.push(cpf);

    } if (nome) {
        conditions.push('LOWER(nome) LIKE = ?');
        valeus.push(`%${nome.ToLowerCase()}%`);

    } if (email) {
        conditions.push('email = ?');
        valeus.push(email);

    } if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');

    }
    const [rows] = await db.quary(sql, valeus)
    return rows;
};

export const create = async (usuarioData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuarioData.senha, saltRounds);

    const newUsuario = {
        ...usuarioData,
        senha: hashedPassword,
    };


    await db.quary(' INSERT INTO usuario SET ?', newUsuario);

    delete newUsuario.senha;
    return newUsuario;
};

export const update = async (cpf, usuarioData) => {
    if (usuarioData.senha) {
        const saltRounds = 10;
        usuarioData.senha = await bcrypt.hash(usuarioData.senha, saltRounds);
    }
    const [result] = await db.query('UPDATE usuario SET ? WHERE cpf = ?', [usuarioData, cpf]);
    return result.affectedRows > 0;
}

export const remove = async (cpf) => {
    const [result] = await db.query('DELETE FROM usuario WHERE cpf = ?', [cpf]);
    return result.affectedRows > 0;
};