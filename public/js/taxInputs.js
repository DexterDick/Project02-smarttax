const taxInputFormHandler = async (event) => {
    event.preventDefault();

    const year = document.querySelector('#inputYear').value.trim();
    const income = document.querySelector('#inputIncome').value.trim();

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

    const year = document.querySelector('#inputYear').value.trim();
    const income = document.querySelector('#inputIncome').value.trim();

    document.querySelector('#outputYear').value = year;
    document.querySelector('#outputIncome').value = income;

};

document
    .querySelector('.new-taxReport-form')
    .addEventListener('submit', taxInputFormHandler);

document
    .querySelector('#submit')
    .addEventListener('click', calculate);
