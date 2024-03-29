document.addEventListener('DOMContentLoaded', function() {
    // hide off, one and rules content at the beginning
    const online_content = document.querySelector('#online_content');
    online_content.style.display = 'none';
    const offline_content = document.querySelector('#offline_content');
    offline_content.style.display = 'none';
    const intro_block = document.getElementById('intro_block');
    const rules_content = document.querySelector('#rules_content');
    const form_game = document.getElementById("form_game");
    const game_confirmation = document.getElementById("game_confirmation");
    rules_content.style.display = 'none';
    const game_content = document.querySelector('#game_content');
    game_content.style.display = 'none';
    // Hide the whole Generate letter and offline forms to focus on relevant content
    const form_offline_game = document.getElementById('form_offline_game');
    form_offline_game.style.display = 'block';
    const form_generate_letter = document.getElementById('form_generate_letter');
    form_generate_letter.style.display = 'block';
    const game_data = document.getElementById('game_data');
    game_data.style.display = "none";
    const game_data_bot = document.getElementById('game_data_bot');
    game_data_bot.style.display = "none";
    const game_data_off = document.getElementById('game_data_off');
    game_data_off.style.display = "none";

    // Use buttons to toggle between views
    document.querySelector('#offline_button').addEventListener('click', offline_view);
    document.querySelector('#online_button').addEventListener('click', online_view);
    document.querySelector('#game_button').addEventListener('click', game_view);
    document.querySelector('#rules_button').addEventListener('click', rules_view);

    // Generate dynamically alphabet with pre-selected checkboxes
    const alphabet_js = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const alphabet_training = document.getElementById('alphabet');
    for (let i = 0; i < alphabet_js.length; i++) {    
        alphabet_training.innerHTML += `<button id="${alphabet_js[i]}_training" type="button" onclick="switch_color('${alphabet_js[i]}_training')" class="btn btn-outline-success">${alphabet_js[i]}</button> `;
    }
    // Generate alphabet for offline view
    const alphabet_generated_off = document.getElementById('alphabet_off');
    for (let i = 0; i < alphabet_js.length; i++) {    
        alphabet_generated_off.innerHTML += `<button id="${alphabet_js[i]}_off" type="button" onclick="switch_color('${alphabet_js[i]}_off')" class="btn btn-outline-success btn-lg">${alphabet_js[i]}</button> `;
    }
    // Generate alphabet for bot view
    const alphabet_generated_game = document.getElementById('alphabet_game');
    for (let i = 0; i < alphabet_js.length; i++) {    
        alphabet_generated_game.innerHTML += `<button id="${alphabet_js[i]}_game" type="button" onclick="switch_color('${alphabet_js[i]}_game')" class="btn btn-outline-info">${alphabet_js[i]}</button> `;
    }

    // Populate list of categories
    var categories = ["First name", "Song title", "Band", "Country", "Item in this room", 
    "Animal", "Profession", "Movie title", "Celebrity", 
    "Book title", "Serie title", "Five letter word"];

    // Shuffle the array of categories
    categories = categories.sort(() => Math.random() - 0.5);
    
    const length_categories = categories.length;
    
    // Populate training categories
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

    // Populate game categories
    const categories_game = document.getElementById('categories_game');
    for (let i = 0; i < length_categories; i++) {
        // Select (green) by default only the first 5 items, else unselected (red)
        if (i < 5) {
            categories_game.innerHTML += `<button id="${i}_game" type="button" onclick="switch_color('${i}_game')" class="btn btn-info mb-2">${categories[i]}</button> `;
        }
        else {
            categories_game.innerHTML += `<button id="${i}_game" type="button" onclick="switch_color('${i}_game')" class="btn btn-danger mb-2">${categories[i]}</button> `;
        }
    }

});

