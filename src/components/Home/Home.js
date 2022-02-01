import React from 'react';                              // импорт реакта
import Card from '../UI/Card/Card';                     // импорт компонента обертки
import classes from './Home.module.css';                // получение доступ к стилям  для этого компонента

const Home = (props) => {                               // компонента это принимает пропс и возвращает jsx 
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;                                    // экспортируем этого компонента
