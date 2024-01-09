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

const selectedParticipantValues = [];
const selectedCheckBoxesValues = [];
let participantAmount = 0;
let audienceAmount = 0;

let addedSelectedRadioValue;
let addedSelectedCheckBoxValue;

let costDisplayed = false;

const sessionInfos = [
  { id: "sessionOne", value: 120, amount: 0 },
  { id: "sessionTwo", value: 170, amount: 0 },
  { id: "sessionThree", value: 100, amount: 0 },
  { id: "sessionFour", value: 160, amount: 0 },
];

let checkedBoxes = 0;

const totalAmounts = [];

if(window.innerWidth <= 550){
  alert('Switch to a bigger screen(PC) for clearer and better UI of this page. Thanks! ')
}

radios.forEach(function (radio) {
  radio.addEventListener("click", function () {
    if (radio.checked) {
      participantAmount += parseInt(radio.value);
      selectedParticipantValues.push(parseInt(radio.value));
    } else {
      selectedParticipantValues.push(0);
    }

    addedSelectedRadioValue = selectedParticipantValues.reduce(
      (prevValue, currentvalue) => prevValue + currentvalue
    );
  });
});

checkBoxes.forEach(function (checkBox) {
  checkBox.addEventListener("click", function () {
    const startDateValue = new Date(startDate.value);
    const endDateValue = new Date(endDate.value);

    const timeDifference = startDateValue - endDateValue;

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    checkedBoxes++;

    if (checkBox.checked) {
      audienceAmount += parseInt(checkBox.value);
      selectedCheckBoxesValues.push(parseInt(checkBox.value));

      Array.from(costColumn).some(function (costColumnId) {
        const costColumnCont = costColumnId.querySelector("div");

        sessionInfos.map((eachSession) => {
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

        if (selectedParticipantValues.length === 0) {
          alert("❌ Please select a participant type!!!");
          costColumnCont.textContent = null;
        }
      });
    } else {
      selectedCheckBoxesValues.push(0);
    }

  });
});

function dateChosen() {
  const startDateValue = new Date(startDate.value);
  const endDateValue = new Date(endDate.value);

  const timeDifference = startDateValue - endDateValue;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  console.log(daysDifference)

  checkBoxes.forEach(function (checkBox) {
    if (checkBox.checked) {
      Array.from(costColumn).some(function (costColumnId) {
        const costColumnCont = costColumnId.querySelector("div");

        sessionInfos.map((eachSession) => {
          if (checkBox.id === eachSession.id) {
            if (costColumnId.id === checkBox.id) {
              if(daysDifference !== 0){
              const totalAmount = eachSession.amount * -daysDifference;
              costColumnCont.textContent = totalAmount;
              totalAmounts.push(totalAmount);
              } 
              
              else{
                const totalAmount = eachSession.amount * 1;
              costColumnCont.textContent = totalAmount;
              totalAmounts.push(totalAmount);
              }
              if(daysDifference > 0){
                alert("Please select valid Dates")
              costColumnCont.textContent = null;
              totalAmounts.push(null);
              }
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

    if(addedSelectedCheckBoxValue < 0){
      totalAddedAmount.textContent = null;
    }


     const popMessage = setTimeout(function(){
    const confirmMessage = prompt("Do you accept the calculated total cost for payment please?")
      
    if(confirmMessage === ("yes")){
      alert(" 🙏THANK YOU!!!")
    }else if(confirmMessage === ( "Yes")){
      alert(" 🙏THANK YOU!!!")
    }
    else {
      alert("😟 APPLICATION WITHDRAWN!!!")
    }
    
    return confirmMessage

    }, 2000
    )
    if(addedSelectedCheckBoxValue < 0){
      clearTimeout(popMessage)
    }else{
      return popMessage;
    }

  }

  console.log(totalAmounts);
  console.log(addedSelectedCheckBoxValue);
});