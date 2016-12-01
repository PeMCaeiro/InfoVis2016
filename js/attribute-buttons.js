//		Attribute Buttons

//	Global Variables

var maxGlobalAttr = 3;
var selectedGlobalAttr = new Array();


//	Aux Functions

function addGlobalAttr(attr){
	
	if(selectedGlobalAttr.length < maxGlobalAttr){
		selectedGlobalAttr.push(attr);
	}
	// if the selectedGlobalAttr array is "full", remove first ele and add this new ele at end
	else{
		selectedGlobalAttr.shift();
		selectedGlobalAttr.push(attr);
	}
}

function removeGlobalAttr(attr){
	var index = selectedGlobalAttr.indexOf(attr);
	selectedGlobalAttr.splice(index, 1);
	console.log("Spliced");
	console.log(selectedGlobalAttr);
}

function isGlobalAttrFull(){
	if(selectedGlobalAttr.length < maxGlobalAttr){
		return false;
	}
	else{
		return true;
	}
}

//	Drag and Drop

// Make draggable with revert to original position on drop
$('#selector button').draggable({cancel:false, revert:true});

// Chose what to do when LClicked
$('#selector button').click(function() {

	if ( $( this ).hasClass( "active" ) ) {

 		$(this).removeClass("active");
 		removeGlobalAttr( $(this).attr("value") );
 		update_graphs(year_range);

    }
    else{

    	if(isGlobalAttrFull() == false){
    		$(this).addClass("active");
    		addGlobalAttr( $(this).attr("value") );
    		update_graphs(year_range);
    	}

    }

    console.log("Clicked global button");
    console.log(selectedGlobalAttr);

    // TODO: insert whatever you want to do with $(this) here
});

//	Make divs with graphs droppable

// Bar Chart
$('#bar_chart').droppable( {
    drop: handleDropBarEvent
} );

//	Handlers from drop events

//Bar Chart
function handleDropBarEvent( event, ui ) {
	var draggable = ui.draggable;
	console.log( 'The attr button with value "' + draggable.attr('value') + '" was dropped onto Bar Chart!' );
	bar_chart.addRecentAttr(draggable.attr('value'));

	update_graphs(year_range);
}