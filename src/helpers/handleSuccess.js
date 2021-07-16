import Swal from 'sweetalert2';

const handleSuccess = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Yeay!',
        text: message,
    })
}

export default handleSuccess;