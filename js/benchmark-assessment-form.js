document.addEventListener("DOMContentLoaded", () => {
    const updateProgress = () => {
        const formContainer = document.querySelector(".wpforms-container");
        const progressIndicator = document.querySelector(".benchmark-assessment__progress-percentage");
        const formPages = formContainer ? formContainer.querySelectorAll(".wpforms-page") : [];

        if (!formContainer || !progressIndicator || formPages.length === 0) return;

        const activePage = Array.from(formPages).find(page =>
            page.classList.contains("wpforms-page-active") || page.style.display !== "none"
        );

        if (!activePage) return;

        const totalSteps = formPages.length;
        const pageClass = Array.from(activePage.classList).find(cls =>
            cls.startsWith("wpforms-page-")
        );
        const currentPageNumber = pageClass
            ? parseInt(pageClass.replace("wpforms-page-", ""), 10) || 1
            : 1;

        const progressPercentageValue = Math.round(((currentPageNumber - 1) / totalSteps) * 100);
        progressIndicator.textContent = `${progressPercentageValue}% Complete`;
    };

    const observePageChanges = () => {
        const formContainer = document.querySelector(".wpforms-container");

        if (!formContainer) {
            return;
        }

        const observer = new MutationObserver(() => {
            setTimeout(updateProgress, 50);
        });

        observer.observe(formContainer, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["class", "style"],
        });

        document.addEventListener("wpformsPageChange", () => {
            updateProgress();
        });
    };

    const init = () => {
        updateProgress();
        observePageChanges();
    };

    if (document.querySelector(".wpforms-container")) {
        init();
    } else {
        const interval = setInterval(() => {
            if (document.querySelector(".wpforms-container")) {
                clearInterval(interval);
                init();
            }
        }, 100);
    }
});