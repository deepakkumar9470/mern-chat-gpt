import { useState } from 'react'
import './App.css'
import ChatMessage from './components/ChatMessage'
import './normalize.css'


function App() {
   const [input,setInput] = useState('')

   const [chatLogs,setChatLogs] = useState([
    {
      user :'dk',
      message : 'Hey Abhi how are you!'
     },
     {
      user :'ak',
      message : 'Hey Abhi how are you!'
     }
   ])

   const clearChats = () =>{
    setChatLogs([])
   }

  const handleSubmit = async  (e) =>{
    e.preventDefault()
    // setChatLogs([...chatLogs , {user : 'dk', message : `${input}`}])

    const chatLogNew = [...chatLogs , {user : 'dk', message : `${input}`}]
    setChatLogs(chatLogNew)
    setInput('')

    const messages = chatLogNew.map((message,i) => message.message).join("\n")
    
    const res = await fetch('http://localhost:5000/',
    { 
      method : 'POST',
    
      headers : {"Content-Type" :  "application/json"},
      body:  JSON.stringify({
        message  :messages
      })
      
  });

  const data = await res.json()
  // setChatLogs([...chatLogNew , {user : 'dk', message : `${data.message}`}])

  console.log(data)
    
  }

  return (
    <div className="mainContainer">
      <aside className='sidemenu'>
        <div className="side-menu-btn" onClick={clearChats}>
          <span>+</span>
          New Chat
        </div>
      </aside>

      <section className='chatbox'>
        <div className="chat-log">
          
           {
            chatLogs.map((message,i)=>(
              <ChatMessage key={i} message={message}/>
            ))
           }

        </div>

        <div className="chat-input-holder">

          <form action="" onSubmit={handleSubmit}>
          <input 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            className="chat-input-textarea"
            rows="1"
          ></input>
          </form>

          
        </div>

      </section>
    </div>
  )
}

export default App
