import { Link } from 'react-router-dom';
import { FaArrowRight, FaLock, FaUserFriends } from 'react-icons/fa';
import { IoChatbubblesOutline, IoSparklesOutline } from 'react-icons/io5';

const highlights = [
  { icon: <IoChatbubblesOutline />, title: 'Conversations, in focus', text: 'A calm inbox that keeps your people and your messages together.' },
  { icon: <FaUserFriends />, title: 'Friends first', text: 'Find friends, accept requests, and start a private one-to-one chat.' },
  { icon: <FaLock />, title: 'A more personal space', text: 'No public feed to keep up with. Just a simple place to catch up.' },
];

function Landing() {
  return (
    <main className="landing-page">
      <header className="landing-nav">
        <Link className="brand-lockup" to="/" aria-label="Convo home"><span className="brand-glyph">c<span>.</span></span><span>convo</span></Link>
        <nav aria-label="Main navigation"><a href="#why-convo">Why Convo</a><a href="#features">Features</a></nav>
        <Link className="landing-login" to="/login">Sign in <FaArrowRight /></Link>
      </header>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="landing-kicker"><span className="live-indicator" /> A QUIETER KIND OF SOCIAL</p>
          <h1>A little less scroll.<br />A lot more <em>connection.</em></h1>
          <p className="landing-lede">Convo is a simple, private space for the people you actually want to hear from. Find your friends, pick up where you left off, and stay close.</p>
          <div className="landing-actions"><Link className="button-primary" to="/login">Find your people <FaArrowRight /></Link><a className="landing-secondary" href="#features">See what you can do <span>↓</span></a></div>
          <div className="landing-proof"><span><IoSparklesOutline /> A little more intentional</span><span><FaLock /> One-to-one conversations</span></div>
        </div>
        <div className="landing-art" aria-label="Convo chat interface preview">
          <div className="art-sticker sticker-top">GOOD TO<br />HEAR FROM YOU</div>
          <div className="mock-window">
            <div className="mock-top"><span className="mock-brand"><span className="mini-glyph">c.</span> convo</span><span className="mock-dots"><i /><i /><i /></span></div>
            <div className="mock-body"><div className="mock-side"><span className="mock-avatar avatar-lime">J</span><span className="mock-avatar avatar-lilac">M</span><span className="mock-avatar avatar-peach">A</span><span className="mock-add">+</span></div><div className="mock-chat"><div className="mock-chat-head"><span className="mock-avatar avatar-lilac">M</span><div><strong>Maya</strong><small>YOUR FRIEND</small></div><span className="mock-online" /></div><div className="mock-date">TODAY, 10:42 AM</div><div className="mock-message received">Hey! It’s been a while. How have you been?</div><div className="mock-message sent">Really good — been working on something new ✨</div><div className="mock-message received short">That sounds like you! Tell me everything.</div><div className="mock-input">Write a message… <span>↗</span></div></div></div>
          </div>
          <div className="art-sticker sticker-bottom"><span>✳</span> YOUR PEOPLE,<br />RIGHT HERE.</div>
          <span className="art-spark spark-a">✳</span><span className="art-spark spark-b">✳</span>
        </div>
      </section>

      <section className="landing-strip" id="why-convo"><span>GOOD CONVERSATIONS DON’T NEED A FEED.</span><span className="strip-star">✳</span><span>JUST A FRIEND ON THE OTHER END.</span><span className="strip-star">✳</span><span>THAT’S THE IDEA BEHIND CONVO.</span></section>

      <section className="landing-features" id="features"><div className="feature-intro"><p className="landing-kicker">MADE FOR THE EVERYDAY CHECK-IN</p><h2>Everything you need<br />to stay <em>in touch.</em></h2><p>No noise, no complicated setup. Just the useful bits, made to feel good to use.</p></div><div className="feature-grid">{highlights.map((feature, index) => <article className={`feature-card feature-card-${index + 1}`} key={feature.title}><span className="feature-number">0{index + 1}</span><span className="feature-icon">{feature.icon}</span><h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-arrow">↗</span></article>)}</div></section>

      <section className="landing-closer"><div className="closer-orbit orbit-a" /><div className="closer-orbit orbit-b" /><p className="landing-kicker">YOUR NEXT GOOD CONVERSATION IS ONE CLICK AWAY</p><h2>Come on in.<br /><em>Your people are here.</em></h2><Link className="button-ink" to="/login">Get started <FaArrowRight /></Link><span className="closer-foot">SIMPLE BY DESIGN · BUILT FOR YOUR CIRCLE</span></section>

      <footer className="landing-footer"><Link className="brand-lockup" to="/" aria-label="Convo home"><span className="brand-glyph">c<span>.</span></span><span>convo</span></Link><span>A little closer, every day.</span><span>© {new Date().getFullYear()} CONVO</span></footer>
    </main>
  );
}

export default Landing;
