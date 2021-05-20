import { mysql } from '../db/config.js'
import knexSQL from 'knex';
const knex = knexSQL(mysql)

export async function createTableProd() {
    try {
        await knex.schema.hasTable('productos');
        return await knex.schema.createTableIfNotExists('productos', table => {
            table.increments('id').primary();
            table.string('title', 50).notNullable();
            table.integer('price').notNullable();
            table.string('thumbnail', 150).notNullable();
        });
    } catch (error) {
        console.log(error)
    } finally {
        close()
    }
}

export async function add(req, res) {
    try {
        if (!req.body) {
            res.status(404)
        }
        let data = await { ...req.body };

        return await knex('productos').insert({
            title: data.title,
            price: data.price,
            thumbnail: data.thumbnail
        }).then(get())
            .then(() => {
                res.redirect('/')
            })
    } catch (error) {
        console.log(error)
    } finally {
        close()
    }
    
}

export async function get(req, res) {
    try {
        return await knex('productos').select()
    } catch (error) {
        console.log(error)
    }
}

export async function getByID(req, res) {
    try {
        let id = req.params.id;
        if (!id) {
            res.status(404).json(`No existe producto con ID: ${id}`)
        } else {
            return prodId = await knex('productos').select().where('id', id)
                .then((prodId) => {
                    res.status(200).json(prodId)
                })
        }
    } catch (error) {
        console.log(error);
    }
}

export async function del(req, res) {
    try {
        if (req) {
            let id = req.params.id;
            return await knex('productos').select().where('id', id).del()
                .then(() => {
                    res.status(200).json(`PRODUCTO CON ID ${req.params.id} ELIMINADO`)
                })
        }
    } catch (error) {
        console.log(error);
    }
}

export async function update(req, res) {
    try {
        if (req.body.title == "" || req.body.price == "") {
            res.status(400).json("FALTAN DATOS PARA ACTUALIZAR EL PRODUCTO")
        } else {
            let id = req.params.id;
            return prodUpdate = await knex('productos').where('id', id).update({
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail
            }).then(() => {
                res.status(200)
            });
        };
    } catch (error) {
        console.log(error);
    }

}

export async function close() {
    try {
        return await knex.destroy();
    } catch (error) {
        console.log(error)
    }
}


