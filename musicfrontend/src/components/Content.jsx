import '../assets/content.css'; // Adjust the path if needed

const Content = () => {
    const musictypes=["Classic","90's","New","Instrumental","Dance","Modern","Rajasthani"]
  return (
    <div className="content-container">
      <h1 className="set-content">Music Categories</h1>
      <div className="mustictypescontainer">
{
    musictypes.map((item)=>
        <li className='musictypes' key={item}>{item}</li>
    )
}
      </div>

      <h1 className="set-content">Recommended Songs</h1>
      <ul className="musicemojicontainer">
        <li className="musicemojis">🥰</li>
        <li className="musicemojis">😔</li>
      </ul>
    </div>
  );
};

export default Content;
