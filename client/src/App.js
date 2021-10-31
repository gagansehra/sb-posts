import { Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/LoginForm';
import MyHeader from './components/MyHeader';
import PostContainer from './components/PostContainer';
import UsersContainer from './components/UsersContainer';
import SignupForm from './components/SignupForm';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className="App">
      <div className="header">
        <MyHeader className="col-6" />
        <Route path="/signup">
          <SignupForm />
        </Route>
        

        {!localStorage.getItem("token") && (<Route path="/login">
          <LoginForm />
        </Route>)}

        {localStorage.getItem("token") && (<Route path="/posts/create">
          <CreatePost />
        </Route>)}
        
        {localStorage.getItem("token") && (
          <Route exact path="/posts">
            <div className="posts">
              <PostContainer />
            </div>
            <div className="users">
              <UsersContainer />
            </div>
          </Route>
        )}
      </div>
    </div>
  );
}

export default App;
