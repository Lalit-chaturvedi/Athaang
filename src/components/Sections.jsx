export function About() {
  return (
    <section className="section about-bg" id="about">
      <div className="slabel">About Athaang</div>
      <h2 className="stitle">Healing begins with<br /><em>being truly heard</em></h2>
      <div className="about-grid">
        <div className="atext rev-l">
          <p>Welcome. I'm <strong>Athaang</strong> — a therapist dedicated to creating a gentle, safe harbour for your inner world. My practice weaves together <strong>depth psychology, somatic awareness, and mindfulness</strong> into a flowing, personalised healing journey.</p>
          <p>I believe each of us carries deep wisdom within — sometimes buried under layers of pain, anxiety, or grief. Therapy, at its heart, is the art of listening beneath the surface.</p>
          <div className="hnote">"You don't have to drown in your feelings alone. I'll meet you right there, in the water."</div>
        </div>
        <div className="avisual rev-r">
          <div className="ocard">
            <div className="ocard-in">
              <div className="cstat"><b className="num">8+</b><span>years of practice</span></div>
              <div style={{width:'55%',height:'1px',background:'rgba(255,255,255,.26)',margin:'16px 0'}} />
              <div className="cstat"><b className="num">500+</b><span>lives touched</span></div>
              <svg className="ocard-wave" viewBox="0 0 310 55" preserveAspectRatio="none" fill="none">
                <path d="M0,28 C52,10 104,48 156,28 C208,10 260,48 310,28 L310,55 L0,55Z" fill="rgba(255,255,255,.17)"/>
                <path d="M0,40 C52,24 104,56 156,40 C208,24 260,56 310,40 L310,55 L0,55Z" fill="rgba(255,255,255,.1)"/>
              </svg>
            </div>
          </div>
          <div className="badge b1">🌿 Certified Therapist</div>
          <div className="badge b2">💧 Trauma-Informed</div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon:'🌊', name:'Individual Therapy',     desc:'One-on-one sessions tailored entirely to you. We explore your inner landscape with curiosity, compassion, and depth.',                            tag:'50 min sessions' },
  { icon:'🫧', name:'Anxiety & Stress',        desc:'Specialised support for anxiety, burnout, and chronic stress. Learn to move from overwhelm into grounded, embodied calm.',                    tag:'Evidence-based' },
  { icon:'🌿', name:'Grief & Loss',            desc:'A tender space to honour what has been lost. Grief is love with nowhere left to go — and it deserves witness.',                               tag:'Gentle paced' },
  { icon:'🐚', name:'Trauma Healing',          desc:'Trauma-informed care using somatic and EMDR approaches. Healing is not linear — and that\'s more than okay.',                                tag:'Somatic + EMDR' },
  { icon:'🌙', name:'Relationship Patterns',   desc:'Explore how your earliest bonds shape your current connections. Find healthier ways of relating to yourself and others.',                    tag:'Attachment-focused' },
  { icon:'✨', name:'Online Sessions',          desc:'Therapy from the comfort of your space. Secure, private video sessions available globally — healing knows no distance.',                     tag:'Worldwide' },
];

export function Services() {
  return (
    <section className="section svc-bg" id="services">
      <div className="slabel">What I Offer</div>
      <h2 className="stitle">Ways we can<br /><em>work together</em></h2>
      <div className="svc-grid">
        {services.map((s, i) => (
          <div className="svc rev" key={i}>
            <span className="svc-icon">{s.icon}</span>
            <h3>{s.name}</h3>
            <p>{s.desc}</p>
            <span className="svc-tag">{s.tag}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n:'01', title:'Safety First',         text:'Before anything, we build a space where you feel genuinely safe. No rush, no agenda — just presence and warmth.' },
  { n:'02', title:'Explore & Understand', text:'We gently explore patterns, beliefs, and stories — illuminating what lives in the shadows with kindness.' },
  { n:'03', title:'Integrate & Heal',     text:"Insight becomes transformation. We weave what we've discovered into lasting, embodied change." },
  { n:'04', title:'Flourish & Flow',      text:'Life opens. You move through it differently — with more ease, self-trust, and quiet joy.' },
];

export function Approach() {
  return (
    <section className="section app-bg" id="approach">
      <div className="slabel">My Philosophy</div>
      <h2 className="stitle">A gentle approach<br /><em>to deep healing</em></h2>
      <div className="app-grid">
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step rev" key={i}>
              <div className="step-n">{s.n}</div>
              <div><h4>{s.title}</h4><p>{s.text}</p></div>
            </div>
          ))}
        </div>
        <div className="qsphere rev-r">
          <div className="sphere">
            <div className="sr1" /><div className="sr2" />
            <p className="sphere-txt">
              "The wound is the place<br />where the<br /><em>light enters</em><br />you."
              <small>— Rumi</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
