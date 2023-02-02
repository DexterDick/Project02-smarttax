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

// const selectReportHandler = async (event) => {
//     console.log(event.target);
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');
//         console.log(id);

//         const response = await fetch(`/api/taxReports/${id}`, {
//             method: 'GET',
//         });

//         if (response.ok) {
//             // document.location.replace('/taxInputs');
//         } else {
//             alert('Failed to find tax report');
//         }
//     }
// };



// document
//     .querySelector('.report-records')
//     .addEventListener('click', delButtonHandler);
$('.del-btn').on('click', delButtonHandler);

// $('.report-link').on('click', selectReportHandler);