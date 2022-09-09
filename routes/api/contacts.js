const express = require('express');
const router = express.Router();

const contactController = require('../../queryMongoDB/contactMongoDB');

router.get("/" ,contactController.listContacts);
router.get("/:contactId", contactController.getContactById);
router.post("/", contactController.addContact);
router.delete("/:contactId", contactController.removeContact);
router.put("/:contactId", contactController.updateContact);
router.patch("/:contactId/favorite", contactController.patchContact);


module.exports = router;
