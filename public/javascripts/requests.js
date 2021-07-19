function requestData(params){
    let result = $.ajax({
        type: 'GET', 
        url: params,
        async: false,
        success: function(success){
        }}).responseText;

        return JSON.parse(result);
}
