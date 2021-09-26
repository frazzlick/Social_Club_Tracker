function SubscriptionsEditor(current_subscription, subscriptionfull_data)
{
    let headers = [
        {description: 'Description', data: 'description'},
        {description: 'Start Date', data: 'start_date'},
        {description: 'End Date', data: 'end_date'},
        {description: 'Price', data: 'price'},
    
    ]
    inputpage.initialise(subscriptionfull_data.current_data, headers, $('#content-section'), current_subscription, subscriptionfull_data.load)
    inputpage.create(current_subscription, headers)
}