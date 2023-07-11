// modules
const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// Middleware
app.use(cors())
app.use(express.json()) // req.body

//Routes//
// create a todo
app.post('/todo', async(req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]) // RETURNING = after adding data we'll have to return all data back again
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})

// get all todos
app.get('/todo', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo')
        res.json(allTodos.rows)
    } catch (error) {
        console.log(error.message)
    }
})

// get a todo
app.get('/todo/:id', async(req, res) => {
    try {
        const { id } = req.params
        const Todo = await pool.query(
            'SELECT * FROM todo WHERE todo_id = $1', [id])
        res.json(Todo.rows[0])
    } catch (err) {
        console.log(err.message)
    }
})

// update a todo
app.put('/todo/:id', async(req, res) => {
    try {
        const { id } = req.params
        const { description } = req.body
        const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])
        res.json('Todo was updated!')
    } catch (error) {
        console.log(error.message)
    }
})

// delete a todo
app.delete('/todo/:id', async(req, res) => {
    try {
        const { id } = req.params
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
        res.json('Todo was deleted!')
    } catch (error) {
        console.log(error.message)
    }
})


app.listen(3000, () => {
    console.log('Server is running on PORT 3000!')
})