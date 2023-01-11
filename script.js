// Temp limited number of flags for easy testing
// [Country/State, Capital, [Longitude, Latitude], [Longitude, Latitude]]

//W = negative
//S = negative

let flags = {
  ad: ["Democratic Republic of the Congo", "Andorra la Vella", [1.5218, 42.5063], [1.5218, 42.5063]],
  ae: ["United Arab Emirates", "Abu Dhabi", [53.8478, 23.4241], [54.3773, 24.4539]],
  af: ["Afghanistan", "Kabul", [67.7100, 33.9391], [69.2075, 34.5553]],
  ag: ["Antigua and Barbuda", "Saint John's", [-61.7964, 17.0608], [-61.8468, 17.1274]],
  al: ["Albania", "Tirana", [20.1683, 41.1533], [19.8187, 41.3275]],
  am: ["Armenia", "Yerevan", [45.0382, 40.0691], [44.5152, 40.1872]],
  ao: ["Angola", "Luanda", [17.8739, -11.2027], [13.2302, -8.8147]],
  ar: ["Argentina", "Buenos Aires", [-63.6167, -38.4161], [-58.3816, -34.6037]],
  at: ["Austria", "Vienna", [14.5501, 47.5162], [16.3738, 48.2082]],
  au: ["Australia", "Canberra", [133.7751, -25.2744], [149.1310, -35.2802]],
  az: ["Azerbaijan", "Baku", [47.5769, 40.1431], [49.8671, 40.4093]],
  ba: ["Bosnia and Herzegovina", "Sarajevo", [17.6791, 43.9159], [18.4131, 43.8563]],
  bb: ["Barbados", "Bridgetown", [-59.5432, 13.1939], [-59.6132, 13.1060]],
  bd: ["Bangladesh", "Dhaka", [90.3563, 23.6850], [90.4125, 23.8103]]
}

let usFlags = {
  ak: ["Alaska", "Juneau", [-149.4937, 64.2008], [-134.4201, 58.3005]],
  al: ["Alabama", "Montgomery", [-86.9023, 32.3182], [-86.3077, 32.3792]],
  ar: ["Arkansas", "Little Rock", [-92.2863, 34.5574], [-92.2880, 34.7445]],
  az: ["Arizona", "Phoenix", [-111.0937, 34.0489], [-112.0740, 33.4484]],
  ca: ["California", "Sacramento", [-119.4179, 36.7783], [-121.4944, 38.5816]],
  co: ["Colorado", "Denver", [-105.7821, 39.5501], [-104.9903, 39.7392]],
  ct: ["Connecticut", "Hartford", [-73.0877, 41.6032], [-72.6734, 41.7658]],
  de: ["Delaware", "Dover", [-75.5277, 38.9108], [-75.5244, 39.1582]],
  fl: ["Florida", "Tallahassee", [-81.5158, 27.6648], [-84.2807, 30.4383]],
  ga: ["Georgia", "Atlanta", [-82.9001, 32.1656], [-84.3877, 33.7488]],
  hi: ["Hawaii", "Honolulu", [-155.5828, 19.8968], [-157.8581, 21.3099]],
  ia: ["Iowa", "Des Moines", [-93.0977, 41.8780], [-93.6250, 41.5868]],
  id: ["Idaho", "Boise", [-114.7420, 44.0682], [-116.2023, 43.6150]],
  il: ["Illinois", "Springfield", [-89.3985, 40.6331], [-89.6501, 39.7817]]
}

// Default world flags
let toggleUS = false;
// Default country questions
let toggleCapitals = false;
let toggleFreeResponse = false;
let language = 'en';


// Make this into a Medium article when done? To document the process?





