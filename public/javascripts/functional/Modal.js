function createModal(dataset, )
{
    
    let modal = {

        data: dataset,
        active_items: [],
        
        modalBody: () =>
        {

            //create the modal, header body and footer
            createEl('modal', '','div','modal','body')
            createEl('modal-header','','div','modal-header','modal')
            createEl('modal-body','','div','modal-body','modal')
            createEl('modal-footer','','div','modal-footer','modal')

            //create the save and close buttons
            let modal_save = createEl('modal-close', 'Close', 'button','modal-save', 'modal-footer')
            let modal_close = createEl('modal-save', 'Save', 'button','modal-save', 'modal-footer')

            //add event listeners to modal_save and modal_close
            modal_hide(modal_save)
            modal_hide(modal_close)

            //create the modal-body split
            createEl('modal_split_1', '','div','modal-split','modal-body')
            createEl('modal_split_2', '','div','modal-split','modal-body')

            function modal_hide(button){
                button.addEventListener('click', function(e){
                    hideandshow(document.getElementById('modal'))
                    removeElements(document.getElementById('modal'))
                })
            }
        },

        appendMembers()
        {
            for(let data of modal.data)
            {
                let content_element = createEl('',data.name,'div','modal-content','modal_split_1')
                content_element.addEventListener('click', function(e){
                    this.remove()
                    let right_side_element = createEl('',data.name,'div','modal-content','modal_split_2')
                    right_side_element_onclick(right_side_element)
                    return modal.active_items.push(data)
                })
            }

            function right_side_element_onclick(element){
                element.addEventListener('click', function(e){
                    createEl('',this.innerHTML,'div','modal-content','modal_split_1')
                    this.remove()
                })
            }
        }
    }

    
    modal.modalBody()
    modal.appendMembers()
    return modal
}