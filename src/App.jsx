import { useState } from "react"
import Search from "./components/Search.jsx"

const App = () =>{

const [searchTerm , setSearchTerm] = useState("")

  return(<main>

    <div className="pattern">
      <div className="wrapper">
        <header>
          <img src='/public/book poster.jpg' alt=''/>
          <h1>Find Your <span className="text-gradient">Favorites Books</span> Here</h1>
        </header>

        <Search searchTerm ={searchTerm} setSearchTerm={setSearchTerm}/>
        <h1 className="text-gray-100">{searchTerm}</h1>
      </div>
    </div>

  </main>)
}

export default App
