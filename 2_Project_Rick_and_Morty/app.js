function slidesPlugin(activeSlideOnLoad) {
    const slides = document.querySelectorAll('.box')

    slides[activeSlideOnLoad].classList.add('active')

    for (const slide of slides) {
        slide.addEventListener('click', (el) => {
            if (el.target.classList.contains('active') === true) {
                slide.classList.remove('active')
            } else {
                clearActiveClasses()
                slide.classList.add('active')
            }
        })
    }

    function clearActiveClasses() {
        slides.forEach((slide) => {
            slide.classList.remove('active')
        })
    }
}

slidesPlugin(2)
