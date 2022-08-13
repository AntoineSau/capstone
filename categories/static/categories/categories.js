document.addEventListener('DOMContentLoaded', function() {

    // hide off and online content at the beginning
    document.querySelector('#online_content').style.display = 'none';
    document.querySelector('#offline_content').style.display = 'none';
    // Use buttons to toggle between views
    document.querySelector('#offline_button').addEventListener('click', offline_view);
    document.querySelector('#online_button').addEventListener('click', online_view);

    // Generate dynamically alphabet with pre-selected checkboxes
    var alphabet_js = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let alphabet_generated = document.getElementById('alphabet');
    for (var i = 0; i < alphabet_js.length; i++) {    
        alphabet_generated.innerHTML += `<input type="checkbox" checked value="${alphabet_js[i]}"><label>${alphabet_js[i]}</label> `;
    }

    // Populate list of categories
    var categories = ["Things that Paulina likes", "First Name", "Song Name", "Band", "Country", "Item in this room",
    "Things than can make you fired", "Word ending with this letter", "Way of dying", 
    "Animal", "Profession", "Movie Title", "Celebrity", "Book title"];

    // Shuffle the array of categories
    categories = categories.sort(() => Math.random() - 0.5);
    
    var length_categories = categories.length;
    var categories_html = document.getElementById('categories_web');
    for (var i = 0; i < length_categories; i++) {
        // Select (green) by default only the first 5 items, else unselected (red)
        if (i < 5) {
            categories_html.innerHTML += `<button id="${i}" type="button" onclick="switch_color(${i})" class="btn btn-success mb-2">${categories[i]}</button> `;
        }
        else {
            categories_html.innerHTML += `<button id="${i}" type="button" onclick="switch_color(${i})" class="btn btn-danger mb-2">${categories[i]}</button> `;
        }
    }

});

// Selecting or unselecting categories to play
function switch_color(this_button) {
    // Print Check 
    // console.log(`You want to change button ${this_button}`);
    var button_to_change = document.getElementById(`${this_button}`);
    // If button is selected, unselect it
    if (button_to_change.className == "btn btn-success mb-2") {
        button_to_change.className = "btn btn-danger mb-2";
    }
    
    // If button is unselected, select it
    else if (button_to_change.className == "btn btn-danger mb-2") {
        button_to_change.className = "btn btn-success mb-2";
    }

    // let cat = document.getElementById(this_button).innerHTML;
    // Print Check 
    // console.log(`You want to change ${cat}`);
}

function online_view() {

    // Hide introduction block
    document.getElementById('intro_block').style.display = "none";

    // Show relevant content div
    document.querySelector('#online_content').style.display = 'block';
    document.querySelector('#offline_content').style.display = 'none';
    
    // Check LOG
    // console.log('online clicked');

};

function postgame_view () {
    // Clean up categories field if users want to change variables
    document.getElementById('letter_to_play').innerHTML = "";
    document.getElementById('print_timer').innerHTML = "";
    document.getElementById('print_test').innerHTML = "";
    document.getElementById('print_categories').innerHTML = "";
    document.getElementById('stop_timer').innerHTML = "";

    // Show again the 'Generate letter' so the users cna modify data
    document.getElementById('form_generate_letter').style.display = "block";

}

function offline_view() {

    // Hide introduction block
    document.getElementById('intro_block').style.display = "none";
 
    // Show relevant content div
    document.querySelector('#offline_content').style.display = 'block';
    document.querySelector('#online_content').style.display = 'none';

};

async function generate_letter() {
    
    // Give the possibility to the users to stop the timer while it´s running
    let stop_timer = document.getElementById('stop_timer');
    stop_timer.innerHTML = `<button type="button" class="btn btn-warning">Stop timer</button>`

    // Clean up categories field if users restarts timer
    document.getElementById('print_test').innerHTML = "";
    document.getElementById('print_categories').innerHTML = "";

    // Retrieve list of checked checkboxes
    var inputs = document.getElementsByTagName("input");
    var checked = [];
    var timer;
    
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

    // Cancel if amount of letters selected is below 5
    if (checked_boxes < 5) {
        alert(`Please select at least 5 letters`);
        return false;
    }

    var all_buttons = document.getElementsByTagName("button");
    var categories_selected = [];
    // Retrieve selected (GREEN) categories
    for (var i = 0; i < all_buttons.length; i++) {
        if (all_buttons[i].className == "btn btn-success mb-2") {
            categories_selected.push(all_buttons[i].innerHTML);
            //console.log(`CAT ${i}: ${categories_selected[i]} `);
        }
    }

    // Cancel if amount of categories selected is below 3
    if (categories_selected.length < 3) {
        alert(`Please select at least 3 categories`);
        return false;
    }

    // Print check
    // document.getElementById('print_test').innerHTML = `<h3><i>PRINT CHECK: -> ${checked} with timer of "${timer}". 
    // LENGTH = ${checked_boxes}</i></h3>
    // CATEGORIES: ${categories_selected}`;

    // Hide the whole Generate letter form to focus on relevant content
    document.getElementById('form_generate_letter').style.display = "none";

    // Print test length categories
    document.getElementById('print_test').innerHTML = `Your <b>${categories_selected.length}</b> categories are:`;

    // Print test categories
    var print_categories = document.getElementById('print_categories');
    for (var i = 0 ; i < categories_selected.length; i++) {
        
        print_categories.innerHTML += `${[i+1]}: ${categories_selected[i]}<br>`;

    }

    // Lock Button in order to avoid having 2 timers running at the same time
    var letter_generator = document.getElementById("letter_generator");
    letter_generator.innerHTML = 'Wait until the end of the timer';
    letter_generator.disabled = true;

    // Generate a random letter from selected list only
    let letters_available = checked;
    let random_letter = letters_available[Math.floor(Math.random() * letters_available.length)];
    document.getElementById('letter_to_play').innerHTML = `${random_letter}`;

    // Display the total amount of seconds the user wants to play
    let current_timer = document.getElementById('print_timer');
    for (var i = timer; i > 0; i--) {
        
        // console.log(`Timer is ${timer}`);
        current_timer.innerHTML = `${timer}`;
        // call Sleep function for delay
        await sleep(1000);
        timer--;

    }

    // Tell user that time is up and add button to start again
    current_timer.innerHTML = `Time is up! 
    <p><button onclick="generate_letter()" class="btn btn-info mb-2 btn-lg">Play again</button>
    <button onclick="postgame_view()" class="btn btn-light mb-2 btn-lg">Change data</button>`;

    // Clean up categories field if users restarts timer
    document.getElementById('print_test').innerHTML = "You played with:";

    // Hide stop timer button
    document.getElementById('stop_timer').innerHTML = "";

    // TODO
    // document.getElementById('form_generate_letter').style.display = "block";

    // Animation to show easily that time is up
    document.body.style.backgroundColor = "black";
    await sleep(1000);
    document.body.style.backgroundColor = "white";

    // Put generate timer button back
    var letter_generator = document.getElementById("letter_generator");
    letter_generator.innerHTML = 'Generate a random letter and set timer';
    letter_generator.disabled = false;
    
    // TODO Test sound alert if user doesn´t look at screen
    var alert_timer = new Audio('alert.mp3');
    alert_timer();
    
    // Test sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Add it to DOM
    console.log(random_letter);

};

