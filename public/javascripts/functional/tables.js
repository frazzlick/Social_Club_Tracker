
var DataTable = {

    rowlimit: 10,
    // filter_item: '',
    filter_dataset: [],

    // the create function will create the table header, column headers, body and rows
    //each time we filter or search or collect more data we need to delete the existing table and recreate the new one
    create: function(data, columns, table) {
        //create the body
        DataTable.destroy()
            
        //add the data passed in to the columns and data objects
        DataTable.table = table
        DataTable.columns = columns
        DataTable.data = data
        DataTable.filter_dataset = data

        createTableHeader()
        // create the rows
        

        function createTableHeader()
        {
            //create the table header row
            createEl('table-head', '','thead','',table[0].id)
            createEl('table-head-draggable', '','tr','','table-head')
            createEl('table-head-row', '','tr','','table-head')
            
            createEl('drag_drop', '', 'div', 'dropfilter', 'table-head-draggable')
            createEl('','Filter','a','','drag_drop')
            for(let column of DataTable.columns)
            {
                let column_header = createEl('',column.description, 'td','','table-head-row')
                column_header.addEventListener('click', function(e){
                    DataTable.sort(column)
                })
                setcolumnDrag(column_header)
            }

            function setcolumnDrag(column)
            {
                column.draggable = true
                column.addEventListener('dragstart', function(e){
                    let c = this;
                    let target = document.getElementById('drag_drop')
                    target.addEventListener('dragover', function(e){
                        e.preventDefault()
                    })
                    target.addEventListener('drop', function(e){
                        removeElements(this)
                        this.appendChild(c.cloneNode(true))
                        createDropDownList(c.innerHTML)

                    })   
                })
            }

            function createDropDownList(item)
            {
                let data_object;
                let filter_set = []
                for(let column of DataTable.columns){
                    if(item == column.description){
                        data_object = column
                    }
                }
                
                for(let data of DataTable.data)
                {
                    filter_set.push(data[data_object.data])
                }

                filter_set = removeDuplicates(filter_set)
                DataTable.createSelectionList(document.getElementById('drag_drop'), filter_set, filter_set[0], data_object.data)

                
            }
        }
        this.draw(data, columns, table)
        
    },

    draw: function(data, columns, table){
        
        createTableFooter()
        let tbody = createEl('tbody','','tbody','',table[0].id)
        for(let row of data){
            let html_row = createEl(row._id,'','tr','',tbody.id)
            for(let item of columns){
                let td = createEl('td','','td','',row._id)
                let input = createEl(row._id,returnRowData(row, item),DataTable.columnsType(item),'',td.id)
                this.addAttribute(input, item.data)
                this.dataEventChange(input)
                td.id = ''
            }
            DataTable.row_EventListener_click(html_row)
            if(data.indexOf(row) >= this.rowlimit){
                return
            }
        }

        //finish by creating the table header

        function returnRowData(row, columns){
            for(let r in row){
                if(columns.data == r){
                    return row[r]
                }
            }
        }


        //create the Table Footer and when the input changes for the limit, redraw the table
        function createTableFooter()
        {
            let number_out_of = DataTable.rowlimit
            if(DataTable.filter_dataset.length < DataTable.rowlimit){
                number_out_of = DataTable.filter_dataset.length
            }
            createEl('table_footer', '','div','table-footer','content-section')
            let limit = createEl('',DataTable.rowlimit,'input','table-footer-btn','table_footer')
            createEl('table-footer-pagination',`${number_out_of} out of ${DataTable.filter_dataset.length}`, 'div','table-footer-pagination','table_footer')
            limit.addEventListener('change', function(e){
                DataTable.rowlimit = this.value
                DataTable.destroy()
                DataTable.draw(DataTable.data, DataTable.columns, DataTable.table)
            })
        }
    },

    //for each row check which row has been selected, add a css class and add the item to the active element object
    row_EventListener_click(row){
        row.addEventListener('click', function(e){
            let active_row = document.querySelectorAll('.active-row');
            for(a of active_row){
                a.classList.remove('active-row')
            }
            this.classList.add('active-row')
            setActiveElement(this)
        })

        function setActiveElement(element)
        {
            for(let data of DataTable.data){
                if(element.id == data._id){
                    DataTable.active_element = data
                }
            }
        }
    },

    //takes a type of html element e.g. input and returns that text as an element otherwise returns an a element
    columnsType: function(type)
    {
        if(type.type == null){
            return 'a'
        }
        else return type.type
    },

    //takes an item to filter by and the dataset and creates a table based only the dataset that matches that filter
    filter: function(item_filter, data, filter_column)
    {
        let new_data = []
        for(let row of data){
            if(item_filter == row[filter_column]){
                new_data.push(row)
            }
        }
        //creates a new table based on the filter
        DataTable.filter_dataset = new_data
        this.draw(new_data, DataTable.columns, $('#table_id'))
    },

    //call Datatable.destroy() to remove the table
    destroy: function(){
        if($('#tbody')[0] != undefined)
        {
            removeElements($('#tbody')[0])
            removeElements($('#table_footer')[0])
        }
    },

    //pushes a new item to the dataset and the table and adds the event listener for changes
    add: function(items)
    {
        items._id = Math.random()
        DataTable.data.push(items)
        let tbody = $('#tbody')[0]
        let row = createEl('tr_new','','tr','',tbody.id)
        this.row_EventListener_click(row)
        for(let column of DataTable.columns)
        {
            let td = createEl('td','','td','',row.id)
            let input = createEl(items._id,items[column.data], DataTable.columnsType(column),'',td.id)
            this.addAttribute(input, column.data)
            this.dataEventChange(input)
            td.id = ''
        }
        row.id = ''
    },

    //function to detect when a change happens on the table and adjust the dataset
    dataEventChange(input)
    {
        input.addEventListener('change', function(e){
            let value = this
            for(let obj of DataTable.data)
            {
                if(obj._id == value.id)
                {
                    getCorrectcolumn(obj, value)
                    // obj.id = value.value
                }
            }
        })

        function getCorrectcolumn(dataset, value)
        {
            let attr = value.getAttribute('data-description')
            dataset[attr] = value.value
        }
    },

    addAttribute(html_element, description){
        html_element.setAttribute('data-description', description)
    },


    //still in development
    sort(prop){
        DataTable.data.sort(function(a, b){
            // console.log(prop)
            console.table(a[prop.data], b[prop.data], a[prop.data] < b[prop.data])
            return a[prop.data] < b[prop.data]
        });
        // console.log(DataTable.data)
        return DataTable.data;
    },

    createSelectionList: (parent_element, options, current_value, filter_column) =>
    {
        let selector = createEl('selector_id_custom','','div','inputpage-dropdown-btn',parent_element.id)
        createEl('select_data_custom',current_value,'a','',selector.id)
    
        //create options section
        let selector_content = createEl('selector_content_custom','','div','dropdown-content',selector.id)
        createOptions(options, selector_content.id)
    
        selector.addEventListener('click', function(e){
            hideandshow(selector_content)
        })
        return selector

        function createOptions(options, parent){
            for(let opt of options){
                createEl('',opt,'a','',parent).addEventListener('click', function(e){
                    return selection_EventChange(this.innerHTML)
                })
        
            }
        }

        function selection_EventChange(new_selector){
            let selector = document.getElementById('select_data_custom')
            selector.innerHTML = new_selector
            DataTable.destroy()
            DataTable.filter(new_selector, DataTable.data, filter_column)
            return new_selector
        
        }

    }
}