$(document).ready(function () {


function searchPinterest() {
//    const searchTerm = "Haiwaii" 
   const pinterestAPI = "https://api.pinterest.com/v1/me/pins/?access_token=" 

   const accessToken = "ArQOqsiDx9gPWDP2BqFPQQTZ4VetFaw4MSQaeaBF863V-2C9uAgXQDAAAb0HRfO9dLuAznMAAAAA"
   

  $.ajax({
      async: true,
      url: pinterestAPI + accessToken,
      method: "GET"
  }).then(function(response) {
    console.log(response)
    var settings = {
    "url": pinterestAPI + accessToken,
    "method": "GET",
    "timeout": 0,
  };
  $.ajax(settings).done(function (response) {
    console.log(response.data[24].url)

    $("#pinterest").append(response.data[24].url)
  })


}); //PostmanCode 
    
    // $.ajax({
    //     url: pinterestAPI,
    //     method: 'GET',
        
    // }).then(function  (response) {
    //     console.log(response)
    //     console.log('buts')
        
    //     // var pURL = response.data.url

    //     // $(pURL).appendTo('#pinterest')
    // })
}

searchPinterest()
})
// createPin: function (callback)  {
//     PDK.request('')
// }