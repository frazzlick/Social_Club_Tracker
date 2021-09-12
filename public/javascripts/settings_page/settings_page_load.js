window.onload = function settings_page_load(){

    //get the eventlistener for the users tab
    let users_tab = document.getElementById('btn-users')
    users_tab.addEventListener('click', function(e){
        //add for removing all elements
        
        removeElements(document.getElementById('grid'));
        createLayout()
        load_users()
    })

    function load_users(){
        let users = requestData('/api/settings/users', {limit: 50})
        createDataTable()
        loadTable(users)
    }

    function createLayout()
    {
        createEl('grid-content','','div','grid-content','grid');
        createEl('content-head','','div','content-head','grid-content');
        let btn_save = createEl('btn_save','Save','button','btn-add','content-head')
        let btn_add = createEl('btn_add','Add +','button','btn-add','content-head')
        add_User_Button(btn_add)
        saveData_button(btn_save)
        let content_section = createEl('content-section','','div','content-section','grid-content');
    }

    
    function createDataTable(){
        let table = createEl('table_id', '','table','table_style','content-section')
        let thead = table.createTHead()
        let thead_row = thead.insertRow()
        thead_row.id = 2
        createEl('','User','td','',thead_row.id)
        createEl('','Email','td','',thead_row.id)
        createEl('','Active','td','',thead_row.id)
        createEl('','Password','td','',thead_row.id)
        thead_row.id = ''
    }

    function loadTable(users){
        let columns = [
                    { data: 'name', type: 'input'},
                    { data: 'email', type: 'input' },
                    { data: 'active', type: 'input' },
                    { data: 'password', type: 'input' },
                ]
        DataTable.create(users, columns, $('#table_id'))
    }

    function add_User_Button(button){
        button.addEventListener('click', function(e){
            let new_user = {name: 'Enter Name',email: '',active: '', password: ''}
            // DataTable.data.push(new_user)
            DataTable.add(new_user, {type: 'input'})
        })
    }

    function saveData_button(button){
        button.addEventListener('click', function(e){
            saveData('/api/settings/users', DataTable.data)
        })
    }

}