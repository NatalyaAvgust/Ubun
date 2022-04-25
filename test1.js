const a=10
function doubleCheckScope(){
   // const a=3
    function checkScope(){
        console.log(a)
    }
    checkScope()
}
doubleCheckScope()