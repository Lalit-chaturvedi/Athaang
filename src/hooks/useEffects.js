import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.rev, .rev-l, .rev-r');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const i = Array.from(els).indexOf(e.target);
          setTimeout(() => e.target.classList.add('vis'), i * 60);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

export function useCalligraphyDraw() {
  useEffect(() => {
    const calObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ink-drawn');
          calObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.callig').forEach(el => calObs.observe(el));
    return () => calObs.disconnect();
  }, []);
}

export function useCursor() {
  useEffect(() => {
    const cur = document.querySelector('.cur');
    const cur2 = document.querySelector('.cur2');
    if (!cur || !cur2) return;
    let mx = 0, my = 0;
    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
      setTimeout(() => { cur2.style.left = mx + 'px'; cur2.style.top = my + 'px'; }, 100);
    };
    const onEnter = () => { cur.style.width = '24px'; cur.style.height = '24px'; cur.style.background = 'rgba(107,158,143,.16)'; };
    const onLeave = () => { cur.style.width = '12px'; cur.style.height = '12px'; cur.style.background = 'transparent'; };
    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,.svc,.faq-q,.tcard,.step').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    return () => document.removeEventListener('mousemove', onMove);
  }, []);
}
