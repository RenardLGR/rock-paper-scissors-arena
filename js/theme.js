// This file will change styles between dark and white themes.

let themeSwitchBtn = document.getElementById('theme-switch-checkbox')
themeSwitchBtn.addEventListener('change', switchTheme)

function switchTheme(e){
    let isDarkTheme = e.target.classList.contains('dark-theme')

    isDarkTheme ? turnToLightTheme() : turnToDarkTheme()
}


function turnToLightTheme(){
    let htmlAndBody = document.querySelectorAll('html, body')
    htmlAndBody.forEach(el => {
        el.style.backgroundColor = 'white'
        el.style.color = 'black'
    })

    themeSwitchBtn.classList.remove('dark-theme')
    themeSwitchBtn.classList.add('light-theme')

    board.turnToLightTheme()
}

function turnToDarkTheme(){
    let htmlAndBody = document.querySelectorAll('html, body')
    htmlAndBody.forEach(el => {
        el.style.backgroundColor = 'rgb(32, 33, 36)'
        el.style.color = 'white'
    })

    themeSwitchBtn.classList.remove('light-theme')
    themeSwitchBtn.classList.add('dark-theme')
    
    board.turnToDarkTheme()
}