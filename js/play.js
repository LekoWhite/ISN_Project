let cards = [
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


let card_disposition = new Array;

let isPlaying = false;


$(document).ready( function () {
    console.log('jQuery loaded!');
    const start_button = $('#start');
    const pause_button = $('#pause');

    start_button.click( () => { 
        if (!isPlaying) {
            isPlaying = true;
            setCardDispositon(18);  //TODO: Trouver un moyen d'avoir le nombre de cartes correspondant à la page
            console.log(card_disposition);
        }
    });
});


function setCardDispositon (cardQuantity) {
    let alreadyPicked = new Array;
    for (let i = 0; i < cardQuantity/2; i++){
        // Pick a card to put in the set
        let currentCard = Math.floor(Math.random() * 16);
        // Check if already picked
        for (alreadyPickedNumber of alreadyPicked){
            if (alreadyPickedNumber === currentCard){
                
            }
        }
        alreadyPicked.push(currentCard);
        card_disposition[i] = currentCard;

    }

}