
var inputpage = {

    data: [],
    data_to_save: [],
    headers: [],
    filtered_data: [],
    page_id: '',
    current_item: 0,

    initialise: (input_data, headers, page_id, passed_item, goback) =>
    {
        inputpage.data = input_data
        inputpage.headers = headers
        inputpage.page_id = page_id[0]
        inputpage.current_item = objectComparison(input_data, passed_item)
        inputpage.goback = goback

        function objectComparison(object1, object2){
            for(let obj of object1){
                if(obj._id == object2._id){
                    return object1.indexOf(obj)
                }
            }
            return
        }
    },


    //create takes the data in the inputpage data set along with the headers dataset and creates the page where the headers
    //are identified and creates input elements or dropdown lists where the setting is created
    create: () =>
    {
        createGridLayout()


        let input_data = inputpage.data
        for(let input of inputpage.headers)
        {
            //create the header element
            //create the full element
            let element = createEl(input.data,'','div','inputpage-class',inputpage.page_id.id)
            createEl('',input.description, 'div','inputpage-title',element.id)
            let html_element = inputType(input_data, input, element)
            // let html_element = createEl('',input_data[inputpage.current_item][input.data], 'input','inputpage-input',element.id)
            inputpage.inputdatachange(html_element, input, input_data[inputpage.current_item])
        }

        //create a grid layout with a section at the top for back button and left and right arrows
        function createGridLayout(){
            //create the top layer of the elements
            let inputheader = createEl('inputpage-header', '','div','inputpage-header',inputpage.page_id.id)
            createEl('input-content','','div','',inputpage.page_id.id)
            let goback = createEl('btn-go-back','','i','bx bx-arrow-back',inputheader.id)
            let nextitem = createEl('btn-next-item','','i','bx bx-right-arrow-alt sideitem',inputheader.id)
            let lastitem = createEl('btn-last-item','','i','bx bx-left-arrow-alt sideitem',inputheader.id)


            goback.addEventListener('click', function(e){
                
                document.getElementById('content-section').classList.toggle('content-active')
                setTimeout(() => {
                    removeElements(document.getElementById('grid'))
                    inputpage.goback()}, 1000)
            })

            nextitem.addEventListener('click', function(e){
            inputpage.destroy()
            inputpage.current_item++
            inputpage.create()
            })

            lastitem.addEventListener('click', function(e){
                inputpage.destroy()
                if(inputpage.current_item != 0){
                    inputpage.current_item--
                }
                inputpage.create()
            })
        }


        //takes the data from the inputpage and the item in the headers, if the item is a selection type then it creates a 
        //dropdown for the input field with the data on the field given
        //total_dataset is the total dataset
        //object_props is the object items
        //element is the html element
        function inputType(total_dataset, object_props, element)
        {
            // console.log(input)
            if(!object_props.hasOwnProperty('selection'))
            {
                //where the input value is not of type selection
                return createEl('',total_dataset[inputpage.current_item][object_props.data], 'input','inputpage-input',element.id)
            } else {
                //
                let selector =  inputpage.createSelectionList(element, object_props.selection.data, total_dataset[inputpage.current_item][object_props.data])
                document.getElementById('selector_content').addEventListener('click', function(e){
                    let value = document.getElementById('select_data').innerHTML
                    let current_data = total_dataset[inputpage.current_item]
                    for(let obj of inputpage.data){
                        //update the current value and push the obj to the datasave function
                        if(current_data._id == obj._id)
                        {
                            current_data[object_props.data] = value
                            dataToSave(obj)
                        }
                    }
                })
                return selector
            }

            function dataToSave(data)
            {
                for(let obj of inputpage.data_to_save)
                {
                    if(obj._id == data._id)
                    {
                        return obj = data
                    }
                }
                return inputpage.data_to_save.push(data)
            }
        }
    },


    //remove all of the elements using the destroy function
    destroy: () => {
        removeElements(inputpage.page_id)
    },

    //for elements with input, where the value changes save the item to the inputpage object
    inputdatachange: (html_element, input, input_data) => {
        html_element.addEventListener('change',function(e){
            for(let obj of inputpage.data){
                if(input_data.id == obj.id)
                {
                    obj[input.data] = html_element.value
                    dataToSave(obj)
                }
            }
        })

        //push the data sent to a save array on the inputpage object
        function dataToSave(data)
        {
            for(let obj of inputpage.data_to_save)
            {
                if(obj._id == data._id)
                {
                    return obj = data
                }
            }
            return inputpage.data_to_save.push(data)
        }
    },

    //create the selection list by inputting the parent element and the options to generate the list
    createSelectionList: (parent_element, options, current_value) =>
    {
        let selector = createEl('selector_id','','div','inputpage-dropdown-btn',parent_element.id)
        createEl('select_data',current_value,'a','',selector.id)
    
        //create options section
        let selector_content = createEl('selector_content','','div','dropdown-content',selector.id)
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
            let selector = document.getElementById('select_data')
            selector.innerHTML = new_selector
            return new_selector
        
        }
    },

    add: (new_data) => {
        inputpage.data.push(new_data)
    }

    
}