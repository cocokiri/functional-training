const folktale = require('folktale')
const {apply, chain} = require("folktale/fantasy-land");
const Maybe = require('folktale/maybe')
const {of} = require('folktale/maybe')
const {lift, liftN, traverse} = require('ramda')
const {List, Map} = require('immutable-ext')

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


const liftA2 = (f, fx, fy) => fx.map(f).ap(fy);
/*? new applicativeFn.apply(applicativeValue) method is the recommended way of using applicative functors now*/
const getScreenSize = (screen, head, footer) => screen - head.height - footer.height;
const $ = selector => ['header', 'footer'].includes(selector) ? Maybe.Just({height:15}) : Maybe.Nothing()

const getScreenSize_c = screen => header => footer =>
  screen - header.height - footer.height;

 

const imm = List.of(getScreenSize_c)
  .ap(List.of($("header")))
  .ap(List.of($("footer"))).fold();
  //? FINALLY I GOT IT. 9:35am Sunday in Cambridge bed.... ;>) 
const fantasyAp = apply(getScreenSize_c(800), $("header"), $("footer"));
const liftRam = lift(getScreenSize);
const resram = liftRam(Maybe.Just(800), $("header"), $("footer"));
 const withOf = of(getScreenSize_c(800))
   .ap($("header"))
   .ap($("footer"));
const safeDiv = n => d => (d === 0 ? Maybe.Nothing() : Maybe.Just(n / d));

  const traversed = traverse(of, safeDiv(10), [2,2,5])
  // const traversed2 = traverse(of, getScreenSize_c(800)($('header')), [$('footer')]);

const res3 = liftA2(getScreenSize_c(800), $('header'), $('footer'))
console.log(res3, 'res OF')
console.log(withOf, "with OF");
console.log(resram, "ramda lift");
console.log(imm, 'imm list');

console.log(traversed, "ramda traverse");


console.log(fantasyAp, apply,"with apply");



const res = $('header')
  .map(head => {
    console.log(head, 'head')
        return $('footer').map(footer => getScreenSize(800, head, footer))

  })
  // because we have a nesting?
// ==> 2
