const fs = require("fs");

const lines = fs.readFileSync("DAY-3/data.txt").toString().split("\n");
const lineOfChars = lines.map((line) => line.split(""));

const getNearbyCharacters = (currentLine, currentIndex) => {
  const regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/;
  // left
  if (currentIndex !== 0) {
    if (regex.test(lineOfChars[currentLine][currentIndex - 1])) return true;
  }
  // right
  if (currentIndex !== 139) {
    if (regex.test(lineOfChars[currentLine][currentIndex + 1])) return true;
  }

  // above
  if (currentLine !== 0) {
    if (regex.test(lineOfChars[currentLine - 1][currentIndex])) return true;
  }

  // below
  if (currentLine !== 139) {
    if (regex.test(lineOfChars[currentLine + 1][currentIndex])) return true;
  }

  // above diagonal left
  if (currentLine !== 0 && currentIndex !== 0) {
    if (regex.test(lineOfChars[currentLine - 1][currentIndex - 1])) return true;
  }

  // above diagonal right
  if (currentLine !== 0 && currentIndex !== 139) {
    if (regex.test(lineOfChars[currentLine - 1][currentIndex + 1])) return true;
  }

  // below diagonal left
  if (currentLine !== 139 && currentIndex !== 0) {
    if (regex.test(lineOfChars[currentLine + 1][currentIndex - 1])) return true;
  }

  // below diagonal right
  if (currentLine !== 139 && currentIndex !== 139) {
    if (regex.test(lineOfChars[currentLine + 1][currentIndex + 1])) return true;
  }

  return false;
};

let validNumbers = [];

lineOfChars.forEach((line, lineIndex) => {
  const lineNumbers = [];

  line.forEach((character, charIndex) => {
    const digitRegex = /\d/;
    if (!digitRegex.test(character)) return;

    const isAdjacentToSymbol = getNearbyCharacters(lineIndex, charIndex);

    if (!isAdjacentToSymbol) return;

    let number = [character];

    let lookForDigitToLeft = true;
    let leftCount = 1;

    if (charIndex !== 0) {
      while (lookForDigitToLeft) {
        // get character before current
        let indexBeforeCurrent = charIndex - leftCount;
        let currentChar = line[indexBeforeCurrent];

        // if character is present add it to to the number
        if (digitRegex.test(currentChar)) {
          number = [currentChar, ...number];
          // if at the start of the line, end loop
          if (indexBeforeCurrent === 0) {
            lookForDigitToLeft = false;
          }
          leftCount++;
        } else {
          lookForDigitToLeft = false;
        }
      }
    }

    let lookForDigitToRight = true;
    let rightCount = 1;

    if (charIndex !== 139) {
      while (lookForDigitToRight) {
        // get character after current
        let indexAfterCurrent = charIndex + rightCount;
        let currentChar = line[indexAfterCurrent];

        if (digitRegex.test(currentChar)) {
          number = [...number, currentChar];
          // if at the end of the line, end loop
          if (indexAfterCurrent === 139) {
            lookForDigitToRight = false;
          }
          rightCount++;
        } else {
          lookForDigitToRight = false;
        }
      }
    }

    const newNumber = Number(number.join(""));

    // assumes the same number doesn't occur twice in one line
    if (!lineNumbers.includes(newNumber)) lineNumbers.push(newNumber);
  });

  validNumbers = [...validNumbers, ...lineNumbers];
});

// sum up all the valid numbers
const total = validNumbers.reduce((accumulator, number) => {
  return accumulator + number;
}, 0);

console.log(total);
