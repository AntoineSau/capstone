document.addEventListener('DOMContentLoaded', function() {

    // hide off, onne and rules content at the beginning
    const online_content = document.querySelector('#online_content');
    online_content.style.display = 'none';
    const offline_content = document.querySelector('#offline_content');
    offline_content.style.display = 'none';
    const intro_block = document.getElementById('intro_block');
    const rules_content = document.querySelector('#rules_content');
    rules_content.style.display = 'none';
    // Hide the whole Generate letter and offline forms to focus on relevant content
    const form_offline_game = document.getElementById('form_offline_game');
    form_offline_game.style.display = 'block';
    const form_generate_letter = document.getElementById('form_generate_letter');
    form_generate_letter.style.display = 'block';
    const game_data = document.getElementById('game_data');
    game_data.style.display = "none";
    const game_data_off = document.getElementById('game_data_off');
    game_data_off.style.display = "none";

    // Use buttons to toggle between views
    document.querySelector('#offline_button').addEventListener('click', offline_view);
    document.querySelector('#online_button').addEventListener('click', online_view);

    // Generate dynamically alphabet with pre-selected checkboxes
    const alphabet_js = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const alphabet_generated = document.getElementById('alphabet');
    for (let i = 0; i < alphabet_js.length; i++) {    
        alphabet_generated.innerHTML += `<button id="${alphabet_js[i]}" type="button" onclick="switch_color('${alphabet_js[i]}')" class="btn btn-outline-success">${alphabet_js[i]}</button> `;
    }
    // offline view
    const alphabet_generated_off = document.getElementById('alphabet_off');
    for (let i = 0; i < alphabet_js.length; i++) {    
        alphabet_generated_off.innerHTML += `<button id="${alphabet_js[i]}_off" type="button" onclick="switch_color('${alphabet_js[i]}_off')" class="btn btn-outline-success btn-lg">${alphabet_js[i]}</button> `;
    }


    // Populate list of categories
    var categories = ["First Name", "Song title", "Band", "Country", "Item in this room", 
    "Animal", "Profession", "Movie Title", "Celebrity", 
    "Book title", "Serie title", "Five letter word"];

    // Shuffle the array of categories
    categories = categories.sort(() => Math.random() - 0.5);
    
    const length_categories = categories.length;
    const categories_html = document.getElementById('categories_web');
    for (let i = 0; i < length_categories; i++) {
        // Select (green) by default only the first 5 items, else unselected (red)
        if (i < 5) {
            categories_html.innerHTML += `<button id="${i}" type="button" onclick="switch_color(${i})" class="btn btn-success mb-2">${categories[i]}</button> `;
        }
        else {
            categories_html.innerHTML += `<button id="${i}" type="button" onclick="switch_color(${i})" class="btn btn-dark mb-2">${categories[i]}</button> `;
        }
    }

});

// Selecting or unselecting categories to play
function switch_color(this_button) {
    // Print Check 
    console.log(`You want to change button ${this_button}`);
    var button_to_change = document.getElementById(`${this_button}`);
    // If button is selected, unselect it
    if (button_to_change.className == "btn btn-success mb-2") {
        button_to_change.className = "btn btn-dark mb-2";
    }
    
    // If button is unselected, select it
    else if (button_to_change.className == "btn btn-dark mb-2") {
        button_to_change.className = "btn btn-success mb-2";
    }

    // Same for letters
    else if (button_to_change.className == "btn btn-outline-success") {
        button_to_change.className = "btn btn-outline-dark";
    }
    else if (button_to_change.className == "btn btn-outline-dark") {
        button_to_change.className = "btn btn-outline-success";
    }

    // Adaptation for OFFline leetrs
    else if (button_to_change.className == "btn btn-outline-success btn-lg") {
        button_to_change.className = "btn btn-outline-dark btn-lg";
    }
    else if (button_to_change.className == "btn btn-outline-dark btn-lg") {
        button_to_change.className = "btn btn-outline-success btn-lg";
    }

    // let cat = document.getElementById(this_button).innerHTML;
    // Print Check 
    // console.log(`You want to change ${cat}`);
}

