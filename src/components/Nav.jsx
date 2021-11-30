import "../styles/Nav.scss";

export default function Nav() {
  return (
    <div className="header">
      <a href="/">
      <img src={"https://images.vexels.com/media/users/3/128141/isolated/lists/90021483e2e677321f0198faebb07d89-lemon-circle-icon.png"} alt="lemon-icon" />
      </a>
      <a href="/">
      <div>
        <h1>EatsyPeasy</h1>
        <p>Helping you choose since 2021</p>
      </div>
      </a>
    </div>
  );
}
