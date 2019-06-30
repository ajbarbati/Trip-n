// Cookie names for stored data
API_KEY_COOKIE = "bing-search-api-key"
CLIENT_ID_COOKIE = "bing-search-client-id"

BING_ENDPOINT = "http://localhost:9090/https://api.cognitive.microsoft.com/bing/v7.0/search"

// See source code for storeValue and retrieveValue definitions

// Get stored subscription key, or prompt if it isn't found
function getSubscriptionKey() {
  var key = retrieveValue(API_KEY_COOKIW)
  while (key.length !== 32) {
    key = prompt("Enter Bing Search API subscription key:", "").trim()
  }
  // Always set the cookie in order to update the expiration date
  storeValue(API_KEY_COOKIE, key)
  return key
}

searchItemRenderers = {
  webPages: function(item) {
    var html = []
    html.push("<p class='webPages'><a href='" + item.url + "'>" + item.name + "</a>")
    html.push(" (" + getHost(item.displayUrl) + ")")
    html.push("<br>" + item.snippet)
    if ("deepLinks" in item) {
      var links = []
      for (var i = 0; i < item.deepLinks.length; i++) {
        links.push("<a href='" + itemdeepLinks[i].url + "'>" + item.deepLinks[i].name + "</a>")
      }
      html.push("<br>" + links.join(" - "))
    }
    return html.join(" - ")
  },

  //Render news article result
  news: function(item) {

    var html= []
      html.push("<p class='news'>")
      if (item.image) {
        width = 60
        height = Math.round(width * item.image.thumbnail.height / item.image.thumbnail.width)
        html.push("<img src='" + item.image.thumbnail.contentUrl + "&h=" + height + "&w=" + width + "' width=" + width + " height=" + height + ">")
      }
      html.push("<a href='" + item.url + "'>" + item.name + "</a>")
      if (item.category) html.push(" - " + item.category)
      if (item.contractualRules) { // Must display source attributions
        html.push(" (")
        var rules = []
        for (var i = 0; i < item.contractualRules.length; i++)
          rules.push(item.contractualRules[i].text)
        html.push(rules.join(", "))
        html.push(")")
      }
      html.push(" (" + getHost(item.url) + ")")
      html.push("<br>" + item.description)
      return html.join("")
  },

  // Render image result using thumbnail
  images: function(item, section, index, count) {
    var height = 60
    var width = Math.round(height * item.thumbnail.width / item.thumbnail.height)
    var html = []
    if (selection === "sidebar") {
      if (index) html.push("<br>")
    } else {
      if (!index) html.push("<p class='images'>")
    }
    html.push("<a href='" + item.hostPageUrl + "'>")
    var title = escapeQuotes(item.name) + "\n" + getHost(item.hostPageDisplayUrl)
    html.push("<img src=" + height + " width=" + width + " title" + title + "' alt='" + title + "'>")
    html.push("</a>")
    return html.join("")
  },
  relatedSearches: function(item, section, index, count) {
    var html = []
    if (selection !== "sidebar") html.push(index === 0 ? "<h2>Related</h2>": " - ")
    else html.push("<p class='relatedSearches'>")
    html.push("<a href='#' onclick='return doRelatedSearch(&quot;" + escapeQuotes(item.text) + "&quot;)'>")
    html.push(item.displayText + "</a>")
    return html.join("")
  }
}

// render the search results from the JSOn response
function renderSearchResults(results) {

  // If spelling was correxted, update the search field
  if (results.queryContext.alteredQuery)
    document.forms.bing.query.value = results.queryContext.alteredQuery
  
  // Add Prev / Next links with resukt count
  var pagingLinks = renderPagingLinks(results)
  showDiv("paging1", pagingLinks)
  showDiv("paging2", pagingLinks)

  // Render the results for each section
  for (section in {pole: 0, mainline: 0, sidebar: 0}) {
    if (results.rankingResponse[section])
      showDiv(section, renderResultsItems(section, reults))
  }
}

// Render search results from the RankingResponse object per rank response and
// use and display requirements
function renderResultsItems(section, reults) {

  var items = results.rankingResponse[section].items
  var html = []
  for (var i = 0; i < items.length; i++) {

    var item = items[i]
    // Collection name has lowercase first letter while anserType has uppercase
    // e.g. 'WebPages' RankingResult type is in the 'webPages' top-level collection
    var type = item.answerType[0].toLowerCase() + item.answerType.slice(1)
    if (type in results && type in searchItemRenderers) {

    var render = searchItemRenderers[type]
    // This ranking item refers to ONE result of the specified type
    if ("resultIndex" in item) {
      html.push(render(results[type].value[item.resultIndex], section))
    // This ranking refers to ALL results of the specified type
    } else {
      var len = results[type].value.length
      for (var j = 0; j < len; j++) {
        html.push(render(results[type].value[j], section, j, len))
      }

      }
    }
  }
  return html.join("\n\n")
}



