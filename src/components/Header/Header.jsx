import logo from "../../images/logo/logo.svg";
export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
    </header>
  );
}
