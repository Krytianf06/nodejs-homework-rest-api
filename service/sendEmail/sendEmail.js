const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const messageRegistration = {
  registration: "Thank you for registration!",
};

const sendEmail = async (email, subject, text) => {
  

  const msg = {
      to: email,
      from: "krystianf06@gmail.com",
      subject: messageRegistration[subject],
      text: text,
      html: `<h2>${text}</h2>`,
  };
  await sgMail.send(msg);
};

module.exports = {sendEmail,};