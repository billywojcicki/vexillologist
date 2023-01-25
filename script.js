// Declare variables
let toggleUS = false;
let toggleCapitals = false;
let toggleFreeResponse = false;


// Select random countries for answer choices
function selectCountries(correctAnswer) {

  if (toggleUS === false) {
    // Create answer choices array for countries and add correct answer
    const selectedAnswers = [correctAnswer];
    // Loop until 10 answer options are in the array
    while (selectedAnswers.length < 10) {
      // Grab random element from worldFlags array
      const index = Math.floor(Math.random() * Object.keys(worldFlags).length);
      // Grab string value of numerically indexed key
      const key = Object.keys(worldFlags)[index];
      // Grab key's first property
      const answer = worldFlags[key][0];

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




// Select random capitals for answer choices
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
      const index = Math.floor(Math.random() * Object.keys(worldFlags).length);
      const key = Object.keys(worldFlags)[index];
      const answer = worldFlags[key][1];

      if (!selectedAnswers.includes(answer)) {
        selectedAnswers.push(answer);
      }
    }
    selectedAnswers.sort(() => Math.random() - 0.5);
    selectedAnswers.sort();
    return selectedAnswers;
  }
}




// Generate questions array object
const bank = {
  questions: [],
  generateQuestions: function (isUS, isCapitals) {
    // Initialize the questions array
    this.questions = [];

    // Determine which object to use (worldFlags or usFlags) based on the isUS flag
    const flagDict = isUS ? usFlags : worldFlags;

    // Iterate through the flags object
    for (let key in flagDict) {
      if (flagDict.hasOwnProperty(key)) {
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
    }

    // Shuffle the questions array
    this.questions.sort(() => Math.random() - 0.5);
  }
};

// Generate questions array object on page load
bank.generateQuestions(toggleUS, toggleCapitals);




// Initialize arrays to store the answer text and button elements
const answerButtonElements = [];
const answerTextElements = [];

// Use a loop to select the elements with IDs that contain a suffix from 1 to 10
for (let i = 1; i <= 10; i++) {
  // Push the selected elements to the appropriate array
  answerButtonElements.push(document.getElementById(`answer-button-${i}`));
  answerTextElements.push(document.getElementById(`answer-text-${i}`));
}




// Update flag image and answer text elements
const questionImage = document.getElementById('question-image');
const showQuestion = () => {
  const question = bank.questions[currentQuestionIndex];
  questionImage.src = question.image;
  for (let i = 0; i < answerTextElements.length; i++) {
    answerTextElements[i].textContent = question.answers[i];
  }
};




// Initialize counters
let questionCount = bank.questions.length;
let currentQuestionIndex = 0;
let attemptedAnswers = 0;
let correctAnswers = 0;
let accuracy = 0;

// Link HTML elements for player stats summary
const accuracySpan = document.getElementById('accuracy');
const finalAccuracySpan = document.getElementById('final-accuracy');
const flagsRemainingSpan = document.getElementById('flags-remaining');
const time = document.getElementById('time');
const scope = document.getElementById('scope');
const mode = document.getElementById('mode');
const format = document.getElementById('format');
const copied = document.getElementById('copied');
const compliment = document.getElementById('compliment');

accuracySpan.innerHTML = 100;
flagsRemainingSpan.innerHTML = bank.questions.length;




// Set up share button
const shareButton = document.getElementById('share-button');
shareButton.addEventListener('click', () => share());
function share() {
  copied.style.opacity = 1;
  navigator.clipboard.writeText("billywojcicki.github.io/vexillologist/" +
    '\n\n' + "Check out my game summary!" +
    '\n' + String.fromCodePoint(0xD83D, 0xDEA9) + ' ' + scope.innerHTML + ' ' + mode.innerHTML +
    '\n' + String.fromCodePoint(0x270D, 0xFE0F) + ' ' + format.innerHTML +
    '\n' + String.fromCodePoint(0x23F1, 0xFE0F) + ' finished in ' + stopwatchDisplay.innerHTML +
    '\n' + String.fromCodePoint(0xD83C, 0xDFAF) + ' ' + finalAccuracySpan.innerHTML + '% accuracy');
}




// Set up message (displays previous question's answer)
const message = document.getElementById('message');
message.style.opacity = 0; // Make message placeholder invisible on page load

let messageContent = '';

function resetMessage() {
  message.style.opacity = 0;
}
function updateMessage() {
  message.style.opacity = 1; // Opacity is 0 by default for placeholder text
  message.innerHTML = messageContent; // Update element content
}




// Check levenshtein distance between two strings
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
  return distances[s2.length][s1.length];
}




