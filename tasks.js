const folktale = require('folktale')
// const Task = require('folktale/concurrency/task')
const {range} = require("rxjs");
const { map, filter, flatMap } = require("rxjs/operators");
const { of, rejected, task } = require("folktale/concurrency/task");
const fs = require('fs');
const {curry, curryN} = require('ramda')


const readFile = (filename) => task(({reject, resolve}) => fs.readFile(filename))

of(1)
  .run()
  .listen({
    onRejected: e => console.log("err", e),
    onResolved: x => console.log("success", x)
  });

rejected(1)
  .map(x => x + 1)
  .run()
  .listen({
    onRejected: e => console.log("err", e),
    onResolved: x => console.log("success", x)
  });

of(1)
  .map(x => x + 1)
  .chain(x => of(x + 1))
  .run()
  .listen({
    onRejected: e => console.log("err", e),
    onResolved: x => console.log("success", x)
  });

const launchMissiles = () =>
  task(resolver => {
    console.log("launch missiles!");
    // resolver.reject('aaaaahh')
    resolver.resolve("missile");
    // resolver.cleanup(() => {
    //   //
    // });
  });
const prom = t =>
  task(({reject, resolve}) =>
    setTimeout(() => {
      resolve(t + "ran th");
    }, 3000)
  );
const app = launchMissiles().map(x => x + "!");

app
  .map(x => x + "44")
  .chain(x => prom(x))
  .run()
  .listen({
    onRejected: e => console.log("erree", e),
    onResolved: x => console.log("successEE", x)
  });



const Box = x => ({
  map: f => Box(f(x)),
  then: f => f(x)
});


const DB = ({
    find: id => task(({reject, resolve}) => setTimeout(() => resolve("I'm here " + id), 100))
})

const inspecter = (...args) => args.reduce((acc, val) => acc + "::" + val, "")

console.log(curryN(3, inspecter)(8)(2,4), 'inspect')
const concurrentFind = of(curryN(2, inspecter)).ap(DB.find("aa")).ap(DB.find("bb")) 

concurrentFind.run().listen({
  onRejected: e => console.log("err", e),
  onResolved: x => console.log("success", x)
});

range(1, 5)
  .pipe(
    filter(x => x % 2 === 1),
    map(x => x + x),
    map(x => x / 10, Box(5))
  ).subscribe(x => console.log(x));