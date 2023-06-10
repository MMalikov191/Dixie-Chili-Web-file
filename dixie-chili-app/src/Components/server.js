const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const contactsFile = `${__dirname}/contacts.json`;

let contacts = JSON.parse(fs.readFileSync(contactsFile));

let port = 3333;

const server = express();
server.use(bodyParser.json());
server.use(cors());

let contactId = contacts.length + 1;

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
};

const handlePortError = (err) => {
  if (err.code === 'EADDRINUSE') {
    port++;
    startServer();
  } else {
    console.error(err);
  }
};

// CREATE
server.post('/contacts', (req, res) => {
  const { name, address, phone, email } = req.body;

  const newContact = { id: contactId, name, address, phone, email };

  contacts.push(newContact);
  contactId++;
  fs.writeFileSync(contactsFile, JSON.stringify(contacts));
  res.status(201).json(contacts);
});

// READ
server.get('/', (req, res) => {
  const greeting = { message: 'Hello from the API' };
  res.status(200).json(greeting);
});

server.get('/contacts', (req, res) => {
  contacts = JSON.parse(fs.readFileSync(contactsFile));
  res.status(200).json(contacts);
});


const contacts = [{"id":1,"name":"Bob","address":"123 My Road","phone":"555-6789","email":"bob@mail.com"},{"id":2,"name":"Joe","address":"321 My Road","phone":"555-6339","email":"joe@mail.com"},{"id":3,"name":"Kenneth Fisher","address":"355 39th Ave","phone":"13093730952","email":"kenandcrys@live.com"}];



server.get('/contacts/:id', (req, res) => {
  contacts = JSON.parse(fs.readFileSync(contactsFile));
  const contact = contacts.filter((person) => person.id.toString() === req.params.id)[0];
  res.status(200).json(contact);
});

// UPDATE
server.put('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email } = req.body;

  const findById = (contact) => {
    return contact.id == id;
  };

  const foundContact = contacts.find(findById);

  if (foundContact) {
    if (name) foundContact.name = name;
    if (address) foundContact.address = address;
    if (phone) foundContact.phone = phone;
    if (email) foundContact.email = email;

    fs.writeFileSync(contactsFile, JSON.stringify(contacts));
    res.status(200).json(contacts);
  } else {
    return sendUserError('ID not found in DB', res);
  }
});

// DELETE
server.delete('/contacts/:id', (req, res) => {
  const { id } = req.params;
  const foundContact = contacts.find((contact) => contact.id == id);

  if (foundContact) {
    contacts = contacts.filter((contact) => contact.id != id);
    fs.writeFileSync(contactsFile, JSON.stringify(contacts));
    res.status(200).json(contacts);
  } else {
    return sendUserError('ID not found in DB', res);
  }
});

startServer();
server.on('error', handlePortError);