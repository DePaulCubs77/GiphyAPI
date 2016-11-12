// Initial array of animals
var animals = ['cat', 'dog', 'bird', 'horse', 'fish'];



function renderButton() {
    $('#animalbuttons').empty();

    // Loop through animal array
    for (var i = 0; i < animals.length; i++) {
        var b = $('<button>');
        b.addClass('animal');
        b.attr('data-animal', animals[i]);
        b.text(animals[i]);
        $('#animalbuttons').append(b);
    }
}

renderButton();

// Create an on-click event
function clickOnAnimal() {
    $('.animal').on('click', function() {
        var animalGif = $(this).data('animal');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalGif + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

        .done(function(response) {
            var results = response.data;

            $('#gifsGoHere').empty();
            // Loop through the array
            for (var i = 0; i < results.length; i++) {
                var imgHolder = results[i].images.fixed_height.url;
                var pause = results[i].images.fixed_height_still.url;
                var animalImg = $('<img>');
                animalImg.attr('src', pause).attr('data-animate', imgHolder).attr('data-still', pause);
                animalImg.attr('data-state', 'still');
                $('#gifsGoHere').prepend(animalImg);
                animalImg.on('click', pausingGifs);

                var rating = results[i].rating;
                var rateText = $('<p class="p class"p-styles">').text("Rating: " + rating);
                $('#gifsGoHere').prepend(rateText);
            }
        });
    });
}

clickOnAnimal();

// Create a button acording to what user enters
$(document).on('click', '#addAnimal', function() {
    var animal = $('#animal-input').val().trim();
    animals.push(animal);
    renderButton();
    pausingGifs();
    return false;
});

// Pause animal gifs
function pausingGifs() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

}



