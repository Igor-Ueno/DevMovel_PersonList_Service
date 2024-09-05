const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// initial data
let persons = initPersons();
let last_id = persons.length;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/reset', async (req, res) => {
    console.log('reset');
    persons = initPersons();
    res.json({ message: 'persons reset' });
});

app.get('/person', async (req, res) => {
    console.log('get persons');
    console.log("last id: " + last_id);
    print_persons();
    res.json(persons);
});

app.get('/person/:iid', async (req, res) => {
    const iid = parseInt(req.params.iid);
    console.log('get person ' + iid);
    for (p of persons) {
        if (p.id === iid) {
            res.json(p);
            return;
        }
    }

    res.status(404).send('Person not found');
});

// app.get('/board/:iid/messages', async (req, res) => {
//     const iid = parseInt(req.params.iid);
//     console.log(`get board ${iid} messages`);
//     bb = findBoard(boards, iid);
//     if (bb != null) {
//         res.json(bb.messages);
//         return;
//     }

//     res.status(404).send('Board not found');
// });

// app.post('/board/:iid/messages', async (req, res) => {
//     const iid = parseInt(req.params.iid);
//     console.log(`post message to board ${iid}`);
//     bb = findBoard(boards, iid);
//     if (bb != null) {
//         const msg = req.body;
//         msg.timestamp = (new Date()).toString();
//         bb.messages.push(msg);
//         res.json({ message: 'Message added to board ' + bb.name });
//         return;
//     }

//     res.status(404).send('Board not found');
// });

app.delete('/person/:iid', async (req, res) => {
    const iid = parseInt(req.params.iid);
    console.log(`delete person ${iid}`);
    pp = findPerson(persons, iid);
    if (pp != null) {
        persons = persons.filter(b => b.id != pp.id);
        res.json({ message: 'Person removed' });
        return;
    }

    res.status(404).send('Person not found');
});

app.post('/person', async (req, res) => {
    const person = req.body; 
    // person.id = persons.length + 1;
    person.id = last_id + 1;
    last_id += 1;
    console.log("post person: " + person);
    console.log("-> person id: " + person['id']);
    console.log("-> person name: " + person['name']);
    console.log("-> person age: " + person['age']);
    persons.push(person);
    res.json(person);
});

app.listen(port, () => {
    console.log('started server...');
});

function findPerson(persons, iid) {
    for (b of persons) {
        if (b.id === iid) {
            return b;
        }
    }
    return null;
}

function initPersons () {
    return [
        {
            id: 1,
            name: 'Fulano',
            age: 25
        },
        {
            id: 2,
            name: 'Ciclano',
            age: 21
        },
        {
            id: 3,
            name: 'Beltrano',
            age: 32
        },
    ];
}

function print_persons() {
    for (p of persons) {
        console.log("-> person id: " + p['id']);
        console.log("-> person name: " + p['name']);
        console.log("-> person age: " + p['age']);
        console.log();
    }
}