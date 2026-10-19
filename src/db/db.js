import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: 'root',
    password: 'root',
    database: 'projetoggs'
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
        connection.release();
    } catch(err) {
        console.error('Erro ao conectar com o bando de dados:', err)
    }
})();

export default db;