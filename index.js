
let solveable = document.getElementById("solveable");
let input = document.getElementById("input");

input.addEventListener('keydown', validateNumber);
input.addEventListener('keyup', (e) => {
    if (input.value.length == 4) {
        let puzzle = Array.from(input.value).map(i => { return parseInt(i) });
        solveable.style.display = 'block';
        if (isSolveable(puzzle)) {
            solveable.textContent = "Solveable!"
        }
        else {
            solveable.textContent = "Unsolveable!"
        }
    }
    else {
        solveable.style.display = 'none';
    }
})



function validateNumber(evt) {
    // https://stackoverflow.com/a/12142807
    var e = evt || window.event;
    var key = e.keyCode || e.which;
    if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
        // numbers   
        key >= 48 && key <= 57 ||
        // Numeric keypad
        key >= 96 && key <= 105 ||
        // Backspace and Tab and Enter
        key == 8 || key == 9 || key == 13 ||
        // Home and End
        key == 35 || key == 36 ||
        // left and right arrows
        key == 37 || key == 39 ||
        // Del and Ins
        key == 46 || key == 45) {
        // input is VALID
    }
    else {
        // input is INVALID
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
    }
}

function isSolveable(puzzle, target = 10) {
    let n = Array.from(puzzle).length;

    let sub_problems = Array(n);
    for (let i = 0; i < n; i++) {
        sub_problems[i] = Array(n);
        // sub_problems[i] = sub_problems[i].map(_ => {return ["a"]});
        for (let j = 0; j < n; j++) {
            sub_problems[i][j] = Array(0);
        }
    }

    for (let width = 1; width < n + 1; width++) {
        for (let i = 0; i < n - width + 1; i++) {
            let j = i + width - 1;
            
            if (width == 1) {
                sub_problems[i][j].push(puzzle[i]);
                sub_problems[i][j].push(-puzzle[i]);
            }
            else {
                for (let k = i; k < j; k++) {
                    let l1 = sub_problems[i][k];
                    let l2 = sub_problems[k+1][j];
                    
                    let l1l2 = [];
                    l1.forEach(x => {l2.forEach(y => {l1l2.push([x, y])})});
                    
                    for (x of l1l2) {
                        let a = x[0]; let b = x[1];
                        sub_problems[i][j].push(a + b);
                        sub_problems[i][j].push(a - b);
                        sub_problems[i][j].push(a * b);
                        if (b != 0) {
                            sub_problems[i][j].push(a / b);
                        }
                    }
                    
                    sub_problems[i][j] = [...new Set(sub_problems[i][j])];
                }
            }
        }
    }
    
    if (Array.from(sub_problems[0][n-1]).includes(10)) {
        return true;
    }
    return false;
}



