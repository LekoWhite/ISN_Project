let cards = [
<<<<<<< HEAD
  {id: 0, first_coords: [0, 0], second_coords: [0, 0], url: '../images/ram.jpg'}
    {id: 1, first_coords: [0, 0], second_coords: [0, 0], url: '../images/dany.png'}
    {id: 2, first_coords: [0, 0], second_coords: [0, 0], url: '../images/rin.jpeg'}
    {id: 3, first_coords: [0, 0], second_coords: [0, 0], url: '../images/violet.jpeg'}
    {id: 4, first_coords: [0, 0], second_coords: [0, 0], url: '../images/dustin.png'}
    {id: 5, first_coords: [0, 0], second_coords: [0, 0], url: '../images/grumpy_cat.jpg'}
    {id: 6, first_coords: [0, 0], second_coords: [0, 0], url: '../images/guts.jpg'}
    {id: 7, first_coords: [0, 0], second_coords: [0, 0], url: '../images/macron.jpg'}
    {id: 8, first_coords: [0, 0], second_coords: [0, 0], url: '../images/mirorin.jpg'}
    {id: 9, first_coords: [0, 0], second_coords: [0, 0], url: '../images/rem.jpg'}
    {id: 10, first_coords: [0, 0], second_coords: [0, 0], url: '../images/saber.jpg'}
    {id: 11, first_coords: [0, 0], second_coords: [0, 0], url: '../images/zero_two.jpg'}
    {id: 12, first_coords: [0, 0], second_coords: [0, 0], url: '../images/izuku.jpg'}
    {id: 13, first_coords: [0, 0], second_coords: [0, 0], url: '../images/arya.jpg'}
    {id: 14, first_coords: [0, 0], second_coords: [0, 0], url: '../images/goku.jpg'}
    {id: 15, first_coords: [0, 0], second_coords: [0, 0], url: '../images/america.jpg'}
];



let cardsPicked = new Array; // Array of ids of cards picked

let isPlaying = false;

let currentPage; // 0 = débutant, 1 = Normal, 2 = Expérimenté

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


$(document).ready( () => {
    console.log('jQuery loaded!');

    currentPage = checkCurrentPage();
    cardQuantity = getCardQuantity(currentPage);
    gridDimentions = getGridDimentions(currentPage);

    const start_button = $('#start');
    const pause_button = $('#pause');

    start_button.click( () => { 
        if (!isPlaying) {
            isPlaying = true;
            pickCards(cardQuantity / 2);
            console.log(cardsPicked);
            assignCoordinates();
        }
    });
});


function pickCards (cardQuantity) {
    let alreadyPickedNumbers = new Array;
    for (let i = 0; i < cardQuantity; i++){
        // Pick a card to put in the set
        let currentCard = Math.floor(Math.random() * 16);
        // Check if already picked
        for (alreadyPickedNumber of alreadyPickedNumbers){
            if (currentCard === alreadyPickedNumber){
                // If already picked, pick new number as long as we pick the same
                do{
                    currentCard = Math.floor(Math.random() * 16);
                } while (currentCard === alreadyPickedNumber);
            }
        }
        alreadyPickedNumbers.push(currentCard);
        cardsPicked[i] = currentCard;
    }
}


function assignCoordinates(){
    let pickedCoordinates = new Array;  // [x1, x2], [y1, y2], [x1, x2], [y1, y2]
    // Pick random coordinates and store them
    let xmax = gridDimentions[0];
    let ymax = gridDimentions[1];
}