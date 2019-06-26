

function searchPinterest() {
//    const searchTerm = "Haiwaii" 
   const pinterestAPI = "https://cors-anywhere.herokuapp.com/https://api.pinterest.com/v1/search/pins/?join=via_pinner,board,pinner&page_size=50&query=Red&access_token=AsaIpkQDLE1J0v5SO_-6sLCPqHYyFauaSAZjZTxF863V-2C9uAgXQDAAAb0HRfO9dLuAznMAAAAA"
    $.ajax({
        url: pinterestAPI,
        method: 'GET', 
    }).done(function  (response) {
        console.log(1231)
    })
}

searchPinterest()

// createPin: function (callback)  {
//     PDK.request('')
// }