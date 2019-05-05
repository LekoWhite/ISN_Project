let cards = [
    {id: 0, first_coords: [0, 0], second_coords: [0, 0], url: '../images/ram.jpg'},
    {id: 1, first_coords: [0, 0], second_coords: [0, 0], url: '../images/dany.png'},
    {id: 2, first_coords: [0, 0], second_coords: [0, 0], url: '../images/rin.jpeg'},
    {id: 3, first_coords: [0, 0], second_coords: [0, 0], url: '../images/violet.jpeg'},
    {id: 4, first_coords: [0, 0], second_coords: [0, 0], url: '../images/dustin.png'},
    {id: 5, first_coords: [0, 0], second_coords: [0, 0], url: '../images/grumpy_cat.jpg'},
    {id: 6, first_coords: [0, 0], second_coords: [0, 0], url: '../images/guts.jpg'},
    {id: 7, first_coords: [0, 0], second_coords: [0, 0], url: '../images/macron.jpg'},
    {id: 8, first_coords: [0, 0], second_coords: [0, 0], url: '../images/mirorin.jpg'},
    {id: 9, first_coords: [0, 0], second_coords: [0, 0], url: '../images/rem.jpg'},
    {id: 10, first_coords: [0, 0], second_coords: [0, 0], url: '../images/saber.jpg'},
    {id: 11, first_coords: [0, 0], second_coords: [0, 0], url: '../images/zero_two.jpg'},
    {id: 12, first_coords: [0, 0], second_coords: [0, 0], url: '../images/izuku.jpg'},
    {id: 13, first_coords: [0, 0], second_coords: [0, 0], url: '../images/arya.jpg'},
    {id: 14, first_coords: [0, 0], second_coords: [0, 0], url: '../images/goku.jpg'},
    {id: 15, first_coords: [0, 0], second_coords: [0, 0], url: '../images/america.jpg'}
];



let cardsPicked = new Array; // Array of ids of cards picked

let isPlaying = false;

let cardQuantity;

let gridDimentions; // [xmax, ymax]


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
    if ( currentPage === 1){
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
    pickCards(cardQuantity / 2);
    console.log(cardsPicked);
    assignCoordinates();
}


$(document).ready( () => {
    console.log('jQuery loaded!');

    const currentPage = checkCurrentPage();
    cardQuantity = getCardQuantity(currentPage);
    gridDimentions = getGridDimentions(currentPage);

    const start_button = $('#start');
    const restart_button = $('#restart');

    start_button.click( () => { 
        if (!isPlaying) {
            isPlaying = true;
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
        let currentCard = Math.floor(Math.random() * 16);
        // Check if already picked
        for (let j = 0; j < alreadyPickedNumbers.length; j++){
            let alreadyPickedNumber = alreadyPickedNumbers[j]; 
            // If already picked, pick new number
            if (currentCard === alreadyPickedNumber){
                currentCard = Math.floor(Math.random() * 16);
                j = -1; // Since we choose a new number we need to check the prevous ones as well (-1 to compensate for the increment at the end of the loop)
            }
        }
        alreadyPickedNumbers.push(currentCard); // add picked numbers to the alreadyPicked numbers array
        cardsPicked[i] = currentCard;
    }
}


function assignCoordinates(){
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

    for (let i, j = 0; i < cards.length; i++){
        let card = cards[i];
        card.first_coords = pickedCoordinates[j];
        card.second_coords = pickedCoordinates[j+1];
        console.log(cards);
        j+=2;
    }
}

function isEqual(a1, a2){ //ONLY TAKES THE COORDINATE ARRAY
    if ((a1[0] === a2[0]) && (a1[1] === a2[1])){
        return true;
    }
    else{
        return false;
    }
}
