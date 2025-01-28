document.addEventListener('DOMContentLoaded', function () {
    const autosuggestItemHTML = (itemHTML, option, index, searchText) => {
        const title = option._source.post_title;
        const url = option._source.permalink;
        const postType = option._source.post_type;
        const postDate = new Date(option._source.post_date).toLocaleString('en', { dateStyle: 'medium' });

        let additionalInfo = '';

        const formatDate = (dateString) => {
            const [day, month, year] = dateString.split('/');
            return new Date(`${year}-${month}-${day}`).toLocaleString('en', { dateStyle: 'medium' });
        };

        if (postType === 'event') {
            const startDate = option._source.acf && option._source.acf.start_date
                ? formatDate(option._source.acf.start_date)
                : 'No Start Date';
            additionalInfo = `<p class="search-icon calendar-icon">${startDate}</p>`;
        } else if (['post', 'page'].includes(postType)) {
            additionalInfo = `<p class="search-icon newspaper-icon">${postDate}</p>`;
        } else if (postType === 'resource' && option._source.terms && option._source.terms['resource-category']) {
            const categories = option._source.terms['resource-category'].map(cat => cat.slug);
            if (categories.includes('blog')) {
                additionalInfo = `<p class="search-icon newspaper-icon">${postDate}</p>`;
            } else {
                const resourceCategory = option._source.terms['resource-category'].map(cat => cat.name).join(', ');
                additionalInfo = `<p class="search-icon resource-icon">${resourceCategory}</p>`;
            }
        } else {
            additionalInfo = `<p class="resource-icon">No Resource Category</p>`;
        }

        return `<li class="autosuggest-item" role="option" aria-selected="false" id="autosuggest-option-${index}">
            <a href="${url}" class="autosuggest-link" data-url="${url}" tabindex="-1">
                <p class="autosuggest-title">${title}</p> 
                ${additionalInfo} 
            </a>
        </li>`;
    };

    wp.hooks.addFilter('ep.Autosuggest.itemHTML', 'myTheme/autosuggestItemHTML', autosuggestItemHTML);
});
