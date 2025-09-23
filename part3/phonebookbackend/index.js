const express = require("express")
const morgan = require("morgan")

const app = express()

let persons = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

morgan.token('body', (req, res) => {
    return req.method === "POST" ? JSON.stringify(req.body) : ''
})

app.use(express.json())

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body "))

app.get('/', (req, res) => {
    res.send("Phone book backend")
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const time = new Date();
    const count = persons.length;
    res.send(`
        <p>Phone book has info for ${count} people</p>
        <p>${time}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(person => person.id === id);

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
})

const generateId = () => {
    const id = persons.length > 0 ? Math.floor(Math.random() * 1000) + Math.max(...persons.map(person => Number(person.id))) : 0;
    return String(id + 1);
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        });
    }
    
    if (persons.find(person => person.name === body.name)) {
        return res.status(409).json({
            error: "name must be unique"
        });
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)