export default function createRow(data, table)
{
            for(let d of data.children)
            {
                let row = createEl(d.description,'','tr','','tbody')
                
                //create the expand button on every item
                createExpandButton(row)
                table.data_to_element.push({data: d, html: row})
                let td = createEl(Math.random(),'','td','',row.id)
                for(let i = 0; i<d.level; i++){
                    createEl('','','td','',td.id)
                }
                createEl('',d.description,'td','',td.id)
                childRow(d, row)

                function childRow(child, row)
                {
                    if(child.level > 1){
                        setRowHidden(child, row)

                    }
                    if(child.children !== undefined){
                        return createRow(child, table)
                    }
                }
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
            if(object.style.display == 'none'){
                object.style.display = ''
            } else{
                object.style.display = 'none'
        }
        
}