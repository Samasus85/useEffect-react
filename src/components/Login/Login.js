import React, { useEffect, useReducer, useState } from 'react';                                // получаем usestate
import Card from '../UI/Card/Card';                                     // получаем обертки
import classes from './Login.module.css';                               // получение стили
import Button from '../UI/Button/Button';                               // получение другого компонента

const emailReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@'),
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.includes('@'),
    };
  }
  return {
    value: '',
    isValid: false,
  }
}

const passwordReducer = (prevState, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: prevState.value,
      isValid: prevState.value.trim().length > 6,
    };
  }
  return {
    value: '',
    isValid: false,
  }
}
const Login = (props) => {                                               // компонент Login к-я принимает пропс и возвращает jsx
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  })
  // const [emailValuts, steEmailValues] = useState({
  //   enteredEmail: '',
  //   emailIsValid: false,
  // });
  // const [enteredEmail, setEnteredEmail] = useState('');                   // usestate для инпута email
  // const [emailIsValid, setEmailIsValid] = useState(false);                // проверка для  email
  // const [enteredPassword, setEnteredPassword] = useState('');             // usestate для инпута пароля
  // const [passwordIsValid, setPasswordIsValid] = useState(false);          // проверка для  пароля
  const [formIsValid, setFormIsValid] = useState(false);
  const { isValid: emailIsValid } = emailState;             // проверка для  формы
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {                                                        // useEffect 
    const identifier = setTimeout(() => {                                   // асинхронная работа useEffect callback ф-ции
      console.log('Valid');                                                // вывод на консоль
      setFormIsValid(emailIsValid && passwordIsValid)    // проверка на правильность заполнения инпута формы пользователем
    }, 2500);                                                               // таймер действии

    //clean up function with debouncing
    return () => {                                                             //возвраащении колбэк ф-ции которой очищает таймер
      console.log('clean up');
      clearTimeout(identifier)                                              // очистка работы useEffect до последнего рендера 
    };
  }, [setFormIsValid, emailIsValid, passwordIsValid]);                                                // после проверки если true будут меняться и после изменения useEffect сработает
  // в итоге после проверки сохранит только true  и состояние формы меняется на true и сохранятся обнавленные данные и идут туда куда мы отправляем
  const emailChangeHandler = (event) => {                                 // функция(ф-я) к-я включает правильных обнавленных данных для email
    // setEnteredEmail(event.target.value);                                  // обновление или изменение полученных данных
    // setFormIsValid(event.target.value.includes('@') && passwordState.trim().length > 6);
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {                              // функция(ф-я) к-я включает правильных обнавленных данных для password
    // setEnteredPassword(event.target.value); 
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value })                              // обновление или изменение полученных данных
  };

  const validateEmailHandler = () => {                                    // функция(ф-я) к-я  работает  после проверки и вызова
    // setEmailIsValid(enteredEmail.includes('@'));  
    dispatchEmail({ type: 'INPUT_BLUR' });                    // обновление или изменение полученных данных
  };

  const validatePasswordHandler = () => {                                 // функция(ф-я) к-я  работает  после проверки и вызова
    // setPasswordIsValid(enteredPassword.trim().length > 6);   
    dispatchPassword({ type: 'INPUT_BLUR' });                            // обновление или изменение полученных данных
  };

  const submitHandler = (event) => {                                      // ф-я которая отправляет данных куда-то (обычно на сервер)
    event.preventDefault();                                               // остановит обнавления или же поднятие 
    props.onLogin(emailState.value, passwordState.value);                         // двусторонняя привязка и поднятие состояние данных в App
  };

  return (                                                                //jsx 
    <Card className={classes.login}>                                      {/*обертка */}
      <form onSubmit={submitHandler}>                                     {/*форма работает после нажатии на кнопку LOgin  и после сработатет useEffect*/}
        <div
          className={`${classes.control} ${emailState.IsValid === false ? classes.invalid : ''
            }`}                                            //  это проверка  инпута email на правильность, если нет присвоевает новый класс и применяются новые стили
        >
          <label htmlFor="email">E-Mail</label>                     {/* метка,надпись для email */}
          <input                                                    // поля к-е пользователь может вводит данных (email)
            type="email"                                            // тип инпута
            id="email"                                              // уникальное имя инпута
            value={emailState.value}                                    // обнавленное значение к-е сохранил в себе usestate
            onChange={emailChangeHandler}                     // сохраняет данные инпута email  после передается в качестве пропс другому компоненту
            onBlur={validateEmailHandler}                    //  принимает boolean, это обводка, фокус на инпут 
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.IsValid === false ? classes.invalid : ''
            }`}                                              //  это проверка инпута password на правильность, если нет присвоевает новый класс и применяются новые стили
        >
          <label htmlFor="password">Password</label>          {/* метка,надпись для пароль */}
          <input                                              // поля к-е пользователь может вводит данных (пароль)
            type="password"                                   // тип инпута
            id="password"                                     // уникальное имя инпута
            value={passwordState.value}                           // обнавленное значение к-е сохранил в себе usestate
            onChange={passwordChangeHandler}                  // сохраняет данные инпута password  после передается в качестве пропс другому компоненту
            onBlur={validatePasswordHandler}                   //  принимает boolean, это обводка, фокус на инпут 
          />
        </div>
        <div className={classes.actions}>                       {/* блок  кнопки */}
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            {/*это кнопка работает при правильной заполнении инпутов  email & password*/}
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;                                              // экспорт метода Login
