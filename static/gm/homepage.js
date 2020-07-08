




//get the game list
$.ajax({
    url: "games",
    dataType: 'json',
    async: false,
    error: function(XMLHttpRequest, textStatus, errorThrown) { 
        console.log("error retrieving file");
    },
    success: function (data) {
        console.log(data);
        
        //generate results
        data.forEach(element => {
            console.log(element);
        var x = $(".template").clone();
        x.removeClass("template");
        x.find('.gameID').text(element.id);
        x.find('.gameName').text(element.name);


        x.insertAfter("#GamesList");
        
    });
  
    }
  });


  //open a game
  $( ".openGame" ).click(function() {
    console.log($(this).parent().parent().find(".gameID").text());
    var ids = $(this).parent().parent().find(".gameID").text()
    window.location.replace("game/" + ids);
    return false;
  });

  //archine a gamre
  $( ".archiveGame" ).click(function() {
    console.log();
    var link = "remGame/" + $(this).parent().parent().find(".gameID").text();

    $.post( link , function() {
        alert( "success" );
      })
      location.reload();
  });