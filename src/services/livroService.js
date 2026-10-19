import db from '../db/db.js';

export const findAll = async (idLivro, isbn, titulo) => {
    let sql = 'SELECT * FROM livro';
    const conditions = [];
    const valeus = [];

    if (idLivro) {
        conditions.push('idLivro = ?');
        valeus.push(idLivro);

    } 
         if (titulo) {
        conditions.push('LOWER(titulo) LIKE = ?');
        valeus.push(`%${titulo.ToLowerCase()}%`);

    } if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');

    }
    const [rows] = await db.query(sql, valeus)
    return rows;
};


export const create = async (livroData) => {
    const [result] = await db.query(
        'INSERT INTO livro SET ?',
        livroData
    );

    return {
        idLivro: result.insertId,
        ...livroData
    };

};

export const update = async (idLivro, livroData) => {
    const [result] = await db.query('UPDATE livro SET ? WHERE idLivro = ?', [livroData,idLivro]);
    return result.affectedRows > 0;
};
    
export const remove = async (idLivro) => {
    const [result] = await db.query('DELETE FROM livro WHERE idLivro = ?', [idLivro]);
    return result.affectedRows > 0;
};