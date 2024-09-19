let slideIndex = 1; // Start with the first slide
const responses = {}; // Object to store all responses
let finalSlideIndex = 6; // Final slide
// Show the initial slide
showSlides(slideIndex);

// Event listener for "Submit" button
let startButton = document.getElementById("submit_");
startButton.onclick = () => {
  showSlides(++slideIndex); 
};

// Event listener for the name submission button
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

// Function to handle name submission
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

  const currentQuestionId = `q${slideIndex - 2}`; // Adjusting for the first two slides
  
  // Store the user's choice
  responses[currentQuestionId] = choice;
  
  showSlides(++slideIndex);
  
  console.log(responses); 
}

document.getElementById("refresh").onclick = function() {
  slideIndex = 1; // Reset to the first slide
  showSlides(slideIndex); 
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");

  // Check if n is within the valid range
  if (n > slides.length) {
    slideIndex = 1; 
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }

  // Show the current slide
  slides[slideIndex - 1].style.display = "block";  
}

function calculateResults() {
  const responseCount = { a: 0, b: 0, c: 0 };

  for (let key in responses) {
    const answer = responses[key];
    if (responseCount.hasOwnProperty(answer)) {
      responseCount[answer]++;
    }
  }

  // Determine the highest response
  let highest = 'a'; // Default to 'a'
  for (let key in responseCount) {
    if (responseCount[key] > responseCount[highest]) {
      highest = key;
    }
  }

  // Match based on the highest response count
  let matchedDJ;
  if (highest === 'a') {
    matchedDJ = "SDRV"; // Display SDRV DJ card
  } else if (highest === 'b') {
    matchedDJ = "High_Energy_DJ"; // Replace with your DJ card
  } else {
    matchedDJ = "Edgy_Wild_DJ"; // Replace with your DJ card
  }

  displayResult(matchedDJ); // Show the result
}

function displayResult(matchedDJ) {
  hideAllSlides(); // Hide all slides
  
  // Hide all DJ containers
  document.getElementById("SDRV").style.display = "none";
  document.getElementById("High_Energy_DJ").style.display = "none";
  document.getElementById("Edgy_Wild_DJ").style.display = "none";

  // Show the matched DJ container
  if (matchedDJ === 'SDRV') {
    document.getElementById("SDRV").style.display = "block";
  } else if (matchedDJ === 'High_Energy_DJ') {
    document.getElementById("High_Energy_DJ").style.display = "block";
  } else {
    document.getElementById("Edgy_Wild_DJ").style.display = "block";
  }

  // Show the results slide
  document.getElementById("q6").style.display = "block"; // Assuming q6 is your results slide
}

