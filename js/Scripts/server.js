const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // Serve static files

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }

    // Create user info directory if it doesn't exist
    const userInfoDir = path.join(__dirname, 'js', 'Scripts', 'User Info');
    if (!fs.existsSync(userInfoDir)) {
        fs.mkdirSync(userInfoDir, { recursive: true });
    }

    // Create filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `contact-form-${timestamp}.txt`;
    const filePath = path.join(userInfoDir, filename);

    // Format the data to save
    const dataToSave = `
Name: ${name}
Email: ${email}
Message: ${message}
Submitted at: ${new Date().toString()}
`;

    // Write to file
    fs.writeFile(filePath, dataToSave, (err) => {
        if (err) {
            console.error('Error saving form data:', err);
            return res.status(500).send('Error saving your message');
        }
        
        console.log(`Form data saved to ${filePath}`);
        res.send('Thank you for your message! We will get back to you soon.');
    });
});

// Serve the contact page
app.get('/contactus', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'contactus.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});