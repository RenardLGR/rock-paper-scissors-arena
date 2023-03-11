let seeChartBtn = document.querySelector('.see-chart-span')
seeChartBtn.addEventListener('click', showChart)

let cpyToClipboardBtn = document.querySelector('.copy-raw-data')
cpyToClipboardBtn.addEventListener('click', cpyToClipboard)

let cpyToClipboardData

function showChart(){
    displayChart()


    let data = board.getStatLight()
    cpyToClipboardData = JSON.stringify(data)
    let xValues = data.time

    //remove prev chart
    let prevChart = document.querySelector('.chartjs-hidden-iframe')
    if(prevChart){
        prevChart.remove()
    }

    new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [{ 
            data: data.statRock,
            borderColor: "red",
            fill: false,
            label: 'Rock'
          }, { 
            data: data.statPaper,
            borderColor: "green",
            fill: false,
            label: 'Paper'
          }, { 
            data: data.statScissors,
            borderColor: "blue",
            fill: false,
            label: 'Scissors'
          }],
          xAxisID: '(s)'
        },
        // options: {
        //     scales: {
        //       x: {
        //         title: {
        //           color: 'red',
        //           display: true,
        //           text: 'time in s'
        //         }
        //       }
        //     }
        //   }
      });
}

// Copy to clipboard
function cpyToClipboard(){
    navigator.clipboard.writeText(cpyToClipboardData);
}


// DOM manipulation
function displayChart(){
    let chartSection = document.querySelector('.line-chart-section')
    chartSection.classList.remove('hidden')
}

function hideChart(){
    let chartSection = document.querySelector('.line-chart-section')
    chartSection.classList.add('hidden')
}

let closeBtn = document.querySelector('.close-button-span')
closeBtn.addEventListener('click', hideChart)

document.addEventListener('keydown', (event) => { //on ESC press, hide chart
    if (event.keyCode === 27) { //keyCode 27 is ESC
        hideChart()
    } 
})

// showChart()