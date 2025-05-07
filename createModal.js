// modal html
// note: modal css in individual stylesheets
export default function createModal() {
    document.querySelector('body').insertAdjacentHTML('beforeend', `
    <div class="modal-container" aria-modal="true" role="dialog" hidden="true">
        <div class="modal-overlay">
            <div class="modal-button-container">
                <button class="icon-button modal-button modal-arrow modal-arrow-left" id="left" aria-label="Previous image">
                    <svg id="left" class="arrow-left shadow" width="191" height="243" viewBox="0 0 191 243" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path vector-effect="non-scaling-stroke" d="M191 243L0 121.5L191 0V243Z" fill="currentColor"/>
                    </svg>
                    <svg id="left" class="arrow-left icon" width="191" height="243" viewBox="0 0 191 243" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path vector-effect="non-scaling-stroke" d="M191 243L0 121.5L191 0V243Z" fill="currentColor"/>
                    </svg>
                </button>
                <button class="icon-button modal-button modal-close" aria-label="Close gallery">
                    <svg class="close shadow" width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path vector-effect="non-scaling-stroke" d="M33.6838 240L0 206.484L86.6155 119.701L0 33.5162L33.6838 0L120.299 86.5496L206.316 0L240 33.5162L153.385 119.701L240 206.484L206.316 240L120.299 153.45L33.6838 240Z" fill="currentColor"/>
                    </svg>
                    <svg class="close icon" width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path vector-effect="non-scaling-stroke" d="M33.6838 240L0 206.484L86.6155 119.701L0 33.5162L33.6838 0L120.299 86.5496L206.316 0L240 33.5162L153.385 119.701L240 206.484L206.316 240L120.299 153.45L33.6838 240Z" fill="currentColor"/>
                    </svg>
                </button>
                <button class="icon-button modal-button modal-arrow modal-arrow-right" id="right" aria-label="Previous image">
                    <svg id="right" class="arrow-right shadow" width="191" height="243" viewBox="0 0 191 243" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path vector-effect="non-scaling-stroke" d="M3.8147e-06 -7.62939e-06L191 121.5L3.8147e-06 243L3.8147e-06 -7.62939e-06Z" fill="currentColor"/>
                    </svg>
                    <svg id="right" class="arrow-right icon" width="191" height="243" viewBox="0 0 191 243" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path vector-effect="non-scaling-stroke" d="M3.8147e-06 -7.62939e-06L191 121.5L3.8147e-06 243L3.8147e-06 -7.62939e-06Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>

            <div class="modal-indicator-container">
                <button class="icon-button modal-indicator active">
                    <svg class="indicator shadow" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
                    </svg>
                    <svg class="indicator icon" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
                    </svg>
                </button>
                <button class="icon-button modal-indicator">
                    <svg class="indicator shadow" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
                    </svg>
                    <svg class="indicator icon" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
                    </svg>
                </button>
                <button class="icon-button modal-indicator">
                    <svg class="indicator shadow" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
                    </svg>
                    <svg class="indicator icon" width="196" height="193" viewBox="0 0 196 193" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse vector-effect="non-scaling-stroke" cx="98" cy="96.5" rx="98" ry="96.5" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="modal">
            <div class="modal-image-container">
            </div>
        </div>
    </div>
    `)
}