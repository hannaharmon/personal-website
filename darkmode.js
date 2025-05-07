let darkmode = localStorage.getItem('darkmode')
const lightSwitches = document.getElementsByClassName('light-button');
const favicon = document.getElementById('favicon')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    favicon.href = (favicon.href.includes("manychrome"))? './resources/favicon-manychrome-dark.svg' : './resources/favicon-monochrome-dark.svg'
    localStorage.setItem('darkmode', 'active')
    swapMarkerToDarkmode();
}
const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    favicon.href = (favicon.href.includes("manychrome"))? './resources/favicon-manychrome-light.svg' : './resources/favicon-monochrome-light.svg'
    localStorage.setItem('darkmode', null)
    swapMarkerToLightmode();
}

if (darkmode === "active") enableDarkmode()