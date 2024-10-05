import express from 'express'
import { createTodo, deleteTodo, editTodo, getTodo, getTodos } from '../controller/postController.js';


const router = express.Router()


router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', createTodo)
router.put('/:id', editTodo)
router.delete('/:id', deleteTodo)


export default router;