const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
  name: {
      type: String,
      minlength: 4,
      maxlength: 70,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
);

const Contact = mongoose.model("contacts", contactSchema, "contacts");

module.exports = Contact;