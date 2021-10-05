
let data_options = {limit: 50, find: {month: {}}};
let transactions;
let months;


window.onload = function loadPaymentsScreen(){
    //get the transactions data
    loadTransactionData()

    //create the initial grid layout and buttons
    let content = createEl('grid-content','','div','grid-content','grid');
    let content_head = createEl('content-head','','div','content-head','grid-content');
    let btn_add = createEl('btn-add','Add +','button','btn-add','content-head');
    let btn_delete = createEl('btn-delete', 'Delete', 'button', 'btn-add', 'content-head')
    createEl('btn-process-navigate', 'Processing', 'button', 'btn-add', 'content-head')
    deleteButton()
    let content_section = createEl('content-section','','div','content-section','grid-content');
    //create the moredata button to request more data from the server
    moreDataButton()

    //create the month selector by passing the months through. The months come from a request for the months data
    createMonthSelector(months)

    createDataTable()

    let dropArea = document.getElementById('content-section')

    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
      })

      function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
      }

    dropArea.addEventListener('drop', function(e){
        Array.from(e.dataTransfer.files)
        .forEach(async (file) => {
            const text = await file.text()
            let json_text = CSVJSON.csv2json(text)
            for(let j of json_text){
                removeInvalidObject(j)
            }
            transactions = json_text
            postTransactions_returnResult()
            loadTable()
        })
    })

    openProcessingPage()

    function openProcessingPage(){
        let processing_button = document.getElementById('btn-process-navigate')
        processing_button.addEventListener('click', function(e){
            removeElements(document.getElementById('grid'))
            ProcessingPageLoad(DataTable.active_element, loadPaymentsScreen)
        })

        let navbutton = document.getElementById('btn-processing')
        navbutton.addEventListener('click', function(e){
            removeElements(document.getElementById('grid'))
            console.log(DataTable.data[0])
            ProcessingPageLoad(DataTable.data[0])
        })
    }

}

function loadTransactionData()
{
    transactions = requestData('/api/transactions', data_options)
    months = requestData('/api/months')
}

function createDataTable(){

        let table = createEl('table_id', '','table','table_style','content-section')
        loadTable()
}

function loadTable(){
    let columns = [
                { description: 'Date', data: 'date' },
                { description: 'Transaction Type', data: 'transaction_type' },
                { description: 'Particulars', data: 'particulars' },
                { description: 'Code', data: 'code' },
                { description: 'Reference', data: 'reference' },
                { description: 'Amount', data: 'amount' },
                { description: 'Member Payment', data: 'member' },
                { description: 'Matched', data: 'matched'}
            ]
    DataTable.create(transactions, columns, $('#table_id'))
}

async function postTransactions_returnResult(){
    return await saveData('/api/transactions', transactions, function(output){
        console.log(output)
    })
}

function createMonthSelector(options){
    let selector = createEl('selector_id','','div','dropbtn','content-head')
    createEl('select_data','Date','a','',selector.id)
    //get the options for selector
    options = returnOptions(options, 'Month')

    //create options section
    let selector_content = createEl('selector_content','','div','dropdown-content',selector.id)
    createOptions(options, selector_content.id)

    selector.addEventListener('click', function(e){
        hideandshow(selector_content)
        
    })

    selector_content.addEventListener('click',function(e){
        let selected = document.getElementById('select_data').innerHTML
        data_options.find.month = selected
        loadTransactionData()
        DataTable.filter(selected, transactions)
    })
}

function returnOptions(options, date){
    let unique_options = []
    for(let obj of options){
        unique_options.push(obj[date])
    }
    unique_options = removeDuplicates(unique_options)
    
    return unique_options
}

function createOptions(options, parent){
    for(let opt of options){
        createEl('',opt,'a','',parent).addEventListener('click', function(e){
            return selection_EventChange(this.innerHTML)
        })

    }
}


function selection_EventChange(new_selector){
    let selector = document.getElementById('select_data')
    selector.innerHTML = new_selector
    return new_selector

}

function deleteButton(){
    let delete_btn = document.getElementById('btn-delete')
    let active_row = document.querySelectorAll('.active-row')[0]
    delete_btn.addEventListener('click', function(e){
        let active_row = document.querySelectorAll('.active-row')[0]
        deleteData('/api/transactions', returnTransactionItem(active_row))
    })
}

function returnTransactionItem(html_element){
    for(let t of transactions){
        if(html_element.id == t._id){
            return t
        }
    }
}

function removeInvalidObject(text){
    for(let t in text){
        let new_name = text[t.replace(/[/ ]/g,'_')] = text[t]
        if(new_name !== text[t]){
            delete text[t]
        }
    }
}

function moreDataButton(){
    
    let btn_add = createEl('btn-data_options','More Data','button','btn-add','content-head');
    btn_add.addEventListener('click', function(e){
        data_options.limit = data_options.limit + 50
        transactions = requestData('/api/transactions', data_options)
        let columns = [
            { data: 'date' },
            { data: 'transaction_type' },
            { data: 'particulars' },
            { data: 'code' },
            { data: 'reference' },
            { data: 'amount' },
            { data: 'matched' }
        ]
        DataTable.destroy()
        DataTable.create(transactions, columns, $('#table_id'))
    })
}