// Select and randomize answer values for country names
function selectCountries(correctAnswer) {

  if (toggleUS === false) {
    // Create answer options array for countries and add correct answer
    const selectedAnswers = [correctAnswer];
    // Loop until 10 answer options are in the array
    while (selectedAnswers.length < 10) {
      // Grab random element from flags array
      const index = Math.floor(Math.random() * Object.keys(flags).length);
      // Grab string value of numerically indexed key
      const key = Object.keys(flags)[index];
      // Grab key's first property
      const answer = flags[key][0];
      // Prevent duplicate answers
      if (!selectedAnswers.includes(answer)) {
        // Add flag to answer options array
        selectedAnswers.push(answer);
      }
    }
    // Randomize answer order
    selectedAnswers.sort(() => Math.random() - 0.5);
    // Alphabetize answer order
    selectedAnswers.sort();
    return selectedAnswers;


    // Same code as condition above 
  } else if (toggleUS === true) {
    const selectedAnswers = [correctAnswer];
    while (selectedAnswers.length < 10) {
      const index = Math.floor(Math.random() * Object.keys(usFlags).length);
      const key = Object.keys(usFlags)[index];
      const answer = usFlags[key][0];

      if (!selectedAnswers.includes(answer)) {
        selectedAnswers.push(answer);
      }
    }
    selectedAnswers.sort(() => Math.random() - 0.5);
    selectedAnswers.sort();
    return selectedAnswers;
  }
}




// Select and randomize answer values for capitals
// Same code as function above
function selectCapitals(correctAnswer) {

  if (toggleUS === true) {
    const selectedAnswers = [correctAnswer];
    while (selectedAnswers.length < 10) {
      const index = Math.floor(Math.random() * Object.keys(usFlags).length);
      const key = Object.keys(usFlags)[index];
      // Grab key's second property
      const answer = usFlags[key][1];
      if (!selectedAnswers.includes(answer)) {
        selectedAnswers.push(answer);
      }
    }
    selectedAnswers.sort(() => Math.random() - 0.5);
    selectedAnswers.sort();
    return selectedAnswers;

    // Same code as condition above 
  } else if (toggleUS === false) {
    const selectedAnswers = [correctAnswer];
    while (selectedAnswers.length < 10) {
      const index = Math.floor(Math.random() * Object.keys(flags).length);
      const key = Object.keys(flags)[index];
      const answer = flags[key][1];

      if (!selectedAnswers.includes(answer)) {
        selectedAnswers.push(answer);
      }
    }
    selectedAnswers.sort(() => Math.random() - 0.5);
    selectedAnswers.sort();
    return selectedAnswers;
  }
}


// Function to generate questions array
const bank = {
  questions: [],

  generateQuestions: function (isUS, isCapitals) {
    // Initialize the questions array
    this.questions = [];

    // Determine which object to use (flags or usFlags) based on the isUS flag
    const flagDict = isUS ? usFlags : flags;

    // Iterate through the flags object
    for (let key in flagDict) {
      // Determine whether to use the name or capital for the correct answer based on the isCapitals flag
      let name = flagDict[key][isCapitals ? 1 : 0];

      // Add a question object to the questions array
      this.questions.push({
        // Use the key to determine the flag image URL
        image: `./flags/${isUS ? "us-" : ""}${key}.png`,
        // Set the correct answer to the name or capital (depending on the isCapitals flag)
        correctAnswer: name,
        // Select the answers using the appropriate function (selectCountries or selectCapitals)
        answers: isCapitals ? selectCapitals(name) : selectCountries(name),
      });
    }

    // Shuffle the questions array
    this.questions.sort(() => Math.random() - 0.5);
  }

};

// Generate questions array
bank.generateQuestions(toggleUS, toggleCapitals);




const questionImage = document.querySelector('#question-image');
// Initialize arrays to store the answer text and button elements
const answerTextElements = [];
const answerButtonElements = [];

// Use a loop to select the elements with IDs that contain a suffix from 1 to 10
for (let i = 1; i <= 10; i++) {
  // Push the selected elements to the appropriate array
  answerTextElements.push(document.querySelector(`#answer-text-${i}`));
  answerButtonElements.push(document.querySelector(`#answer-button-${i}`));
}





// Update flag image and HTML answer text elements
const showQuestion = () => {
  const question = bank.questions[currentQuestionIndex];
  questionImage.src = question.image;
  answerTextElements[0].textContent = question.answers[0];
  answerTextElements[1].textContent = question.answers[1];
  answerTextElements[2].textContent = question.answers[2];
  answerTextElements[3].textContent = question.answers[3];
  answerTextElements[4].textContent = question.answers[4];
  answerTextElements[5].textContent = question.answers[5];
  answerTextElements[6].textContent = question.answers[6];
  answerTextElements[7].textContent = question.answers[7];
  answerTextElements[8].textContent = question.answers[8];
  answerTextElements[9].textContent = question.answers[9];
};




