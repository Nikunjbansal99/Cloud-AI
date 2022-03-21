'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = '<cognitiveservices.azure.com key>';
const endpoint = '<cognitiveservices.azure.com endpoint>';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);

function computerVision() {
  async.series([
    async function () {
                const describeURL = 'https://cvgrenald.blob.core.windows.net/image/pokemon_PNG93.png';
	        // Analyze URL image
                console.log('Analyzing URL image to describe...', describeURL.split('/').pop());
                const caption = (await computerVisionClient.describeImage(describeURL)).captions[0];
                console.log(`This may be ${caption.text} (${caption.confidence.toFixed(2)} confidence)`);
                
	        const categoryURLImage = 'https://cvgrenald.blob.core.windows.net/image/pokemon_PNG93.png';

                // Analyze URL image
                console.log('Analyzing category in image...', categoryURLImage.split('/').pop());
                const categories = (await computerVisionClient.analyzeImage(categoryURLImage)).categories;
                console.log(`Categories: ${formatCategories(categories)}`);

	        // Formats the image categories
                function formatCategories(categories) {
                categories.sort((a, b) => b.score - a.score);
                return categories.map(cat => `${cat.name} (${cat.score.toFixed(2)})`).join(', ');
                }
	        
	        
                },
    function () {
      return new Promise((resolve) => {
        resolve();
      })
    }
  ], (err) => {
    throw (err);
  });
}

computerVision();

