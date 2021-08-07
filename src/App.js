import './App.css';
import { useState } from 'react';


function App() {

  var temp=JSON.parse(localStorage.getItem("players"))
  //console.log(temp)
  const board=JSON.parse(localStorage.getItem("gameBoard"))
  //console.log(board)
  const [page2, setPage2] = useState(false);
  const [page3, setPage3] = useState(temp === null? false: true);
  const [customize, setCustomize] = useState(true)
  const [player, setPlayer] = useState("")
  const [avatar, setAvatar] = useState("")
  const avatars = ["Green", "Mustard", "Peacock", "Plum", "Scarlet", "Orchid"];
  const what = ["Candlestick","Dagger","Revolver","Lead Pipe","Rope","Wrench"]
  const where = ["Kitchen","Dining Room","Lounge","Hall","Study","Billiard Room","Conservatory","Ball Room","Library"]
  const options = ["Green", "Mustard", "Peacock", "Plum", "Scarlet", "Orchid"];
  const [allplayers, setAllplayer] = useState([])
  const [gamers, setGamers] = useState(temp === null? []:temp)
  const [boardWho,setwhoBoard] = useState(board === null? setNewBoard(avatars,gamers):board.who)
  const [boardWhat,setwhatBoard] = useState(board === null? setNewBoard(what,gamers):board.what)
  const [boardWhere,setwhereBoard] = useState(board === null? setNewBoard(where,gamers):board.where)
  let start = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-square" viewBox="0 0 16 16">'
  start += '<path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>'
  start +='</svg>'
  let suspect = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-wink me-1" viewBox="0 0 16 16">'
  suspect +=' <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>'
  suspect += '<path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm1.757-.437a.5.5 0 0 1 .68.194.934.934 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.934 1.934 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68z"/>'
  suspect += '</svg>'
  let clear = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-x me-1" viewBox="0 0 16 16">'
  clear +=' <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>'
  clear += '<path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>'
  clear += '</svg>'
  let confirm ='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-sunglasses me-1" viewBox="0 0 16 16">'
  confirm += '<path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"/>'
  confirm += '<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"/></svg>'
  const icons = {
    "start": start, "suspect": suspect, "clear": clear, "confirm": confirm
  }
  function setNewBoard(rows,cols){
    var board=[]
    var temp
    /* Setting Who Grid Default */
    for(var i=0;i<rows.length;i++)
    {
      temp=[]
      for(var j=0;j<cols.length;j++)
      {
        temp.push("start")
      }
      board.push(temp)
    }
    return board
  }

  // Storing the game in cache memory using local storage
  function updateBoard(){
    console.log(boardWhere)
    var board=boardWho;
    for(var i=0;i<board.length;i++)
    {
      if(board[i].includes('confirm'))
      {
        for(var j=0;j<board[i].length;j++)
        {
          board[i][j]=(board[i][j] === "confirm"? "confirm": "clear")
        }
      }
    }
    setwhoBoard(board)
    board=boardWhat;
    for(i=0;i<board.length;i++)
    {
      if(board[i].includes('confirm'))
      {
        for(j=0;j<board[i].length;j++)
        {
          board[i][j]=(board[i][j] === "confirm"? "confirm": "clear")
        }
      }
    }
    setwhatBoard(board)
    board=boardWhere;
    for(i=0;i<board.length;i++)
    {
      if(board[i].includes('confirm'))
      {
        for(j=0;j<board[i].length;j++)
        {
          board[i][j]=(board[i][j] === "confirm"? "confirm": "clear")
        }
      }
    }
    setwhereBoard(board)
    var b={"who":boardWho,
    "what":boardWhat,
    "where":boardWhere
    }
    localStorage.setItem("gameBoard",JSON.stringify(b));
    window.location.reload(false);
  }

  //Restart the game by clearing gameBoard from local storage
  function clearBoard()
  {
    localStorage.removeItem("gameBoard");
    window.location.reload(false);
  }

  // Customize user name Input Form
  const cunstomiseName = () =>{
    setCustomize(!customize)
  }

  //Player name can be choosen from Avatars
  function choosenOption(index){
    var choice=document.getElementsByClassName("avatars");
    for(var i=0;i<choice.length;i++)
     {
      if(choice[i].value === choice[index].value && i !== index)
      {
        alert("The choice is already made")
        document.getElementsByClassName("avatars")[index].value=""
        return false
      }
    }
  }

  //Expand player list when new player added to ittrate with map
  const addPlayer = ()=>{
    if(allplayers.length === 0)
    {
      setAllplayer([1])
    }
    else
    {
      var p=[...allplayers]
      p.push(allplayers.length+1)
      setAllplayer(p)
    }
    if(allplayers.length >= 4)
    { 
      document.getElementById("add").innerHTML="";
    }
  }

 //Store players name to local storage and hooks
  const storePlayer = () =>{
    var players=document.getElementsByClassName("players");
    var p=[]
    if(customize)
    {
      for(var i=0;i<players.length;i++ )
      {
        if(players.item(i).value === "")
        {
          alert("The Field should not be empty");
          return false;
        }
        else if(players.item(i).value.length > 4)
        {
          alert("The name length cannot be greater than 4");
          return false
        }
        else{
          p.push(players.item(i).value)
        }
      }
      setGamers(p);
    }
    else
    {
      for(i=0;i<players.length;i++ )
      {
        if(players.item(i).value === "")
        {
          alert("The Field should not be empty");
          return false;
        }
        else{
          p.push(avatars[parseInt(players.item(i).value)])
        }
      }
      setGamers(p);
    }
    console.log(p)
    localStorage.setItem("players",JSON.stringify(p))
    setLocalStorage();
  }

  //Store user Avatar and name in local stoage
  function setLocalStorage(){
      localStorage.setItem("gamer",player)
      localStorage.setItem("avatar",avatar)
      console.log(localStorage)
      changePages(3);
      window.location.reload(false);
  }

  // Page Where Name of Player can be choosen from given Avatar
  function playersDefault(){
    return(
      <div className="App">
      <header className="App-header">
        <div className="container" align="center">
          <div clasName="card w3-animate-right col-lg-5">
            <div className="card-body bg-dark text-white">
              <h3 className="card-title">
                Choose Players
              </h3>
              <h4 className="card-title">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={cunstomiseName}/>
                  <label className="form-check-label" for="flexSwitchCheckDefault">Customise Name</label>
                </div>
              </h4>
              <select className="form-select avatars players form-select-lg my-3">
                <option value="">Player 1 Avatar</option>
                {
                avatars.map((option,index) =>
                  <option value={index}>{option}</option>
                  )}
              </select>
              {
                allplayers.map((num,index) =>
                <select class="form-select avatars players form-select-lg my-3" onChange={choosenOption(index)}>
                    <option value="">Player {num+1} Avatar</option>
                    {
                    options.map((option,index) =>
                      <option value={index}>{option}</option>
                    )
                    }
                </select>
                )}
              
              <div className="btn text-white" id="add">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" onClick={addPlayer} fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
              </div>     
              <button className="btn btn-lg btn-primary" onClick={storePlayer}>Submit</button>
            </div>
          </div>
        </div>
      </header>
    </div>
    );
  }

  //  Customisation of Player imput names page
  function playersCustomize(){
    return(
      <div className="App">
      <header className="App-header">
        <div className="container" align="center">
          <div className="card w3-animate-left col-lg-5">
            <div className="card-body bg-dark text-white">
              <h3 className="card-title">
                Enter Players Name
              </h3>
              <h4 className="card-title">
                <div className="form-check form-switch" align="center">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"  onChange={cunstomiseName} checked/>
                  <label className="form-check-label" for="flexSwitchCheckDefault">Customise Name</label>
                </div>
              </h4>
              <input className="form-control players form-control-lg my-3" type="text" placeholder="Player 1 Name" aria-label=".form-control-lg example"></input>
              {
                allplayers.map((num) =>
                <input className="form-control players form-control-lg my-3" type="text" placeholder={"Player "+(num+1)+" Name"} aria-label=".form-control-lg example" pattern="[A-Za-z]{4}"></input>
                )}
              <div className="btn text-white" id="add">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" onClick={addPlayer} fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
              </div>  
              <button className="btn btn-lg btn-primary" onClick={storePlayer}>Submit</button>
            </div>
          </div>
        </div>
      </header>
    </div>
    );
  }

  // Validation of user inputs
  const submitted = () => {
    if(document.querySelector("#player").value === "" || document.querySelector("#avatar").value === "")
    {
      alert("Complete the form...");
      return false
    }
    else
    {
      setPlayer(document.querySelector("#player").value);
      setAvatar(document.querySelector("#avatar").value);
      changePages(2);
    }
  }
  // Funtion for Shifting pages
  function changePages(page){
    if(page === 2)
    {
      setPage2(true)
      setPage3(false)
    }
    else if(page === 3)
    {
      setPage2(false)
      setPage3(true)
      alert("Make sure you save after each changes to avoid data loss...")
    }
    else if(page === 1){
      setPage2(false)
      setPage3(false)
    }

  }

  //Funtion invoke when game should restart with same player
  const restartGame = () =>{
    if(window.confirm("The game is going to restart!..."))
    {
      clearBoard();
      window.location.reload(false);
      console.log("Restarted")
    }
  }

  //Funtion will clear all previous memory and star
  const confirmNewGame = () =>{
    if(window.confirm("The game and player details will be cleared"))
    {
      localStorage.clear();
      window.location.reload(false);
      console.log("New Game")
    }
  }

  //Funtion will invoke when user check any row in Who? table
  function whoCheck(r,c,e)
  {
      e.preventDefault()
      var board=boardWho
      var id="who"+r.toString()+c.toString()
      if(board[r][c] === "start")
      {
        board[r][c] = "suspect"
        document.getElementById(id).innerHTML=suspect
      }
      else if(board[r][c] === "suspect")
      {
        board[r][c] = "confirm"
        document.getElementsByClassName("who")[r].className="who table-light"
        document.getElementById(id).innerHTML=confirm
      }
      else if(board[r][c] === "confirm")
      {
        board[r][c] = "clear"
        document.getElementsByClassName("who")[r].className="who table-dark"
        document.getElementById(id).innerHTML=clear
      }
      else
      {
        board[r][c] = "start"
        document.getElementById(id).innerHTML= start
      }
      setwhoBoard(board)
      console.log(boardWho[r][c],r,c)
  }

  //Funtion will invoke when user check any row in What? table
  function whatCheck(r,c,e)
  {
      e.preventDefault()
      var board=boardWhat
      var id="what"+r.toString()+c.toString()
      if(board[r][c] === "start")
      {
        board[r][c] = "suspect"
        document.getElementById(id).innerHTML=suspect
      }
      else if(board[r][c] === "suspect")
      {
        board[r][c] = "confirm"
        document.getElementsByClassName("what")[r].className="what table-light"
        document.getElementById(id).innerHTML=confirm
      }
      else if(board[r][c] === "confirm")
      {
        board[r][c] = "clear"
        document.getElementsByClassName("what")[r].className="what table-dark"
        document.getElementById(id).innerHTML=clear
      }
      else
      {
        board[r][c] = "start"
        document.getElementById(id).innerHTML= start
      }
      setwhatBoard(board)
      console.log(boardWhat[r][c],r,c)
  }

  //Funtion will invoke when user check any row in What? table
  function whereCheck(r,c,e)
  {
      e.preventDefault()
      var board=boardWhere
      var id="where"+r.toString()+c.toString()
      if(board[r][c] === "start")
      {
        board[r][c] = "suspect"
        document.getElementById(id).innerHTML=suspect
      }
      else if(board[r][c] === "suspect")
      {
        board[r][c] = "confirm"
        document.getElementsByClassName("where")[r].className="where table-light"
        document.getElementById(id).innerHTML=confirm
      }
      else if(board[r][c] === "confirm")
      {
        board[r][c] = "clear"
        document.getElementsByClassName("where")[r].className="where table-dark"
        document.getElementById(id).innerHTML=clear
      }
      else
      {
        board[r][c] = "start"
        document.getElementById(id).innerHTML= start
      }
      setwhereBoard(board)
      console.log(boardWhere[r][c],r,c)
  }

  // The main game grid for make options
  function gameBoard(){
    return(
      <div className="App">
        <header className="App-header">
          <div className="container" align="center">
            <h1>Cluedo</h1>
            <nav class="navbar navbar-dark bg-dark sticky-top">
              <div className="navbar-brand ms-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-wink me-1" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm1.757-.437a.5.5 0 0 1 .68.194.934.934 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.934 1.934 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68z"/>
              </svg>
                Suspect
              </div> 
              <div className="navbar-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-sunglasses me-1" viewBox="0 0 16 16">
                  <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"/>
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"/>
                </svg>
                Confirm
              </div>
              <div className="navbar-brand">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-x me-1" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
                </svg>  
                All Clear
              </div>
            </nav>
             <div className="row">
              <div className="col fixed-top mt-5">
              <button type="button" class="btn btn-secondary float-end mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-menu-button-wide-fill" viewBox="0 0 16 16">
                  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h13A1.5 1.5 0 0 0 16 3.5v-2A1.5 1.5 0 0 0 14.5 0h-13zm1 2h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1zm9.927.427A.25.25 0 0 1 12.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0l-.396-.396zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
              </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content mt-5">
                <div class="modal-header">
                  <h5 class="modal-title text-dark" id="exampleModalLabel">Game Options</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <button type="button" class="btn btn-success mb-4" onClick={updateBoard} data-bs-dismiss="modal">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-bookmark-check mx-2" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                    </svg>
                    Save Game
                    </button><br/>
                    <button type="button" class="btn btn-warning my-3" onClick={confirmNewGame}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
                      <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
                      <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
                    </svg>
                    New Game
                  </button>
                  <button type="button" class="btn btn-primary ms-2 my-3" onClick={restartGame}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
                      <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"/>
                      <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"/>
                    </svg>
                    Restart Game
                  </button>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
            
            <table class="table table-dark">
            <thead>
              <td className="text-center">Who?</td>
            {gamers.map((r) => 
              <th>{r}</th>
            )}
            </thead>
            <tbody>
            {boardWho.map((who,r) => 
            <tr className={who.includes("confirm")?"who table-light":"who"}><th>{avatars[r]}</th>
              {who.map((classn,c) =>
              <td>
                <div id={"who"+r.toString() + c.toString()} onClick={(e) =>whoCheck(r,c,e)} dangerouslySetInnerHTML={{__html: icons[classn]}}>
                </div>
              </td>
              )} 
            </tr> 
            )}
            </tbody></table>
            <table class="table table-dark">
            <thead>
              <td className="text-center">What?</td>
            {gamers.map((r) => 
              <th>{r}</th>
            )}
            </thead>
            <tbody>
            {boardWhat.map((wh,r) => 
            <tr className={wh.includes("confirm")?"what table-light":"what"}><th>{what[r]}</th>
              {wh.map((classn,c) =>
              <td>
                <div id={"what"+r.toString() + c.toString()} onClick={(e) =>whatCheck(r,c,e)} dangerouslySetInnerHTML={{__html: icons[classn]}}>
                </div>
              </td>
              )} 
            </tr> 
            )}
            </tbody></table>
            <table class="table table-dark">
            <thead>
              <td className="text-center">Where?</td>
            {gamers.map((r) => 
              <th>{r}</th>
            )}
            </thead>
            <tbody>
            {boardWhere.map((whe,r) => 
            <tr className={whe.includes("confirm")?"where table-light":"where"}><th>{where[r]}</th>
              {whe.map((classn,c) =>
              <td>
                <div id={"where"+r.toString() + c.toString()} onClick={(e) =>whereCheck(r,c,e)} dangerouslySetInnerHTML={{__html: icons[classn]}}>
                </div>
              </td>
              )} 
            </tr> 
            )}
            </tbody></table>
          </div>
          <footer className="text-info">
            <p>Designed: <a href="https://ameen.click">Ameen AbdulSalam</a><br/>
            <a href="mailto:mail@ameen.click">mail@ameen.click</a></p>
          </footer>
        </header>
      </div>
      );
  }

  //Home page when a new user enter into game
  function home(){
    return (
      <div className="App">
        <header className="App-header">
          <div className="container" align="center">
            <h1 className="w3-animate-fadeinn">Cluedo</h1>
            <div className="card w3-animate-top col-lg-4">
              <div className="card-body bg-dark text-white">
                <h5 className="card-title">Enter Your Details</h5>
                <input className="form-control form-control-lg" type="text" id="player" placeholder="Player Name" aria-label=".form-control-lg example"></input>
                <select className="form-select  form-select-lg my-3" id="avatar">
                  <option value="">Choose Your Avatar</option>
                  <option value="Green">Green</option>
                  <option value="Mustard">Mustard</option>
                  <option value="Peacock">Peacock</option>
                  <option value="Plum">Plum</option>
                  <option value="Scarlet">Scarlet</option>
                  <option value="Orchid">Orchid</option>
                </select>
                <div className="example-popover" title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg> Storing in your phone cache
                </div><br/>
                <button className="btn btn-lg btn-primary" onClick={submitted}>Submit</button>
              </div>
            </div>
          </div>
          <footer className="text-secondary">
            <p>Developed by <a href="https://ameen.click" target="_blank" rel="noreferrer">Ameen AbdulSalam</a><br/>
            <a href="mailto:mail@ameen.click">mail@ameen.click</a></p>
          </footer>
        </header>
      </div>
    );
  }

  //Page Switching Code
  if(page2)
  {
    if(customize)
    {
      return playersCustomize();
    }
    else
    {
      return playersDefault();
    }
  }
  else
  {
    if(page3)
    {
      return gameBoard();
    }
    else{
      return home();
    }
  }

  
}

export default App;
