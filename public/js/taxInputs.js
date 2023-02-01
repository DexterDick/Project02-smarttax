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

document
    .querySelector('.new-taxReport-form')
    .addEventListener('submit', taxInputFormHandler);
