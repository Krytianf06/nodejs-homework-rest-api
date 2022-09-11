const express = require('express');
const router = express.Router();
// const Joi = require("joi");

const contactController = require('../../queryMongoDB/contactMongoDB');
const {authorization} = require('../../service/validation/tokenValid');

router.get("/" , authorization, contactController.listContacts);
router.get("/:contactId",authorization,  contactController.getContactById);
router.post("/",authorization, contactController.addContact);
router.delete("/:contactId", authorization, contactController.removeContact);
router.put("/:contactId", authorization, contactController.updateContact);
router.patch("/:contactId/favorite", authorization , contactController.patchContact);


module.exports = router;
