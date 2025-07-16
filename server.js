const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, etc.)

// POST endpoint for contact form
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Configure your email transport using environment variables
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Set EMAIL_USER in your environment variables
      pass: process.env.EMAIL_PASS  // Set EMAIL_PASS in your environment variables
    }
  });

  // Email options
  let mailOptions = {
    from: email,
    to: 'dilmin236@gmail.com', // Your receiving email
    subject: subject || 'New Contact Form Message',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send('<script>alert("Message sent successfully!"); window.location.href="contact.html";</script>');
  } catch (error) {
    res.send('<script>alert("Failed to send message."); window.location.href="contact.html";</script>');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
