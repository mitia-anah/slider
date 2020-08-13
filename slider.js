function Slider(slider) {
    if (!slider instanceof Element) {
        throw new Error('No slider passed in');
    }
    // creat some variables for working with the slider
    let current;
    let prev;
    let next;

    // select the elements needed for the slider
    const slides = slider.querySelector('.slides');
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');

    // Future functions
    function startSlider() {
        current = slider.querySelector('.current') || slides.firstElementChild;
        prev = current.previousElementSibling || slides.lastElementChild;
        next = current.nextElementSibling || slides.firstElementChild;
    }

    function applyClasses() {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
    }

    function move(direction) {
        // first part of the move function, delete all the classes from the element
        const classesToRemove = ['prev', 'current', 'next'];
        prev.classList.remove(...classesToRemove);
        current.classList.remove(...classesToRemove);
        next.classList.remove(...classesToRemove);
        if (direction === "back") {
            // Swap the variable when we go backwards
            [prev, current, next] = [
                prev.previousElementSibling || slides.lastElementChild,
                prev,
                current
            ];
        } else {
            // Do the opposite if we go forwards
            [prev, current, next] = [
                current,
                next.
                nextElementSibling || slides.firstElementChild,
            ];
        }
        applyClasses();
    }

    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', move);

    startSlider();
    applyClasses();

}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));