// Initialize counters
let currentQuestionIndex = 0;
let attemptedAnswers = 0;
let correctAnswers = 0;
let accuracy = 0;
let questionCount = bank.questions.length; //

// Set up scoreboard
var accuracySpan = document.getElementById('accuracy');
const finalAccuracySpan = document.querySelector('#final-accuracy');

var time = document.getElementById('time');
var scope = document.getElementById('scope');
var mode = document.getElementById('mode');
var format = document.getElementById('format');
var copied = document.getElementById('copied');
var compliment = document.getElementById('compliment');

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
}


const shareButton = document.getElementById('share-button');
shareButton.addEventListener('click', () => share());
function share() {
  copied.style.opacity = 1;
  navigator.clipboard.writeText("vexillologist.io - Learn the world's flags!" +
  '\n\n' + String.fromCodePoint(0xD83D, 0xDEA9) + ' ' + scope.innerHTML + ' ' + mode.innerHTML +
  '\n' + String.fromCodePoint(0x270D, 0xFE0F) + ' ' + format.innerHTML +
  '\n' + String.fromCodePoint(0x23F1, 0xFE0F) + ' finished in ' + stopwatchDisplay.innerHTML +
  '\n' + String.fromCodePoint(0xD83C, 0xDFAF) + ' with ' + finalAccuracySpan.innerHTML + '% accuracy');
}





var flagsRemainingSpan = document.getElementById('flags-remaining');
accuracySpan.innerHTML = 100;
flagsRemainingSpan.innerHTML = bank.questions.length;



var answersHistory = document.querySelector('#score-message');
answersHistory.style.opacity = 0; // Make status message placeholder invisible on page load because no Q has been answered yet

let history = ['', ''];

// This might not be necessary after adding a 2s fade-out to history text
function resetHistory() {
  answersHistory.style.opacity = 0;
}

let timeout; // Declare a global timeout variable

// RESET HISTORY IF OFF BY ONE PIXEL BECAUSE NO INVISIBLE EMOJI IS PRESENT.
// REMOVE COLOR STYLING IN THIS FUNCTION. NO NEED AS ALL HISTORY TEXT IS NOW WHITE.

function updateHistory() {
  answersHistory.style.opacity = 1; // opacity is 0 by default for placeholder text
  answersHistory.innerHTML = history[0]; // Update the content of the element
  answersHistory.style.color = history[1]; // Update the color of the element
}




// Create levenshtein function to allow minor typos
// Code from ChatGPT
function levenshtein(s1, s2) {
  // Initialize the distances matrix with zeros
  const distances = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(0));

  // Fill the first row and column with the sequence numbers
  for (let i = 0; i <= s1.length; i++) distances[0][i] = i;
  for (let j = 0; j <= s2.length; j++) distances[j][0] = j;

  // Calculate the distances for each pair of characters
  for (let j = 1; j <= s2.length; j++) {
    for (let i = 1; i <= s1.length; i++) {
      if (s1[i - 1] === s2[j - 1]) {
        // If the characters are the same, the distance is the same as the distance of the previous characters
        distances[j][i] = distances[j - 1][i - 1];
      } else {
        // If the characters are different, the distance is the minimum of the distances of the previous characters plus 1
        distances[j][i] = Math.min(distances[j - 1][i - 1] + 1, distances[j][i - 1] + 1, distances[j - 1][i] + 1);
      }
    }
  }

  // Return the distance of the last characters in the strings
  return distances[s2.length][s1.length];
}

let long, lat;

// Call this function to pull coordinates
function getCoordinates(answer, toggleCapitals, toggleUS) {
  let objectToIterate = flags;
  if (toggleUS) {
    objectToIterate = usFlags;
  }
  for (const key in objectToIterate) {
    if (toggleCapitals) {
      if (objectToIterate[key][1] === answer) {
        long = objectToIterate[key][3][0];
        lat = objectToIterate[key][3][1];
        break;
      }
    } else {
      if (objectToIterate[key][0] === answer) {
        long = objectToIterate[key][2][0];
        lat = objectToIterate[key][2][1];
        break;
      }
    }
  }
}

