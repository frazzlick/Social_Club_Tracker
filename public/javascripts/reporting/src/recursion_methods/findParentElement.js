/* @name findParentElement
    @description pass the element, search item and the dimension and return the element requested and all it's children


*/
export default function findParentElement(element, search, dimension){
    console.log(element)

    let enabled_element;
    if (element.description == search){
        found = {dimension_name: dimension.dimension_name, elements: [
            element
        ]}
        console.log(found)
        return found
    }
    if(element.children == undefined){
        return
    }
    for(let child of element.children)
    {
        enabled_element = findParentElement(child, search, dimension)
    }
    return found
}