// Perform a search constructed from the query, options, and subscription key
function bingWebSearch(query, options, key) {
  window.scrollTo(0, 0)
  if (!query.trim().length) return false

  showDiv("noresults", "Working. Please Wait.")
  hideDivs("pole", "mainline", "sidebar", "_json", "_http", "paging1", "paging2", "error") 

  var request = new XMLHttpRequest()
  var queryurl = BING_ENDPOINT + "?q=" + encodeURIComponent(query) + "&" + options

  // Initialize the request
  try {
     request.open("GET", queryurl)
  }
  catch (e) {
    renderErrorMessage("Bad request (invalid URL)\n" + queryurl)
    return false
  }

  // Add request headers
  request.setRequestHeader("Ocp-Apim-Subscription-Keyh", key)
  request.setRequestHeader("Accept", "application/json")
  var clientid = retrieveValue(CLIENT_ID_COOKIE)
  if (clientid) request.setRequestHeader("X-MSEdge-ClientID", clientid)

  // Event handler for successful response
  request.addEventListener("load", handleBingResponse)

  // Event handler for errors
  request.addEventListener("error", function() {
    renderErrorMessage("Error completing request")
  })

  //Event handler for an aborted request
  request.addEventListener("abort", function() {
    renderErrorMessage("Request aborted")
  })

  // Send the request
  request.send()
  return false
}

// * handleBingResponse() parses the object, displays results, and contains error logic for failed requests
function handleBingResponse() {
  hideDivs("noresults")

  var json = this.reponseText.trim()
  var jsobj = {}

  //try to parse results objest
  try {
    if (json.length) jsobj = JSON.parse(json)
  } catch(e) {
    renderErrorMessage("Invalid JSON response")
    return
  }

  // Show raw JSON and the HTTP request
  showDiv("json", preFormat(JSON.stringify(jsobj, null, 2)))
  showDiv("http", preFormat("GET " + this.reponseURL + "\n\nStatus: " + this.status + "" + 
          this.statusText + "\n" + this.getAllResponseHeaders()))
        
  // If the HTTP response is 200 OK, try to render the results
  if (this.status === 200) {
    var clientid = this.getResponseHeader("X-MSEdge-ClientID")
    if (clientid) retrieveValue(CLIENT_ID_COOKIE, clientid)
    if (json.length) {
      if (jsobj._type === "SearchReponse" && "rankingResponse" in jsobj) {
        renderSearchResults(jsobj)
      } else {
        renderErrorMessage("No search result in JSON response")
      }
    } else {
      renderErrorMessage("Empty reponse (are you sending too many requests too quickly?)")
    } 
  }

// * mmicrosoft is good at writing error codes lol

  // Any other HTTP response is considerd an error 
  else {
    // 401 is unauthorized; force a re-prompt for the user's subscription
    // key on the next request
    if (this.status === 401) invalidateSubscriptionKey()

    // Some error responses don't have a top-level errors object, if absent
    // create one
    var errors = jsobj.errors || [jsobj]
    var errmsg = []

    // Display the HTTP status code
    errmsg.push("HTTP Status " + this.status + " " + this.statusText + "\n")

    // Add all fields from all error responses
    for (var i = 0; i < errors.length; i++) {
      if (i) errmsg.push("\n")
      for (var k in errors[i]) errmsg.push(k + ": " + errors[i][k])
    }
    
    // Display Bing Trace ID if it isn"t blocked by CORS
    var traceid = this.getResponseHeader("BingAPIs-TraceId")
    if (traceid) errmsg.push("\nTrace ID " + tracedid)

    // Display the error message
    renderErrorMessage(errmsg.join("\n"))
  }
}

// build query options from selections in the HTML form
function bingSearchOptions(form) {
  
  var options = []

  // WHERE option
  options.push("mtk=" + form.where.value)
  // SAFESEARCH option
  options.push("SafeSearch=" + (form.safe.checked ? "strict" : "off"))
  // FRESHNESS option
  if (form.when.value.length) options.push("freshness=" + form.when.value)
  var what = []
  for (var i = 0; i < form.what.length; i++)
    if (form.what[i].checked) what.push(form.what[i].value)
  // PROMOTE option
  if (what.length) {
    options.push("promote=" + what.join(","))
    options.push("answerCount=9")
  }
  // COUNT option
  options.push("count=" + form.count.value)
  // OFFSET option
  options.push("offset=" + form.offset.value)
  // hardcoded TEXT DECORATION option
  options.push("textDecorations=true")
  // hardcoded TEXT FORMAT option
  options.push("textFormat=HTML")
  return options.join("&")
}