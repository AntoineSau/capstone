document.addEventListener('DOMContentLoaded', function() {

    // hide off and onlien cotnent at the beginning
    document.querySelector('#online_content').style.display = 'none';
    document.querySelector('#offline_content').style.display = 'none';

    // Use buttons to toggle between views
    document.querySelector('#offline_button').addEventListener('click', offline_view);
    document.querySelector('#online_button').addEventListener('click', online_view);

});

function online_view() {

    // Show relevant content div
    document.querySelector('#online_content').style.display = 'block';
    document.querySelector('#offline_content').style.display = 'none';
    
    // Check LOG
    console.log('online clicked');

};

function offline_view() {

    // Show relevant content div
    document.querySelector('#offline_content').style.display = 'block';
    document.querySelector('#online_content').style.display = 'none';

    // Check LOG
    console.log('offline clicked');

};

async function generate_letter() {

    // Retrieve list of checked checkboxes
    var inputs = document.getElementsByTagName("input");
    var checked = [];
    var timer
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            if (inputs[i].checked) {
                checked.push(inputs[i].value);
            }
        }
        // Retrieve timer
        if (inputs[i].type == "number") {
            timer = inputs[i].value;
        }
        
    }

    // Count the amount of checked boxes
    var checked_boxes = checked.length;

    // Cancel if amount of letters selected is below 5 (test below 26)
    if (checked_boxes < 5) {
        alert(`Please select more than 4 letters`);
        return false;
    }

    document.getElementById('print_test').innerHTML = `<h3><i>PRINT CHECK: -> ${checked} with timer of "${timer}". LENGTH = ${checked_boxes}</i></h3>`;

    // Lock Button in order to avoid having 2 timers running at the same time
    document.getElementById("letter_generator").innerHTML = 'Wait until the end of the timer';
    document.getElementById("letter_generator").disabled = true;

    // Generate a random letter from selected list only
    let letters_available = checked
    let random_letter = letters_available[Math.floor(Math.random() * letters_available.length)]
    document.getElementById('letter_to_play').innerHTML = `${random_letter}`;

    // Display the total amount of seconds the user wants to play
    for (var i = timer; i > 0; i--) {
        
        console.log(`Timer is ${timer}`);
        document.getElementById('print_timer').innerHTML = `${timer}`;
        // call Sleep function for delay
        await sleep(1000);
        timer--;

    }
    // Tell user that time is up
    document.getElementById('print_timer').innerHTML = 'Time is up!';

    // Animation to show easily that time is up
    document.body.style.backgroundColor = "black";
    await sleep(1000);
    document.body.style.backgroundColor = "white";

    // Put generate timer button back
    document.getElementById("letter_generator").innerHTML = 'Generate a random letter and set timer';
    document.getElementById("letter_generator").disabled = false;
    
    // TODO Test sound alert if user doesn´t look at screen
    var alert_timer = new Audio('categories/alert.mp3');
    alert_timer();
    
    // Test sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Display proper timer

    // Add it to DOM
    console.log(random_letter)


};

