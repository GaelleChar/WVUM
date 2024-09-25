let slideIndex = 1; 
const responses = {};
let finalSlideIndex = 6; // Final slide
// initial slide
showSlides(slideIndex);

// Event listener for "Submit" button
let startButton = document.getElementById("submit_");
startButton.onclick = () => {
  showSlides(++slideIndex); 
};

let submitNameButton = document.getElementById("submit_1");
submitNameButton.onclick = handleNameSubmission;

// Event listener for "Enter" key to handle both start and name submission
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    
    if (slideIndex === 1) {
      showSlides(++slideIndex); 
    } else if (slideIndex === 2) {
      handleNameSubmission(); 
    }
  }
});

// Handle name submission
function handleNameSubmission() {

  let fname = document.getElementById("fname").value.trim();
  let lname = document.getElementById("lname").value.trim();
  
  if (fname !== "" && lname !== "") {
    responses['name'] = { firstName: fname, lastName: lname }; // Store name response
    
    showSlides(++slideIndex);
  } else {
    alert("Please enter both first and last names."); 
  }
};

function handleChoice(choice) {
  const currentQuestionId = `q${slideIndex - 2}`; // Dismiss first two slides
  responses[currentQuestionId] = choice; // Store the user's choice

  if (slideIndex === finalSlideIndex + 1 ) { 
    calculateResults(); 
  } else if (slideIndex === finalSlideIndex + 2 ) {
    console.log("/")
  } else { showSlides(++slideIndex); 
  }
}

document.getElementById("refresh").onclick = function() {
  slideIndex = 1; // Reset to the first slide
  showSlides(slideIndex); 
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  if (n <= slides.length) {
    slides[n - 1].style.display = "block";
  }
}

function calculateResults() {
  const responseCount = { a: 0, b: 0, c: 0 };

  for (let key in responses) {
    const answer = responses[key];
    if (responseCount.hasOwnProperty(answer)) {
      responseCount[answer]++;
    }
  }

  // Determine highest response
  let highest = 'a'; 
  for (let key in responseCount) {
    if (responseCount[key] > responseCount[highest]) {
      highest = key;
    }
  }

  // Match based on highest response count
  let matchedDJ;
  if (highest === 'a') {
    matchedDJ = "SDRV";
  } else if (highest === 'b') {
    matchedDJ = "Silvia"; 
  } else {
    matchedDJ = "Alex_Miller"; 
  }
  displayResult(matchedDJ)
}

function displayResult(matchedDJ) {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[finalSlideIndex + 1].style.display = "block";

  document.getElementById("SDRV").style.display = "none";
  document.getElementById("Silvia").style.display = "none";
  document.getElementById("Alex_Miller").style.display = "none";

  // Show the matched DJ container
  document.getElementById(matchedDJ).style.display = "flex";

  // results slide
  document.getElementById("q6").style.display = "flex"; 
}

