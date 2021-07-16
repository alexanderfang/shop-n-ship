import Swal from 'sweetalert2';

const handleError = (error) => {
    const errorMessage = error.response?.data?.error_message ? error.response.data.error_message : 'an error has occurred..';
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
    })
}

export default handleError;