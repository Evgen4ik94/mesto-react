import React from "react";
import logo from "../images/header-logo.svg"; //Импортируем логотип

function Header() { //Создаем компонент Header
  return (  //Вставляем разметку шапки на страницу
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
    </header>
  );
}

export default Header;
