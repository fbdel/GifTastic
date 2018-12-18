    var animals = ["cat", "dog", "cow"];

    
    function displayAnimalGif() {

      
      var animal = $(this).attr("data-name");
      var key = "&api_key=osMLmHYUkLojqTIhPQKShVkdZ37HnkAZ";
    //   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=osMLmHYUkLojqTIhPQKShVkdZ37HnkAZ";
      var troyqueryURL = `https://api.giphy.com/v1/gifs/search?q=${animal}${key}&limit=10`;
    //   console.log (queryURL);

      $.ajax({
        url: troyqueryURL,
        method: "GET"
      }).then(function(response) {
    
        $("#gifs-appear-here").empty();    

        console.log(response);


        var results = response.data;


        for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div class='animal'>");
            var p = $("<p>");
            var animalImage = $("<img>");
            var imageUrl=  results[i].images.fixed_height.url;
            var stillImage = results[i].images.fixed_height_still.url;

            animalImage.attr("src",stillImage);
            animalImage.attr("data-still",stillImage);
            animalImage.attr("data-animate",imageUrl);
            animalImage.attr("data-state","still");
            animalImage.attr("alt", "gif")

            animalDiv.append(p);
            animalDiv.append(animalImage);

            $("#gifs-appear-here").prepend(animalDiv);

            checkState();

        }

      });
    };

    function checkState(){
        $("img").on("click",function(){
            var state = $(this).attr('data-state');
            if ( state === 'still'){
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        })
    }
    






    function renderButtons() {

        $("#buttons-view").empty();
        for (var i = 0; i < animals.length; i++) {

          var a = $("<button type='button'>");
          a.addClass("animal-btn");
          a.attr("data-name", animals[i]);
          a.text(animals[i]);
          $("#buttons-view").append(a);
        }
      };

      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();

        animals.push(animal);

        renderButtons();
        return false;
      });


      $(document).on("click", ".animal-btn", displayAnimalGif);

      renderButtons();

