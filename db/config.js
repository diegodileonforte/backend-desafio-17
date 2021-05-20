export const mysql = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'productosDB'
    }
};

export const sqlite3 = {
    client: 'sqlite3',
    connection: { filename: "db/mensajesDB.sqlite3" },
    useNullAsDefault: true
};

