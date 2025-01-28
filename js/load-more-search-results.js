document.addEventListener('DOMContentLoaded', () => {
    const loadMoreButton = document.getElementById('load-more-search-link');
    const searchInput = document.getElementById('main-search');
    const searchResultsDiv = document.getElementById('search-results-div-main');

    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', (e) => {
            e.preventDefault();

            let page = parseInt(loadMoreButton.dataset.page, 10);
            const maxPages = parseInt(loadMoreButton.dataset.max, 10);
            const searchQuery = searchInput ? searchInput.value : '';

            loadMoreButton.textContent = 'Loading...';

            fetch('/wp-admin/admin-ajax.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'load_more_search_results',
                    page: page,
                    s: searchQuery,
                }),
            })
                .then((response) => response.text())
                .then((data) => {
                    if (data) {
                        searchResultsDiv.insertAdjacentHTML('beforeend', data);
                        page++;
                        loadMoreButton.dataset.page = page;
                        loadMoreButton.textContent = 'Load More';

                        if (page > maxPages) {
                            loadMoreButton.remove();
                        }
                    } else {
                        loadMoreButton.remove();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    loadMoreButton.textContent = 'Load More';
                });
        });
    }
});
