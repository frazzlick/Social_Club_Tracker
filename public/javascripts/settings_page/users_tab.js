

function settings_Users()
{

    addCreateAddDeleteSaveButtons()
    createDataTable()

    function createDataTable(){

        let table = createEl('table_id', '','table','table_style','content-section')
        loadTable()
    }

    function loadTable(){

        let users = users_load()

        let columns = [
            { description: 'User', data: 'name' , type: 'input'},
            { description: 'Email', data: 'email' , type: 'input'},
            { description: 'Active', data: 'active' , type: 'input'}
        ]

        DataTable.create(users, columns, $('#table_id'))
    }

    
    function users_load(){
        return requestData('/api/settings/users')
    }

    function addCreateAddDeleteSaveButtons(){
        
    let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
    let btn_save = createEl('btn-save','Save','button','btn-add','content-head');
    let btn_delete = createEl('btn-delete', 'Delete', 'button', 'btn-add', 'content-head')
    let btn_reset_password = createEl('btn-reset', 'Reset Password','button','btn-add','content-head')


        btn_add.addEventListener('click', function(e){
            let user = {name: 'Enter Name', email: 'Enter Email', active: false}
            DataTable.add(user)
        })

        btn_save.addEventListener('click', function(e){
            saveData('/api/settings/users', DataTable.data)
        })

        btn_reset_password.addEventListener('click', function(e){
            const data = {...{data: DataTable.active_element}, ...{password: 'Monday123'}}
            saveData('/api/settings/users/passwordreset', data)
        })
    }
}