import { table } from '../recursive_tables/tables.js'



let sidebar_Coding = document.getElementById('btn-settings')
sidebar_Coding.addEventListener('click', function(e){
    removeElements(document.getElementById('grid'));
    document.getElementById('brand-title').innerHTML = 'Coding'
    document.getElementById('title').innerHTML = 'Social Clubs | Coding'
    CodingPageLoad()
})

function CodingPageLoad(){
    let coding = requestData('/api/coding')
    document.getElementById('user-tag').innerHTML = requestData('/api/current_user').name


    createCodingPage()
    table.create(coding[0])


    function createCodingPage(){
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
        let btn_save = createEl('btn-save','Save','button','btn-add','content-head')
        let content_section = createEl('content-section','','div','content-section','grid-content');


        btn_add.addEventListener('click', function(e){
            // data.children[0].children.push({description: 'Item', level: 2, children: []})
            table.draw()
        })

        btn_save.addEventListener('click', function(e){
            saveData('/api/coding', [table.dataset])
        })

    }
}

    