let long, lat;
// Get coordinates
function getCoordinates(answer, toggleCapitals, toggleUS) {
  let objectToIterate = worldFlags;
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
  // If answer is correct (allow typos with levenshtein distance <= 2)
  if (levenshtein(selectedAnswer.toUpperCase(), question.correctAnswer.toUpperCase()) <= 2) {

    const width = window.innerWidth;
    // Display smaller message on mobile
    if (width < 767) {
      messageContent = `&#9989;<span class="invisible">_</span>${question.correctAnswer}`;
    } else {
      messageContent = `&#9989;<span class="invisible">_</span>You answered ${question.correctAnswer} correctly!`;
    }

    getCoordinates(question.correctAnswer, toggleCapitals, toggleUS);
    // Display a green ping on the globe at the correct answer's coordinates
    globe.plugins.pings.add(long, lat, { color: 'green', ttl: 10000, angle: 10 });

    // Update counters
    attemptedAnswers++;
    correctAnswers++;
    accuracy = Math.round(correctAnswers / attemptedAnswers * 100);
    accuracySpan.innerHTML = accuracy;
    questionCount = questionCount - 1;
    flagsRemainingSpan.innerHTML = questionCount;

  } else {

    const width = window.innerWidth;
    // Display smaller message on mobile
    if (width < 767) {
      messageContent = `&#10060;<span class="invisible">_</span>${question.correctAnswer}`;
    } else {
      messageContent = `&#10060;<span class="invisible">_</span>You answered ${question.correctAnswer} incorrectly!`;
    }

    getCoordinates(question.correctAnswer, toggleCapitals, toggleUS);
    // Display a red ping on the globe at the correct answer's coordinates
    globe.plugins.pings.add(long, lat, { color: 'red', ttl: 10000, angle: 10 });

    // Update counters
    attemptedAnswers++;
    accuracy = Math.round(correctAnswers / attemptedAnswers * 100);
    accuracySpan.innerHTML = accuracy;

    // Push incorrectly answered questions to end of questions array
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

  updateMessage();
  currentQuestionIndex++;

  // If game is over
  if (currentQuestionIndex === bank.questions.length) {
    startConfetti();
    resetTrigger = true;

    // Update HTML stats
    time.innerHTML = secondsToMinutesAndSeconds(stopwatchTime);
    finalAccuracySpan.innerHTML = accuracy;
    updateSummary();

    // Darken background
    pageMask.classList.remove('hide');
    // Display game over prompt
    gameOverPrompt.classList.remove('hide');
    // Generate new questions array in case user restarts game
    bank.generateQuestions(toggleUS, toggleCapitals);
    // Shuffle questions array
    bank.questions.sort(() => Math.random() - 0.5);

  } else {
    showQuestion();
  }
};




function updateSummary() {
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
for (let i = 0; i < answerButtonElements.length; i++) {
  answerButtonElements[i].addEventListener('click', () => checkAnswer(answerTextElements[i].textContent));
}

// Handle keyboard shortcuts
document.addEventListener('keydown', function (event) {
  if (freeResponseField.classList.contains('hide') /* Multiple choice condition */) {
    const keyAnswerMap = {
      '0': answerTextElements[9].textContent,
      '1': answerTextElements[0].textContent,
      '2': answerTextElements[1].textContent,
      '3': answerTextElements[2].textContent,
      '4': answerTextElements[3].textContent,
      '5': answerTextElements[4].textContent,
      '6': answerTextElements[5].textContent,
      '7': answerTextElements[6].textContent,
      '8': answerTextElements[7].textContent,
      '9': answerTextElements[8].textContent,
    };
    if (keyAnswerMap[event.key]) checkAnswer(keyAnswerMap[event.key]);
  }
});




// Link HTML elements for game over prompt and settings menu
const pageMask = document.getElementById('page-mask');
const gameOverPrompt = document.getElementById('game-over-prompt');
const openSettingsButton = document.getElementById('open-settings-button');
const closeSettingsButton = document.getElementById('close-settings-button');
const settings = document.getElementById('settings');
const restartButton = document.getElementById('restart-button');

// Set up reset triggers and toggle histories
let resetTrigger = false;
let prevToggleFreeResponse = false;
let prevToggleUS = false;
let prevToggleCapitals = false;

// Handle restart button clicks
restartButton.addEventListener('click', () => playAgain());
function playAgain() {
  copied.style.opacity = 0;
  stopConfetti();
  resetGame();
}




// Reset game - critically important!
function resetGame() {

  if (resetTrigger) {
    resetTrigger = false;

    if (toggleFreeResponse) {
      answersContainer.classList.add('hide');
      freeResponseField.classList.remove('hide');
      freeResponseInput.focus();
      questionImage.style.margin = '56px 0 24px 0'; // Add margin when toggleFreeResponse is true

    } else {
      answersContainer.classList.remove('hide');
      freeResponseField.classList.add('hide');
      questionImage.style.margin = '24px 0'; // Reset margin when toggleFreeResponse is false
    }

    // Hide page mask
    pageMask.classList.add('hide');

    // Hide game over prompt
    gameOverPrompt.classList.add('hide');

    // Reset counters
    currentQuestionIndex = 0;
    correctAnswers = 0;
    attemptedAnswers = 0;
    accuracy = 0;
    accuracySpan.innerHTML = 100;
    bank.generateQuestions(toggleUS, toggleCapitals);
    questionCount = bank.questions.length;
    flagsRemainingSpan.innerHTML = bank.questions.length;
    resetMessage();
    resetStopwatch();
    showQuestion();
  }

  // Hide settings
  pageMask.classList.add('hide');
  settings.classList.add('hide');
  freeResponseInput.focus();
}




// Set up game mode toggles
const typeAnswersButton = document.getElementById('type-answers-button');
const toggleCaptialsButton = document.getElementById('toggle-capitals-button');
const toggleStatesButton = document.getElementById('toggle-states-button');

typeAnswersButton.addEventListener('click', () => typeAnswersSwitch());
toggleCaptialsButton.addEventListener('click', () => toggleCapitalsSwitch());
toggleStatesButton.addEventListener('click', () => toggleStatesSwitch());

function typeAnswersSwitch() {
  toggleFreeResponse = !toggleFreeResponse;
}

function toggleCapitalsSwitch() {
  toggleCapitals = !toggleCapitals;
}

function toggleStatesSwitch() {
  toggleUS = !toggleUS;
}




// Set up settings menu
openSettingsButton.addEventListener('click', () => openSettings());
closeSettingsButton.addEventListener('click', () => checkForReset());
closeSettingsButton.addEventListener('click', () => resetGame());

function openSettings() {
  pageMask.classList.remove('hide');
  settings.classList.remove('hide');
}

function checkForReset() {
  if (prevToggleFreeResponse != toggleFreeResponse) {
    prevToggleFreeResponse = !prevToggleFreeResponse;
    resetTrigger = true;
  }
  if (prevToggleCapitals != toggleCapitals) {
    prevToggleCapitals = !prevToggleCapitals;
    resetTrigger = true;
  }
  if (prevToggleUS != toggleUS) {
    prevToggleUS = !prevToggleUS;
    resetTrigger = true;
  }
}




// Free response logic
const answersContainer = document.getElementById('answers-container');
const freeResponseField = document.getElementById('free-response-container');
const freeResponseInput = document.getElementById('free-response-input');

const freeResponseAnswer = {
  inputValue: ''
};

freeResponseInput.addEventListener('input', () => {
  freeResponseAnswer.inputValue = freeResponseInput.value;
});

// Listen for "Enter" key press
freeResponseField.addEventListener('keydown', event => {
  if (answersContainer.classList.contains('hide') /* Fill-in-the-blank condition */ && event.key === 'Enter') {
    const userAnswer = freeResponseInput.value.toUpperCase();
    if (acceptableAnswers[userAnswer]) {
      checkAnswer(acceptableAnswers[userAnswer]);
    } else {
      checkAnswer(freeResponseAnswer.inputValue);
    }
    freeResponseInput.value = '';
    freeResponseInput.focus();
  }
});




// Set up paragraph-friendly time format
function secondsToMinutesAndSeconds(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  let timeString = '';

  if (hours > 0) {
    if (hours === 1) {
      timeString = `1 hour`;
    } else {
      timeString = `${hours} hours`;
    }
  }

  if (minutes > 0) {
    if (hours > 0) {
      timeString += `, `;
    }
    if (minutes === 1) {
      timeString += `1 minute`;
    } else {
      timeString += `${minutes} minutes`;
    }
  }

  if (remainingSeconds > 0) {
    if (hours > 0) {
      timeString += `,`;
    }
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




// Stopwatch logic
const stopwatchDisplay = document.getElementById('stopwatch');
let stopwatchTime = 0;

function updateStopwatch() {
  let minutes = Math.floor(stopwatchTime / 60);
  let seconds = stopwatchTime % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hour = Math.floor(minutes / 60);
  minutes = minutes % 60;
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let timeString;
  if(hour === 0) {
    timeString = `${minutes}:${seconds}`;
  } else {
    timeString = `${hour}:${minutes}:${seconds}`;
  }

  stopwatchDisplay.innerHTML = timeString;
}

let timeoutId;
function incrementStopwatch() {
  if (gameOverPrompt.classList.contains('hide')) {
    stopwatchTime += 1;
    updateStopwatch();
  }
  timeoutId = setTimeout(incrementStopwatch, 1000);
}

// Start the stopwatch
timeoutId = setTimeout(incrementStopwatch, 1000);

function resetStopwatch() {
  stopwatchTime = 0;
  updateStopwatch();
}




// Improve mobile button tapping
const buttons = document.querySelectorAll('.answer-button, .settings-button');
buttons.forEach((button) => {
  button.addEventListener('touchstart', () => {
    button.classList.add('active-tap');
  });
  button.addEventListener('touchend', () => {
    setTimeout(() => {
      button.classList.remove('active-tap');
    }, 200);
  });
});




// Show the first question on page load!
showQuestion();