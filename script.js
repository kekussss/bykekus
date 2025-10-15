// Ожидаение загрузки HTML страницы перед выполнением скрипта
document.addEventListener('DOMContentLoaded', function() {
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
        threshold: 0.08, // Анимация запускается при видимости 10% элемента
        rootMargin: '0px 0px -50px 0px' // отступ для красивой анимации
    });

    // поиск элементов (блоков) с указанными классами
    const elementsToObserve = document.querySelectorAll('.recent-article-block, .space-between-blocks, .article-list-header, .article-title, .article-body, .hero-image--top, .hero-image--bottom, .color-overlay--white, .about-hero p, .quote-block, .contact-me-block');
    
    // подключение наблюдателя к найденным элементам (блокам)
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});