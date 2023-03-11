class Stat {
    constructor(nRock, nPaper, nScissors){
        //Keep track of the number of each pieces, each movements adds one
        this.historyTotal //never used
        this.historyNRock = [nRock]
        this.historyNPaper = [nPaper]
        this.historyNScissors = [nScissors]
    }

    // Get curr
    getCurrNRock(){
        return this.historyNRock[this.historyNRock.length-1]
    }

    getCurrNPaper(){
        return this.historyNPaper[this.historyNPaper.length-1]
    }

    getCurrNScissors(){
        return this.historyNScissors[this.historyNScissors.length-1]
    }

    // Get History
    getHistoryNRock(){
        return this.historyNRock
    }

    getHistoryNPaper(){
        return this.historyNPaper
    }

    getHistoryNScissors(){
        return this.historyNScissors
    }

    // Add new val
    addNRock(newVal){
        this.historyNRock.push(newVal)
    }

    addNPaper(newVal){
        this.historyNPaper.push(newVal)
    }

    addNScissors(newVal){
        this.historyNScissors.push(newVal)
    }

    // Update last Val
    updateCurrNRock(updatedVal){
        this.historyNRock[this.historyNRock.length-1] = updatedVal
    }

    updateCurrNPaper(updatedVal){
        this.historyNPaper[this.historyNPaper.length-1] = updatedVal
    }

    updateCurrNScissors(updatedVal){
        this.historyNScissors[this.historyNScissors.length-1] = updatedVal
    }


    // DOM manipulation
    updateDOMStat(){
        this.updateSpans()
        this.updateBars()
    }

    updateSpans(){
        let totalSpan = document.querySelector('.all-type-total-value-span')
        let rockSpan = document.querySelector('.bar-chart-total-span.bar-rock')
        let paperSpan = document.querySelector('.bar-chart-total-span.bar-paper')
        let scissorsSpan = document.querySelector('.bar-chart-total-span.bar-scissors')

        totalSpan.innerText = this.getCurrNRock() + this.getCurrNPaper() + this.getCurrNScissors()
        rockSpan.innerText = this.getCurrNRock()
        paperSpan.innerText = this.getCurrNPaper()
        scissorsSpan.innerText = this.getCurrNScissors()
    }

    updateBars(){
        //max width is 200 px, i.e. if 100% of pieces are of 1 type, the bar will be 200px wide

        let rockBar = document.querySelector('.bar-chart-bar.bar-rock')
        let paperBar = document.querySelector('.bar-chart-bar.bar-paper')
        let scissorsBar = document.querySelector('.bar-chart-bar.bar-scissors')

        let total = this.getCurrNRock() + this.getCurrNPaper() + this.getCurrNScissors()

        let rockWidth = Math.floor(200 * this.getCurrNRock()/total)
        let paperWidth = Math.floor(200 * this.getCurrNPaper()/total)
        let scissorsWidth = Math.floor(200 * this.getCurrNScissors()/total)

        rockBar.style.width = rockWidth + 'px'
        paperBar.style.width = paperWidth + 'px'
        scissorsBar.style.width = scissorsWidth + 'px'
    }
}