document.addEventListener('DOMContentLoaded', () => {
    const pagination = document.querySelector('.pagination');
    const burgerMenu = document.querySelector('.burger-menu');
    const navRight = document.querySelector('.nav-right');
    const scrollableContainer = document.querySelector('.nav-right-scrollable');
    const navShadow = document.querySelector('.nav-shadow');

    // Pagination: Handle page link click events
    pagination.addEventListener('click', (event) => {
        const clickedLink = event.target.closest('.page, .prev, .next');
        if (!clickedLink) return;

        event.preventDefault();

        if (clickedLink.classList.contains('page')) {
            updateActivePage(clickedLink);
        } else if (clickedLink.classList.contains('prev')) {
            navigatePage('prev');
        } else if (clickedLink.classList.contains('next')) {
            navigatePage('next');
        }
    });

    // Burger Menu functionality
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navRight.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (!burgerMenu.contains(event.target) && !navRight.contains(event.target)) {
            burgerMenu.classList.remove('active');
            navRight.classList.remove('show');
        }
    });

    // Scroll shadow toggle functionality
    scrollableContainer.addEventListener('scroll', () => {
        const isEndOfScroll = scrollableContainer.scrollLeft >= 
            scrollableContainer.scrollWidth - scrollableContainer.clientWidth - 1;
        navShadow.style.display = isEndOfScroll ? 'none' : 'block';
    });

    // Function to update active page
    function updateActivePage(clickedLink) {
        pagination.querySelectorAll('.page').forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }

    // Function to navigate to previous or next page
    function navigatePage(direction) {
        const activeLink = pagination.querySelector('.page.active');
        const siblingLink = direction === 'prev' ? activeLink.previousElementSibling : activeLink.nextElementSibling;
        
        if (siblingLink && siblingLink.classList.contains('page')) {
            updateActivePage(siblingLink);
        }
    }
});
