const newFormHandler = async (event) => {
    event.preventDefault();

    const year = document.querySelector('#taxReport-year').value.trim();
    const income = document.querySelector('#taxReport-income').value.trim();

    if (year && income) {
        const response = await fetch(`/api/taxReports`, {
            method: 'POST',
            body: JSON.stringify({ year, income }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/account');
        } else {
            alert('Failed to create tax report');
        }
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/taxReports/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/account');
        } else {
            alert('Failed to delete tax report');
        }
    }
};

document
    .querySelector('.new-taxReport-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.taxReport-list')
    .addEventListener('click', delButtonHandler);
