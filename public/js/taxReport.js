// Handle tax report delete
const delButtonHandler = async (event) => {
    console.log(event.target);
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

$('.del-btn').on('click', delButtonHandler);
