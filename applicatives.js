const folktale = require('folktale')
const {apply, chain} = require("folktale/fantasy-land");
const Result = require("folktale/result");
const {Ok, Error, of} = require('folktale/result');
const Maybe = require('folktale/maybe')


/* var x = doX(); doY() 
  would be equivalent to 
doX().chain((x) => doY()) 
if using the Monad implementation of those data structures. */

/*@param forall F, a, b:
  (F (a) => b, F a) => F b
where F is Apply
 */
function divide(x, y) {
  if (y === 0) {
    throw new Error("division by zero");
  } else {
    return x / y;
  }
}

/*? new applicativeFn.apply(applicativeValue) method is the recommended way of using applicative functors now*/


const getScreenSize = (screen, head, footer) => screen - head.height - footer.height;


const $ = selector => Result.try(() => ['header', 'footer'].includes(selector) ? {height:15} : undefined);

const safediv= Result.try(_ => divide(4, 2)); // ==> Result.Ok(2)
Result.try(_ => divide(4, 0)); // ==> Result.Error([Error: division by zero])
console.log(safediv, safediv.hasInstance(Result.Ok(2)), "safer")

//pattern == object == struct
const pattern = {
  Error: x => x.value + 1,
  Ok: x => x.value - 1
};

const getScreenSize_c = screen => header => footer =>
  screen - header.height - footer.height;

const res3 = of(getScreenSize_c(800), $('header'), $('footer'))
console.log(res3, 'res OF', apply, 'result apply')

const pattern2 = {
  Error: selector => ({ height: 10 }),
  Ok: selector => ({ height: 20 })
};
const matcher = $('schn').matchWith(pattern2)

const res = $('header')
  .map(head => {
    console.log(head, 'head')
        return $('footer').map(footer => getScreenSize(800, head, footer))

  })
  // because we have a nesting?

  console.log(matcher, "matcher ");

console.log(res, 'result map ')

const f = Result.Error(1).matchWith(pattern);
console.log(f, 'aaa f')
  console.log(Result, "Result type ");

// ==> 2
