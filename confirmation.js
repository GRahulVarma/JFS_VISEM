// Confirmation Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Try to get data from sessionStorage first, then URL parameters
    let studentName = sessionStorage.getItem('studentName');
    let selectedSubjects = sessionStorage.getItem('selectedSubjects');
    let totalFee = sessionStorage.getItem('totalFee');

    // If not in sessionStorage, try to get from URL parameters
    if (!studentName) {
        const params = new URLSearchParams(window.location.search);
        studentName = params.get('name');
        selectedSubjects = params.get('subjects');
        totalFee = params.get('fee');
    }

    // Check if data exists
    if (!studentName || !selectedSubjects || !totalFee) {
        alert('No registration data found. Redirecting to registration page.');
        setTimeout(function() {
            window.location.href = 'Course_Registration.html';
        }, 500);
        return;
    }

    // Display data on confirmation page
    document.getElementById('displayName').textContent = studentName;
    document.getElementById('displaySubjects').textContent = selectedSubjects;
    document.getElementById('displayTotal').textContent = totalFee;

    // Generate Receipt ID
    const receiptID = 'REC-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    document.getElementById('receiptID').textContent = receiptID;

    // Display current date
    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('regDate').textContent = dateString;
});

// Function to download receipt as text file
function downloadReceipt() {
    const studentName = sessionStorage.getItem('studentName');
    const selectedSubjects = sessionStorage.getItem('selectedSubjects');
    const totalFee = sessionStorage.getItem('totalFee');
    const receiptID = document.getElementById('receiptID').textContent;
    const regDate = document.getElementById('regDate').textContent;

    const receiptContent = `
COURSE REGISTRATION RECEIPT
=====================================

Receipt ID: ${receiptID}
Registration Date: ${regDate}

Student Name: ${studentName}
Selected Subjects: ${selectedSubjects}
Total Fee: $${totalFee}

Status: Successfully Registered

=====================================
Thank you for registering!
    `;

    // Create blob and download
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${receiptID}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    alert('Receipt downloaded successfully!');
}

// Function to start new registration
function newRegistration() {
    sessionStorage.clear();
    window.location.href = 'Course_Registration.html';
}

// Function to cancel registration
function cancelRegistration() {
    if (confirm('Are you sure you want to cancel this registration?')) {
        sessionStorage.clear();
        window.location.href = 'Course_Registration.html';
    }
}
