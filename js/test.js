var arr = [1,2,3,4];
console.log(
arr.map(function (val, i) {
    return val * 2;
}).reduce(function (pre, next) {
    return pre + next;
});
);

// console.log(mapping);