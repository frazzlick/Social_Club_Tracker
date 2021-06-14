//What to do on load


//Add event listeners to buttons
let sidebar_Members = document.getElementById('btn-members');
sidebar_Members.addEventListener('click', function(e){
    removeElements(document.getElementById('grid'));
    createMemberPage();
})

let sidebar_Payments = document.getElementById('btn-payments');
sidebar_Payments.addEventListener('click', function(e){
    removeElements(document.getElementById('grid'));
})




//Create the Page
function createMemberPage(){
    // let grid = createEl('grid','','div','grid','body');
    let content = createEl('grid-content','','div','grid-content','grid');
    let content_head = createEl('content-head','','div','content-head','grid-content');
    let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
    let content_section = createEl('content-section','','div','content-section','grid-content');
}

/* <div class=grid>
        <div id=grid-content class=grid-content>
            <div class=content-head><button class=btn-add>Add +</button></div>
            <div class=content-section>
                <div class=content-card>Content Card</div>
                <div class=content-card>Content Card 2</div>
                <div class=content-card>Content Card 3</div>
                <div class=content-card>Content Card 4</div>
                <div class=content-card>Content Card 5</div>
                <div class=content-card>Content Card 6</div>
            </div>
        </div>
    </div> */