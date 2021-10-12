function CodingPageLoad(){
    let coding = requestData('/api/coding')
    document.getElementById('user-tag').innerHTML = requestData('/api/current_user').name

    let codingDatajson = codingData()

    
    function createCodingPage(){
        let content = createEl('grid-content','','div','grid-content','grid');
        let content_head = createEl('content-head','','div','content-head','grid-content');
        let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
        let btn_save = createEl('btn-save','Save','button','btn-add','content-head')
        let content_section = createEl('content-section','','div','content-section','grid-content');


        // console.log(codingDatajson)
    }

    
    createCodingPage()
    table.create(codingData())

        
    function codingData(){
        return {
            description: 'PL',
            children: [
                {
                    description: 'Revenue',
                    children: [
                        {description: 'Payroll'},
                        {description: 'Subscriptions'}
                    ]
                },
                {
                    description: 'Expenses',
                    children: [
                        {description: 'Bar Tabs'},
                        {description: 'Events'}
                    ]
                },
                {
                    description: 'Balance Sheet',
                    children: [
                        {description: 'Assets',
                        children: [
                            {description: 'Current Assets'},
                            {description: 'Non-Current Assets'}
                        ]},
                        {description: 'Liabilities'}
                    ]
                }
            ]
        }
    }

}


let table = {
    dataset: [],
    data_to_element: [],

    create: (dataset) => {
        table.dataset = dataset
        createEl('table', '','table','table_style','content-section')
        createEl('table_head','','thead','','table')
            createEl('','Description','th','','table_head')

        createEl('tbody','','tbody','','table')
        table.draw()
    },

    draw: () => {
        createRow(table.dataset)

        function createRow(data)
        {   
            for(let d of data.children)
            {
                let row = createEl(d.description,'','tr','','tbody')
                
                createExpandButton(row)
                table.data_to_element.push({data: d, html: row})
                createEl('',d.description,'td','',row.id)
                if(d.children !== undefined){
                    createRow(d)
                }
                // setRowHidden(d, row)
            }
        }

        function createExpandButton(row)
        {
            let td = createEl(Math.random(),'','td','',row.id)
            let expand_button = createEl('','+','button','',td.id)
            expand_button.addEventListener('click', function(e){
                findHTMLElement(this.parentElement)
                this.innerHTML = '-';
            })
        }

        function findDataElement(data)
        {
            for(let obj of table.data_to_element){
                for(let child of data)
                if(obj.data.description == child.description){
                    hideandshow(obj.html)
                }
            }
        }

        function findHTMLElement(html)
        {
            for(let obj of table.data_to_element){
                if(obj.html == html.parentElement){
                    findDataElement(obj.data.children)
                }
            }
        }

        function setRowHidden(data, row)
        {
            data.hidden = true
            row.style.display = 'none'
        }

        
        function hideandshow(object){
            if(object.style.display == 'block'){
                object.style.display = 'none'
            } else{
                object.style.display = 'block'
            }
        }
    }

    

}