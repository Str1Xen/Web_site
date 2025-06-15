document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.querySelector('.burger');
    const body = document.querySelector('body');
    const mainContent = document.getElementById('main-content'); // Основний контент сторінки
    const detailPages = document.querySelectorAll('.detail-page');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Функція для перемикання навігації на мобільних
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Заборона прокрутки сторінки, коли меню відкрите
        if (navLinks.classList.contains('nav-active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });

    // Функція для показу детальної сторінки
    function showDetailPage(pageId) {
        // Приховуємо всі детальні сторінки на випадок, якщо якась вже відкрита
        detailPages.forEach(page => {
            page.classList.remove('active');
        });

        // Знаходимо і показуємо потрібну сторінку
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            body.style.overflow = 'hidden'; // Заборонити прокрутку основної сторінки
            mainContent.style.opacity = '0'; // Зробити головний контент прозорим
            mainContent.style.pointerEvents = 'none'; // Заборонити взаємодію з головним контентом
            
            // Якщо відкривається "Головна" через меню, то головний контент стає видимим
            if (pageId === 'hero') {
                mainContent.style.opacity = '1';
                mainContent.style.pointerEvents = 'auto';
            }
        }
    }

    // Функція для приховування детальної сторінки
    function hideDetailPage(pageId) {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove('active');
            body.style.overflow = 'auto'; // Дозволити прокрутку основної сторінки
            mainContent.style.opacity = '1'; // Повернути видимість головного контенту
            mainContent.style.pointerEvents = 'auto'; // Дозволити взаємодію
        }
    }

    // Обробник кліків для навігаційних посилань
    document.querySelectorAll('nav .nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Запобігаємо стандартній поведінці посилання

            const pageId = this.dataset.page; // Отримуємо ID сторінки з data-атрибута

            // Закриваємо мобільне меню, якщо воно відкрите
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                // Прокрутку body повернемо після відкриття/закриття детальної сторінки
            }

            if (pageId === 'hero') { // Якщо це "Головна"
                // Приховуємо всі детальні сторінки
                detailPages.forEach(page => {
                    page.classList.remove('active');
                });
                body.style.overflow = 'auto'; // Дозволяємо прокрутку
                mainContent.style.opacity = '1'; // Робимо головний контент видимим
                mainContent.style.pointerEvents = 'auto';
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Прокручуємо до верху
            } else {
                showDetailPage(pageId);
            }
        });
    });

    // Обробник кліків для кнопок "Дізнатися більше" на головній сторінці
    document.querySelectorAll('[data-open-page]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.dataset.openPage;
            showDetailPage(pageId);
        });
    });


    // Обробник кліків для кнопок закриття
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentPage = this.closest('.detail-page');
            if (parentPage) {
                hideDetailPage(parentPage.id);
            }
        });
    });

    // Додатково: закриття сторінки по Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape") {
            const activePage = document.querySelector('.detail-page.active');
            if (activePage) {
                hideDetailPage(activePage.id);
            }
        }
    });

    // Ініціалізація: при завантаженні сторінки переконатися, що показана головна
    showDetailPage('hero'); // Показуємо Hero section (яка тепер є частиною main-content)
});