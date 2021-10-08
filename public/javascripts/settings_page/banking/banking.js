function BankingPageLoad()
{
    let element = returnDiv()
    console.log(element)
    document.getElementById('body').appendChild(element)
}

function returnDiv(){
    return 
        (
        <div>
            Hello there
        </div>
        )
    
}