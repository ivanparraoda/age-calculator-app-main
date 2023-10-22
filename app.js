const form_submit = document.getElementById('form');
const error = document.getElementsByClassName('msg-error');
const inputs = document.querySelectorAll('input');
const dayShow = document.getElementById('day_show');
const monthShow = document.getElementById('month_show');
const yearShow = document.getElementById('year_show');
const label = document.querySelectorAll('label');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData();
});

function getData() {
  const dayInput = document.getElementById('day').value;
  const monthInput = document.getElementById('month').value;
  const yearInput = document.getElementById('year').value;
  const adjustMonth = Math.floor(monthInput) - 1;
  if (dayInput == '' && monthInput == '' && yearInput == '') {
    showError();
  } else {
    if (dateValidation(yearInput, adjustMonth, dayInput)) {
      ageCalc(yearInput, adjustMonth, dayInput);
    } else {
      showError();
    }
  }
}

function ageCalc(yearInput, adjustMonth, dayInput) {
  const birthDate = new Date(yearInput, adjustMonth, dayInput);
  const currentDate = new Date();

  const yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
  const monthsDiff = currentDate.getMonth() - birthDate.getMonth();
  const daysDiff = currentDate.getDate() - birthDate.getDate();

  yearShow.textContent = yearsDiff;
  monthShow.textContent = monthsDiff + 1;
  dayShow.textContent = daysDiff;

  if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
    return yearsDiff - 1;
  } else {
    return yearsDiff;
  }

  clearAll();
}

function showError() {
  inputs.forEach((element) => {
    element.classList.add('error');
  });

  for (const e of error) {
    e.style.display = 'block';
  }

  for (const la of label) {
    la.style.color = 'red';
  }
}

function dateValidation(yearVal, month, day) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  if (
    yearVal < 1 ||
    yearVal > currentYear ||
    month < 1 ||
    month > 12 ||
    day < 1
  ) {
    showError();
  } else {
    // Crea una nueva fecha con el año, mes y día especificados
    const dateToCheck = new Date(year, month - 1, day);

    // Comprueba si el mes en la fecha creada es igual al mes proporcionado
    // y si el año en la fecha creada es igual al año proporcionado
    return (
      dateToCheck.getMonth() === month - 1 && dateToCheck.getFullYear() === year
    );
  }

  // return day >= 1 && day <= maxDaysInMonth[month - 1];
}

// setTimeout(clearAll, 3000);

// function clearAll() {
//   inputs.forEach((element) => {
//     element.classList.remove('error');
//   });

//   for (const e of error) {
//     e.style.display = 'none';
//   }

//   for (const la of label) {
//     la.style.color = 'black';
//   }
// }
