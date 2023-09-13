 const socket=io()
  let name;
  let textarea=document.querySelector('#textarea')
  let messageArea=document.querySelector('.message__area')
 do{
    name =prompt("enter you name");
 }while(!name)

  textarea.addEventListener('keyup',(e)=>{
        if(e.key=='Enter')
        {
           
            if(e.target.value.trim()!=''){
                console.log(e.target.value);
                sendMessage(e.target.value)
               
            }
            
        }
 })

 const sendMessage=(message)=>{
        let msg={
            user:name,
            message:message.trim()
        }
        appendMessage(msg,'outgoing')
        socket.emit('message',msg)
        scrollToBottom();
        textarea.value='';
 }
 const appendMessage=(msg,type)=>{
        let mainDiv=document.createElement('div')
        let className=type
        mainDiv.classList.add(className,'message')

        let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
        `
        mainDiv.innerHTML=markup;
        messageArea.appendChild(mainDiv)
    }

    //receive message
    socket.on('message',(msg)=>{
        appendMessage(msg,'incoming')
        scrollToBottom();
    })

    const scrollToBottom=()=>{
        messageArea.scrollTop=messageArea.scrollHeight;
    }