// Handle answer selection and game over
const checkAnswer = selectedAnswer => {
  const question = bank.questions[currentQuestionIndex];
  // If answer is correct
  if (levenshtein(selectedAnswer.toUpperCase(), question.correctAnswer.toUpperCase()) <= 2) {
    history = [`&#9989; You answered ${question.correctAnswer} correctly!`, 'white'];

    // Get long and lat values
    getCoordinates(question.correctAnswer, toggleCapitals, toggleUS);
    // Display a green ping on the globe at the correct answer's coordinates
    globe.plugins.pings.add(long, lat, { color: 'green', ttl: 10000, angle: 10 });

    attemptedAnswers++;
    correctAnswers++;
    accuracy = Math.round(correctAnswers / attemptedAnswers * 100)
    // Update scoreboard
    questionCount = questionCount - 1;
    flagsRemainingSpan.innerHTML = questionCount;
    accuracySpan.innerHTML = accuracy;
  }

  // Push incorrectly answered questions to end of question list
  // !!! It looks like pushed questions are not pulling new random answers
  else {
    history = [`&#10060; You answered ${question.correctAnswer} incorrectly!`, 'white'];

    // Get long and lat values
    getCoordinates(question.correctAnswer, toggleCapitals, toggleUS);
    // Display a green ping on the globe at the correct answer's coordinates
    globe.plugins.pings.add(long, lat, { color: 'red', ttl: 10000, angle: 10 });

    attemptedAnswers++;
    accuracy = Math.round(correctAnswers / attemptedAnswers * 100)
    accuracySpan.innerHTML = accuracy;
    //bank.questions.push(question);
    if (toggleCapitals) {
      bank.questions.push({
        ...question,
        correctAnswer: question.correctAnswer,
        answers: selectCapitals(question.correctAnswer),
      });
    } else if (!toggleCapitals) {
      bank.questions.push({
        ...question,
        correctAnswer: question.correctAnswer,
        answers: selectCountries(question.correctAnswer),
      });
    }

  }

  updateHistory();
  currentQuestionIndex++;

  // If game is over
  if (currentQuestionIndex === bank.questions.length) {
    startConfetti();
    resetTrigger = true;

    

    // Update accuracy score in HTML
    finalAccuracySpan.innerHTML = accuracy;

    updateStatsLang();

    // Darken background
    pageMask.classList.remove('hide');
    // Display game over prompt
    gameOverPrompt.classList.remove('hide');
    // Generate new questions array in case user restarts game
    bank.generateQuestions(toggleUS, toggleCapitals);
    // Shuffle questions array
    bank.questions.sort(() => Math.random() - 0.5);
  } else {
    // Show next question
    showQuestion();
  }
};


function updateStatsLang() {
  if (toggleUS) {
    scope.innerHTML = '50 US state';
  } else {
    scope.innerHTML = '193 world';
  }

  if (toggleCapitals) {
    mode.innerHTML = 'capitals';
  } else {
    mode.innerHTML = 'flags';
  }

  if (toggleFreeResponse) {
    format.innerHTML = 'free response';
  } else {
    format.innerHTML = 'multiple choice';
  }

  if (accuracy === 100) {
    compliment.innerHTML = 'Perfect';
  } else if (accuracy >= 90 && accuracy < 100) {
    compliment.innerHTML = 'Impressive';
  } else if (accuracy >= 60 && accuracy < 90) {
    compliment.innerHTML = 'Fantastic';
  } else if (accuracy >= 30 && accuracy < 60) {
    compliment.innerHTML = 'Well done';
  } else {
    compliment.innerHTML = 'Not bad';
  }
}



// Handle answer button clicks
answerButtonElements[0].addEventListener('click', () => checkAnswer(answerTextElements[0].textContent));
answerButtonElements[1].addEventListener('click', () => checkAnswer(answerTextElements[1].textContent));
answerButtonElements[2].addEventListener('click', () => checkAnswer(answerTextElements[2].textContent));
answerButtonElements[3].addEventListener('click', () => checkAnswer(answerTextElements[3].textContent));
answerButtonElements[4].addEventListener('click', () => checkAnswer(answerTextElements[4].textContent));
answerButtonElements[5].addEventListener('click', () => checkAnswer(answerTextElements[5].textContent));
answerButtonElements[6].addEventListener('click', () => checkAnswer(answerTextElements[6].textContent));
answerButtonElements[7].addEventListener('click', () => checkAnswer(answerTextElements[7].textContent));
answerButtonElements[8].addEventListener('click', () => checkAnswer(answerTextElements[8].textContent));
answerButtonElements[9].addEventListener('click', () => checkAnswer(answerTextElements[9].textContent));




