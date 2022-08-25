const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => { 
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
return result;
    
  } catch (err) {
    return console.error(err.message, "readContacts");
  }
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  const findeContactId = list.find(contact => contact.id === contactId)
  if (!list) {
    return null;
  }
  return findeContactId;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const findeContactId = list.findIndex(contact => contact.id === contactId)
  if (findeContactId === -1) {
    return null;
  }
  const newContacts = list.filter((_, index) => index !== findeContactId);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return list[findeContactId];
};


const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const ID = await IdContact();
  const newContact = { id:ID, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
  return newContact;
};


const updateContact = async (contactId, { name, email, phone }) => {
  const list = await listContacts();
  const findeContactId = list.find(contact => contact.id === contactId)
  if (!findeContactId) {
    return null;
  } else {
      const ContactIdex = list.indexOf(findeContactId);
      const newContact = { id: contactId, name, email, phone };
      list.splice(ContactIdex, 1, newContact);
      await fs.writeFile(contactsPath, JSON.stringify(list));
      return newContact;
  }
};



const IdRandom = () => {
  const idContact = Math.floor(Math.random()*100+1);
  const addId = idContact.toString();
  return addId;
}


const IdContact = async () =>{
  const ID = IdRandom();
  const list = await listContacts()
  const findeContactId = list.find(contact => contact.id === ID);
  if (findeContactId) {
      return IdContact();
  } else {
      return ID;}
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact, 
  updateContact,
};