
var DataTable = {

    // the create function will create the table header, column headers, body and rows
    //each time we filter or search or collect more data we need to delete the existing table and recreate the new one
    create: function(data, columns, table) {
        //create the body
        DataTable.destroy()
        let tbody = createEl('tbody','','tbody','',table[0].id)
            
        //add the data passed in to the columns and data objects
        DataTable.columns = columns
        DataTable.data = data

        // create the rows
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
        }

        //finish by creating the table header
        createTableHeader()

        function returnRowData(row, columns){
            for(let r in row){
                if(columns.data == r){
                    return row[r]
                }
            }
        }

        function createTableHeader()
        {
            //create the table header row
            createEl('table-head', '','thead','',table[0].id)
            createEl('table-head-row', '','tr','','table-head')
            for(let column of DataTable.columns)
            {
                let column_header = createEl('',column.description, 'td','','table-head-row')
                column_header.addEventListener('click', function(e){
                    DataTable.sort(column)
                })
            }
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
    filter: function(item_filter, data)
    {
        let new_data = []
        for(let row of data){
            for(let dPoint in row){
                if(item_filter == row[dPoint]){
                    new_data.push(row)
                }
            }
        }

        //creates a new table based on the filter
        this.create(new_data, DataTable.columns, $('#table_id'))
    },

    //call Datatable.destroy() to remove the table
    destroy: function(){
        if($('#table_id')[0] != undefined)
        {
            removeElements($('#table_id')[0])
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
    }

}