

function searchPinterest() {
//    const searchTerm = "Haiwaii" 
   const pinterestAPI = "https://cors-anywhere.herokuapp.com/https://api.pinterest.com/v1/pins/ajbarbati/Office-room/?access_token=AsaIpkQDLE1J0v5SO_-6sLCPqHYyFauaSAZjZTxF863V-2C9uAgXQDAAAb0HRfO9dLuAznMAAAAA"
    $.ajax({
        url: pinterestAPI,
        method: 'GET', 
    }).done(function  (response) {
        console.log(response.data.url)

        const pURL = response.data.url

        $("#pinterest").append(pURL)
    })
}

searchPinterest()

// createPin: function (callback)  {
//     PDK.request('')
// }