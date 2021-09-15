import { useEffect, useState } from 'react';
import LoginPage from './containers/LoginPage';
import ToDoList from './containers/ToDoList';
import { Route, Switch } from 'react-router-dom';

function App() {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLogin')) {g
      setIsLogin(true);
    }
  }, []);
  return (
    <div>
      {isLogin ?
        <Switch>
          <Route path='/ToDoList' exact component={ToDoList} />
        </Switch>
        : <Switch>
          <Route path='/' component={LoginPage} />
        </Switch>
      }
    </div>
  );
}

export default App;
