function Slider(slider) {
    if (!slider instanceof Element) {
        throw new Error('No slider passed in');
    }
    // creat some variables for working with the slider
    this.slider = slider;
    // select the elements needed for the slider
    this.slides = this.slider.querySelector('.slides');
    const prevButton = this.slider.querySelector('.goToPrev');
    const nextButton = this.slider.querySelector('.goToNext');

    this.startSlider();
    this.applyClasses();

    // Future functions    
    prevButton.addEventListener('click', () => this.move('back'));
    nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function() {
    this.current = this.slider.querySelector('.current') || this.slides.firstElementChild;
    this.prev = this.current.previousElementSibling || this.slides.lastElementChild;
    this.next = this.current.nextElementSibling || this.slides.firstElementChild;
}

Slider.prototype.applyClasses = function() {
    this.current.classList.add('current');
    this.prev.classList.add('prev');
    this.next.classList.add('next');
}

Slider.prototype.move = function(direction) {
    // first part of the move function, delete all the classes from the element
    const classesToRemove = ['prev', 'current', 'next'];
    this.prev.classList.remove(...classesToRemove);
    this.current.classList.remove(...classesToRemove);
    this.next.classList.remove(...classesToRemove);

    if (direction === "back") {
        // Swap the variable when we go backwards
        [prev, current, next] = [
            this.prev.previousElementSibling || this.slides.lastElementChild,
            this.prev,
            this.current,
        ];
    } else {
        // Do the opposite if we go forwards
        [this.prev, this.current, this.next] = [
            this.current,
            this.next,
            this.next.nextElementSibling || this.slides.firstElementChild,
        ];
    }
    this.applyClasses();
}

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);

window.dogSlider = dogSlider;

window.addEventListener('keyup', function(e) {
    if (e.key === "ArrowRight") {
        dogSlider.move();
    } else if (e.key === "ArrowLeft") {
        dogSlider.move('back')
    }
})