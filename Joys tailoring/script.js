document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let size = document.getElementById("size").value;
    
    if(name && email && size) {
        alert("Thank you, " + name + "! Your details have been sent.");
        document.getElementById("contact-form").reset();
    } else {
        alert("Please fill out all fields.");
    }
});