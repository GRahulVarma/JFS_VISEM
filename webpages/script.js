document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculateBtn');
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const subjectCheckboxes = document.querySelectorAll('.subject');
    const totalDisplay = document.getElementById('total');

    calculateBtn.addEventListener('click', function() {
        calculateTotal();
    });

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        submitRegistration();
    });

    function calculateTotal() {
        let total = 0;
        
        subjectCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                total += parseInt(checkbox.value);
            }
        });

        totalDisplay.textContent = total;
        return total;
    }

    function submitRegistration() {
        const studentName = nameInput.value.trim();

        if (studentName === '') {
            alert('❌ Please enter your name');
            nameInput.focus();
            nameInput.style.borderColor = '#f44336';
            nameInput.style.boxShadow = '0 0 5px rgba(244, 67, 54, 0.5)';
            return;
        }

        const selectedSubjects = Array.from(subjectCheckboxes).filter(cb => cb.checked);
        
        if (selectedSubjects.length === 0) {
            alert('❌ Please select at least one subject');
            return;
        }

        // Reset input style if validation passes
        nameInput.style.borderColor = '';
        nameInput.style.boxShadow = '';

        const total = calculateTotal();
        const subjectNames = selectedSubjects.map(cb => {
            return cb.parentElement.textContent.trim();
        }).join(', ');

        // Store data in sessionStorage for next page
        sessionStorage.setItem('studentName', studentName);
        sessionStorage.setItem('selectedSubjects', subjectNames);
        sessionStorage.setItem('totalFee', total);

        // Create URL with parameters as backup
        const params = new URLSearchParams({
            name: studentName,
            subjects: subjectNames,
            fee: total
        });

        // Redirect to confirmation page with a small delay
        setTimeout(function() {
            window.location.href = 'confirmation.html?' + params.toString();
        }, 100);
    }

    subjectCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
        });
    });
});
// Auto-calculate total fee
let subjects = document.querySelectorAll(".subject");
let totalBox = document.getElementById("total");

subjects.forEach(item => {
    item.addEventListener("change", () => {
        let total = 0;

        subjects.forEach(sub => {
            if (sub.checked) {
                total += parseInt(sub.value);
            }
        });

        totalBox.innerText = "₹" + total;
    });
});

// Optional: form submit
document.getElementById("regForm").addEventListener("submit", function(e){
    e.preventDefault();
      e.preventDefault();

    let selectedSubjects = [];
    let totalFee = 0;

    subjects.forEach(sub => {
        if (sub.checked) {

            // Get subject name from the label text
            let subjectName = sub.parentElement.innerText.trim();
            selectedSubjects.push(subjectName);

            totalFee += parseInt(sub.value);
        }
    });

    if (selectedSubjects.length === 0) {
        alert("Please select at least one subject.");
        return;
    }

    let studentName = document.getElementById("name").value;

    let message =
        "Student Name: " + studentName + "\n\n" +
        "Selected Subjects:\n- " + selectedSubjects.join("\n- ") + "\n\n" +
        "Total Fee: ₹" + totalFee;

    alert(message);
});