// Selecting or unselecting categories to play
function switch_color(this_button) {
    // Print Check 
    // console.log(`You want to change button ${this_button}`);
    var button_to_change = document.getElementById(`${this_button}`);
    // Categories for training
    // If button is selected, unselect it
    if (button_to_change.className == "btn btn-success mb-2") {
        button_to_change.className = "btn btn-dark mb-2";
    }
    
    // If button is unselected, select it
    else if (button_to_change.className == "btn btn-dark mb-2") {
        button_to_change.className = "btn btn-success mb-2";
    }

    // Categories for game
    // If button is selected, unselect it
    if (button_to_change.className == "btn btn-info mb-2") {
        button_to_change.className = "btn btn-danger mb-2";
    }
    
    // If button is unselected, select it
    else if (button_to_change.className == "btn btn-danger mb-2") {
        button_to_change.className = "btn btn-info mb-2";
    }

    // Same for letters
    else if (button_to_change.className == "btn btn-outline-success") {
        button_to_change.className = "btn btn-outline-dark";
    }
    else if (button_to_change.className == "btn btn-outline-dark") {
        button_to_change.className = "btn btn-outline-success";
    }

    // Adaptation for OFFline letters
    else if (button_to_change.className == "btn btn-outline-success btn-lg") {
        button_to_change.className = "btn btn-outline-dark btn-lg";
    }
    else if (button_to_change.className == "btn btn-outline-dark btn-lg") {
        button_to_change.className = "btn btn-outline-success btn-lg";
    }

    // Adaptation for online game letters
    else if (button_to_change.className == "btn btn-outline-info") {
        button_to_change.className = "btn btn-outline-danger";
    }
    else if (button_to_change.className == "btn btn-outline-danger") {
        button_to_change.className = "btn btn-outline-info";
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
    game_content.style.display = 'none';
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
    game_content.style.display = 'none';
    online_content.style.display = 'none';
    rules_content.style.display = 'none';
    form_offline_game.style.display = 'block';

};

function rules_view() {

    // Hide introduction block
    intro_block.style.display = 'none';

    // Show relevant content div
    online_content.style.display = 'none';
    game_content.style.display = 'none';
    offline_content.style.display = 'none';
    rules_content.style.display = 'block';

};

function game_view() {

    // Hide introduction block
    intro_block.style.display = 'none';

    // Show relevant content div
    online_content.style.display = 'none';
    offline_content.style.display = 'none';
    rules_content.style.display = 'none';
    game_content.style.display = 'block';
    game_data_bot.style.display = 'none';
    
    /// BOT CONTENT
    // Show form
    form_game.style.display = 'block';

    // Hide confirrmation request
    game_confirmation.style.display = 'none';

};

// Online training
async function generate_letter() {
    // Scrolling up by default so that the user sees the letter to play
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    // Clean up categories field if users restarts timer
    game_data.style.display = "block";
    const print_test = document.getElementById('print_test');
    print_test.innerHTML = "";
    const print_categories = document.getElementById('print_categories')
    print_categories.innerHTML = "";

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

    console.log(selected_letters);

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

    // Hide forms
    form_generate_letter.style.display = 'none';
    form_offline_game.style.display = 'none';

    // Print check
    // print_test.innerHTML = `<h3><i>PRINT CHECK: -> ${checked} with timer of "${timer}". 
    // LENGTH = ${checked_boxes}</i></h3>
    // CATEGORIES: ${categories_selected}`;

    // Print test length categories
    print_test.innerHTML = `Write your answers below for each one of the <b>${categories_selected.length}</b> categories:`;
    print_test.style.color = "black";

    // Print test categories
    print_categories.style.color = "black";

    // Create a form to submit the user´s answers
    for (let i = 0 ; i < categories_selected.length; i++) {
        print_categories.innerHTML += `<p id="field${[i+1]}">${[i+1]} - ${categories_selected[i]} : <input required name="${categories_selected[i]}" id="answer${[i+1]}" type="text"></input></p>`;
    }
    // back up FORM
    // print_categories.innerHTML += `<input id="submit_online_game" type="submit">`;
    // convert form into a JS trigger
    print_categories.innerHTML += `<button disabled type="button" id="submit_online_game" class="btn btn-success">Submit answers</button>`;
    
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
    for (let i = 1; i < all_menu_links_length; i++) {
        if (i == 1) {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = `<i>Timer must be finished or closed to switch view</i>`;
        } else {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = "";
        }
  
    }
    
    // Display the total amount of seconds the user wants to play
    for (let i = timer; i > 0; i--) {
        // Print Check
        //console.log(`Timer is ${timer}`);

        // Give the possibility to the users to stop the timer while it´s running
        const stop_timer = document.getElementById('stop_timer');
        stop_timer.innerHTML = `<button id="button_stop_timer" class="btn btn-warning">Stop timer</button>`;
        document.querySelector('#button_stop_timer').addEventListener('click', function () {i = 0});

        // Count amount of avialable fields
        // console.log(`Amount of fields: ${categories_selected.length}`);
        
        // TODO WIP Test count how many fields are filled
        let fields_filled = 0;
        for (let i = categories_selected.length; i > 0; i--) {
            let is_filled = document.getElementById(`answer${[i]}`);
            if (is_filled.value.length != 0) {
                fields_filled++;
            }
        }

        //console.log(`Amount of fields filled: ${fields_filled}`);
        
        // Whenever all fileds are filled, allow user to submit form
        if (fields_filled == categories_selected.length) {
            document.getElementById("submit_online_game").disabled = false;
        }
        // Else, avoid them to do so
        else {
            document.getElementById("submit_online_game").disabled = true;
        }

        document.querySelector('#submit_online_game').addEventListener('click', function () {i = 0});

        current_timer.innerHTML = `${timer}`;
        // call Sleep function for delay
        await sleep(1000);
        
        timer--;
    }

    // Loop over menu to reactivate each part
    const menu_items = ['Online game','Online training','Play offline', 'How to play'];
    for (let i = 1; i < all_menu_links_length; i++) {
        
            all_menu_links[i].className = "nav-link";
            all_menu_links[i].innerHTML = `${menu_items[i-1]}`;

    } 

    // Tell user that time is up and add button to start again
    current_timer.innerHTML = `Time is up!`;

    // Forbid user to submit online form after timer is stopped
    const submit_online_game = document.getElementById("submit_online_game");
    submit_online_game.style.display = 'none';

    // Create a counter for answers
    let counter_answers = 0;

    // Forbid user to complete form after timer is stopped
    for (let i = 0 ; i < categories_selected.length; i++) {
        var current_answer = document.getElementById(`answer${[i+1]}`);
        current_answer.disabled = true;
        current_answer.style.color = "grey";
        if (current_answer.value == "") {
            current_answer.value = 'Not answered';
        }
        // API Update Database only if there is any answer
        else {
            // Retrieve CSRF Token
            const csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value
            fetch('/update', {
                method: 'POST',
                body: JSON.stringify({
                    answer: current_answer.value,
                    letter: random_letter, 
                    category: current_answer.name
                }),
                headers: { "X-CSRFToken": csrftoken },
                credentials : "same-origin"
            })
            .then(response => response.json())
            .then(result => {
                  // Print result
                  console.log(result);
            });
            // Update answers counter
            counter_answers++;
            // TODO GIVE POSSIBILITTY TO DELETE ANSWERS
            var current_field = document.getElementById(`field${i+1}`);
            var current_input = document.getElementById(`answer${i+1}`);
            current_input.style.display = "none";
            current_field.innerHTML += `<i>Your answer was "${current_answer.value}"</i>  <button id="button${i+1}" type="button" onclick="delete_entry('${current_answer.value}', '${random_letter}' , '${current_answer.name}', 'button${i+1}')" class="btn btn-outline-warning">Delete this answer</button>`;
        }
    }

    // Hide stop timer button
    stop_timer.innerHTML = "";

    // Animation to show easily that time is up (background to black and texts to white, and back)
    document.body.style.backgroundColor = "black";
    letter_to_play.style.color = "white";
    current_timer.style.color = "white";
    print_categories.style.display = 'none';
    print_test.style.display = 'none';
    await sleep(500);
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
    // Check how many answers were given and percentage of right answers
    let percentage_of_answers = counter_answers / categories_selected.length * 100; 
    percentage_of_answers = parseFloat(percentage_of_answers.toFixed(2));

    // Show the user how well they answered
    print_test.innerText = `You answered ${percentage_of_answers}% of the questions.`;
    // Add a specific content depending on the % answered
    if (percentage_of_answers === 100) {
        print_test.innerHTML += `<p>That's perfect! Play against a bot and take the lead of the ranking!`
    }
    else if (percentage_of_answers === 0) {
        print_test.innerHTML += `<p>You can do it, keep practising!`
    }
    else if (0 < percentage_of_answers < 50) {
        print_test.innerHTML += `<p>Well done! Have you tried to play against a bot?`
    }
    else if (50 < percentage_of_answers < 100) {
        print_test.innerHTML += `<p>Impressive! Challenge a bot and try to win!`
    }

    // Put generate timer button back
    letter_generator.innerHTML = 'Generate a random letter and set timer';
    letter_generator.disabled = false;
    
    // Test sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Check Print letter
    // console.log(random_letter);

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

    console.log(selected_letters_off);

    // Retrieve timer
    timer_off = document.getElementById('timer_off');
    timer = timer_off.value;

    // Count the amount of checked boxes
    var amount_of_letters_off = selected_letters_off.length;

    // Cancel if amount of letters selected below 3
    if (amount_of_letters_off < 5) {
        alert(`Please select at least 5 letters`);
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

    // Loop over all of them adn disable them
    const all_menu_links_length = all_menu_links.length;
    for (let i = 1; i < all_menu_links_length; i++) {
        if (i == 1) {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = `<i>Timer must be finished or closed to switch view</i>`;
        } else {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = "";
        }
  
    }
    
    // Display the total amount of seconds the user wants to play
    for (let i = timer; i > 0; i--) {
        // Print Check 
        // console.log(`Timer is ${timer}`);

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
    menu_items = ['Play against bot','Online training','Play Offline', 'How to Play'];
    for (let i = 1; i < all_menu_links_length; i++) {
        
            all_menu_links[i].className = "nav-link";
            all_menu_links[i].innerHTML = `${menu_items[i-1]}`;

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
    await sleep(500);
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

    // Check Print letter
    // console.log(random_letter_off);

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

function delete_entry(entry, letter, category, button) {
    console.log(`You are deleting '${entry}' from the database (letter is '${letter}', category is '${category}')`);
    
    // TODO I want to GET that specific entry and delete it
    // FETCH
    // Retrieve CSRF Token
    const csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value
    fetch(`/delete/${letter}/${category}/${entry}`, {
        method: 'POST',
        body: JSON.stringify({
            letter: letter,
            category: category, 
            entry: entry
        }),
        headers: { "X-CSRFToken": csrftoken },
        credentials : "same-origin"
    })
    .then(response => response.json())
    .then(result => {
        // Print emails
        console.log(result);
    });

    // Delete "delete" button
    button_to_delete = document.getElementById(button);
    button_to_delete.innerHTML = 'Answer successfully deleted';
    button_to_delete.className = "btn btn-light";
    button_to_delete.disabled = true;

}

// Online Game (BOT)
async function online_game_bot() {
    // Declare counters for game and result:
    var counter_points_user = 0;
    var counter_points_bot = 0;
    var game_result = `<b>That's a draw</b>, try again!`;
    // Declare and set as empty the bot answers
    var game_summary = document.getElementById('game_summary');
    game_summary.innerHTML = '';
    game_summary.style.color = "blue";
    // Declare and set as empty the bot answers
    var bot_answers = document.getElementById('bot_answers');
    bot_answers.innerHTML = '';
    // Scrolling up by default so that the user sees the letter to play
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    
    // Shows game data to play against bot
    game_data_bot.style.display = 'block';
    const print_test_bot = document.getElementById('print_test_bot');
    print_test_bot.innerHTML = "";
    const print_categories_bot = document.getElementById('print_categories_bot')
    print_categories_bot.innerHTML = "";

    // Retrieve list of checked checkboxes
    var all_buttons = document.getElementsByTagName("button");
    var inputs = document.getElementsByTagName("input");
    var selected_letters_bot = [];
    var timer_bot;

    // Put timer to blue
    var current_timer_bot = document.getElementById('print_timer_bot');
    current_timer_bot.style.color = "blue";
    
    // Retrieve letters selected
    for (let i = 0; i < all_buttons.length; i++) {
        if (all_buttons[i].className == "btn btn-outline-info") {
            selected_letters_bot.push(all_buttons[i].innerHTML);
        } 
    }

    console.log(selected_letters_bot);

    // Retrieve timer
    timer_bot = document.getElementById('timer_game');
    timer_bot = timer_bot.value;

    // Count the amount of checked boxes
    var amount_of_letters_bot = selected_letters_bot.length;

    var categories_selected_bot = [];
    // Retrieve selected (BLUE) categories
    for (let i = 0; i < all_buttons.length; i++) {
        if (all_buttons[i].className == "btn btn-info mb-2") {
            categories_selected_bot.push(all_buttons[i].innerHTML);
        }
    }

    // Cancel if amount of categories selected is below 3 and letters selected below 3
    if (categories_selected_bot.length < 3 && amount_of_letters_bot < 5) {
        alert(`Please select at least 5 letters and 3 categories`);
        return false;
    } else if (amount_of_letters_bot < 5) {
        alert(`Please select at least 5 letters`);
        return false;
    }
    // Cancel if amount of categories selected is below 3
    else if (categories_selected_bot.length < 3) {
        alert(`Please select at least 3 categories`);
        return false;
    }

    // Hide forms
    form_generate_letter.style.display = 'none';
    form_offline_game.style.display = 'none';
    // Hide Form Game
    form_game.style.display = 'none';

    // Print test length categories
    print_test_bot.innerHTML = `Write your answers below for each one of the <b>${categories_selected_bot.length}</b> categories:`;
    print_test_bot.style.color = "black";

    // Print test categories
    print_categories_bot.style.color = "black";

    // Create a form to submit the user´s answers
    for (let i = 0 ; i < categories_selected_bot.length; i++) {
        print_categories_bot.innerHTML += `<p id="field_bot${[i+1]}">${[i+1]} - ${categories_selected_bot[i]} : <input required name="${categories_selected_bot[i]}" id="answer_bot${[i+1]}" type="text"></input></p>`;
    }
   
    // convert form into a JS trigger
    print_categories_bot.innerHTML += `<button disabled type="button" id="submit_online_game_bot" class="btn btn-success">Submit answers</button>`;
    
    // Lock Button in order to avoid having 2 timers running at the same time
    const game_game = document.getElementById("game_game");
    game_game.innerHTML = 'Wait until the end of the timer';
    game_game.disabled = true;

    // Generate a random letter from selected list only
    var random_letter_bot = selected_letters_bot[Math.floor(Math.random() * selected_letters_bot.length)];
    var letter_to_play_bot = document.getElementById('letter_to_play_bot');
    letter_to_play_bot.style.color = "blue";
    letter_to_play_bot.innerHTML = `${random_letter_bot}`;

    // "Freeze whole menu when timer is running"
    // Get all links in menu for further use
    const all_menu_links = document.getElementsByClassName("nav-link");

    // Loop over all of them adn disable them
    const all_menu_links_length = all_menu_links.length;
    for (let i = 1; i < all_menu_links_length; i++) {
        if (i == 1) {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = `<i>Timer must be finished or closed to switch view</i>`;
        } else {
            all_menu_links[i].className = "nav-link disabled";
            all_menu_links[i].innerHTML = "";
        }
  
    }
    
    // Display the total amount of seconds the user wants to play
    for (let i = timer_bot; i > 0; i--) {
        // Print Check
        //console.log(`Timer is ${timer}`);

        // Give the possibility to the users to stop the timer while it´s running
        const stop_timer_bot = document.getElementById('stop_timer_bot');
        stop_timer_bot.innerHTML = `<button id="button_stop_timer_bot" class="btn btn-warning">Stop timer</button>`;
        document.querySelector('#button_stop_timer_bot').addEventListener('click', function () {i = 0});

        // Count amount of available fields
        // console.log(`Amount of fields: ${categories_selected.length}`);
        
        // TODO WIP Test count how many fields are filled
        let fields_filled_bot = 0;
        for (let i = categories_selected_bot.length; i > 0; i--) {
            let is_filled_bot = document.getElementById(`answer_bot${[i]}`);
            if (is_filled_bot.value.length != 0) {
                fields_filled_bot++;
            }
        }

        //console.log(`Amount of fields filled: ${fields_filled}`);
        
        // Whenever all fileds are filled, allow user to submit form
        if (fields_filled_bot == categories_selected_bot.length) {
            document.getElementById("submit_online_game_bot").disabled = false;
        }
        // Else, avoid them to do so
        else {
            document.getElementById("submit_online_game_bot").disabled = true;
        }

        document.querySelector('#submit_online_game_bot').addEventListener('click', function () {i = 0});

        current_timer_bot.innerHTML = `${timer_bot}`;
        // call Sleep function for delay
        await sleep(1000);
        
        timer_bot--;
    }

    // Loop over menu to reactivate each part
    const menu_items = ['Online game','Online training','Play offline', 'How to play'];
    for (let i = 1; i < all_menu_links_length; i++) {
        
            all_menu_links[i].className = "nav-link";
            all_menu_links[i].innerHTML = `${menu_items[i-1]}`;

    } 

    // Tell user that time is up and add button to start again
    current_timer_bot.innerHTML = `Time is up!`;

    // Forbid user to submit online form after timer is stopped
    const submit_online_game_bot = document.getElementById("submit_online_game_bot");
    submit_online_game_bot.style.display = 'none';

    // Forbid user to complete form after timer is stopped
    for (let i = 0 ; i < categories_selected_bot.length; i++) {
        var current_answer_bot = document.getElementById(`answer_bot${[i+1]}`);
        current_answer_bot.disabled = true;
        current_answer_bot.style.color = "grey";
        // TEST LOG
        //console.log(`answer is "${current_answer_bot.value}"`)
        if (current_answer_bot.value == "") {
            current_answer_bot.value = 'Not answered';
        }
        // API Update Database only if there is any answer
        else {
            // Retrieve CSRF Token
            const csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value
            fetch('/update', {
                method: 'POST',
                body: JSON.stringify({
                    answer: current_answer_bot.value,
                    letter: random_letter_bot, 
                    category: current_answer_bot.name
                }),
                headers: { "X-CSRFToken": csrftoken },
                credentials : "same-origin"
            })
            .then(response => response.json())
            .then(result => {
                  // Print result
                  console.log(result);
            });
            
            // GIVE POSSIBILITTY TO DELETE ANSWERS
            var current_field = document.getElementById(`field_bot${i+1}`);
            var current_input = document.getElementById(`answer_bot${i+1}`);
            current_input.style.display = "none";
            // Update user's points
            counter_points_user++;
            current_field.innerHTML += `<i>Your answer was "${current_answer_bot.value}"</i>  <button id="button${i+1}" type="button" onclick="delete_entry('${current_answer_bot.value}', '${random_letter_bot}' , '${current_answer_bot.name}', 'button${i+1}')" class="btn btn-outline-warning">Delete this answer</button>`;

        }
        // TODO bot answer
        var current_field = document.getElementById(`field_bot${[i+1]}`);
        var current_cat = document.getElementById(`answer_bot${[i+1]}`)
        current_cat = current_cat.name;
        
        // var current_answer = document.getElementById(`answer${[i+1]}`);

    }

    // Display bot answers
    bot_answers.innerHTML += `<hr>`;
    bot_answers.innerHTML += '<b>Here is what the bot answered:</b><p>';
    // Loop over all answers
    for (let i = 0 ; i < categories_selected_bot.length; i++) {
        // Pick a bot answer from DB / pending (LETTER: ${random_letter_bot}
        // Retrieve category:
        var current_category = document.getElementById(`answer_bot${i+1}`);
        current_category = current_category.name
        
        // Field when no answer
        bot_answers.innerHTML += `<p id="bot_answered${[i+1]}">${[i+1]} - ${current_category}: <i>Not Answered</i></p>`
        // Retrieve a bot answer if ti exists
        fetch(`/retrieve/${random_letter_bot}/${current_category}`)
        .then(response => response.json())
        .then(result => {
        // Print emails
        console.log(result);
        // ... do something else with entries ...
        var to_modify = document.getElementById(`bot_answered${[i+1]}`);
        var category_updated = document.getElementById(`answer_bot${[i+1]}`);
        category_updated = category_updated.name;
        if (result.details === 'Not able to retrieve any bot answer')  {
            counter_points_bot = counter_points_bot;
            console.log("We didn't find any answer, so we don't update bot points!")
        }

        // HERE MODIFY DOM!
        else {
            // Add Bot answer if found and button to delete the entry if needed
            to_modify.innerHTML = `<p id="bot_answered${[i+1]}">${[i+1]} - ${category_updated}: "${result.details}" <button id="button_bot${i+1}" type="button" onclick="delete_entry('${result.details}', '${random_letter_bot}' , '${category_updated}', 'button_bot${i+1}')" class="btn btn-outline-warning">Delete this bot answer</button></p>`;
            // Update bot points
            counter_points_bot++;
        }});
        
    }

    // Hide stop timer button
    stop_timer_bot.innerHTML = "";

    // Animation to show easily that time is up (background to black and texts to white, and back)
    document.body.style.backgroundColor = "black";
    letter_to_play_bot.style.color = "white";
    current_timer_bot.style.color = "white";
    print_categories_bot.style.display = 'none';
    print_test_bot.style.display = 'none';
    print_test_bot.innerHTML = "Your answers were:"
    bot_answers.style.display = 'none';
    await sleep(500);
    document.body.style.backgroundColor = "white";
    letter_to_play_bot.style.color = "grey";
    current_timer_bot.style.color = "grey";
    print_categories_bot.style.color = "grey";
    print_categories_bot.style.display = 'block';
    print_test_bot.style.display = 'block';
    bot_answers.style.display = 'block';

    current_timer_bot.innerHTML += `<p><button onclick="online_game_bot()" class="btn btn-info mb-2 btn-lg">Play again</button>
    <button onclick="postgame_view_bot()" class="btn btn-light mb-2 btn-lg">Change data</button>`;

    // Clean up categories field if users restarts timer
    print_test_bot.style.color = "grey";

    // Put generate timer button back
    game_game.innerHTML = 'Play again against a bot!';
    game_game.disabled = false;
    
    // Test sleep function
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Check Print letter
    // console.log(random_letter);

    // Scrolling up again to show game results
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    // Update game result if victory or defeat
    // Create variable for "outcome" (DB format)
    var outcome = ''; 

    if (counter_points_user < counter_points_bot) {
        game_result = `<b>You lost</b> this game, try again!`;
        game_summary.style.color = "red";
        outcome = 'Defeat';
        // Console log Checks before udpate Botgame Model
        console.log(`User has scored '${counter_points_user}' out of '${categories_selected_bot.length}' point. Result is '${outcome}'`);
    }
    else if (counter_points_user > counter_points_bot) {
        game_result = `<b>You won</b>, congratulations!!`;
        game_summary.style.color = "green";
        outcome = 'Victory';
        // Console log Checks before udpate Botgame Model
        console.log(`User has scored '${counter_points_user}' out of '${categories_selected_bot.length}' point. Result is '${outcome}'`);
    }
    else {
        outcome = 'Draw';
        // Console log Checks before udpate Botgame Model
        console.log(`User has scored '${counter_points_user}' out of '${categories_selected_bot.length}' point. Result is '${outcome}'`);
    }


    // Fill in game summary
    game_summary.innerHTML = `Your score is "${counter_points_user}" and the Bot achieved "${counter_points_bot}".
    <p>${game_result}`;

    // Udpate DB with Post method
    // Retrieve CSRF Token
    const csrftoken = document.getElementsByName('csrfmiddlewaretoken')[0].value
    fetch(`/botgame/${outcome}/${counter_points_user}/${categories_selected_bot.length}`, {
        method: 'POST',
        body: JSON.stringify({
            outcome: outcome,
            counter_points_user: counter_points_user, 
            categories_selected_bot: categories_selected_bot.length
        }),
        headers: { "X-CSRFToken": csrftoken },
        credentials : "same-origin"
    })
    .then(response => response.json())
    .then(result => {
        // Print emails
        console.log(result);
    });

};

function postgame_view_bot () {
    // Clean up categories field if users want to change variables
    letter_to_play_bot.innerHTML = "";
    var current_timer_bot = document.getElementById('print_timer_bot');
    current_timer_bot.innerHTML = "";

    // Show again the form so the users can modify data
    form_game.style.display = 'block';

    // Hide sumamry
    game_data_bot.style.display = "none";
}