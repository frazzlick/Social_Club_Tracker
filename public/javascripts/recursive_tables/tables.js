
import table_props from "./create.js"
import hideandshowRow from "./expandrow.js"

    let table = {
        dataset: [],
        data_to_element: [],

        create: (dataset) => {
            table.dataset = dataset
            table_props()        
            table.draw()
        },


        destroy: () => {
            removeElements(document.getElementById('tbody'))
        },

        draw: () => {
            table.destroy()
            createRow(table.dataset)

            //return a row of data
            function createRow(data)
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
                            return createRow(child)
                        }
                    }
                }
            }

            function createExpandButton(row)
            {
                let td = createEl(Math.random(),'','td','',row.id)
                let expand_button = createEl('','+','button','',td.id)
                expand_button.addEventListener('click', function(e){
                    hideandshowRow(table, row)
                    this.innerHTML = '-';
                })
            }

            

            function setRowHidden(data, row)
            {
                data.hidden = true
                row.style.display = 'none'
            }

        
        }
    }

    export { table }