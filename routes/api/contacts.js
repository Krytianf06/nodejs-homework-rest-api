const express = require('express');
const router = express.Router();
// const Joi = require("joi");

const contactController = require('../../contactMongoDB/contactMongoDB');


router.get("/", contactController.listContacts);
router.get("/:contactId", contactController.getContactById);
router.post("/", contactController.addContact);
router.delete("/:contactId", contactController.removeContact);
router.put("/:contactId", contactController.updateContact);
router.patch("/:contactId/favorite", contactController.patchContact);



// const contactSchema = Joi.object({
//   name: Joi.string().min(4).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// router.get("/", async (req, res, next) => {
//     const contacts = await contact.listContacts();
//     res.status(200).json(contacts);
// });


// router.get('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const contactItem = await contact.getContactById(contactId);
//     if (contactItem) {
//       res.json(contactItem);
//     }
//   } catch (error) {
//     return res.status(404).json({
//         message: "Not found",
//         code: 404,
//       })
//   }

//   // if (!contactItem) {
//   //   return res.status(404).json({
//   //     message: "Not found",
//   //     code: 404,
//   //   })
//   // };
//   //   return res.json(contactItem);
// });

// router.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const oldContact = await contact.removeContact(contactId);
//   if (!oldContact) {
//     return res.status(404).json({
//       message: "Not found",
//       code: 404,
//     })
//   }
//   res.status(200).json({
//     message: "contact deleted",
//     code: 200,
//     data: oldContact,
//   });
// })

// router.post('/', async (req, res, next) => {
//   const { name, email, phone } = req.body;
//   const newContact = await contact.addContact(req.body);
//   return (res.status(201).json({message: "created", code: 201, data: newContact,}))
// });

// router.put('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   const fields = req.body;
//   const { error } = contactSchema.validate(req.body);
//   if (error){
//       res.status(400).json({message: `missing field.`});
// } else {
//       const newContact = await contact.updateContact(contactId, fields);
//     if (newContact === null) {
//         return res.status(404).json({
//                message: `Contacts with id ${contactId} not found`,
//                code: 404,})
//     } else  {
//       return res.json(newContact);
//           }
//     }}
     
//   // if (error){
//   //   res.status(400).json({message: `missing field.`});
//   // } else {
//   //   const newContact = await contact.updateContact(contactId, fields);
//   //   if (newContact === null) {
//   //     return res.status(404).json({
//   //       message: `Contacts with id ${contactId} not found`,
//   //       code: 404,})
//   //   } else {
//   //     res.status(200).json(newContact);}
//   // }
// );

// router.patch("/:id/favorite", contact.patchFavorite);

module.exports = router;
