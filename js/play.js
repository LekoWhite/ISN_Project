// Stores the coordinates and the path to the image of each card. A card here represents two cards on the deck, that's why there's two coordinates.
let cards = [
    {first_coords: 0, second_coords: 0, url: 'images/ram.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/dany.png'},
    {first_coords: 0, second_coords: 0, url: 'images/rin.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/violet.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/dustin.png'},
    {first_coords: 0, second_coords: 0, url: 'images/grumpy_cat.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/guts.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/macron.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/mirorin.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/rem.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/saber.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/zero_two.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/izuku.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/arya.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/goku.jpg'},
    {first_coords: 0, second_coords: 0, url: 'images/america.jpg'}
];

// _____________________________________
// GLOBAL VARIABLES
// _____________________________________

let currentPage; // 0 = débutant, 1 = normal, 2 = expérimenté

let cardsPicked = new Array; // Array of ids of cards picked

let isPlaying = false; // Are we currently playing the game?

let cardQuantity; // Number of cards on the page

let gridDimentions; // [xmax, ymax]

let instructionsElement; // Instructions HTML Element
let scoreElement;               // Score HTML Element

let gameState = 0; // 0 = No cards chosen, 1 = First card chosen, 2 = Second Card Chosen

let currentCardElement; // HTML element of the first clicked card of the turn
let currentCardId;      // Card ID of the first clicked card of the turn

let currentCardElement2; // HTML element of the second clicked card of the turn
let currentCardId2;      // Card ID of the second clicked card of the turn

let flippedCards = new Array(); // IDs of the cards that have already been flipped (can't be flipped again)

let score = 0; // Current score




// _____________________________________
// SET OF FUNCTIONS THAT RETRN INFORMATION SPECIFIC TO THE PAGE WE'RE IN (SO WE CAN MAKE IT WORK IN ONE SCRIPT) (HARDCODED)
// _____________________________________

// Determines the page we are on; Returns: 0 = débutant, 1 = normal, 2 = expérimenté
function checkCurrentPage(){
    if (document.URL.includes('debutant')){
        return 0;
    }
    if (document.URL.includes('normal')){
        return 1;
    }
    if (document.URL.includes('experimente')){
        return 2;
    }
    else{
        window.alert('Erreur : Les noms des fichiers ont été changés et l\'url doit contenir "debutant" ou "normal" ou "experimente" .')
    }
}

//  Returns the number of cards on the current page
function getCardQuantity(currentPage){
    if( currentPage === 0 ){
        return 18;
    }
    if ( currentPage === 1 ){
        return 20;
    }
    if ( currentPage === 2 ){
        return 32;
    }
}

// Returns the dimentions of the card's arrangement; [x, y]
function getGridDimentions(currentPage){
    if( currentPage === 0 ){
        return [6, 3];
    }
    if( currentPage === 1 ){
        return [5, 4];
    }
    if( currentPage === 2 ){
        return [8, 4];
    }
}
// _____________________________________




// _____________________________________
// MAIN FUNCTIONS OF THE GAME
// _____________________________________

// Gets triggered when one of the buttons is clicked
function startGame() {
    isPlaying = true;
    score = 0; // Set or reset score
    scoreElement.text(0);
    flushCards(); // Flip current cards, set current cards to null, reset game state
    pickCards(cardQuantity / 2); // Pick unique card ids
    assignCoordinates(); // Choose random coordinates for each of the picked cards
    let cardElements = $('.card'); // Get the .card HTML Elements
    for (let i = 0; i < cardElements.length; i++){ // Iterate through those .card Elements, and add a click event listener to each one of them
        let cardElement = cardElements[i];
        cardElement.style.backgroundImage = ""; // Reset card's background image back to their back side
        cardElement.addEventListener('click', () => {
            // The click event only calls cardClicked if The card clicked was not already clicked on, or already found
            if ((cardElement != currentCardElement) && (cardElement != currentCardElement2) && !(flippedCards.includes(getCardId(i)))){
                cardClicked(cardElement, i);
            }
        });
        
    }    
}

// Gets triggerd when one of the cards is clicked
function cardClicked(cardElement, cardIndex){
    // Find the id associated with this card
    let id = getCardId(cardIndex);
    // Visually turn the card
    revealCard(cardElement, id);
    // If no card has been flipped
    if ( gameState === 0 ){ 
        // Make the clicked card the first current card
        currentCardElement = cardElement;
        currentCardId = id;
        gameState = 1;
        instructionsElement.text('CHOISISSEZ UNE DEUXIEME CARTE ! (LA MEME, ON ESPERE !)');
    }
    // If it's the second card that's being clicked on
    else if ( gameState === 1 ){
        // Make the clicked card the second current card
        currentCardElement2 = cardElement;
        currentCardId2 = id;
        gameState = 2;
        instructionsElement.text('MEMORISE !');
        
        // Return the cards after the correct time (different for each difficulty)
        if( currentPage === 0 ){
            setTimeout(flushCards, 2000);
            updateScore();
        }
        if( currentPage === 1 ){
            setTimeout(flushCards, 1000);
            updateScore();
        }
        if( currentPage === 2 ){
            setTimeout(flushCards, 500);
            updateScore();
        }
    }
    // Durning the "Memorise" timelap
    else if ( gameState === 2 ){
        instructionsElement.text('VOUS NE POUVEZ PAS CHOISIR UNE TROISIEME CARTE !');
        hideCard(cardElement); // Rehide the clicked card
    }
}

