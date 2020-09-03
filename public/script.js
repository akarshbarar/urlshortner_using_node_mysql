
// api url 
const api_url = "http://localhost:8000/all"; 
  
// Defining async function 
async function getapi(url) { 
    
    // Storing response 
    const response = await fetch(url); 
    
    // Storing data in form of JSON 
    var data = await response.json(); 
    console.log(data); 
  
    show(data); 
} 
// Calling that async function 
getapi(api_url); 
  

// Function to define innerHTML for HTML table 
function show(data) { 
    let tab =  
        `<tr> 
          <th>id</th> 
          <th>Full Url</th> 
          <th>Short Url</th> 
          
         </tr>`; 
    
    // Loop to access all rows  
    for (let r of data) { 
        tab += `<tr>  
    <td>${r.id} </td> 
    <td>${r.fullUrl}</td> 
    <td><a href="${r.shortUrl}">${r.shortUrl}</a></td>  
</tr>`; 
    } 
    // Setting innerHTML as tab variable 
    document.getElementById("employees").innerHTML = tab; 
} 
