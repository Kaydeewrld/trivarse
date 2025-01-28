document.addEventListener('DOMContentLoaded', function () {

    const searchInputs = document.querySelectorAll('.search-label input');
    const clearBtns = document.querySelectorAll('.clear-btn');

    searchInputs.forEach((input, index) => {
        const clearBtn = clearBtns[index];

        input.addEventListener('input', () => {
            if (input.value) {
                clearBtn.style.display = 'inline';
            } else {
                clearBtn.style.display = 'none';
            }
        });

        clearBtn.addEventListener('click', () => {
            input.value = '';
            clearBtn.style.display = 'none';
            input.focus();
        });
    });
})