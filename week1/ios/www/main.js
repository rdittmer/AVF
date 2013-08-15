$('#instagram').on('pageinit', function(){
	//code needed for home page goes here
	console.log("instagram");
	document.addEventListener("deviceready", onDeviceReady, false);
                   $("#load-instagram").on( "click", onDeviceReady);
});	

function onDeviceReady() {
	console.log("ready");
	$("#load-instagram").on("click", instagramFn);	
};
var instagramFn = function() {
	//check for connection? load data?
	console.log("clicked");
	var url = "https://api.instagram.com/v1/tags/puppies/media/recent?callback=?&amp;client_id=46d6705d79664b4cb1a92a6f39481309;min_id=10";
	$.getJSON( url, function( data ){
		console.log( data );
              $.each(data.data, function( index, photo ){
                     var pic = "<li><img src='" + photo.images.standard_resolution.url + "' alt='" + photo.user.id
                     + "' /><h4>" + photo.user.full_name + ", <em>(" + photo.user.username + ")</em></h4></li>";
                     $( "#output" ).append( pic );
              });
	});
};