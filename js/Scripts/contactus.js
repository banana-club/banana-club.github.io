document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contactus-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create a formatted string with the contact information
        const contactData = `
            Contact Form Submission
            -----------------------
            Name: ${name}
            Email: ${email}
            Message: ${message}
            
            Submitted on: ${new Date().toLocaleString()}
        `;
        
        // Create a Blob with the data
        const blob = new Blob([contactData], { type: 'text/plain' });
        
        // Create a download link
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `contact_submission_${name.replace(/\s+/g, '_')}_${Date.now()}.txt`;
        
        // Trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        // Optional: Reset the form after download
        contactForm.reset();
        
        // Optional: Show a success message
        alert('Thank you for your message! A copy has been downloaded.');
    });
});