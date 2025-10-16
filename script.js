// Ожидание загрузки HTML страницы перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
    // === СОХРАНЕНИЕ МАСШТАБА СТРАНИЦЫ ===
    // Применяем сохраненный масштаб при загрузке страницы
    const savedZoom = localStorage.getItem('pageZoom');
    if (savedZoom) {
        document.body.style.zoom = savedZoom;
    }

    // Сохраняем масштаб при его изменении (через Ctrl+/Ctrl-)
    let zoomSaveTimeout;
    window.addEventListener('resize', function() {
        // Используем таймаут для предотвращения частых записей в localStorage
        clearTimeout(zoomSaveTimeout);
        zoomSaveTimeout = setTimeout(function() {
            // Получаем текущий масштаб из computed style
            const currentZoom = document.body.style.zoom || '1';
            localStorage.setItem('pageZoom', currentZoom);
        }, 500);
    });

    // Дополнительно: отслеживаем комбинации клавиш Ctrl+ и Ctrl-
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
            setTimeout(function() {
                const currentZoom = document.body.style.zoom || '1';
                localStorage.setItem('pageZoom', currentZoom);
            }, 100);
        }
    });

    // === СУЩЕСТВУЮЩИЙ КОД ===
    // Добавляем появление блока hero через 1 секунду
    setTimeout(function() {
        const timeoutElementsToAppear = document.querySelectorAll('.article-block, .image-with-caption');
        timeoutElementsToAppear.forEach(element => {
            element.classList.add('loaded');
        });
    }, 800);

    // Создаем наблюдателя
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
        threshold: 0.01, // Анимация запускается при видимости 5% элемента
        rootMargin: '0px 0px -50px 0px' // отступ для красивой анимации
    });

    // поиск элементов (блоков) с указанными классами
    const elementsToObserve = document.querySelectorAll('.recent-article-block, .space-between-blocks, .article-list-header, .article-title, .article-body, .hero-image--top, .hero-image--bottom, .color-overlay--white, .about-hero p, .quote-block, .contact-me-block');
    
    // подключение наблюдателя к найденным элементам (блокам)
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});