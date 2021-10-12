function ProcessingPageLoad(active_element, match_item, loadPaymentsScreen)
{
    if(!match_item){
        match_item = {matched: ''}
    }
    let coding = requestData('/api/coding', {limit: 50})
    let members = requestData('/api/members')

    createLayout()

    let list_data = []

    for(let code of coding){
        list_data.push(code.Description)
    }

    let member_data = []
    for(let member of members){
        member_data.push(member.name)
    }

    let headers = [
        {description: 'Particulars', data: 'particulars'},
        {description: 'Code', data: 'code'},
        {description: 'Reference', data: 'reference'},
        {description: 'Date', data: 'date'},
        {description: 'Month', data: 'month'},
        {description: 'Match', data: 'matched', selection: {type: 'list', data: list_data}},
        {description: 'Member Payment', data: 'member', selection: {type: 'list', data: member_data}},
        {description: 'Amount', data: 'amount'}
    ]

    
    inputpage.initialise(transactions, headers, $('#content-section'), active_element, loadPaymentsScreen)
    inputpage.create(transactions, headers)

    function createLayout()
    {
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_save = createEl('btn_save','Save','button','btn-add','content-head')
        let content_section = createEl('content-section','','div','content-section','grid-content');

        buttonSave(btn_save)
    }

    function buttonSave(button){
        button.addEventListener('click', function(e){
            saveData('/api/Transactions',inputpage.data_to_save)
        })
    }

}   