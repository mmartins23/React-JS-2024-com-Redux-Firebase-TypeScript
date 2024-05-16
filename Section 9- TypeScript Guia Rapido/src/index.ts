let student = "John";
let grade1 = Number("8");
let grade2 = Number("7");
let isApproved: boolean;

function average(num1: number, num2: number) {
    return (num1 + num2) / 7;
}

isApproved = average(grade1, grade2) > 7;


// Arrays
const grades = ["7", "9", "8", "7", "6"];

function finalGrade(grades: string[]) {
    let sum = 0;
    grades.forEach(grade => sum += parseFloat(grade));
    return sum / grades.length;
}

console.log(finalGrade(grades));