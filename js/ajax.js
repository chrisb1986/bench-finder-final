var ajaxRequest = new XMLHttpRequest(); 
ajaxRequest.open('GET', 'js/benches.json', true);
var handleResponse=function()
{
    if(ajaxRequest.status===200)
    {
        if(ajaxRequest.readyState===4)
        {
            var benches=JSON.parse(ajaxRequest.responseText);
            // console.log(benches[1].benchId);
        }
    }
}
//when the server responds call the function handleResponse() 
ajaxRequest.onreadystatechange=handleResponse; 
//Everything is set up, now send off the request to the server
ajaxRequest.send(null);