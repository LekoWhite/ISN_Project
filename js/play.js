let cards = [
  {id: 0, first_coords: [0, 0], second_coords: [0, 0], url: ''},
    {id: 1, first_coords: [0, 0], second_coords: [0, 0], url: '../images/dany.png'},
    {id: 2, first_coords: [0, 0], second_coords: [0, 0], url: '../images/rin.jpeg'},
    {id: 3, first_coords: [0, 0], second_coords: [0, 0], url: '../images/violet.jpeg'},
    {id: 4, first_coords: [0, 0], second_coords: [0, 0], url: '../images/dustin.png'},
    {id: 5, first_coords: [0, 0], second_coords: [0, 0], url: '../images/grumpy_cat.jpg'},
    {id: 6, first_coords: [0, 0], second_coords: [0, 0], url: '../images/guts.jpg'},
    {id: 7, first_coords: [0, 0], second_coords: [0, 0], url: '../images/macron.jpg'},
    {id: 8, first_coords: [0, 0], second_coords: [0, 0], url: '../images/mirorin.jpg'},
    {id: 9, first_coords: [0, 0], second_coords: [0, 0], url: '../images/rem_ram.jpg'},
    {id: 10, first_coords: [0, 0], second_coords: [0, 0], url: '../images/saber.jpg'},
    {id: 11, first_coords: [0, 0], second_coords: [0, 0], url: '../images/zero_two.jpg'},
    {id: 12, first_coords: [0, 0], second_coords: [0, 0], url: '../images/izuku.jpg'},
    {id: 13, first_coords: [0, 0], second_coords: [0, 0], url: '../images/'},
    {id: 14, first_coords: [0, 0], second_coords: [0, 0], url: '../images/'},
    {id: 15, first_coords: [0, 0], second_coords: [0, 0], url: '../images/'}
];

let cardsPicked = new Array; // Array of ids of cards picked

let isPlaying = false;


$(document).ready( function () {
    console.log('jQuery loaded!');
    const start_button = $('#start');
    const pause_button = $('#pause');

    start_button.click( () => { 
        if (!isPlaying) {
            isPlaying = true;
            setCardDispositon(18/2);  //TODO: Trouver un moyen d'avoir le nombre de cartes correspondant à la page
            console.log(cardsPicked);
        }
    });
});


function setCardDispositon (cardQuantity) {
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