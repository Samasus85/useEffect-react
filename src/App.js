import React, { useEffect, useState } from 'react';                   // импортируем реакт, useState, useEffect
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);                // useState

  useEffect(() => {
    const storedUserLoggedInfo = localStorage.getItem('isLoggedIn')   // получает данные из локал и проверяет
    // localStorage.setItem('isLoggedIn', '1');                      // так использовать нельзя потому что при каждом рендере и он сработает

    if (storedUserLoggedInfo === '1') {                                  // проверка на наличии useEffect
      setIsLoggedIn(true);                                               // если условия верна то состоянии вернуть true
    }
  }, []);                                                                 //здесь useEffect сработает 1 раз после переоценки и страница не изчезнить пока мы не очистим 
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    // мы можем использовать в этом случае, потому что при нажатии onsubmit(он унас в компоненте Login(sibmitHandler))  происходить изменения ( после совершении событий)
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);                                             // состояния false(если не использовать после очистки не рендерится форма и это ошибка)
    localStorage.removeItem('isLoggedIn')                             // очистка localstorage после соверишении событии logaut и возвращается форма
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}           {/* связка данных с Login, форма появляется если условии верны   */}
        {isLoggedIn && <Home onLogout={logoutHandler} />}           {/* связка данных с Home, умирает при работе формы после отправки данные из форм появляется */}
      </main>
    </React.Fragment>
  );
}

export default App;
