let cards = [
    {id: 0, first_coords: [0, 0], second_coords: [0, 0], url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Jason_Momoa_by_Gage_Skidmore.jpg'},
    {id: 1, first_coords: [0, 0], second_coords: [0, 0], url: 'https://vignette.wikia.nocookie.net/game-of-thrones-le-trone-de-fer/images/0/07/Daenerys_Targaryen.png/revision/latest?cb=20190419165904&path-prefix=fr'}
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