let photoButtons = document.querySelectorAll(".photos li")

handleActive(photoButtons);

let navigationButtons = document.querySelectorAll("nav ul li a")

handleActive(navigationButtons);


// Start Sliders 

// Main DOM Elements

let prev = document.querySelector(".landing-icons.fa-chevron-left");

let next = document.querySelector(".landing-icons.fa-chevron-right");

let bulletsArr = Array.from(document.querySelectorAll(".bullets li"))

let landing = document.querySelector(".landing")

// Add Active Class To Current Target .

bulletsArr.forEach(function (ele) {
    ele.onclick = function () {
        resetActive(bulletsArr);
        ele.classList.add("active");
        landing.style.backgroundImage = `${this.dataset.image}`;
    }
});

// Previous Btn
prev.onclick = function () {
    checker(-1)
};
// Next Btn
next.onclick = function () {
    checker(1)
};


setInterval(() => {
    checker(1)
}, 10000)

// Checker Function  

function checker(crossRoads) {
    let index = bulletsArr.indexOf(document.querySelector(".bullets li.active"));
    resetActive(bulletsArr);
    if (crossRoads == -1) {
        if (index == 0) {
            index = 3;
        }
    }
    else {
        if (index == 2) {
            index = -1;
        }
    }
    bulletsArr[index + crossRoads].classList.add("active");;
    landing.style.backgroundImage = `${bulletsArr[index + crossRoads].dataset.image}`;
}


// End Sliders

/* Start Contact*/

let inputName = document.querySelector(' [type="text"]');

let inputEmail = document.querySelectorAll("[type ='email'] ");

let contactForm = document.querySelectorAll("form");

let nameValid = false;

let emailValid = false;

let nameReg = /\w{4,20}/i;

inputName.onblur = function () {
    if (nameReg.test(this.value) && this.value.length < 20) {
        nameValid = true;
        replaceClass(this.parentElement, "invalid", "valid");
    }
    else {
        nameValid = false;
        replaceClass(this.parentElement, "valid", "invalid");
    }
}

let emailReg = /\w+@.+\.(net | com |\w{2,30})/i

inputEmail.forEach(function (ele) {
    ele.onblur = function () {
        if (emailReg.test(this.value) && !this.value.includes("<>")) {
            emailValid = true
            replaceClass(this.parentElement, "invalid", "valid");
        }
        else {
            emailValid = false;
            replaceClass(this.parentElement, "valid", "invalid");
        }
    }
})

contactForm.forEach(function (element) {
    element.onsubmit = function (event) {
        if (nameValid == true && emailValid == true) {
            element.className = "success";
        }
        else {
            document.querySelectorAll(`label input[placeholder *="Your"]:not(label.valid input`).forEach((ele) => {
                replaceClass(ele.parentElement, "valid", "invalid");
            });

            event.preventDefault();

            element.className = "fail";
        }

    }
});


/* End Contact */

// Custom toggle(""): 



let scrollBtn = document.querySelector(".scroll-to-top");

let scrollProgress = document.querySelector(".scroll-progress span")

scrollBtn.style.margin = "10px 0 0 0 ";

window.onscroll = function () {
    let maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    scrollProgress.style.width = `${((window.scrollY * 100 / maxScroll))}%`;
    if (window.scrollY >= 500) {
        scrollBtn.style.opacity = "1";
        scrollBtn.style.zIndex = "9999";
        scrollBtn.style.display = "flex";
    }
    else {
        scrollBtn.style.opacity = "0";
        scrollBtn.style.zIndex = "-9999";
    }
};


let myResponse = new Promise((resolved, rejected) => {
    const applyingRequest = true;
    if (applyingRequest === true) {
        resolved("You Are Accepted", "%c color:green; ")
    } else {
        rejected("You Are Rejected", "color: red; ")
    }
});

myResponse.then(
    (resolveVal) => console.log(`${resolveVal} , Welcome`),
    (rejectedVal) => console.log(`${rejectedVal} ,  Better %c Luck Next Time`)
)


fetch('test.json') // Replace with the correct path if needed
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // This parses the JSON content of the file
    })
    .then(data => {
        // Work with the JSON data here
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem fetching the file:', error);
    });

// Menu Toggle

const navBtn = document.querySelector(".toggle i");

navBtn.onclick = function () {
    navBtn.parentElement.classList.toggle("nav-open");

    OutsideElement(this.parentElement, "nav-open")

}

// Functions


// Reset Function

function resetActive(iteratedObj) {
    iteratedObj.forEach(function (ele) {
        ele.classList.remove("active");
    })
}

function handleActive(elementsArr) {
    elementsArr.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            resetActive(elementsArr);
            e.currentTarget.classList.add("active")
        })
    })
}



// replaceClass Function
function replaceClass(element, removedClass, addedClass) {
    element.classList.remove(removedClass)
    element.classList.add(addedClass)
}

// Element Position Function

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

// Touch Outside Function

function OutsideElement(element, targetedClass) {
    document.addEventListener("click", (e) => {
        let outside = !element.contains(e.target);

        if (outside) {
            element.classList.remove(targetedClass)
        }

    })
}