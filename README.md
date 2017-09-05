** [This issue](https://github.com/mucsi96/nightwatch-cucumber/issues/270) is already fixed as of v8.0.6 **

# nw-cucumber-not-exiting
nw-cucumber is not exiting after a failure when abortOnAssertionFailure is on

## Run

`nightwatch -c nightwatch-conf.js`

## Issue

Nighwatch does not exit properly. Browser and chromedriver still in execution, even thought an error ocurred.

### Timeout Error
![alt text](img/TimeoutError.png "Timeout Error")

### Element Not Found Error
![alt text](img/ElementNotFoundError.png "Timeout Error")

### Source code problem
![alt text](img/Problem.png "Source Code Problem")

## Describing the issue

Nightwatch produces exceptions that are not necessary catched by listening to Client ["error" & "complete"](https://github.com/mucsi96/nightwatch-cucumber/blob/master/lib/nightwatch-api.js#L264:L265) events.
That prevents the nightwatch api to ends gracefully (closing the selenium/chromedriver).
Examples of exceptions are:
- Socket exceptions, like: not able to create the screenshot
- Trivial exceptions that uses nightwatch/lib/core/assertion.js, like: 
```javascript
  // Given that we set the option abortOnAssertionFailure
  return this.api.element("xpath", `//div[@class='nonExistantClass']`, (result) => {
```

## Possible solution
Between [lines 302-303](https://github.com/mucsi96/nightwatch-cucumber/blob/master/lib/nightwatch-api.js#L302:L303) adding:
```javascript
self.client.get()._originalTerminate = self.client["@client"].terminate;
```
Substitute [line 115](https://github.com/mucsi96/nightwatch-cucumber/blob/master/lib/nightwatch-api.js#L115):
```javascript
// this.client.terminate()
this.client.get()._originalTerminate()
```
This way we ensure that `_closeSession` calls the right nightwatch terminate function.
