import { PrismaClient } from '@prisma/client'
import successResponse from '../utils/successResponse.js';

const prisma = new PrismaClient()

export const getTodos = async (req, res, next) => {
  try {
    const todos = await prisma.todo.findMany()
  
    return successResponse(res, todos)
    
  } catch (error) {
    next(error);
  }
}

export const getTodo = async (req, res, next) => {
  const id = parseInt(req.params.id)
  const todo = await prisma.todo.findUnique({
    where: {
      id: id
    }
  })

  if (!todo){
    const error = new Error(`Todo was not found`)
    error.status = 404
    return next(error);
  }

  successResponse(res, todo, "", 201)
} 

export const createTodo = async (req, res, next) => {
  const { title } = req.body

  if (!title) {
    const error = new Error(`Please include title`)
    error.status = 404
    return next(error);
  }

  const todos = await prisma.todo.create({
    data : {
      title : title
    }
  })

  successResponse(res, todos, "", 201)
}

export const editTodo = async(req, res, next) => {
  const id = parseInt(req.params.id)

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id
      }
    })
    
    if (!todo){
      const error = new Error(`Todo was not found`)
      error.status = 404
      return next(error);
    }

    const { title, status } = req.body

    if (!title) {
      const error = new Error(`Please include title`)
      error.status = 404
      return next(error);
    }
  
    const updatedTodo = await prisma.todo.update({
      where: {
        id : id
      },
      data : {
        title : title,
        status : status
      }
    })

    successResponse(res, updatedTodo, "", 201)
  } catch (error) {
    next(error);
  }
}

export const deleteTodo = async (req, res, next) => {
  const id = parseInt(req.params.id)

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id
      }
    })
  
    if (!todo){
      const error = new Error(`Todo was not found`)
      error.status = 404
      return next(error);
    }
  
    const deletedTodo = await prisma.todo.delete({
      where: {
        id : id
      }
    })
    
    res.status(200).json({ message: `Todo with ID ${id} has been deleted` });
  } catch (error) {
    next(error)
  }
} 
