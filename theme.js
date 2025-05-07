let theme = localStorage.getItem('theme')? localStorage.getItem('theme') : 'manychrome'
let themeSwitches = document.getElementsByClassName('theme-button');
const themeSheet = document.getElementById('themesheet')
const fileName = location.href.split("/").slice(-1)[0];

const goToMonochrome = () => {
    themeSheet.href = 'monochrome.css'
    favicon.href = (favicon.href.includes("dark"))? './resources/favicon-monochrome-dark.svg' : './resources/favicon-monochrome-light.svg'
    localStorage.setItem('theme', 'monochrome')
}
const goToManychrome = () => {
    themeSheet.href = 'manychrome.css'
    favicon.href = (favicon.href.includes("dark"))? './resources/favicon-manychrome-dark.svg' : './resources/favicon-manychrome-light.svg'
    localStorage.setItem('theme', 'manychrome')
}

if (theme === "monochrome") goToMonochrome()
else goToManychrome();