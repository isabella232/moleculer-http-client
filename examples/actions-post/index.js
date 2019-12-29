"use strict";

const { ServiceBroker } = require("moleculer");
const HTTPClientService = require("../../index");

// Create broker
let broker = new ServiceBroker({
  nodeID: "http-client"
});

// Create a service
broker.createService({
  name: "http",

  // Load HTTP Client Service
  mixins: [HTTPClientService],

  settings: {
    // Only load HTTP GET action
    httpClient: { includeMethods: ["post"] }
  }
});

// Start the broker
broker.start().then(() => {
  broker
    // Make a HTTP GET request
    .call("http.post", {
      url: "https://httpbin.org/post",
      opt: { responseType: "json" }
    })
    .then(res => broker.logger.info(res.body))
    .catch(error => broker.logger.error(error));
});