const express = require('express')
// const mongoose = require('mongoose')
const cors = require("cors")
const app = express()
const pool = require("./db")

// middleware
app.use(cors())
app.use(express.json())

//Routes

//create a todo

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        
        res.json(newTodo.rows[0]) 
    } catch (err) {
        console.log(err.message)
    }
})

//get all todo

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.log(err.message)
    }
})

// get  a todo 
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])

        res.json(todo.rows[0])

    } catch (err) {
        console.log(err.message)
    }
})

//update a todo
app.put("/todos/:id", async (req ,res) => {
    try {
        const { id } = req.params
        const { description } = req.body

        const updateTable = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", [description ,id]
        )

        res.json("Todo was updated!")
    } catch (err) {
        console.log(err.message)
    }
})

// delete a table
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleetTodo = await pool.query("DELETE FROM todo WHERE todo_id= $1", [id])
        res.json("todo was deleted!")
    } catch (err) {
        console.log(err.message)
    }
})


app.listen(5000, () => {
    console.log('server is running at port 5000')
})



// const db = "mongodb://localhost:27017/todofullstack"

// mongoose.connect(db, ({
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }))
//     .then(console.log('connected to mongodb'))
//     .catch((err) => {
//         console.log(err)
//     })

// const todoSchema = new mongoose.Schema({
//     title: String,
//     complete: {
//         type: Boolean,
//         default: false
//     }
// })

// const todo = mongoose.model("todo", todoSchema)

// app.get("/todos", async (req, res)=> {
//     const response  = await todo.find()

//     res.json(response)
// })

// app.post('/todos', async (req, res) => {
//     const newTodo = new todo({
//         title: req.body.title
//     })

    
//     const response = await newTodo.save()
//     try {
//         res.status(200).send(response)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// app.delete('/todos/:id',  (req, res) => {

//     todo.findOneAndDelete({ _id: req.params.id })
//         .then((task) => res.send(task))
    

// })