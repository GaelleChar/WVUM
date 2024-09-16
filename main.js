let slideIndex = 1;
showSlides(slideIndex);

let submit = document.getElementById("submit_1");
submit.onclick = myFunction;

function myFunction() {
  if(slideIndex == 2){
    
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    
    if (fname != "" && lname != "") {
      showSlides(++slideIndex); 
    }
  } else {
    showSlides(++slideIndex);
  }
}

// Ensuring Enter key triggers only once
document.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default behavior
    myFunction(); // Trigger the form submission
  }
});

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    return; // just exit
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
