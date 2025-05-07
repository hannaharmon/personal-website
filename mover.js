// move cards (manychrome)
const observer = new IntersectionObserver((entries) => {
    // Runs when the visibility of one of the observed elements changes
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    })
})

const hidden = document.querySelectorAll('.hidden')
hidden.forEach((e) => observer.observe(e))
