$(document).ready(function () {
  
  // this requires the these 2 npms i had to install
  const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
  const EntitySearchAPIClient = require('azure-cognitiveservices-entitysearch');

  let credentials = new CognitiveServicesCredentials('YOUR-ACCESS-KEY');
  let entitySearchApiClient = new EntitySearchAPIClient(credentials);




})
