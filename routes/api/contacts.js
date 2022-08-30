const express = require('express');
const router = express.Router();
const Joi = require("joi");

const contact = require('../../models/contactsModels');

const contactSchema = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});



router.get("/", async (req, res, next) => {
    const contacts = await contact.listContacts();
    res.status(200).json({
      data: contacts,
    });
});


router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactItem = await contact.getContactById(contactId);
  if (!contactItem) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
    })
  };
    res.status(200).json({
    data: contactItem,
    });

});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const oldContact = await contact.removeContact(contactId);
  if (!oldContact) {
    return res.status(404).json({
      message: "Not found",
      code: 404,
    })
  }

  res.status(200).json({
    message: "contact deleted",
    code: 200,
    data: oldContact,
  });
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate(req.body);
    if (error){
      res.status(400).json({message: `missing required name field.`});
    } else {
          const newContact = await contact.addContact(name, email, phone);
          res.status(201).json({
          message: "created",
          code: 201,
          data: newContact,
          });
    }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate(req.body);
    
  if (error){
    res.status(400).json({message: `missing field.`});
  } else {
    const newContact = await contact.updateContact(contactId, { name, email, phone });
    if (newContact === null) {
      return res.status(404).json({
        message: `Contacts with id ${contactId} not found`,
        code: 404,})
    } else {
      res.status(200).json({
      message: "Contact successfully updated",
      code: 200,
      data: newContact,
    });}
  }
})

module.exports = router
