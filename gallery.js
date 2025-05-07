// create modal (insert the actual html)
import createModal from './createModal.js'
createModal();

// global query selectors
const nonModalFocusables = document.querySelectorAll('button:not(.modal-container *), a:not(.modal-container *)');
const modalFocusables = document.querySelectorAll('.modal button');
const modalImageTrack = document.querySelector('.modal-image-container');
const indicatorContainer = document.querySelector('.modal-indicator-container');
const body =  document.querySelector('body');

let galleries;

// shared between all galleries
let transitionSpeed;

// for each gallery
let modalImages;
let modalIndicators;
let currentIndex;
let lastIndex;
let isMoving = false;

// store body styles
const bodyOverflow = body.style.overflow;
const bodyHeight = body.style.height;

// modal functionality
class Modal {
    constructor(container) {
        this.container = container
        this.attachEventListeners();
    }
    openModal() {
        body.style.overflow = 'hidden';    
        body.style.height = '100%';
        nonModalFocusables.forEach((elem) => {
            elem.tabIndex = '-1';
        });
        modalFocusables.forEach((elem) => {
            elem.tabIndex = '0';
        })
        this.container.removeAttribute('hidden');
        this.container.classList.add('active');
    }
    closeModal() {
        body.style.overflow = bodyOverflow;    
        body.style.height = bodyHeight;
        nonModalFocusables.forEach((elem) => {
            elem.tabIndex = '0';
        });
        modalFocusables.forEach((elem) => {
            elem.tabIndex = '-1';
        })
        this.container.setAttribute('hidden', 'true');
        this.container.classList.remove('active');
        modalImageTrack.style.transition = 'none';
        isMoving = false;
    }
    attachEventListeners() {
        // close modal by clicking in the background
        this.container.addEventListener('click', (e) => {
            e.target === e.currentTarget || e.target.classList.contains('modal-close') ||  e.target.classList.contains('close')? this.closeModal() : null;
        });
    }
}

const modalContainer = document.querySelector('.modal-container');
const modal = new Modal(modalContainer);
modal.closeModal();

function updateActiveIndicator() {
    modalIndicators.forEach((i) => {
        i.classList.remove('active');
    });
    switch (currentIndex) {
        case modalIndicators.length - 1:
            modalIndicators[modalIndicators.length-1].classList.add('active');
            break;
        case modalIndicators.length + modalIndicators.length:
            modalIndicators[0].classList.add('active');
            break;
        default:
            modalIndicators.find((i) => i.dataset.index == currentIndex - modalIndicators.length).classList.add('active');
            break;
    }
}

function moveGallery() {
    modalImageTrack.style.transform = `translateX(${currentIndex * -103}%)`;
    updateActiveIndicator()   // update indicators
}

function processGalleryImages(imageArray) {
    // add images to track
    modalImageTrack.innerHTML = [...imageArray, ...imageArray, ...imageArray].map((img) => {
        return `<img class="modal-image" src="${img.src}" alt="${img.alt}">`;
    }).join('');

    // add indicators to indicator container
    indicatorContainer.innerHTML = imageArray.map((img, index) => {
        return (
            `<button class="icon-button modal-indicator" data-index="${index}">
            <svg data-index="${index}" class="indicator shadow" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
            </svg>
            <svg data-index="${index}" class="indicator icon" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
            </svg>
            </button>`
        );
    }).join('');

    return [[...document.querySelectorAll('.modal-image')], [...document.querySelectorAll('.modal-indicator')]];
}

// update single-gallery values based on which gallery we want to see
function updateGallery(galleryImages) {
    [modalImages, modalIndicators] = processGalleryImages(galleryImages);
    currentIndex = modalIndicators.length;
    lastIndex = modalImages.length;
    moveGallery();  // start on first image
}

// event listeners
function attachGalleryButtonEventListeners() {
    document.querySelectorAll('[data-modal="true"]').forEach((button) => {
        button.addEventListener('click', () => {
            updateGallery(galleries.find((g) => g.name === button.dataset.gallery).images);
            modal.openModal();
        })
    })
}
function attachArrowEventListeners() {
    document.querySelectorAll('.modal-arrow').forEach((button) => {
        button.addEventListener('click', (e) => {
            if (isMoving === true) return;
            isMoving = true;
            modalImageTrack.style.transition = `transform ${transitionSpeed}ms ease-in-out`;
            e.target.id === 'right' ? currentIndex++ : currentIndex--;
            moveGallery();
        })
    })
}
function attachIndicatorEventListeners() {
    indicatorContainer.addEventListener('click', (e) => {
        if (e.currentTarget === e.target) return;
        if (isMoving === true) return;
        isMoving = true;
        modalImageTrack.style.transition = `transform ${transitionSpeed}ms ease-in-out`;
        currentIndex = Number(e.target.dataset.index) + modalIndicators.length;
        moveGallery();
    })
}
function attachTransitionEndListener() {
    modalImageTrack.addEventListener('transitionend', () => {
        isMoving = false;
        if (currentIndex === modalIndicators.length-1) {    // If before first visible image
            modalImageTrack.style.transition = 'none';
            currentIndex = lastIndex - modalIndicators.length - 1;  // Skip to last visible image
            moveGallery();
        }
        if (currentIndex === lastIndex - modalIndicators.length) {      // If after last visible image
            modalImageTrack.style.transition = 'none';
            currentIndex = modalIndicators.length;  // Skip to first visible image
            moveGallery();
        }
    })
}

window.addEventListener('keyup', (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains('active')) {
        modal.closeModal();
    }
})

// init gallery
export default async function initGallery(endpoint, options) {
    await fetch(endpoint)
    .then ((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        galleries = data;
        transitionSpeed = options?.speed || 250;
        attachGalleryButtonEventListeners();
        attachArrowEventListeners();
        attachIndicatorEventListeners();
        attachTransitionEndListener();
    })
    .catch((error) => {
        console.error('There has been a probelm with your fetch operation:', error);
    })
}