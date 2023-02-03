// Hanlde account name and password updates
const accountFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-edit').value.trim();
    const password = document.querySelector('#password-edit').value.trim();
    const id = document.querySelector('#id').value;

    if (name && password) {
        const response = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify({name, password}),
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to edit account info');
        }
    }
};

document
    .querySelector('.account-form')
    .addEventListener('submit', accountFormHandler);