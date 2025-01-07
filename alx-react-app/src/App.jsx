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
      <UserProfile name="Alice" age="25" bio="Loves hiking and photography" />
    </div>
  )
}
export default App