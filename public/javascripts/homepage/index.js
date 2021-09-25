window.onload = function indexpageLoad(){
    

    //create eventlisteners for the tabs
    //index page, members page, transactions page, subscriptions/events settings page
    sidebar_EventListeners()
    
    function sidebar_EventListeners(){
        //Add event listeners to the sidebar Members button

        let sidebar_Index = document.getElementById('btn-index');
        sidebar_Index.addEventListener('click', function(e){
            removeElements(document.getElementById('grid'));
        })

        //Add event listeners to the sidebar Payments button
        let sidebar_Payments = document.getElementById('btn-payments');
        sidebar_Payments.addEventListener('click', function(e){
            removeElements(document.getElementById('grid'));
            document.getElementById('brand-title').innerHTML = 'Transactions'
            document.getElementById('title').innerHTML = 'Social Clubs | Transactions'
            loadPaymentsScreen();
        })
    }
}