// Gets triggerd on document load. It's where the HTML Elements are fetched and the click triggers of the buttons are setup.
$(document).ready( () => {
    console.log('jQuery loaded!');

    // Set the global variables according to the current page.
    currentPage = checkCurrentPage();
    cardQuantity = getCardQuantity(currentPage);
    gridDimentions = getGridDimentions(currentPage);

    // Get all the HTMl Elements
    // Global variable because it needs to be changed regularly
    instructionsElement = $('#instructions');
    scoreElement = $('#score');
    // The two start buttons
    const start_button = $('#start');
    const restart_button = $('#restart');

    // Call the startGame() function
    start_button.click( () => { 
        if (!isPlaying) {
            startGame();
        }
        else{
            alert('Vous êtes déjà en jeu!');
        }
    });

    restart_button.click(startGame);
});

// _____________________________________




// _____________________________________
// SECONDARY AND USEFUL FUNCTIONS
// _____________________________________

// Update the score at the end of each turn
function updateScore(){
    // Add 100 points if the cards' IDs match
    if( currentCardId === currentCardId2 ){
        instructionsElement.text('BRAVO! VOUS AVEZ GAGNÉ 100 POINTS !');
        score += 100;
        scoreElement.text(score);
        flippedCards.push(currentCardId);

        if( score === ((cardQuantity/2)*100) ){
            alert("Vous avez GAGNÉ!  Contemplez votre victoire!");
        }
    }
}

// Flip the cards back, come back to the initial state of the turn
function flushCards(){
    instructionsElement.text('CHOISISSEZ UNE CARTE A RETOURNER !');

    // If the elements are already set and the cards are not the same (because if they are we keep them flipped)
    if(currentCardElement && (currentCardId != currentCardId2)){
        hideCard(currentCardElement);
    }
    if(currentCardElement2 && (currentCardId != currentCardId2)){
        hideCard(currentCardElement2);
    }
    // Remove the current cards
    currentCardElement = null;
    currentCardElement2 = null;
    gameState = 0; 
}

// Visually reveal the card
function revealCard(cardElement, cardId){
    // Set the background image (visually = turning the card)
    cardElement.style.backgroundImage = 'url(' + cards[cardId].url + ')';
}

// Visually hide the card
function hideCard(cardElement){
    cardElement.style.backgroundImage = '';
}

// Get the card id thanks to her position in the HTML
function getCardId(cardIndex){
    let id;
    for (let i = 0; i < cardsPicked.length; i++){
        if ((cards[cardsPicked[i]].first_coords === cardIndex) || (cards[cardsPicked[i]].second_coords === cardIndex)){
            id = cardsPicked[i];
        }
    }
    return id;
}

// _____________________________________




// _____________________________________
// FUNCTIONS TO PICK NUMBERS AND COORDINATES (get called at each startGame() )
// _____________________________________

// Pick random card IDs
function pickCards (cardQuantity) {
    let alreadyPickedNumbers = new Array;
    for (let i = 0; i < cardQuantity; i++){
        // Pick a card to put in the set
        let currentCard = Math.floor(Math.random() * cards.length);
        // Check if already picked
        for (let j = 0; j < alreadyPickedNumbers.length; j++){
            let alreadyPickedNumber = alreadyPickedNumbers[j]; 
            // If already picked, pick new number
            if ( currentCard === alreadyPickedNumber ){
                currentCard = Math.floor(Math.random() * cards.length);
                j = -1; // Since we choose a new number we need to check the prevous ones as well (-1 to compensate for the increment at the end of the loop)
            }
        }
        alreadyPickedNumbers.push(currentCard); // add picked numbers to the alreadyPicked numbers array
        cardsPicked[i] = currentCard;
    }
}

// Pick and assign random coordinates for each cards 
function assignCoordinates(){
    for(card of cards){ // Reinitialise coordinates
        card.first_coords = 0;
        card.second_coords = 0;
    }

    let pickedCoordinates = new Array;
    
    // Pick random coordinates and store them
    for(let i = 0; i < cardQuantity; i++){
        let tempCoordinate = Math.floor(Math.random() * cardQuantity);
        for (let j = 0; j < pickedCoordinates.length; j++){ // If already picked, pick new coordinates
            pickedCoordinate = pickedCoordinates[j];
            if( tempCoordinate === pickedCoordinate ){
                tempCoordinate = Math.floor(Math.random() * cardQuantity);
                j = -1; // Since we choose a new coordinate we need to check the prevous ones as well (-1 to compensate for the increment at the end of the loop)
            }
        }
        pickedCoordinates.push(tempCoordinate); // Add the coordinate that was not already picked to the list of picked coordinates
    }

    // -- Assign Coordinates to the card objects --
    {
        let j = 0;
        for (cardPicked of cardsPicked){
            cards[cardPicked].first_coords = pickedCoordinates[j];
            cards[cardPicked].second_coords = pickedCoordinates[j+1];
            j +=2;
        }
    }
}