function requestData(url, request){
    let result = $.ajax({
        type: 'GET', 
        url: url,
        data: request,
        contentType: 'application/json',
        async: false,
        success: function(success){
        }}).responseText;

        return JSON.parse(result);
}

function saveData(url, params, handleData){
    let result = $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: function(data){
            handleData(data)
        }
    })
}

async function deleteData(url, params){
    $.ajax({
        type: 'DELETE',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(params),
        success: async function(success){
            console.log(success);
        }
    });
}