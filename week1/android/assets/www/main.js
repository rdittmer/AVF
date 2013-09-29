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
//camera
$( "#cameraDemo" ).on( 'pageinit', function(){
        document.addEventListener("deviceready",onDeviceReadyCam,false);            
                      $("#load-camera").on("click", getCam);
});

var onDeviceReadyCam = function() {
    
};

var getCam = function() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccess(imageURI) {
    var myImage = document.getElementById('myImage');
    myImage.style.display = "block";
    myImage.src = imageURI;
    //var camOut = "<li><img src='" + myImage.src + "'/><p>Test</p></li>";
    //$( "#cameraOut" ).append( camOut );
}

function onFail(message) {
    //showAlert(message);
    alert('Failed because: ' + message);
}

function showAlert(message){
    navigator.notification.alert("no", alertDismissed, "Alert", "OK");
}

/*var onDeviceReadyCam = function() {
    var source = navigator.camera.PictureSourceType;
    var destinationType = navigator.camera.DestinationType;
};

$( "#load-camera" ).on( "click", function() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI })
});

function onSuccess(imageURI) {
    var camPic = document.getElementById( 'pic' );
    image.src = imageURI;
    var camOut = "<li><img src='camPic'/></li>";
    $( "#cameraOut" ).append( camOut );
};

function onFail(message) {
    navigator.notification.alert( "Could not get image", alertCallback, [title], [buttonName]);
};*/

//compass
$( "#compassDemo" ).on( 'pageinit', function(){
                       document.addEventListener("deviceready",onDeviceReadyComp,false);
                       });

var watchID = null;

function onDeviceReadyComp(){
    startWatch();
}

function startWatch() {
    var options = { frequency: 3000 };
    watchID = navigator.compass.watchHeading( onSuccessComp, onErrorComp, options );
}

function stopWatch() {
    if (watchID) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
    }
}

function onSuccessComp(heading) {
    var north = document.getElementById( "north" );
    var east  = document.getElementById( "east" );
    var south = document.getElementById( "south" );
    var west  = document.getElementById( "west" );
    if (heading.magneticHeading > 316.99 || heading.magneticHeading < 45.99)
        {
        north.style.display = "block";
        east.style.display  = "none";
        south.style.display = "none";
        west.style.display  = "none";
        }
    else if (heading.magneticHeading > 46.99 && heading.magneticHeading < 135.99)
        {
        north.style.display = "none";
        east.style.display  = "block";
        south.style.display = "none";
        west.style.display  = "none";
        }
    else if (heading.magneticHeading > 136.99 && heading.magneticHeading < 225.99)
        {
        north.style.display = "none";
        east.style.display  = "none";
        south.style.display = "block";
        west.style.display  = "none";
        }
    else if (heading.magneticHeading > 226 && heading.magneticHeading < 315)
        {
        north.style.display = "none";
        east.style.display  = "none";
        south.style.display = "none";
        west.style.display  = "block";
        }
}

function onErrorComp() {
    alert( 'onError!' );
}

//inappBrowser
$( "#browserDemo" ).on( 'pageinit', function(){
                       document.addEventListener("deviceready", onDeviceReadyBrowse, false);
                       });

// device APIs are available
//
function onDeviceReadyBrowse() {
    var ref = window.open('http://apache.org', '_blank', 'location=yes');
    ref.addEventListener('loadstart', function(event) { alert('start: ' + event.url); });
    ref.addEventListener('loadstop', function(event) { alert('stop: ' + event.url); });
    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    ref.addEventListener('exit', function(event) { alert(event.type); });
}


