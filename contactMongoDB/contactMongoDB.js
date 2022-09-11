const service = require('../service/index');
const valid = require('../service/schema/joiValid')

const listContacts = async (req, res, next) => {
    const contact = await service.getAllContacts();
  try {
     if (contact) {
      res.status(200).json(contact);
      }
  } catch (e) {
    next(e);
  }
    
  };

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    
    try {
      const contact = await service.getSingleContact(contactId);
      if (contact) {
        res.json(contact);
      }else {
        res.status(404).json({message: "Not found"});
      }
    } catch (e) {
      next(e);
    }
    
  };




 
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
    try {
      const findID = await service.getSingleContact(contactId);
      if (findID === null) {
        res.status(404).json({message: "Not found"});
      } else {
        const result = await service.deleteContact(contactId);
        res.json(result);
      }
    } catch (e) {
      next(e);
    }
  };

  const addContact = async (req, res, next) => {
    try {
      const { error } = valid.contactValid.validate(req.body)

      if (error) {
        res.status(400).json({message: "missing required name field."});
      } else {
        const { _id } = req.user;
        const result = await service.createContact( {...req.body, owner: _id} );

        if (result) {
          res.status(201).json(result);
        }

      }
    } catch (e) {

      next(e);
    }
  };

 
const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
    try {
      const findID = await service.getSingleContact(contactId);
      if (findID === null) {
        res.status(404).json({message: "Not found"});
      } else {
        const result = await service.deleteContact(contactId);
        res.json(result);
      }
    } catch (e) {
      next(e);
    }
  };

<<<<<<< HEAD:contactMongoDB/contactMongoDB.js
=======
  const addContact = async (req, res, next) => {
    try {
      const { error } = valid.contactValid.validate(req.body)

      if (error) {
        res.status(400).json({message: error});
      } else {
        const { _id } = req.user;
        const result = await service.createContact( {...req.body, owner: _id} );

        if (result) {
          res.status(201).json(result);
        }

      }
    } catch (e) {
      next(e);
    }
  };


>>>>>>> hw05-avatars:queryMongoDB/contactMongoDB.js
const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const fields = req.body;
    try {
      const findID = await service.getSingleContact(contactId);
      if (findID === null) {
        res.status(404).json({message: "Not found"});
      } else if (fields) {
        const result = await service.putContact(contactId, fields);
          if (result) {
            res.json(result);
          }
      } else {
        res.status(400).json({message: "missing fields"});
        next();
      }
    } catch (e) {
      next(e);
    }
  };

const patchContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;
    try {
       if (!favorite){
        res.status(400).json({message: "missing field favorite"});

      } else {
        const result = await service.putContact(contactId, { favorite });
              if (result) {
                res.json(result);
              } else {
                next();
              }
      }
    } catch (e) {
      res.status(404).json({message: "Not found"});
      next(e);
    }
  };



module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact, 
    updateContact,
    patchContact,
  };
  