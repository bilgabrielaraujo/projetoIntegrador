import db from '../db.js';

export const findAll = async (idEmprestimo, idUsuario) => {
    let sql = 'SELECT * FROM EMPRESTIMO';
    const conditions = [];
    const values = [];

    if (idEmprestimo) {
        conditions.push('idEmprestimo = ?');
        values.push(idEmprestimo);
    } 
    
    if (idUsuario) {
        conditions.push('idUsuario LIKE ?');
        values.push(`%${idUsuario}%`);
    } 

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
};

export const create = async (novoEmprestimo) => {
   
    const { idUsuario, dataEmprestimo } = novoEmprestimo;
    
    let sql = 'INSERT INTO EMPRESTIMO (idUsuario, dataEmprestimo) VALUES (?, ?)';
    const values = [idUsuario, dataEmprestimo];

    const [result] = await db.query(sql, values);
    return result;
};