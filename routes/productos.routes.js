import express from 'express';
import {add, get, getByID, del, update} from '../controllers/Producto.js';
const router = express.Router();

router.post('/', add);
router.get('/', get);
router.get('/:id',getByID);
router.delete('/:id', del);
router.put('/:id', update);

export default router;