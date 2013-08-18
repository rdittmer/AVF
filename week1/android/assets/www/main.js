$('#instagram').on('pageinit', function(){
	//code needed for home page goes here
	console.log("instagram");
	document.addEventListener("deviceready", onDeviceReadyIn, false);
                   $("#load-instagram").on( "click", onDeviceReadyIn);
});	

$('#giantBomb').on('pageinit', function(){
                   //code needed for home page goes here
                   console.log("giantBomb");
                   document.addEventListener("deviceready", onDeviceReadyGi, false);
                   $("#load-giantBomb").on( "click", onDeviceReadyGi);
                   });

function onDeviceReadyIn() {
	console.log("readyIn");
	$("#load-instagram").on("click", instagramFn);	
};
var instagramFn = function() {
	//check for connection? load data?
	console.log("clickedIn");
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

function onDeviceReadyGi() {
	console.log("readyGi");
	$("#load-giantBomb").on("click", giantBombFn);
};
var giantBombFn = function() {
	//check for connection? load data?
	console.log("clickedGi");
    searchKey = "wolfenstein";
	//var url = "http://www.giantbomb.com/api/search/?api_key=d44babb3fe5c4dacb012372cea1bd2e17bcd1a62&format=json&query=" + searchKey + "&resources=game";
    $.ajax({
           url: "http://api.giantbomb.com/search/",
           dataType: "jsonp",
           jsonp: 'json_callback',
           data: {
           api_key: 'd44babb3fe5c4dacb012372cea1bd2e17bcd1a62',
           query: searchKey,
           format: 'jsonp',
           resources: 'game',
           field_list: 'name,image,site_detail_url'
           },
           success: function(data) {
           console.log(data);
           $.each( data.results, function( index, info ){
                  var link   = info.site_detail_url;
                  var result = "<li><img src='" + info.image.medium_url + "' /><h4>" + info.name + "</h4><a href='" + link + "' data-ajax='false'>" + info.site_detail_url + "</a></li><br><br>";
                  $( "#outputGB" ).append( result );
                  })
           }
           });
};