//What to do on load

let data = requestData('/api/members');

function intialisepage(){
    let modal_array = [document.getElementById('btn-modal'), document.getElementById('modal-save')]
    modal_array.map(item => item.addEventListener('click', function(e){
        let modal = document.getElementById('modal');
        hideandshow(modal);
    }));

    let name;
    
    document.getElementById('modal-name').addEventListener('change', function(e){
        console.log(this.value)
        name = this.value;
    })

    document.getElementById('modal-save').addEventListener('click',function(e){
        data.members[0].first_name = name;
    })
}



//Add event listeners to buttons
let sidebar_Members = document.getElementById('btn-members');
sidebar_Members.addEventListener('click', function(e){
    removeElements(document.getElementById('grid'));
    createMemberPage();
    intialisepage();
})

let sidebar_Payments = document.getElementById('btn-payments');
sidebar_Payments.addEventListener('click', function(e){
    removeElements(document.getElementById('grid'));
    intialisepage();
})



//Create the Page
function createMemberPage(){
    // let grid = createEl('grid','','div','grid','body');
    let content = createEl('grid-content','','div','grid-content','grid');
    let content_head = createEl('content-head','','div','content-head','grid-content');
    let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
    let content_section = createEl('content-section','','div','content-section','grid-content');

    btn_add.addEventListener('click', function(e){
        addMember();
    })

    createMemberCard(data.members);
}

function createMemberCard(data)
{
    //create card
    for(let i = 0; i < data.length; i++){
        let ci = createEl('card1', '', 'div','content-card', 'content-section')
        createEl('',data[i].first_name + ' ' + data[i].last_name, 'div','content-card-name','card1');

        let modal = createEl('btn-modal', 'Edit', 'button', 'btn-add', 'content-section')
    }
}

function addMember(){
    createEl('','','div','content-card','content-section');
}


function hideandshow(object){
    if(object.style.display == 'block'){
        object.style.display = 'none'
    } else{
        object.style.display = 'block'
    }
}
