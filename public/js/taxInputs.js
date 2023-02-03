// Calculate federal income tax
const calFed = (income) => {
  let fedIncomeTax = 0;

  const fedBrackets = [0, 14398, 50197, 100392, 155625, 221708];
  const fedRates = [0, 0.15, 0.205, 0.26, 0.29, 0.33];

  if (income < fedBrackets[1]) {
    // No tax
  } else if (income < fedBrackets[2]) {
    fedIncomeTax = (income - fedBrackets[1]) * fedRates[1];
  } else if (income < fedBrackets[3]) {
    fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
    fedIncomeTax = fedIncomeTax + (income - fedBrackets[2]) * fedRates[2];
  } else if (income < fedBrackets[4]) {
    fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
    fedIncomeTax =
      fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
    fedIncomeTax = fedIncomeTax + (income - fedBrackets[3]) * fedRates[3];
  } else if (income < fedBrackets[5]) {
    fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
    fedIncomeTax =
      fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
    fedIncomeTax =
      fedIncomeTax + (fedBrackets[4] - fedBrackets[3]) * fedRates[3];
    fedIncomeTax = fedIncomeTax + (income - fedBrackets[4]) * fedRates[4];
  } else {
    fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
    fedIncomeTax =
      fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
    fedIncomeTax =
      fedIncomeTax + (fedBrackets[4] - fedBrackets[3]) * fedRates[3];
    fedIncomeTax =
      fedIncomeTax + (fedBrackets[5] - fedBrackets[4]) * fedRates[4];
    fedIncomeTax = fedIncomeTax + (income - fedBrackets[5]) * fedRates[5];
  }
  return fedIncomeTax;
};

// Calculate Ontario income tax
const ontarioTax = (income) => {

    let provIncomeTax = 0;

    const provBrackets = [46226, 92454, 150000, 220000];
    const provRates = [0.0505, 0.0915, 0.1116, 0.1216, 0.1316];

    if (income < provBrackets[0]) {
        provIncomeTax += income * provRates[0];
    } else if (income < provBrackets[1]) {
        provIncomeTax += income * provRates[0];
        provIncomeTax += (income - provBrackets[0]) * provRates[1];
    } else if (income < provBrackets[2]) {
        provIncomeTax += income * provRates[0];
        provIncomeTax += (provBrackets[1] - provBrackets[0]) * provRates[1];
        provIncomeTax += (income - provBrackets[1]) * provRates[2];
    } else if (income < provBrackets[3]) {
        provIncomeTax += income * provRates[0];
        provIncomeTax += (provBrackets[1] - provBrackets[0]) * provRates[1];
        provIncomeTax += (provBrackets[2] - provBrackets[1]) * provRates[2];
        provIncomeTax += (income - provBrackets[2]) * provRates[3];
    } else if (income < provBrackets[4]) {
        provIncomeTax += income * provRates[0];
        provIncomeTax += (provBrackets[1] - provBrackets[0]) * provRates[1];
        provIncomeTax += (provBrackets[2] - provBrackets[1]) * provRates[2];
        provIncomeTax += (provBrackets[3] - provBrackets[2]) * provRates[3];
        provIncomeTax += (income - provBrackets[3]) * provRates[4];
    }
    return provIncomeTax;
};

const display = (event) => {
  let fedIncomeTax = 0;
  const income = $(".inputIncome");
  fedIncomeTax = calFed(income.attr("value"));
  $(".taxSlot").text(fedIncomeTax);
};

// Calculate the tax for both federal and provincial
const calculate = async (event) => {
  event.preventDefault();

  let fedIncomeTax = 0;
  let provIncomeTax = 0;

  const year = $("#inputYear").val();
  const income = $("#inputIncome").val();
  fedIncomeTax = calFed(income);
  provIncomeTax = ontarioTax(income);

  $("#yearSlot").text(year);
  $("#taxSlot").text(fedIncomeTax);
  $("#provTax").text(provIncomeTax);

  if (year && income) {
    const response = await fetch(`/api/taxReports`, {
      method: "POST",
      body: JSON.stringify({ year, income }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return;
    } else {
      alert("Failed to create tax report");
    }
  }
};

// Handle tax report updates
const reportFormHandler = async (event) => {
  event.preventDefault();

  let fedIncomeTax = 0;
  let provIncomeTax = 0;

  const id = $("#id").val();
  const year = $("#inputYear").val();
  const income = $("#inputIncome").val();
  fedIncomeTax = calFed(income);
  provIncomeTax = ontarioTax(income);

  $("#yearSlot").text(year);
  $("#taxSlot").text(fedIncomeTax);
  $("#provTax").text(provIncomeTax);

  if (year && income) {
    const response = await fetch(`/api/taxReports/${id}`, {
      method: "PUT",
      body: JSON.stringify({ year, income }),
      mode: "cors",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      return;
    } else {
      alert("Failed to edit tax report");
    }
  }
};

$(".new-taxReport-form").submit(calculate);
$(".edit-taxReport-form").submit(reportFormHandler);
$(".tax-result").ready(display);