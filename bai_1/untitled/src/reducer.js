var numbers1 = [1, 2, 3, 4];
var total = numbers1.reduce(function (sum, num) {
    return sum + num;
});
console.log(total);
