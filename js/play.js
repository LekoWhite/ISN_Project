let cards = [
    {id: 0, first_coords: [0, 0], second_coords: [0, 0], url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Jason_Momoa_by_Gage_Skidmore.jpg'},
    {id: 1, first_coords: [0, 0], second_coords: [0, 0], url: 'https://vignette.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/0/07/Daenerys_Targaryen.png/revision/latest?cb=20190419165904&path-prefix=fr'}
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