const { of, rejected, task } = require("folktale/concurrency/task");
const {Task} = require("folktale/concurrency");
const { Future } = require("fluture");
const fs = require("fs");
const { traverse, pipe, curry, curryN } = require("ramda");
const {List} = require('immutable-ext')
const {futurize} = require('futurize')

//! traverse's return has to be an applicative functor!

const future = futurize(Future); // or futurize(Task);
console.log(futurize, 'fut')
const pattern = {
  onRejected: e => console.log("err", e),
  onResolved: x => console.log('sucs', x)
};

const read = future(fs.readFile)

const files = ['config.json']

const httpGetMock = str =>
  task(({ resolve, reject }) => setTimeout(() => str === 'testerr' ? reject('i suck! bad') : resolve(str), 1000)); 
const res = read(files[0], "utf8",).fork(console.error, console.log);//.run().listen(pattern)

const f = List.of("/blog/1", "/blog/2").traverse(of, httpGetMock).run().listen(pattern)//console.error, console.log)
console.log(f)
const fa = traverse(of, httpGetMock, ['jack','testerr', 'joe']).run().listen(pattern)//console.error, console.log)

const program = pipe(
  Future.of,
  Future.finally(Future.of('All done!').map(console.log)),
  Future.fork(console.error, console.log)
);

program('Hello');
//> "All done!"
//> "Hello"

//? Traverse::
//TODO does === [Task] => Task([])
console.log(res, 'res')