const commands = {
  nonExistantElement: function () {
    return this.api.element("xpath", `//div[@class='nonExistantClass']`, (result) => {
        if (result.error) {
          console.warn("With abortOnAssertionFailure set, the process should have been terminated.")
          throw "Element with nonExistantClass not found";
        }
    });
  }
}
module.exports = {
  url: 'http://yahoo.com',
  elements: {
    body: 'body',
    searchBar: 'input[name="p"]'
  },
  commands: [commands]
}
