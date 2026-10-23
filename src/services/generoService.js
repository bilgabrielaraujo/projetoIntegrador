import db from '../db/db.js';
 
export const findAll = async (idGenero, nome) => {
    let sql = 'SELECT * FROM genero';
    const conditions = [];
    const valeus = [];
 
    if (idGenero) {
        conditions.push('idGenero = ?');
        valeus.push(idGenero);
 
    } if (nome) {
        conditions.push('LOWER(nome) LIKE = ?');
        valeus.push(`%${nome.ToLowerCase()}%`);
 
    } if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
 
    }
    const [rows] = await db.query(sql, valeus)
    return rows;
};
 
 
export const create = async (generoData) => {
    const [result] = await db.query(
        'INSERT INTO genero SET ?',
        generoData
    );
 
    return {
        idGenero: result.insertId,
        ...generoData
    };
 
};
 
export const update = async (idGenero, generoData) => {
    const [result] = await db.query('UPDATE genero SET ? WHERE idGenero = ?', [generoData,idGenero]);
    return result.affectedRows > 0;
};
   
export const remove = async (idGenero) => {
    const [result] = await db.query('DELETE FROM genero WHERE idGenero = ?', [idGenero]);
    return result.affectedRows > 0;
};
