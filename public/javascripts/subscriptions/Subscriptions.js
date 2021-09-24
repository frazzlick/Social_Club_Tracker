(function(){
    
    const subscriptionpage = {
        //initial data is only used to 
        initial_data: 0,
        //requestData('/api/subscriptions'),
        pagestate: 'initial',
        current_data: this.initial_data,
        load: SubscriptionPageLoad
    }

    //pull the subscription data from mongodb

    //create the subscriptions page layout
    subscriptionpage.load()


    //create the layout of the subscriptions. We want a date range and a price
    function SubscriptionPageLoad()
    {
        createLayout()
    }

    //push a new subscription
    function createSubscription()
    {
        subscriptionpage.current_data.push({
            _id: '',
            id: '',
            description: '',
            start_date: '',
            end_date: '',
            price: ''
        })
    }

    function saveSubscriptions()
    {
        saveData('/api/subscriptions', subscriptionpage.current_data)
    }

    function createLayout()
    {
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_add = createEl('btn_add','Add +','button','btn-add','content-head')
        let btn_save = createEl('btn_save','Save','button','btn-add','content-head')
        let content_section = createEl('content-section','','div','content-section','grid-content');

        buttonSave(btn_save)

        btn_add.addEventListener('click', function(e){
            createSubscription()
        })
    }

    function buttonSave(button){
        button.addEventListener('click', function(e){
            saveData('/api/Transactions',inputpage.data_to_save)
        })
    }

    
})();
