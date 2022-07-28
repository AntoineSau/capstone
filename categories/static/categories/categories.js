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
    
    // Retrive list of checked checkboxes
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


    document.getElementById('print_test').innerHTML = `<h3><i>PRINT CHECK: -> ${checked} with timer of "${timer}"</i></h3>`;

    // Generate a random letter from selected list only
    let letters_available = checked
    let random_letter = letters_available[Math.floor(Math.random() * letters_available.length)]
    document.getElementById('letter_to_play').innerHTML = `${random_letter}`;

    // Display the total amount of seconds the user wants to play
    for (var i = timer; i > 0; i--) {
        timer--;
        console.log(`Timer is ${timer}`);
        document.getElementById('print_timer').innerHTML = `${timer}`;
        // call Sleep fucntion for delay
        await sleep(1000);

    }
    // Tell user that time is up
    document.getElementById('print_timer').innerHTML = 'Time is up!';
    
    // Test sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Display proper timer

    // Add it to DOM
    console.log(random_letter)


};

