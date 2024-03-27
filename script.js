document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var email = document.getElementById('email').value;
    var year = document.getElementById('year').value;
    var fruit = document.getElementById('fruit').value;
    var color = document.getElementById('color').value;

    // Do something with the values (for example, log them to console)
    console.log('Email:', email);
    console.log('Year of Birth:', year);
    console.log('Selected Fruit:', fruit);
    console.log('Selected Color:', color);

    // You can send these values to a server using AJAX if needed
});
