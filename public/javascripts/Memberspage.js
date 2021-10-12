//What to do on load


window.onload = function loadPage(){
    
    let members = requestData('/api/members');
    document.getElementById('user-tag').innerHTML = requestData('/api/current_user').name
    let active_page = 'grid'
    let current_member;
    let active_members = [];
    //setup the event listeners for the sidebar
    sidebar_EventListeners()
    //create the setup for the page
    createMemberPage()
    //create the members items with names
    createMemberCard(members)
    //setup the modal with event listeners to edit the members

    
    //Create the Page
    function createMemberPage(){
        // let grid = createEl('grid','','div','grid','body');
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
        let btn_save = createEl('btn-save','Save','button','btn-add','content-head');
        let btn_delete = createEl('btn-delete','Delete','button','btn-add','content-head');

        let content_section = createEl('content-section','','div','content-section','grid-content');

        btn_add.addEventListener('click', function(e){
            addMember();
        })

        btn_save.addEventListener('click', function(e){
            saveData('/api/members',inputpage.data)
        })

        btn_delete.addEventListener('click', function(e){
            deleteData('/api/members', active_members)
        })
        document.getElementById('brand-title').innerHTML = 'Members'
        
        document.getElementById('title').innerHTML = 'Social Clubs | Members'
    }


    function createMemberCard(members_card)
    {
        //create card
        for(let i = 0; i < members_card.length; i++){
            //create the entire card element to content section
            let card = createEl(Math.random(), '','div','content-card','content-section')

            //create a checkbox and when there is an event change, add it to the active list
            let active_checkbox = createEl('','false','input','',card.id)
            active_checkbox.type = 'checkbox'
            checkboxEvent(active_checkbox, members_card[i])
            //create the users name with hyperlink in the class
            let card_user = createEl(Math.random(),'', 'div','content-card-name hyperlink',card.id)
            let card_a = createEl(members_card[i].id,members_card[i].name,'a','',card_user.id)
            //call the createbalance function to create the balance on the page with no hyperlink
            createBalance(members_card[i], card)
            card_a_EventListener(card_a)
            card_user.id = ''
        }

        function createBalance(card_data, card){
            let card_user = createEl(Math.random(),'', 'div','content-card-name',card.id)
            createEl('',card_data.balance,'a','',card_user.id)
            card_user.id = ''
        }
    }

    function checkboxEvent(checkbox, member){
        checkbox.addEventListener('change', function(e){
            if(this.checked == false){
                return active_members.splice(active_members.indexOf(member))
            }
            active_members.push(member)
        })
    }

    function addMember(){
        let member = {id: getMaxID(), name: "Name", active: true, balance: 0, charges: 0, start_date: '', end_date: ''}
        if(active_page == 'grid'){
            members.push(member)
            return createMemberCard([member])
        }
        return inputpage.add(member)
    }

    function sidebar_EventListeners(){
        //Add event listeners to the sidebar Members button
        document.getElementById('btn-members').addEventListener('click', function(e){
            removeElements(document.getElementById('grid'))
            loadPage()
        })
    }

    function card_a_EventListener(card)
    {
        card.addEventListener('click', function(e){
            active_page = 'inputpage'
            document.getElementById('content-section').classList.toggle('content-active')
            for(let member of members){
                if(member.id == this.id){
                    current_member = member
                }
            }
            setTimeout(() => {
                removeElements(document.getElementById('content-section'))
                createMemberEditPage(current_member)
                document.getElementById('content-section').classList.toggle('content-active')
            }, 1000)
        })
    }

    function getMaxID(){
        var id = 0;
        for(let obj of members){
            if(obj.id >= id){
                id = obj.id+1
            }
        }
        return id
    }

    function createMemberEditPage(index)
    {
        let headers = [
            {description: 'Name', data: 'name'},
            {description: 'Active?', data: 'active', selection: {type: 'list', data: [true, false]}},
            {description: 'Balance', data: 'balance'},
            {description: 'Charges', data: 'charges'},
            {description: 'Membership Start Date', data: 'start_date', date: { type: 'date'}},
            {description: 'Membership End Date', data: 'end_date', date: { type: 'date'}}
            // {data: 'matched', selection: {type: 'list', data: coding}},
        ]
        inputpage.initialise(members, headers, $('#content-section'), index, loadPage)
        inputpage.create(members, headers)
    }
}
