function CodingPageLoad(){
    let coding = requestData('/api/coding', {limit: 50})
    createCodingPage()
    document.getElementById('user-tag').innerHTML = requestData('/api/current_user').name


    
    function createCodingPage(){
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
        let btn_save = createEl('btn-save','Save','button','btn-add','content-head')
        let content_section = createEl('content-section','','div','content-section','grid-content');
        addButton(btn_add)
        saveCodingData(btn_save)

        createDataTable()
        
        createParentSelector([{'Element': 'Revenue'}, {'Element': 'Expenses'}])
    }

    function createDataTable(){

        let table = createEl('table_id', '','table','table_style','content-section')
        let thead = table.createTHead()
        let thead_row = thead.insertRow()
        thead_row.id = 2
        createEl('','ID','td','',thead_row.id)
        createEl('','Description','td','',thead_row.id)
        createEl('','Parent','td','',thead_row.id)
        createEl('','Active','td','',thead_row.id)
        thead_row.id = ''
        loadTable()
    }

    function loadTable(){
        let columns = [
            { data: 'id',type: 'input' },
            { data: 'Description', type: 'input' },
            {data: 'Parent', type: 'input'},
            {data: 'Active', type: 'input'}
        ]
        DataTable.create(coding, columns, $('#table_id'))
    }

    function saveCodingData(button)
    {
        button.addEventListener('click', function(e){
            saveData('/api/coding', coding)
        })
    }

    function addButton(btn_add)
    {
        btn_add.addEventListener('click', function(e){
            //push a new item to the array
            let obj = {_id: '',id: '','Description': 'Enter Desc', 'Parent': ''}
            DataTable.add(obj, {type: 'input'})
        })
    }

    function createParentSelector(options){
        let selector = createEl('selector_id','','div','dropbtn','content-head')
        createEl('select_data','Element','a','',selector.id)
        //get the options for selector
        options = returnOptions(options, 'Element')
    
        //create options section
        let selector_content = createEl('selector_content','','div','dropdown-content',selector.id)
        createOptions(options, selector_content.id)

        selector.addEventListener('click', function(e){
            hideandshow(selector_content)
        })
    
        selector_content.addEventListener('click',function(e){
            let selected = document.getElementById('select_data').innerHTML
            DataTable.filter(selected, DataTable.data)
        })
    }

}
