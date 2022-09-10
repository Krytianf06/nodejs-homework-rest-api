const Contact = require('./schema/schema')


const getAllContacts = () => Contact.find({}).lean();

const getSingleContact = (id) => Contact.findOne({ _id: id }).lean();

const createContact = (data ) => Contact.create( data );

const deleteContact = (contactId) => Contact.findByIdAndRemove(contactId);

const putContact = (contactId, fields) =>
Contact.findOneAndUpdate(
    {
      _id: contactId,
    },
    {
      $set: fields,
    },
    { new: true, strict: "throw", runValidators: true }
  );

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    deleteContact,
    putContact,
};