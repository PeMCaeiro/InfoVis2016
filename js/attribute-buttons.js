//	Attribute Buttons

//Make draggable with revert to original position on drop
$('#selector button').draggable({cancel:false, revert:true});

//Chose what to do when LClicked
$('#selector button').click(function() {

	if ( $( this ).hasClass( "active" ) ) {

 		$(this).removeClass("active");

    }else{

    	$(this).addClass("active");

    }

    // TODO: insert whatever you want to do with $(this) here
});