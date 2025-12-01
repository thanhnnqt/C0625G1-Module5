const numbersss = [1, 2, 3, 4, 5];
const event1 = numbersss.filter(function (num, index){
    return num % 2 === 0;
});
console.log(event1);