function online_view() {

    // Hide introduction block
    intro_block.style.display = 'none';
    game_data.style.display = 'none';

    // Show relevant content div
    online_content.style.display = 'block';
    offline_content.style.display = 'none';
    rules_content.style.display = 'none';
    form_generate_letter.style.display = 'block';
    
    
};

function offline_view() {

    // Hide introduction block
    intro_block.style.display = 'none';
    game_data_off.style.display = 'none';
 
    // Show relevant content div
    offline_content.style.display = 'block';
    online_content.style.display = 'none';
    rules_content.style.display = 'none';
    form_offline_game.style.display = 'block';

};

function rules_view() {

    // Hide introduction block
    intro_block.style.display = 'none';

    // Show relevant content div
    online_content.style.display = 'none';
    offline_content.style.display = 'none';
    rules_content.style.display = 'block';

};

// BACK UP for online game
async function generate_letter() {
    
    // Clean up categories field if users restarts timer
    game_data.style.display = "block";
    const print_test = document.getElementById('print_test');
    print_test.innerHTML = "";
    const print_categories = document.getElementById('print_categories')
    print_categories.innerHTML = "";
    // Hide forms
    form_generate_letter.style.display = 'none';
    form_offline_game.style.display = 'none';

    // Retrieve list of checked checkboxes
    var all_buttons = document.getElementsByTagName("button");
    var inputs = document.getElementsByTagName("input");
    var selected_letters = [];
    var timer;

    // Put timer to blue
    var current_timer = document.getElementById('print_timer');
    current_timer.style.color = "blue";
    
    // Retrieve letters selected
    for (let i = 0; i < all_buttons.length; i++) {
        if (all_buttons[i].className == "btn btn-outline-success") {
            selected_letters.push(all_buttons[i].innerHTML);
        } 
    }

    // Retrieve timer
    timer_on = document.getElementById('timer_on');
    timer = timer_on.value;

    // Count the amount of checked boxes
    var amount_of_letters = selected_letters.length;

    var categories_selected = [];
    // Retrieve selected (GREEN) categories
    for (let i = 0; i < all_buttons.length; i++) {
        if (all_buttons[i].className == "btn btn-success mb-2") {
            categories_selected.push(all_buttons[i].innerHTML);
            //console.log(`CAT ${i}: ${categories_selected[i]} `);
        }
    }

    // Cancel if amount of categories selected is below 3 and letters selected below 3
    if (categories_selected.length < 3 && amount_of_letters < 5) {
        alert(`Please select at least 5 letters and 3 categories`);
        return false;
    } else if (amount_of_letters < 5) {
        alert(`Please select at least 5 letters`);
        return false;
    }
    // Cancel if amount of categories selected is below 3
    else if (categories_selected.length < 3) {
        alert(`Please select at least 3 categories`);
        return false;
    }

    // Print check
    // print_test.innerHTML = `<h3><i>PRINT CHECK: -> ${checked} with timer of "${timer}". 
    // LENGTH = ${checked_boxes}</i></h3>
    // CATEGORIES: ${categories_selected}`;

    // Print test length categories
    print_test.innerHTML = `Write your answers below for each one of the <b>${categories_selected.length}</b> categories:`;
    print_test.style.color = "black";

    // Print test categories
    print_categories.style.color = "black";

    // Create a form to submit the user´s answers TODO
    for (let i = 0 ; i < categories_selected.length; i++) {
        print_categories.innerHTML += `<p>${[i+1]} - ${categories_selected[i]} : <input name="${categories_selected[i]}" id="answer${[i+1]}" type="text"></input></p>`;
    }
    print_categories.innerHTML += `<input id="submit_online_game" type="submit">`;
    
    // Lock Button in order to avoid having 2 timers running at the same time
    const letter_generator = document.getElementById("letter_generator");
    letter_generator.innerHTML = 'Wait until the end of the timer';
    letter_generator.disabled = true;

    // Generate a random letter from selected list only
    var random_letter = selected_letters[Math.floor(Math.random() * selected_letters.length)];
    var letter_to_play = document.getElementById('letter_to_play');
    letter_to_play.style.color = "blue";
    letter_to_play.innerHTML = `${random_letter}`;

    // "Freeze whole menu when timer is running"
    // Get all links in menu for further use
    const all_menu_links = document.getElementsByClassName("nav-link");

    // Loop over all of them adn disable them
    const all_menu_links_length = all_menu_links.length;
    for (let i = 0; i < all_menu_links_length; i++) {
        if (i == 0) {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = `<i>Timer must be finished or closed to switch view</i>`;
        } else {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = "";
        }
  
    }
    
    // Display the total amount of seconds the user wants to play
    for (let i = timer; i > 0; i--) {
        console.log(`Timer is ${timer}`);

        // Give the possibility to the users to stop the timer while it´s running
        const stop_timer = document.getElementById('stop_timer');
        stop_timer.innerHTML = `<button id="button_stop_timer" class="btn btn-warning">Stop timer</button>`;
        document.querySelector('#button_stop_timer').addEventListener('click', function () {i = 0});

        current_timer.innerHTML = `${timer}`;
        // call Sleep function for delay
        await sleep(1000);
        
        timer--;
    }

    // Loop over menu to reactivate each part
    const menu_items = ['Play Online','Play Offline', 'How to Play'];
    for (let i = 0; i < all_menu_links_length; i++) {
        
            all_menu_links[i].className = "nav-link";
            all_menu_links[i].innerHTML = `${menu_items[i]}`;

    } 

    // Sound alert if user doesn´t look at screen
    //var alert_audio = new Audio('static/categories/Alert Categories project.mp3');
    //alert_audio.play();

    // Tell user that time is up and add button to start again
    current_timer.innerHTML = `Time is up!`;

    // Forbid user to submit online form after timer is stopped
    const submit_online_game = document.getElementById("submit_online_game");
    submit_online_game.disabled = true;
    submit_online_game.innerText = 'Time is up';

    // Forbid user to complete form after tiemr is stopped
    for (let i = 0 ; i < categories_selected.length; i++) {
        document.getElementById(`answer${[i+1]}`).disabled = true;
        document.getElementById(`answer${[i+1]}`).style.color = "grey";
    }

    // Hide stop timer button
    stop_timer.innerHTML = "";

    // Animation to show easily that time is up (background to black and texts to white, and back)
    document.body.style.backgroundColor = "black";
    letter_to_play.style.color = "white";
    current_timer.style.color = "white";
    print_categories.style.display = 'none';
    print_test.style.display = 'none';
    await sleep(1000);
    document.body.style.backgroundColor = "white";
    letter_to_play.style.color = "grey";
    current_timer.style.color = "grey";
    print_categories.style.color = "grey";
    print_categories.style.display = 'block';
    print_test.style.display = 'block';

    current_timer.innerHTML += `<p><button onclick="generate_letter()" class="btn btn-info mb-2 btn-lg">Play again</button>
    <button onclick="postgame_view()" class="btn btn-light mb-2 btn-lg">Change data</button>`;

    // Clean up categories field if users restarts timer
    print_test.style.color = "grey";
    print_test.innerText = "Your answers";

    // Put generate timer button back
    letter_generator.innerHTML = 'Generate a random letter and set timer';
    letter_generator.disabled = false;
    
    // Test sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Add it to DOM
    console.log(random_letter);

};

