import { useState, useEffect } from "react";

const App = () => {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]); //to save previous chats
  const [currentTitle, setCurrentTitle] = useState(null); //every chat has a specific title

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  }; //this clears the old chat

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null);
    setValue("");
  } //when you click on a chat in the history, this function sets the previous chat that you clicked to the unique title (which will make it the current title)

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(currentTitle, value, message); //runs current chat, what the input was, and the message given back
    if (!currentTitle && value && message) {
      setCurrentTitle(value); //if theres no current title but value and message is there than the current title should be set to the value that is in the input
    }
    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        { title: currentTitle, role: "user", content: value }, //whatever the first prompt was from the user, with the value that was given back. The whole conversation is lumped together by whatever the current title is.
        { title: currentTitle, role: message.role, content: message.content }, //this is what the chat will give back to you when you save a previous chat.
      ]);
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter((previousChat) => previousChat.title === currentTitle); //any object that has the same title as the current chat will be put to the current chat
  const uniqueTitles = Array.from(new Set(previousChats.map((previousChat) => previousChat.title))); //this can give you back each unique title 


  
  


  return (
    <div className='app'>
      <section className='side-bar'>
        <button onClick={createNewChat}>+ New chat</button>
        <ul className='history'>
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by Simi</p>
        </nav>
      </section>
      <section className='main'>
        {!currentTitle && <h1>SimiGPT</h1>}
        <ul className='feed'>
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className='role'>{chatMessage.role}</p>
              <p>{chatMessage.content}</p>
            </li>
          ))}
        </ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id='submit' onClick={getMessages}>
              ➢
            </div>
          </div>
          <p className='info'>
            Unlock the power of AI-driven conversations for seamless
            communication and intelligent assistance.
          </p>
        </div>
      </section>
    </div>
  );
};

export default App;
