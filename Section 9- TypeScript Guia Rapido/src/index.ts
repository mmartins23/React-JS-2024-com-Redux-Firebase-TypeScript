let student = "John";
let grade1 = Number("8");
let grade2 = Number("7");
let isApproved: boolean;

function average(num1:number, num2: number) {
     return (num1 + num2) / 7;
}

isApproved = average(grade1, grade2) > 7;