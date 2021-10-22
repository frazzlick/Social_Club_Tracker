

//pass the table object and the html row item and this will hide or show the row on the event listener click
/**
 @name hideandshowRow
 @description Pass the table object and the html row within an event listener. On click this function 
 will hide the child rows or show them
**/
export default function hideandshowRow(table, html)
{
    for(let obj of table.data_to_element){
        if(obj.html == html){
            findDataElement(obj.data.children)
        }
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
            
        function hideandshow(object){
            if(object.style.display == 'none'){
                object.style.display = ''
            } else{
                object.style.display = 'none'
            }
    }
}
