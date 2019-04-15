const { of, rejected, task } = require("folktale/concurrency/task");
const { traverse, pipe, curry, curryN } = require("ramda");
const { futurize } = require("futurize");

// ? Natural transformation (function(F(a)) => G(a))
// ? F a -> G a
// ? nt(F).map(f) === nt(F.map(f))