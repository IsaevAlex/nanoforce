function myFunction() {
    var x = document.getElementById("myTopnav");
    var y = document.getElementById("first-section-content")
    if (x.className === "topnav") {
        x.className += " responsive";
        y.className += " first-section-responsive";
    } else {
        x.className = "topnav";
        y.className = "col-md-8";
    }
}


$(document).ready(function(){
    $("header").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });
});