async function offline_game() {
    
    game_data_off.style.display = 'block';

    // Hide forms
    form_generate_letter.style.display = 'none';
    form_offline_game.style.display = 'none';

    // Retrieve list of checked checkboxes
    var all_buttons = document.getElementsByTagName("button");
    var inputs = document.getElementsByTagName("input");
    var selected_letters_off = [];
    // Put timer to blue
    var current_timer_off = document.getElementById('print_timer_off');
    current_timer_off.style.color = "blue";
    
    // Retrieve letters selected
    for (let i = 0; i < all_buttons.length; i++) {
        if (all_buttons[i].className == "btn btn-outline-success btn-lg") {
            selected_letters_off.push(all_buttons[i].innerHTML);
        } 
    }

    // Retrieve timer
    timer_off = document.getElementById('timer_off');
    timer = timer_off.value;

    // Count the amount of checked boxes
    var amount_of_letters_off = selected_letters_off.length;

    // Cancel if amount of letters selected below 3
    if (amount_of_letters_off < 5) {
        alert(`Please select at least 5 letters`);
        form_offline_game.style.display = 'block';
        return false;
    }
   
    // Print check
    // print_test.innerHTML = `<h3><i>PRINT CHECK: -> ${checked} with timer of "${timer}". 
    // LENGTH = ${checked_boxes}</i></h3>
    // CATEGORIES: ${categories_selected}`;

    // Hide form:
    form_offline_game.style.display = 'none';

    // Lock Button in order to avoid having 2 timers running at the same time
    const offline_generator = document.getElementById("offline_generator");
    offline_generator.innerHTML = 'Wait until the end of the timer';
    offline_generator.disabled = true;

    // Generate a random letter from selected list only
    var random_letter_off = selected_letters_off[Math.floor(Math.random() * selected_letters_off.length)];
    var letter_to_play_off = document.getElementById('letter_to_play_off');
    letter_to_play_off.style.color = "blue";
    letter_to_play_off.innerHTML = `${random_letter_off}`;

    // "Freeze whole menu when timer is running"
    // Get all links in menu for further use
    const all_menu_links = document.getElementsByClassName("nav-link");

    // Loop over all of them and disable them
    const all_menu_links_length = all_menu_links.length;
    for (let i = 0; i < all_menu_links_length; i++) {
        if (i == 0) {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = `<i>Timer must be finished or closed to switch view</i>`;
        } else {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = "";
        }
  
    }
    
    // Display the total amount of seconds the user wants to play
    for (let i = timer; i > 0; i--) {
        console.log(`Timer is ${timer}`);

        // Give the possibility to the users to stop the timer while it´s running
        const stop_timer_off = document.getElementById('stop_timer_off');
        stop_timer_off.innerHTML = `<button id="button_stop_timer_off" class="btn btn-warning">Stop timer</button>`;
        document.querySelector('#button_stop_timer_off').addEventListener('click', function () {i = 0});

        current_timer_off.innerHTML = `${timer}`;
        // call Sleep function for delay
        await sleep(1000);
        
        timer--;
    }

    // Loop over menu to reactivate each part
    const menu_items = ['Play Online','Play Offline', 'How to Play'];
    for (let i = 0; i < all_menu_links_length; i++) {
        
            all_menu_links[i].className = "nav-link";
            all_menu_links[i].innerHTML = `${menu_items[i]}`;

    } 

    // Sound alert if user doesn´t look at screen
    //var alert_audio = new Audio('static/categories/Alert Categories project.mp3');
    //alert_audio.play();

    // Tell user that time is up and add button to start again
    current_timer_off.innerHTML = `Time is up!`;
    // Hide forms
    form_generate_letter.style.display = 'none';
    form_offline_game.style.display = 'none';

    // Hide stop timer button
    stop_timer_off.innerHTML = "";

    // Animation to show easily that time is up (background to black and texts to white, and back)
    document.body.style.backgroundColor = "black";
    letter_to_play_off.style.color = "white";
    current_timer_off.style.color = "white";
    await sleep(1000);
    document.body.style.backgroundColor = "white";
    letter_to_play_off.style.color = "grey";
    current_timer_off.style.color = "grey";

    current_timer_off.innerHTML += `<p><button onclick="offline_game()" class="btn btn-info mb-2 btn-lg">Play again</button>
    <button onclick="postgame_view_off()" class="btn btn-light mb-2 btn-lg">Change data</button>`;

    // Put generate timer button back
    offline_generator.innerHTML = 'Generate a random letter and set timer';
    offline_generator.disabled = false;
    
    // Test sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Add it to DOM
    console.log(random_letter);

    // Give back possibility to switch mode
    change_to_online_mode.innerText = 'Play online';
    change_to_online_mode.href = 'javascript:online_view();';

};

function postgame_view () {
    // Clean up categories field if users want to change variables
    letter_to_play.innerHTML = "";
    var current_timer = document.getElementById('print_timer');
    current_timer.innerHTML = "";
    print_test.innerHTML = "";
    print_categories.innerHTML = "";

    // Show again the 'Generate letter' so the users can modify data
    form_generate_letter.style.display = 'block';

}

function postgame_view_off () {
    // Clean up categories field if users want to change variables
    letter_to_play_off.innerHTML = "";
    var current_timer_off = document.getElementById('print_timer_off');
    current_timer_off.innerHTML = "";

    // Show again the 'Generate letter' so the users can modify data
    form_offline_game.style.display = 'block';

}