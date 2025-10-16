// Ожидание загрузки HTML страницы перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
    // Сохранение масштаба при переходе между страницами
    // данные о масштабе сохраняются во внутреннее хранилище браузера - localStorage.
    const savedZoom = localStorage.getItem('pageZoom');
    // Если значение было сохранено ранее, то применяем его к текущей странице
    if (savedZoom) {
        document.body.style.zoom = savedZoom;
    }

    // Сохраняем масштаб при его изменении
    let zoomSaveTimeout; // Хранение таймера, который будет предотвращать частые вызывы функции
    window.addEventListener('resize', function() {
        // Используем таймаут для предотвращения частых записей в localStorage
        clearTimeout(zoomSaveTimeout);
        zoomSaveTimeout = setTimeout(function() {
            // Получаем текущий масштаб
            const currentZoom = document.body.style.zoom || '1';
            // Сохраняем его
            localStorage.setItem('pageZoom', currentZoom);
        }, 500); // Задержка в 500мс
    });

    // Отслеживаем изменения разрешения
    document.addEventListener('keydown', function(e) {
        // Фиксируем нажатие клавиш
        if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) { 
            setTimeout(function() {
                const currentZoom = document.body.style.zoom || '1';
                localStorage.setItem('pageZoom', currentZoom);
            }, 100);
        }
    });

    // Создаем наблюдателя, который контроллирует положение пользователя на странице
    const observer = new IntersectionObserver((entries) => {
        // Для каждого элемента, появляющегося в поле видимости добавляем класс appear, запускающий анимацию
        entries.forEach(entry => {
            if (entry.isIntersecting) 
            {
                entry.target.classList.add('appear');
            }
        });
    }, {
        // параметры
        threshold: 0.01, // Анимация запускается при видимости 1% элемента
        rootMargin: '0px 0px -50px 0px' // отступ для красивой анимации
    });

    // поиск элементов (блоков) с указанными классами
    const elementsToObserve = document.querySelectorAll('.recent-article-block, .space-between-blocks, .article-list-header, .article-title, .article-body, .hero-image--top, .hero-image--bottom, .color-overlay--white, .about-hero p, .quote-block, .contact-me-block');
    
    // подключение наблюдателя к найденным элементам (блокам)
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });

    // Добавляем появление указанных блоков через 0.8 секунд (аналогично работе sleep в плюсах)
    setTimeout(function() {
        // Поиск блоков с указанными классами
        const timeoutElementsToAppear = document.querySelectorAll('.article-block, .image-with-caption');
        // Каждый элемент с указанным классом получает класс loaded, который появляет элемент через 0.8 секунд после загрузки страницы
        timeoutElementsToAppear.forEach(element => {
            element.classList.add('loaded');
        });
    }, 800);


});