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


let currentPage; // 0 = débutant, 1 = normal, 2 = expérimenté

let cardsPicked = new Array; // Array of ids of cards picked

let isPlaying = false;

let cardQuantity;

let gridDimentions; // [xmax, ymax]

let instructionsElement;
let scoreElement;

let gameState = 0; // 0 = No cards chosen, 1 = First card chosen, 2 = Second Card Chosen

let currentCardElement;
let currentCardId;

let currentCardElement2;
let currentCardId2;

let flipedCards = new Array(); // Fliped cards' ids

let score = 0;

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

function startGame() {
    isPlaying = true;
    score = 0; // Set or reset score
    scoreElement.text(0);
    flushCards(); // Flip current cards, set current cards to null, reset game state
    pickCards(cardQuantity / 2); // Pick unique card ids
    console.log(cardsPicked);
    assignCoordinates();
    let cardElements = $('.card');
    for (let i = 0; i < cardElements.length; i++){
        let cardElement = cardElements[i];
        cardElement.style.backgroundImage = ""; // Reset card's background image back to their back side
        cardElement.addEventListener('click', () => {
            // console.log(cardElement, i);
            // console.log('CLICKED');
            if ((cardElement != currentCardElement) && (cardElement != currentCardElement2) && !(flipedCards.includes(getCardId(i)))){
                cardClicked(cardElement, i);
            }
        });

    }    
}

function updateScore(){
    if( currentCardId === currentCardId2 ){
        instructionsElement.text('BRAVO! VOUS AVEZ GAGNÉ 100 POINTS !');
        score += 100;
        scoreElement.text(score);
        flipedCards.push(currentCardId);

        if( score === ((cardQuantity/2)*100) ){
            alert("Vous avez GAGNÉ!  Contemplez votre victoire!");
        }
    }
}

function cardClicked(cardElement, cardIndex){
    // Find the id associated with this card
    let id = getCardId(cardIndex);
    console.log(id);
    revealCard(cardElement, id);
    if ( gameState === 0 ){ 
        currentCardElement = cardElement;
        currentCardId = id;
        gameState = 1;
        instructionsElement.text('CHOISISSEZ UNE DEUXIEME CARTE ! (LA MEME, ON ESPERE !)');
    }
    else if ( gameState === 1 ){
        currentCardElement2 = cardElement;
        currentCardId2 = id;
        gameState = 2;
        instructionsElement.text('MEMORISE !');
        
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
    else if ( gameState === 2 ){
        instructionsElement.text('VOUS NE POUVEZ PAS CHOISIR UNE TROISIEME CARTE !');
        hideCard(cardElement);
    }
}

function flushCards(){
    instructionsElement.text('CHOISISSEZ UNE CARTE A RETOURNER !');

    if(currentCardElement && (currentCardId != currentCardId2)){
        hideCard(currentCardElement);
    }
    if(currentCardElement2 && (currentCardId != currentCardId2)){
        hideCard(currentCardElement2);
    }
    currentCardElement = null;
    currentCardElement2 = null;
    gameState = 0;
}

function revealCard(cardElement, cardId){
    // Set the background image (visually = turning the card)
    cardElement.style.backgroundImage = 'url(' + cards[cardId].url + ')';
}

function hideCard(cardElement){
    cardElement.style.backgroundImage = '';
}

function getCardId(cardIndex){
    let id;
    for (let i = 0; i < cardsPicked.length; i++){
        if ((cards[cardsPicked[i]].first_coords === cardIndex) || (cards[cardsPicked[i]].second_coords === cardIndex)){
            id = cardsPicked[i];
        }
    }
    return id;
}

$(document).ready( () => {
    console.log('jQuery loaded!');

    currentPage = checkCurrentPage();
    cardQuantity = getCardQuantity(currentPage);
    gridDimentions = getGridDimentions(currentPage);

    const start_button = $('#start');
    const restart_button = $('#restart');
    instructionsElement = $('#instructions');
    scoreElement = $('#score');

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

/* USELESS

function assignCoordinates(){
    for(card of cards){ // Reinitialise coordinates
        card.first_coords = [0, 0];
        card.second_coords = [0, 0];
    }

    let pickedCoordinates = new Array;  // [x1, x2], [y1, y2], [x1, x2], [y1, y2]
    // Pick random coordinates and store them
    let xmax = gridDimentions[0];
    let ymax = gridDimentions[1];

    let alreadyPickedCoordinates = new Array;
    for(let i = 0; i < cardQuantity; i++){
        let tempCoordinate = [Math.floor(Math.random() * xmax), Math.floor(Math.random() * ymax)];
        for (let j = 0; j < alreadyPickedCoordinates.length; j++){ // If already picked, pick new coordinates
            alreadyPickedCoordinate = alreadyPickedCoordinates[j];
            if(isEqual(tempCoordinate, alreadyPickedCoordinate)){
                tempCoordinate = [Math.floor(Math.random() * xmax), Math.floor(Math.random() * ymax)];
                j = -1; // Since we choose a new coordinate we need to check the prevous ones as well (-1 to compensate for the increment at the end of the loop)
            }
        }
        alreadyPickedCoordinates.push(tempCoordinate);
        pickedCoordinates.push(tempCoordinate);
    }
    console.log('PICKED COORDINATES :', pickedCoordinates);

    // -- Assign Coordinates to the card objects --
    {
        let j = 0;
        for (cardPicked of cardsPicked){
            cards[cardPicked].first_coords = pickedCoordinates[j];
            cards[cardPicked].second_coords = pickedCoordinates[j+1];
            j +=2;
        }
    }
    console.log(cards);
}


function isEqual(a1, a2){ //ONLY TAKES THE COORDINATE ARRAY
    if ((a1[0] === a2[0]) && (a1[1] === a2[1])){
        return true;
    }
    else{
        return false;
    }
}


*/


function assignCoordinates(){
    for(card of cards){ // Reinitialise coordinates
        card.first_coords = 0;
        card.second_coords = 0;
    }

    let pickedCoordinates = new Array;  // [x1, x2], [y1, y2], [x1, x2], [y1, y2]
    // Pick random coordinates and store them
    // let xmax = gridDimentions[0];
    // let ymax = gridDimentions[1];

    let alreadyPickedCoordinates = new Array;
    for(let i = 0; i < cardQuantity; i++){
        let tempCoordinate = Math.floor(Math.random() * cardQuantity);
        for (let j = 0; j < alreadyPickedCoordinates.length; j++){ // If already picked, pick new coordinates
            alreadyPickedCoordinate = alreadyPickedCoordinates[j];
            if( tempCoordinate === alreadyPickedCoordinate ){
                tempCoordinate = Math.floor(Math.random() * cardQuantity);
                j = -1; // Since we choose a new coordinate we need to check the prevous ones as well (-1 to compensate for the increment at the end of the loop)
            }
        }
        alreadyPickedCoordinates.push(tempCoordinate);
        pickedCoordinates.push(tempCoordinate);
    }
    console.log('PICKED COORDINATES :', pickedCoordinates);

    // -- Assign Coordinates to the card objects --
    {
        let j = 0;
        for (cardPicked of cardsPicked){
            cards[cardPicked].first_coords = pickedCoordinates[j];
            cards[cardPicked].second_coords = pickedCoordinates[j+1];
            j +=2;
        }
    }
    console.log(cards);
}