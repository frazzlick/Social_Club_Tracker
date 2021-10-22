

window.onload = function loadSettingsPage(){

    let content = createEl('grid-content','','div','grid-content','grid');
    createContentSections()

    let users_button = document.getElementById('users_button')
    users_button.addEventListener('click', function(e){
        //remove elements from page
        removeElements(document.getElementById('grid'));
        //create content sections
        createContentSections()
        settings_Users()
    })    

    let sidebar_Banking = document.getElementById('btn-banking')
    sidebar_Banking.addEventListener('click', function(e){
        removeElements(document.getElementById('grid'));
        document.getElementById('brand-title').innerHTML = 'Banking'
        document.getElementById('title').innerHTML = 'Social Clubs | Banking'
        BankingPageLoad()
    })

    function createContentSections(){

        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let content_section = createEl('content-section','','div','content-section','grid-content');
    }
}