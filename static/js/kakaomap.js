var mapSearchByAddress = function( map , targetId , geoInput , $name , $address){
var $name_val = $name.val().trim();
var $address_val = $address.val().trim();

if($name_val.length>10){
    $name_val = $name_val.slice(0,10) + "...";
}
   
var geocoder = new kakao.maps.services.Geocoder();

geocoder.addressSearch($address_val, function(result, status){


    if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);


        $(geoInput).val(
            result[0].x + ',' + result[0].y
        );
        var imageSrc = '/static/images/icon_pointer.png';
        var imageSize = new kakao.maps.Size(40, 46);

        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        var marker =  new kakao.maps.Marker({
            map, 
            position:coords, 
            image:markerImage
        });


        var infowindow = new kakao.maps.InfoWindow({
            content :'<div style="width:150px; text-align:center; padding:6px 2px; font-weight:bold;"> \
            '+$name_val+'\
        </div>'

        });

        infowindow.open(map, marker);
        
        map.setCenter(coords);

        $(targetId).css( 'visibility' , 'visible' );

    }else{
        alert('다시 검색해주세요');

        $(geoInput).$address_val('');
        $address_val.$address_val('');
        $(targetId).css('visibility', 'hidden');
    }

});
};