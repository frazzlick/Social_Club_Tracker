function TransactionMatchingPageLoad()
{
    let transactions = loadTransactions()
    let coding = requestData('/api/coding', {limit: 50})

    createLayout()

    function loadTransactions()
    {
        return requestData('/api/Transactions', {limit: 2000, find: {matched: ''}})
    }

    let headers = [
        {data: 'particulars'},
        {data: 'code'},
        {data: 'reference'},
        {data: 'date'},
        {data: 'month'},
        {data: 'matched', selection: {type: 'list', data: coding}},
        {data: 'amount'}
    ]

    
    inputpage.initialise(transactions, headers, $('#grid0'))
    inputpage.create(transactions, headers)

    function createLayout()
    {
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_save = createEl('btn_save','Save','button','btn-add','content-head')
        let content_section = createEl('content-section','','div','content-section','grid-content');

        buttonSave(btn_save)
        createGrid(3, content_section.id)
        createArrows()
    }

    function createArrows()
    {   
        let current_count = 1;
        let total = inputpage.data.length;
        let counter = createEl('counter_box','','div','','grid2')
        let counter_element = createEl('',current_count + ' out of ' + total,'div','',counter.id)
        let l_arrow = createEl('left_arrow','','div','arrow','grid2')
        createEl('','< Previous','a','','left_arrow')
        let r_arrow = createEl('right_arrow','','div','arrow','grid2')
        createEl('','Next >','a','','right_arrow')

        r_arrow.addEventListener('click', function(e){
            inputpage.destroy()
            inputpage.current_item++
            current_count++
            counter_element.innerHTML = current_count + ' out of ' + total
            inputpage.create()
        })

        l_arrow.addEventListener('click', function(e){
            inputpage.destroy()
            if(inputpage.current_item != 0){
                inputpage.current_item--
                current_count--
                counter_element.innerHTML = current_count + ' out of ' + total
            }
            inputpage.create()
        })
    }

    function buttonSave(button){
        button.addEventListener('click', function(e){
            saveData('/api/Transactions',inputpage.data_to_save)
        })
    }

}