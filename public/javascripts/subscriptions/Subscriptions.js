(function(){

    //create the subscription page
    //Be able to add or delete subscriptions or events
    //Display the cost the subscription or event and the name and the date range
    //When we click on the event or subscription we should be able to display who is attending and be able to edit the event
    //When then want to be able to edit the members with who is going. Ideally a modal which you click and add to the right side


    let subscriptionpage = {
        //initial data is only used to
        initial_data: requestData('/api/subscriptions'),
        // initial_data: [],
        // //requestData('/api/subscriptions'),
        pagestate: 'initial',
        active_event: [],
        load: SubscriptionPageLoad
    }

    subscriptionpage.current_data = subscriptionpage.initial_data

    //create the subscriptions page layout
    subscriptionpage.load()


    //create the layout of the subscriptions. We want a date range and a price
    function SubscriptionPageLoad()
    {
        createLayout()
        createSubscriptionElement(subscriptionpage.current_data)
    }

    //push a new subscription
    function createSubscription()
    {
        let new_sub = {
            id: Math.random(),
            description: 'New Subscription',
            start_date: 'Start Date',
            end_date: 'End Date',
            price: 'Price',
            members: []
        }
        subscriptionpage.current_data.push(new_sub)
        createSubscriptionElement([new_sub])
    }

    //create the initial layout and add event listeners to buttons
    function createLayout()
    {
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_add = createEl('btn_add','Add +','button','btn-add','content-head')
        let btn_save = createEl('btn_save','Save','button','btn-add','content-head')
        let btn_members = createEl('','Members', 'button', 'btn-add', 'content-head')
        let content_section = createEl('content-section','','div','content-section','grid-content');

        buttonSave(btn_save)

        btn_add.addEventListener('click', function(e){
            createSubscription()
        })

        function buttonSave(button){
            button.addEventListener('click', function(e){
                console.log(subscriptionpage.current_data)
                saveData('/api/subscriptions',subscriptionpage.current_data)
            })
        }

        btn_members.addEventListener('click', function(e){

            //write a function to pop up a modal which grabs the members and let's you add them to the event
            createModal(requestData('/api/members'))
            hideandshow(document.getElementById('modal'))
        })
    }


    //create a subscription element which is the entire card with event name, dates, price and triggers the input page
    // The checkbox function sets a single checkbox to active and updates subscriptionpage.active element to the selected item
    function createSubscriptionElement(subscription_data)
    {
        for(let sub of subscription_data){
            let card = createEl(Math.random(), '','div','content-card','content-section')
            let active_checkbox = createEl('','false','input','',card.id)
            active_checkbox.type = 'checkbox'
            let card_sub = createEl(Math.random(),'', 'div','content-card-name hyperlink',card.id)
            createEl(Math.random(),sub.start_date, 'div','content-card-name',card.id)
            createEl(Math.random(),sub.end_date, 'div','content-card-name',card.id)
            createEl(Math.random(),sub.price, 'div','content-card-name',card.id)
            let card_a = createEl(sub.id,sub.description,'a','',card_sub.id)
            SubscriptionClick(card_a)
            checkboxEvent(active_checkbox, sub)
        }

        //this runs the Subscriptions editors javascript file which transfers to another page
        //the timeout happens when we wait for the transition to occur and will remove this pages elements and runs the
        //next file
        function SubscriptionClick(clicked_card)
        {
            clicked_card.addEventListener('click', function(e){
            document.getElementById('content-section').classList.toggle('content-active')
                for(let data of subscriptionpage.current_data){
                    if(data.id == clicked_card.id){
                        setTimeout(() => {
                            removeElements(document.getElementById('content-section'))
                            //pass the active element data and the full dataset to run the input page 
                            // which includes callback function to return to this page
                            SubscriptionsEditor(data, subscriptionpage)
                            document.getElementById('content-section').classList.toggle('content-active')
                        }, 1000)
                    }
                }
            })
        }

        function checkboxEvent(checkbox, event){
            checkbox.addEventListener('change', function(e){
                
                if(this.checked == false){
                    return subscriptionpage.current_data.splice(subscriptionpage.current_data.indexOf(event))
                }

                //clear other flags
                for(let obj of $("input:checkbox")){
                    obj.checked = false
                }

                //set current to true
                this.checked = true
                subscriptionpage.active_event = event

                
            })
        }
    }


})();
