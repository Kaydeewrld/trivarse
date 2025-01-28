document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form.apply-job');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            submitTheJob(this);
        });
    }

    function submitTheJob(formElement) {
        const formData = new FormData();
        const fileInputs = document.querySelectorAll('.infiles');

        if (fileInputs[0]) {
            formData.append('resume', fileInputs[0].files[0]);
        }

        if (fileInputs[1]) {
            formData.append('cover_letter', fileInputs[1].files[0]);
        }

        formData.append('action', 'ajax_pagination');
        formData.append('type', 'apply-job');
        formData.append('data', new URLSearchParams(new FormData(formElement)).toString());

        const loader = document.querySelector('span.career.a-loader');
        if (loader) loader.style.display = 'inline';

        fetch(ajaxpagination.ajaxurl, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formElement.reset();
                    const successMessage = document.createElement('p');
                    successMessage.className = 'gh-success success';
                    successMessage.innerHTML = 'Your application was successfully submitted. Thank you! Take a look at our <a href="/resources">Resources</a>';
                    formElement.appendChild(successMessage);
                } else if (data.errors) {
                    const existingErrors = document.querySelectorAll('.gh-error, .gh-success');
                    existingErrors.forEach(error => error.remove());

                    data.errors.forEach((error, index) => {
                        const field = document.querySelector(`.isvalid_${error}`);
                        if (field) {
                            const errorMessage = document.createElement('span');
                            errorMessage.className = 'gh-error error';
                            errorMessage.textContent = data.errors.length === 1 ? 'required field or not valid' : 'required field';
                            field.appendChild(errorMessage);

                            if (index === 0) {
                                window.scrollTo({
                                    top: field.offsetTop - 180,
                                    behavior: 'smooth',
                                });
                            }
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                if (loader) loader.style.display = 'none';
            });
    }
});
