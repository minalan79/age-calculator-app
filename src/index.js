import "./styles.css";
import iconArrow from "./icon-arrow.svg";

document.getElementById("app").innerHTML = `
<div class='input-wrapper'><div class="app-input">
  <label for="input-day">Day</label>
  <label for="input-month">Month</label>
  <label for="input-year">Year</label>
  <input type="number" placeholder='DD' name="day" id="input-day" />
  <input type="number" name="day" placeholder='MM' id="input-month" />
  <input type="number" placeholder='YYYY' name="day" id="input-year" />
  <span id="err-day" class="error"></span>
  <span id="err-month" class="error"></span>
  <span id="err-year" class="error"></span>
</div></div>
<div class="arrow-wrapper">
  <hr class="seperator">
  <img src=${iconArrow} alt="" class="arrow" />
</div>
<div class="app-age">
  <span><span class='output' id='age-year'>--</span> years</span>
  <span><span class='output' id='age-month'>--</span> months</span>
  <span><span class='output' id='age-day'>--</span> days</span>
</div>
`;

document.querySelector(".arrow-wrapper").addEventListener("click", () => {
  document.getElementById('err-year').innerHTML="";
  document.getElementById('err-month').innerHTML="";
  document.getElementById('err-day').innerHTML="";

  let year = document.getElementById('input-year').value;
  let month = document.getElementById('input-month').value;
  let day = document.getElementById('input-day').value;

  if (!year || !month || !day) {
    if (!year) {
      document.getElementById('err-year').innerHTML="This field is required";
      document.getElementById('input-year').style.borderColor = 'var(--clr-light-red)';
      document.querySelector('label[for="input-year"]').style.color = 'var(--clr-light-red)';
    }
    if (!month) {
      document.getElementById('err-month').innerHTML="This field is required";
      document.getElementById('input-month').style.borderColor = 'var(--clr-light-red)';
      document.querySelector('label[for="input-month"]').style.color = 'var(--clr-light-red)';
    }
    if (!day) {
      document.getElementById('err-day').innerHTML="This field is required";
      document.getElementById('input-day').style.borderColor = 'var(--clr-light-red)';
      document.querySelector('label[for="input-day"]').style.color = 'var(--clr-light-red)';
    }
    return;
  }

  const today = new Date();

  if ((year > today.getFullYear()) || (month > 12) || (day > 31) || (month==2 && day > 28)) {
    if (year > today.getFullYear()) {
      document.getElementById('err-year').innerHTML="Must be in the past";
      document.getElementById('input-year').style.borderColor = 'var(--clr-light-red)';
      document.querySelector('label[for="input-year"]').style.color = 'var(--clr-light-red)';
    }
    if (month > 12) {
      document.getElementById('err-month').innerHTML="Must be a valid month";
      document.getElementById('input-month').style.borderColor = 'var(--clr-light-red)';
      document.querySelector('label[for="input-month"]').style.color = 'var(--clr-light-red)';
    }
    if ((day > 31) || (month==2 && day > 28)) {
      document.getElementById('err-day').innerHTML="Must be a valid day";
      document.getElementById('input-day').style.borderColor = 'var(--clr-light-red)';
      document.querySelector('label[for="input-day"]').style.color = 'var(--clr-light-red)';
    }
    return;
  }
  const birthDateObj = new Date(year, month-1, day);
  let years = today.getFullYear() - birthDateObj.getFullYear();
  let months = today.getMonth() - birthDateObj.getMonth();
  let days = today.getDate() - birthDateObj.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 0);
    days += lastMonth.getDate();
    months--;
  }

  document.getElementById('age-year').innerHTML = years;
  document.getElementById('age-month').innerHTML = months;
  document.getElementById('age-day').innerHTML = days;
}); 