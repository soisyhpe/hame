import Navbar from './navbar';
import SigninForm from './signin_form';
import SignupForm from './signup_form';
import Feed from './feed';
import './assets/css/home.css'

function App() {
  return (
    <body className="home">
      <Navbar/>
      <Feed/>
    </body>
  );
}

export default App;
