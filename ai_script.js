document.querySelector('.light-button').addEventListener('click', () => {
    let darkmode = localStorage.getItem('darkmode');
    if (darkmode !== "active") {
        enableDarkmode();
    } else {
        disableDarkmode();
    }
});
