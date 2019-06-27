/* een node js test file voor oefenen */

var promise = new Promise((resolve, reject) => {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
})

promise.then((result) => {
  console.log(result); // "Stuff worked!"
}, (err) => {
  console.log(err); // Error: "It broke"
});
