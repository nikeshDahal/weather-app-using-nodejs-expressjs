
console.log("testing index client side js code............");


const form=document.querySelector('form');
const search= document.querySelector('input');
const message_1= document.querySelector('#message-1');
const message_2= document.querySelector('#message-2');

message_1.textContent="loading.....";
message_2.textContent='';

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const address=search.value;
    fetch(`http://localhost:3000/weather?address=${address}`)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message_1.textContent=error;
            }
            message_1.textContent = data.location;
            message_2.textContent =data.weather;
        })

})
})

