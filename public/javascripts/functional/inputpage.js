
var inputpage = {

    data: [],
    data_to_save: [],
    headers: [],
    filtered_data: [],
    page_id: '',
    current_item: 0,

    initialise: (input_data, headers, page_id) =>
    {
        inputpage.data = input_data
        inputpage.headers = headers
        inputpage.page_id = page_id[0]

    },


    //create takes the data in the inputpage data set along with the headers dataset and creates the page where the headers
    //are identified and creates input elements or dropdown lists where the setting is created
    create: () =>
    {
        let input_data = inputpage.data
        for(let input of inputpage.headers)
        {
            //create the header element
            //create the full element
            let element = createEl(input.data,'','div','inputpage-class',inputpage.page_id.id)
            createEl('',input.data, 'div','inputpage-title',element.id)
            let html_element = inputType(input_data, input, element)
            // let html_element = createEl('',input_data[inputpage.current_item][input.data], 'input','inputpage-input',element.id)
            inputpage.inputdatachange(html_element, input, input_data[inputpage.current_item])
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
                //where the input value
                return createEl('',total_dataset[inputpage.current_item][object_props.data], 'input','inputpage-input',element.id)
            } else {
                //
                let selector =  inputpage.createSelectionList(element, object_props.selection.data)
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
                if(input_data._id == obj._id)
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
    createSelectionList: (parent_element, options) =>
    {
        let selector = createEl('selector_id','','div','inputpage-dropdown-btn',parent_element.id)
        createEl('select_data',' ','a','',selector.id)
    
        //create options section
        let selector_content = createEl('selector_content','','div','dropdown-content',selector.id)
        let new_options = [];
        for(let opt of options){
            new_options.push(opt.Description)
        }
        createOptions(new_options, selector_content.id)
    
        selector.addEventListener('click', function(e){
            hideandshow(selector_content)
        })
        return selector
    }
}