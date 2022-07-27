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

function generate_letter() {
    
    // Retrive list of checked checkboxes
    var inputs = document.getElementsByTagName("input");
    var checked = [];
    var timer = 60;
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


    document.getElementById('print_test').innerHTML = `${checked} with timer of "${timer}"`;

    // Generate a random letter from selected list only
    let letters_available = checked
    let random_letter = letters_available[Math.floor(Math.random() * letters_available.length)]
    document.getElementById('letter_to_play').innerHTML = `=> ${random_letter}`;

    

    // Add it to DOM
    console.log(random_letter)


};