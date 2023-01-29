const taxInputFormHandler = async (event) => {
    event.preventDefault();

    const year = $('#inputYear').val();
    const income = $('#inputIncome').val();

    if (year && income) {
        const response = await fetch(`/api/taxReports`, {
            method: 'POST',
            body: JSON.stringify({ year, income }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/taxOutputs');
        } else {
            alert('Failed to create tax report');
        }
    }
};

const calculate = async (event) => {
    event.preventDefault();

    let fedIncomeTax = 0;

    const fedBrackets = [0,14398,50197,100392,155625,221708]
    const fedRates = [0,.15,.205,.26,.29,.33]

    const year = $('#inputYear').val();
    const income = $('#inputIncome').val();

    if (income < fedBrackets[1]) {
        // No tax
    } else if (income < fedBrackets[2]) {
        fedIncomeTax = (income - fedBrackets[1]) * fedRates[1];
    } else if (income < fedBrackets[3]) {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[2]) * fedRates[2];
    } else if (income < fedBrackets[4]) {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[3]) * fedRates[3];
    } else if (income < fedBrackets[5]) {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
        fedIncomeTax = fedIncomeTax + (fedBrackets[4] - fedBrackets[3]) * fedRates[3];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[4]) * fedRates[4];
    } else {
        fedIncomeTax = (fedBrackets[2] - fedBrackets[1]) * fedRates[1];
        fedIncomeTax = fedIncomeTax + (fedBrackets[3] - fedBrackets[2]) * fedRates[2];
        fedIncomeTax = fedIncomeTax + (fedBrackets[4] - fedBrackets[3]) * fedRates[3];
        fedIncomeTax = fedIncomeTax + (fedBrackets[5] - fedBrackets[4]) * fedRates[4];
        fedIncomeTax = fedIncomeTax + (income - fedBrackets[5]) * fedRates[5];
    }

    $('#yearSlot').text(year);
    $('#taxSlot').text(fedIncomeTax);

};

$('.new-taxReport-form').submit(calculate);

