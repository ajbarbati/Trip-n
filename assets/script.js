$(document).ready(function () {


function searchPinterest() {
//    const searchTerm = "Haiwaii" 
   const pinterestAPI = "https://cors-anywhere.herokuapp.com/https://api.pinterest.com/v1/pins/ajbarbati/office-room/pins/?access_token=AjjywUkw8NjFan2xpaYaPsBtxnuQFawwLyNrmSJF863V-2C9uAgXQDAAAb0HRfO9dLuAznMAAAAA"
   
    $.ajax({
        url: pinterestAPI,
        method: 'GET'
    }).done(function  (response) {
        console.log(response)
        console.log('buts')
        
        // var pURL = response.data.url

        // $(pURL).appendTo('#pinterest')
    })
}

searchPinterest()
})
// createPin: function (callback)  {
//     PDK.request('')
// }