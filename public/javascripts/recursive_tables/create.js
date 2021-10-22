export default function table_props() {

    let table = `
    <table id="table" class="table_style">
        <thead id="table_head">
            <th>Description</th>
        </thead>
        <tbody id="tbody">
        </tbody>
    </table>
    `
    document.getElementById('content-section').innerHTML = table
    // createEl('table', '','table','table_style','content-section')
    // createEl('table_head','','thead','','table')
    // createEl('','Description','th','','table_head')
    // createEl('tbody','','tbody','','table')
    return
}