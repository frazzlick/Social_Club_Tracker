

//function to take in a grid and return the layout

function createGrid(num_of_grid, parent_element)
{
    let grid_container = createEl('grid-container','','div','grid-container',parent_element)
    
    for(let i = 0; i < num_of_grid; i++){
        createEl('grid'+i, '','div','grid-element',grid_container.id)
    }

    return 
}