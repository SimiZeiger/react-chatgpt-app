const App = () => {
  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: "hello how are you?",
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='app'>
      <section className='side-bar'>
        <button>+ New chat</button>
        <ul className='history'>
          <li>SUP!</li>
        </ul>
        <nav>
          <p>Made by Simi</p>
        </nav>
      </section>
      <section className='main'>
        <h1>SimiGPT</h1>
        <ul className='feed'></ul>
        <div className='bottom-section'>
          <div className='input-container'>
            <input />
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
