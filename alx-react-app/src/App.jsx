import Footer from "./components/Footer" 
import Header from "./components/Header"
import MainContent from "./components/MainContent"
import WelcomeMessage from "./components/WelcomeMessage"
import UserProfile from "./components/UserProfile"


function App (){
  return(
    <div>
      <Footer />
      <Header />
      <MainContent /> 
      <WelcomeMessage />
      <UserProfile name="alice" age="25" bio="love hiking and photography" />
    </div>
  )
}
export default App