// Handle keyboard shortcuts
// !!! Add cooldown
document.addEventListener('keydown', function (event) {
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "0") {
    checkAnswer(answerTextElements[9].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "1") {
    checkAnswer(answerTextElements[0].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "2") {
    checkAnswer(answerTextElements[1].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "3") {
    checkAnswer(answerTextElements[2].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "4") {
    checkAnswer(answerTextElements[3].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "5") {
    checkAnswer(answerTextElements[4].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "6") {
    checkAnswer(answerTextElements[5].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "7") {
    checkAnswer(answerTextElements[6].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "8") {
    checkAnswer(answerTextElements[7].textContent);
  }
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */ && event.key === "9") {
    checkAnswer(answerTextElements[8].textContent);
  }
});




// Link HTML elements to JavaScript objects
const gameOverPrompt = document.querySelector('#game-over-prompt');
const openSettingsButton = document.querySelector('#open-settings-button');
const closeSettingsButton = document.querySelector('#close-settings-button');
const settings = document.querySelector('#settings');
const pageMask = document.querySelector('#page-mask');
const playAgainButton = document.querySelector('#play-again-button');

let resetTrigger = false;
let typeAnswersTrigger = false;
let toggleCapitalsTrigger = false;
let toggleStatesTrigger = false;

let prevToggleFreeResponse = false;
let prevToggleUS = false;
let prevToggleCapitals = false;



// Handle restart button clicks
playAgainButton.addEventListener('click', () => playAgain());
function playAgain() {
  copied.style.opacity = 0;
  stopConfetti();
  resetGame();
}
function resetGame() {
  // change to toggle




  if (resetTrigger) {
    resetTrigger = false; // reset trigger

    if (toggleFreeResponse) {
      // if (freeResponseField.classList.contains('hide')) {
      // toggleFreeResponse = true;
      answersContainer.classList.add('hide');
      freeResponseField.classList.remove('hide');
      freeResponseInput.focus();
    } else {
      // answersContainer.classList.contains('hide')

      // toggleFreeResponse = false;
      answersContainer.classList.remove('hide');
      freeResponseField.classList.add('hide');
    }


    // Hide page mask
    pageMask.classList.add('hide');

    // Hide game over prompt
    gameOverPrompt.classList.add('hide');

    currentQuestionIndex = 0;
    correctAnswers = 0;
    attemptedAnswers = 0;
    accuracy = 0;
    accuracySpan.innerHTML = 100;
    bank.generateQuestions(toggleUS, toggleCapitals);
    questionCount = bank.questions.length;
    flagsRemainingSpan.innerHTML = bank.questions.length;
    resetHistory();
    resetStopwatch();
    showQuestion();
  }

  // Hide settings
  pageMask.classList.add('hide');
  settings.classList.add('hide');
  freeResponseInput.focus();
}





// buttons won't work properly if clicked more than once
const typeAnswersButton = document.querySelector('#type-answers-button');
const toggleCaptialsButton = document.querySelector('#toggle-capitals-button');
const toggleStatesButton = document.querySelector('#toggle-states-button');

typeAnswersButton.addEventListener('click', () => typeAnswersSwitch());
toggleCaptialsButton.addEventListener('click', () => toggleCapitalsSwitch());
toggleStatesButton.addEventListener('click', () => toggleStatesSwitch());

// we don't want to reset if the user undos their toggle

// change to toggle
function typeAnswersSwitch() {
  toggleFreeResponse = !toggleFreeResponse;
}

function toggleCapitalsSwitch() {
  toggleCapitals = !toggleCapitals;
}

function toggleStatesSwitch() {
  toggleUS = !toggleUS;
}


// MAKE TYPE ANSWERS INTO A TOGGLE



// Handle settings "window"
openSettingsButton.addEventListener('click', () => openSettings());
closeSettingsButton.addEventListener('click', () => checkForReset());
closeSettingsButton.addEventListener('click', () => resetGame());
function openSettings() {
  pageMask.classList.remove('hide');
  settings.classList.remove('hide');
}
function checkForReset() {
  if (prevToggleFreeResponse != toggleFreeResponse) {
    prevToggleFreeResponse = !prevToggleFreeResponse
    resetTrigger = true;
  }
  if (prevToggleCapitals != toggleCapitals) {
    prevToggleCapitals = !prevToggleCapitals
    resetTrigger = true;
  }
  if (prevToggleUS != toggleUS) {
    prevToggleUS = !prevToggleUS
    resetTrigger = true;
  }
}





// Link HTML elements to JavaScript objects
// const toggleDifficultyButton = document.querySelector('#difficulty-toggle');
const freeResponseField = document.querySelector('#free-response');
const answersContainer = document.querySelector('#answers-container');




// Fill-in-the-blank logic 
// Link HTML text box to JavaScript object
const freeResponseInput = document.getElementById('free-response-input');
// Create empty user input object
const freeResponseAnswer = {
  inputValue: ''
};

// Store user's input in object
freeResponseInput.addEventListener('input', () => {
  freeResponseAnswer.inputValue = freeResponseInput.value;
});

// Listen for 'Enter' press
freeResponseField.addEventListener('keydown', event => {
  if (answersContainer.classList.contains('hide') /* Fill-in-the-blank condition */ && event.key === 'Enter') {

    // Check for acceptable "incorrect" answers
    if (freeResponseAnswer['inputValue'].toUpperCase() === 'BOSNIA-HERZEGOVINA' ||
      freeResponseAnswer['inputValue'].toUpperCase() === 'BOSNIA') {
      checkAnswer('Bosnia and Herzegovina')

    } else if (freeResponseAnswer['inputValue'].toUpperCase() === "ST JOHN'S" ||
      freeResponseAnswer['inputValue'].toUpperCase() === "ST. JOHN'S") {
      checkAnswer("Saint John's")

    } else if (freeResponseAnswer['inputValue'].toUpperCase() === 'UAE') {
      checkAnswer('United Arab Emirates')

    } else if (freeResponseAnswer['inputValue'].toUpperCase() === 'US' ||
      freeResponseAnswer['inputValue'].toUpperCase() === 'USA' ||
      freeResponseAnswer['inputValue'].toUpperCase() === 'UNITED STATES OF AMERICA') {
      checkAnswer('United States')

    } else {
      // Check user's answer
      checkAnswer(freeResponseAnswer['inputValue']);
    }

    // Clear user's input
    freeResponseInput.value = ''
    // Keep cursor in text box
    freeResponseInput.focus();
  }
})



// Human-readable time logic from ChatGPT
function secondsToMinutesAndSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  let timeString = '';

  if (minutes > 0) {
    if (minutes === 1) {
      timeString = `1 minute`;
    } else {
      timeString = `${minutes} minutes`;
    }
  }

  if (remainingSeconds > 0) {
    if (minutes > 0) {
      timeString += ` and `;
    }

    if (remainingSeconds === 1) {
      timeString += `1 second`;
    } else {
      timeString += `${remainingSeconds} seconds`;
    }
  }

  return timeString;
}


// Stopwatch logic from ChatGPT
// Set up a display element for the stopwatch
const stopwatchDisplay = document.querySelector('#stopwatch-display');

// Initialize the stopwatch time to 0
let stopwatchTime = 0;

// Set up a function to update the stopwatch display
function updateStopwatch() {
  // Create a new Date object with the stopwatch time
  const date = new Date(null);
  date.setSeconds(stopwatchTime);

  // Format the date as MM:SS using the toISOString method
  const timeString = date.toISOString().substr(14, 5);

  // Update the stopwatch display element with the formatted time
  stopwatchDisplay.innerHTML = timeString;
}

// Set up a function to increment the stopwatch time
function incrementStopwatch() {
  stopwatchTime += 1;
}

// Set up a function to reset the stopwatch time
function resetStopwatch() {
  stopwatchTime = 0;
  updateStopwatch();
}

// Set up an interval to increment the stopwatch time
// every 1000 milliseconds (1 second)
setInterval(() => {
  if (gameOverPrompt.classList.contains('hide')) {
    incrementStopwatch();
    updateStopwatch();
  } else {
    time.innerHTML = secondsToMinutesAndSeconds(stopwatchTime);
  }
}, 1000);

// Show the first question
showQuestion();