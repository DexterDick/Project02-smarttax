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

const display = (event) => {
  let fedIncomeTax = 0;

  const income = $(".inputIncome");
  fedIncomeTax = calFed(income.attr("value"));
  $(".taxSlot").text(fedIncomeTax);
};

const calculate = async (event) => {
  event.preventDefault();

  let fedIncomeTax = 0;

  const year = $("#inputYear").val();
  const income = $("#inputIncome").val();
  fedIncomeTax = calFed(income);

  $("#yearSlot").text(year);
  $("#taxSlot").text(fedIncomeTax);

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

const reportFormHandler = async (event) => {
  event.preventDefault();

  let fedIncomeTax = 0;

  const year = $("#inputYear").val();
  const income = $("#inputIncome").val();
  const id = $("#id").val();
  fedIncomeTax = calFed(income);

  $("#yearSlot").text(year);
  $("#taxSlot").text(fedIncomeTax);

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
