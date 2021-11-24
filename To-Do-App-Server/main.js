const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/task', (req, res)=>{
    fs.readFile(path.join(__dirname, 'task.txt'), 'utf8' , (err, tasks) => {
        if (err) {
            console.error(err)
            return
        }
        var taskArr = tasks.length ? JSON.parse(tasks) : []
        taskArr.push(req.body)
        fs.writeFile(path.join(__dirname, 'task.txt'), JSON.stringify(taskArr), (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    })
    res.send("success")
})

app.get('/task', (req, res)=>{
    fs.readFile(path.join(__dirname, 'task.txt'), 'utf8' , (err, tasks) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(tasks)
    })
})

app.post('/deleteTask', (req, res)=>{
    fs.writeFile(path.join(__dirname, 'task.txt'), JSON.stringify(req.body), err => {
        if (err) {
            console.error(err)
            return
        }
    })
})
app.listen(port, () => {
	console.log(`listening at http://localhost:${port}`)
})
