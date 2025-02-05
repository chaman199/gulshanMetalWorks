function submitToSheet(event) {
    event.preventDefault();

    // Get form data
    const form = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Get form values
    const formData = new FormData(form);
    
    // Convert form data to URL parameters
    const urlParams = new URLSearchParams(formData).toString();

    // Your deployed Google Apps Script URL
    const scriptURL = 'https://script.google.com/a/macros/paytm.com/s/AKfycbytDovXXOfXfL4xzJKvonKsFdEeBBbc2myOu_w42dlKYWTE5I0jNAE3COxSbm-5WWn1FQ/exec';
    
    // Create script element for JSONP
    const script = document.createElement('script');
    script.src = `${scriptURL}?${urlParams}&callback=handleResponse`;
    
    // Add callback function to window
    window.handleResponse = function(response) {
        if (response.status === 'success') {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
            submitBtn.style.backgroundColor = '#4CAF50';
            form.reset();
        } else {
            submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to Send';
            submitBtn.style.backgroundColor = '#f44336';
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
        }, 3000);
        
        // Cleanup
        document.body.removeChild(script);
        delete window.handleResponse;
    };
    
    // Append script to document
    document.body.appendChild(script);
    
    return false;
} 