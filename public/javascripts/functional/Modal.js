
function createModal(dataset, active_event)
{
    
    let modal = {

        data: dataset,
        active_items: [],
        active_event: active_event,
        current_members: [],
        
        modalBody: () =>
        {

            //create the modal, header body and footer
            createEl('modal', '','div','modal','body')
            createEl('modal-header','','div','modal-header','modal')
            createEl('modal-body','','div','modal-body','modal')
            createEl('modal-footer','','div','modal-footer','modal')

            //create the save and close buttons
            // let modal_save = createEl('modal-save', 'Save', 'button','modal-save', 'modal-footer')
            let modal_close = createEl('modal-close', 'Close', 'button','modal-save', 'modal-footer')

            //add event listeners to modal_save and modal_close
            // modal_hide(modal_save)
            modal_hide(modal_close)

            //create the modal-body split
            createEl('modal_split_1', '','div','modal-split','modal-body')
            createEl('modal_split_2', '','div','modal-split','modal-body')

            function modal_hide(button){
                button.addEventListener('click', function(e){
                    hideandshow(document.getElementById('modal'))
                    removeElements(document.getElementById('modal'))
                })
                modal.save()
            }

            //save the current items by calling the save function 
            //removing the save function - only for main page
            // modal_save.addEventListener('click', function(e){
            //     modal.save()
            // })
        },

        appendMembers()
        {
            for(let member of modal.active_event.members)
            {
                for( var i = 0; i < modal.data.length; i++){ 
                    if ( modal.data[i]._id == member._id) {
                        modal.current_members.push(member)
                        modal.data.splice(i, 1);
                        i--; 
                    }
                }
            }

            for(let data of modal.data)
            {
                let content_element = createEl('',data.name,'div','modal-content','modal_split_1')
                switchPanel(data, content_element)
            }

            for(let data of modal.current_members)
            {
                let content_element = createEl('',data.name,'div','modal-content','modal_split_2')
                switchPanel(data, content_element)
            }


            function switchPanel(data_object, html_element)
            {
                html_element.addEventListener('click', function(e){
                    let new_element;
                    if(this.parentElement.id == 'modal_split_1')
                    {
                        new_element = createEl('',data_object.name,'div','modal-content','modal_split_2')
                        modal.active_event.members.push(data_object)
                    } else {
                        new_element = createEl('',data_object.name,'div','modal-content','modal_split_1')
                        for(let i = 0; i < modal.active_event.members.length; i++){
                            if(modal.active_event.members[i]._id == data_object._id){
                                modal.active_event.members.splice(i, 1);
                                i--; 
                            }
                        }
                    }
                    this.remove()
                    switchPanel(data_object, new_element)
                    return modal.active_items.push(data_object)
                })
            }
        },

        save()
        {
            return modal.active_event
        }

    }

    
    modal.modalBody()
    modal.appendMembers()
    return modal
}