export default function Nav() {
  return (
    <nav>
      <a href="#hero" className="logo">Atha<span>ang</span></a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#approach">Approach</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button className="nav-btn">Book a Session</button>
    </nav>
  );
}
