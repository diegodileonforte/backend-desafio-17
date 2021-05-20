import { sqlite3 } from '../db/config.js'
import knexSqlite3 from 'knex';
const knex = knexSqlite3(sqlite3)


export async function createTableMessage() {
    try {
        await knex.schema.hasTable('mensajes')
        await knex.schema.createTableIfNotExists('mensajes', table => {
            table.increments('id').primary();
            table.string('usuario', 50).notNullable();
            table.string('mensaje', 200).notNullable();
        });
    } catch (error) {
        console.log(error)
    }

};

export async function newMessage(mensaje) {

    return knex('mensajes').insert(mensaje);
};

export async function readMessage() {
    return knex('mensajes').select();
}

export async function close() {
    return knex.destroy();
}