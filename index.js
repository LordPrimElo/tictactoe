const gameboard = (function() {

    // document.Elements
    const restart = document.getElementById("restart")
    const grid = document.getElementById("grid")
    const congrats = document.getElementById("congrats")
    
    // Factory
    const playerFactory = ((name, mark, turn) => {
        return { name, mark, turn }
    })

    // Constants
    const p1 = playerFactory(1, "X", true)
    const p2 = playerFactory(2, "O", false)

    const winCombos = [
        ["0","1","2"],
        ["0","3","6"],
        ["3","4","5"],
        ["6","7","8"],
        ["1","4","7"],
        ["2","4","6"],
        ["2","5","8"],
        ["0","4","8"]
    ]
    
    
    let xArr = []
    let oArr = []
    let boardArr = [null, null, null, null, null, null, null, null, null]
    let winner = null


    // Helper Functions
    Array.prototype.containsWinCombo = function(sArr) {
        if (sArr.indexOf(this[0]) !== -1 && sArr.indexOf(this[1]) !== -1 && sArr.indexOf(this[2]) !== -1) {
            return true
        } else {
            return false
        }
    }

    Array.prototype.isFull = function() {
        let isNull = false;

        for(i = 0; i < this.length; i++){
            if(this[i] == null){
                isNull = true;
            }
        }

        if(isNull === false){
            return true
        } else {
            return false
        }
    }


    const winCheck = (e) => {

        if (e.target.textContent == "X") {
            xArr.push(e.target.id)
            winCombos.forEach(winCombo => {
                if (winCombo.containsWinCombo(xArr)) {
                    winner = p1
                    displayWinner(p1)
                }                
            })

        }

        if (e.target.textContent == "O") {
            oArr.push(e.target.id)
            winCombos.forEach(winCombo => {
                if (winCombo.containsWinCombo(oArr)) {
                    winner = p2
                    displayWinner(p2)
                }                
            })

        }     
        
        if (boardArr.isFull()) {
            grid.classList.add("hidden")
            congrats.classList.remove("hidden")
            congrats.innerText = "Lol noobs, it's a damn draw"
            restart.classList.remove("hidden")
        }
    }

    const displayWinner = (player) => {



        const { name } = player

        if (name === p1.name) {
            grid.classList.add("hidden")
            congrats.classList.remove("hidden")
            congrats.innerText = "Congrats P1"
        } else if (name === p2.name) {
            grid.classList.add("hidden")
            congrats.classList.remove("hidden")
            congrats.innerText = "Congrats P2"
        }

        restart.classList.remove("hidden")
    }
    
    // Player Turn IIFE
    (() => {
        const boxes = document.querySelectorAll(".box")

        boxes.forEach(box => {
            box.addEventListener("click", e => {
                if (p1.turn && !winner && !e.target.textContent) {

                    e.target.textContent = p1.mark

                    boardArr[e.target.id] = p1.mark

                    p1.turn = false
                    p2.turn = true

                    // console.log(boardArr)

                    winCheck(e)

                } else if (p2.turn && !winner && !e.target.textContent) {
                    e.target.textContent = p2.mark

                    boardArr[e.target.id] = p2.mark

                    p1.turn = true
                    p2.turn = false

                    // console.log(boardArr)

                    winCheck(e)

                } else {
                    console.warn("How did you get here?")
                }
                
            })

        })
    })()

    restart.addEventListener("click", function() {
        boardArr = [null, null, null, null, null, null, null, null, null]
        winner = null
        oArr = []
        xArr = []
        grid.classList.remove("hidden")
        congrats.classList.add("hidden")
        restart.classList.add("hidden")
        const gridChildren = grid.childNodes
        gridChildren.forEach(gridChild => {
            gridChild.innerText = ''
        })
    })



})()