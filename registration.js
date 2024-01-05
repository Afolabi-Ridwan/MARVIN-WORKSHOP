const calcBtn = document.querySelector(".calculateBtn");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const audience = document.getElementById("audience");
const presenter = document.getElementById("presenter");
const sessionOne = document.getElementById("sessionOne");
const sessionTwo = document.getElementById("sessionTwo");
const sessionThree = document.getElementById("sessionThree");
const sessionFour = document.getElementById("sessionFour");
const radios = document.querySelectorAll('input[type="radio"]');
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const costColumn = document.querySelectorAll(".costColumn");
const totalAddedAmount = document.querySelector(".totalAddedAmount");

const presenterCost = presenter.value;
const audienceCost = audience.value;

let radioValue;
let checkBoxValue;

const selectedRadioValues = [];
const selectedCheckBoxesValues = [];
let participantAmount = 0;
let audienceAmount = 0;

let addedSelectedRadioValue;
let addedSelectedCheckBoxValue;

let costDisplayed = false;

const a = [
  { id: "sessionOne", value: 120, amount: 0 },
  { id: "sessionTwo", value: 170, amount: 0 },
  { id: "sessionThree", value: 100, amount: 0 },
  { id: "sessionFour", value: 160, amount: 0 },
];

let checkedBoxes = 0;

const totalAmounts = [];

radios.forEach(function (radio) {
  radio.addEventListener("click", function () {
    if (radio.checked) {
      participantAmount += parseInt(radio.value);
      selectedRadioValues.push(parseInt(radio.value));
    } else {
      selectedRadioValues.push(0);
    }

    addedSelectedRadioValue = selectedRadioValues.reduce(
      (prevValue, currentvalue) => prevValue + currentvalue
    );
    // console.log(addedSelectedRadioValue);
  });
});

checkBoxes.forEach(function (checkBox) {
  checkBox.addEventListener("click", function () {
    const startDateValue = new Date(startDate.value);
    const endDateValue = new Date(endDate.value);

    const timeDifference = startDateValue - endDateValue;

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    checkedBoxes++;

    // console.log(checkedBoxes)
    if (checkBox.checked) {
      audienceAmount += parseInt(checkBox.value);
      selectedCheckBoxesValues.push(parseInt(checkBox.value));

      Array.from(costColumn).some(function (costColumnId) {
        const costColumnCont = costColumnId.querySelector("div");

        a.map((eachSession) => {
          if (checkBox.id === eachSession.id) {
            if (costColumnId.id === checkBox.id) {
              eachSession.amount = eachSession.value + addedSelectedRadioValue;
              // console.log(eachSession.amount);
              if (costDisplayed === true) {
                const totalAmount = eachSession.amount * -daysDifference;
                costColumnCont.textContent = totalAmount;
                totalAmounts.push(totalAmount);
              }
            }
          }
        });

        if (selectedRadioValues.length === 0) {
          alert("❌ Please select a participant type!!!");
          costColumnCont.textContent = null;
        }
      });
    } else {
      selectedCheckBoxesValues.push(0);
    }

    // console.log(selectedCheckBoxesValues);
  });
});

function dateChosen() {
  const startDateValue = new Date(startDate.value);
  const endDateValue = new Date(endDate.value);

  const timeDifference = startDateValue - endDateValue;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  checkBoxes.forEach(function (checkBox) {
    if (checkBox.checked) {
      Array.from(costColumn).some(function (costColumnId) {
        const costColumnCont = costColumnId.querySelector("div");

        a.map((eachSession) => {
          if (checkBox.id === eachSession.id) {
            if (costColumnId.id === checkBox.id) {
              const totalAmount = eachSession.amount * -daysDifference;
              costColumnCont.textContent = totalAmount;
              // console.log(totalAmount);
              totalAmounts.push(totalAmount);

              if (isNaN(-daysDifference)) {
                alert(" ❌ Check your date selections and try again");
                costColumnCont.textContent = null;
              }
            }
          }
        });
      });
    }
  });

  if (checkedBoxes === 0) {
    alert(" ❌ Please select at least a session");
  }

  costDisplayed = true;
}

calcBtn.addEventListener("click", function () {
  if (totalAmounts.length === 0) {
    alert("❌ Please make your selections correctly before submitting!!!");
  } 
  
  else {
    addedSelectedCheckBoxValue = totalAmounts.reduce(
      (prevValue, currentvalue) => prevValue + currentvalue
    );

    if (checkedBoxes >= 2 && addedSelectedCheckBoxValue >= 1000) {
      const discount = addedSelectedCheckBoxValue * (15 / 100);
      console.log(discount);
      console.log(addedSelectedCheckBoxValue);
      totalAddedAmount.textContent = Math.round(discount);

      alert(`😍 Thanks for selecting more than a session. 
      Note: We have a 15% discount for that, and its applied to your fees`)
    }
    else{
      totalAddedAmount.textContent = addedSelectedCheckBoxValue;
    }


    setTimeout(function(){
    const confirmMessage = prompt("Do you accept the calculated total cost for payment please?")
      
    if(confirmMessage === ("yes" || "Yes")){
      alert(" 🙏THANK YOU!!!")
    }
    else {
      alert("😟 APPLICATION WITHDRAWN!!!")
    }
    
    return confirmMessage

    }, 1000
    )
  }

  console.log(totalAmounts);
  console.log(addedSelectedCheckBoxValue);
});
