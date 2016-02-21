function getFlickrPhotostreamUrlsFromID(id, callback) {
    var baseFlickrUrl = "https://api.flickr.com/services/rest/?api_key=8f17dd5384153811b2b4333536bb3bbf&photoset_id=SET_ID&method=flickr.photosets.getphotos&format=json&nojsoncallback=1";
    var finalUrl = baseFlickrUrl.replace("SET_ID", id);
    $.get(
        finalUrl, {},
        function(data) {
            return callback(data);
        }
    );
}

function prepareForDisplay(data) {
    //ensure that photos are included
    if (!(data)) {
        console.log("No data", data);
        return;
    }
    if (!(data["photoset"])) {
        console.log("No 'photoset' key", data);
        return;
    }
    var photoset = data["photoset"];
    if (!(photoset["photo"])) {
        console.log("No 'photos' key", data);
        return;
    }
    var photos = photoset["photo"];
    if (photos.length < 1) {
        console.log("No photos in photo", data);
        return;
    } else {
        //get the photo urls
        // https://www.flickr.com/services/api/misc.urls.html
        var photoUrlArray = [];
        for (var i = 0; i < photos.length; i++) {
            var photoObj = photos[i];
            var basePhotoUrl = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_c.jpg"
            var farmId = photoObj["farm"];
            if (!farmId) {
                console.log("No farm id", data);
                continue;
            }
            var serverId = photoObj["server"];
            if (!serverId) {
                console.log("No server id", data);
                continue;
            }
            var photoId = photoObj["id"];
            if (!photoId) {
                console.log("No photo id", data);
                continue;
            }
            var secret = photoObj["secret"];
            if (!secret) {
                console.log("No secret", data);
                continue;
            } else {
                basePhotoUrl = basePhotoUrl.replace("{farm-id}", farmId);
                basePhotoUrl = basePhotoUrl.replace("{server-id}", serverId);
                basePhotoUrl = basePhotoUrl.replace("{id}", photoId);
                finalPhotoUrl = basePhotoUrl.replace("{secret}", secret);
                photoUrlArray.push(finalPhotoUrl);
            }

        }
        if (photoUrlArray.length > 0) {
            return displayImages(photoUrlArray);
        }
    }
}

//takes an array of string urls

function displayImages(images) {
    var baseImg = '<img src="IMAGE_URL" data-highres="HIGH_RES_URL">';
    var photoGallery = $("#photo-gallery")[0];
    for (var i = 0; i < images.length; i++) {
        var mediumImageUrl = baseImg.replace("IMAGE_URL", images[i]);
        // var highResImageUrl = images[i].replace("c.jpg", "b.jpg");
        var highResImageUrl = images[i].replace("c.jpg", "c.jpg");
        var finalString = mediumImageUrl.replace("HIGH_RES_URL", highResImageUrl);
        photoGallery.innerHTML += finalString;
    }
    initLightbox();
}


// 124455751%40N06


function loadGallery() {
    // https://api.flickr.com/services/rest/?api_key=8f17dd5384153811b2b4333536bb3bbf&format=json&photoset_id=72157645029976856&method=flickr.photosets.getphotos
    var id = "72157645029976856";
    $(document).ready(function() {
        getFlickrPhotostreamUrlsFromID(id, prepareForDisplay);
    })
};

function initLightbox() {
    $('.photoset-grid-lightbox').photosetGrid({
        highresLinks: true,
        rel: 'Leah-Plave-Gallery',
        gutter: '20px',

        onComplete: function() {
            $('.photoset-grid-lightbox').attr('style', '');
            $('.photoset-grid-lightbox a').colorbox({
                photo: true,
                scalePhotos: true,
                top: "5%",
                maxHeight: '90%',
                maxWidth: '90%'
            });
        }
    });
}

$(document).ready(function() {
    loadGallery()
});
