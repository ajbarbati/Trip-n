


// Call Geocode
   //geocode();

   // Get location form
   var locationForm = document.getElementById('location-form');

   // Listen for submiot
   locationForm.addEventListener('submit', geocode);

   function geocode(e){
     // Prevent actual submit
     e.preventDefault();

     var location = document.getElementById('location-input').value;

     axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
       params:{
         address:location,
         key:'AIzaSyCAn30mAxfNp2pBfgw_z1VXoC3t5561YXc'
       }
     })
     .then(function(response){
       // Log full response
       console.log(response);

       // Formatted Address
       var formattedAddress = response.data.results[0].formatted_address;
       var formattedAddressOutput = `
         <ul class="list-group">
           <li class="list-group-item">${formattedAddress}</li>
         </ul>
       `;

       // Address Components
       var addressComponents = response.data.results[0].address_components;
       var addressComponentsOutput = '<ul class="list-group">';
       for(var i = 0;i < addressComponents.length;i++){
         addressComponentsOutput += `
           <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
         `;
       }
       addressComponentsOutput += '</ul>';

       // Geometry
       var lat = response.data.results[0].geometry.location.lat;
       var lng = response.data.results[0].geometry.location.lng;
       var geometryOutput = `
         <ul class="list-group">
           <li class="list-group-item"><strong>Latitude</strong>: ${lat}</li>
           <li class="list-group-item"><strong>Longitude</strong>: ${lng}</li>
         </ul>
       `;

       // Output to app
      // document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
      // document.getElementById('address-components').innerHTML = addressComponentsOutput;
      // document.getElementById('geometry').innerHTML = geometryOutput;
     })
     .catch(function(error){
       console.log(error);
     });
   }

















$(document).ready(function  () {

  
 $(".badge-primary").click(function(){
     console.log("clicked North America") ;
    initMap();
       
       var map;
      function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 38.929502, lng: -100.029292},
         zoom: 2      
      })
    }
  })

    $(".badge-warning").click(function(){
      console.log("clicked Africa") ;
     initMap();
        
       function initMap() {
         var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:6.800990,
            lng:23.315041},
          zoom: 2       
       })
     } 
    }); 
     
     $(".badge-light").click(function(){
      console.log("clicked Antarctica") ;
     initMap();
        
       function initMap() {
         var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:-79.787984,
            lng:45.122983},
          zoom: 2       
       })
     }
    });
     
     
     
     $(".badge-info").click(function(){
      console.log("clicked Australia") ;
     initMap();
        
       function initMap() {
         var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: { lat:-25.402951,
            lng:134.216170},
          zoom: 2
        })
     }
    });
     
     $(".badge-dark").click(function(){
      console.log("clicked Space") ;
     initMap();
       
       function initMap() {
         var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:0.000000,
            lng:0.000000},
          zoom: 2
        })
     } 
    });

     $(".badge-secondary").click(function(){
      console.log("clicked South America") ;
     initMap();
      
       function initMap() {
         var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:-16.167197,
            lng:-61.022916},
          zoom: 2
        })
     }
    });
     
     $(".badge-success").click(function(){
      console.log("clicked Europe") ;
     initMap();
       
       function initMap() {
         var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:48.893985,
            lng:18.395472},
          zoom: 2
       })
     }
    });

     
     $(".badge-danger").click(function(){
      console.log("clicked Asia") ;
     initMap();
       
       function initMap() {
         var map;
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:34.129995,
            lng:76.026514},
          zoom: 2
       
       })
     }
    });




});

// createPin: function (callback)  {
//     PDK.request('')
// 