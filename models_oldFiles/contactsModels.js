// const fs = require('fs').promises;
// const path = require('path');
// const Contact = require('../schema/schema')

// // const contactsPath = path.join(__dirname, "contacts.json");

// const listContacts = async () =>{
//   const contacts = await Contact.find({}).lean();
//     return contacts;
// }

// const listContacts = async () => { 
//   try {
//     const data = await fs.readFile(contactsPath);
// return JSON.parse(data);
    
//   } catch (err) {
//     return console.error(err.message, "readContacts");
//   }
// };
// const getContactById = async (contactId) =>Contact.findOne({ _id: contactId }).lean();

// const getContactById = async (contactId) => {
//   const list = await listContacts();
//   const findeContactId = list.find(contact => contact.id === contactId)
//   if (!list) {
//     return null;
//   }
//   return findeContactId;
// };

// const removeContact = async (contactId) => Contact.findByIdAndRemove(contactId);
// {
  // const list = await listContacts();
  // const findeContactId = list.findIndex(contact => contact.id === contactId)
  // if (findeContactId === -1) {
  //   return null;
  // }
  // const newContacts = list.filter((_, index) => index !== findeContactId);
  // await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  // return list[findeContactId];
// };

// const addContact = async (body) => {
//   const { name, email, phone } = body;
//   const contact = new Contact({ name, email, phone });
//   await contact.save();
// //   return contact;
// };
// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const ID = await IdContact();
//   const newContact = { id:ID, name, email, phone };
//   await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
//   return newContact;
// };


// const updateContact = async (contactId, fields) => {
//   try {
//     Contact.findOneAndUpdate(
//     {_id: contactId,},
//     {$set: fields,},
//     { new: true, strict: "throw", runValidators: true });
//   } catch (error) {
//     return null;
//   }
// };
  // const list = await listContacts();
  // const findeContactId = list.find(contact => contact.id === contactId)
  // if (!findeContactId) {
  //   return null;
  // } else {
  //     const ContactIdex = list.indexOf(findeContactId);
  //     const newContact = { id: contactId, name, email, phone };
  //     list.splice(ContactIdex, 1, newContact);
  //     await fs.writeFile(contactsPath, JSON.stringify(list));
  //     return newContact;
  // }

//   const patchFavorite = async (req, res, next) => {
//     const { id } = req.params;
//     const { favorite } = req.body;
//     try {
//       const result = await updateContact(id, { favorite });
//       if (result) {
//         res.json(result);
//       } else {
//         next();
//       }
//     } catch (e) {
//       next(e);
//     }
//   };





// const IdRandom = () => {
//   const idContact = Math.floor(Math.random()*100+1);
//   const addId = idContact.toString();
//   return addId;
// }


// const IdContact = async () =>{
//   const ID = IdRandom();
//   const list = await listContacts()
//   const findeContactId = list.find(contact => contact.id === ID);
//   if (findeContactId) {
//       return IdContact();
//   } else {
//       return ID;}
// }


// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact, 
//   updateContact,
//   patchFavorite,
// };
