/**
 * GSAP animation helpers — semua fungsi lazy-load GSAP
 * sehingga chunk gsap hanya dimuat oleh halaman yang memanggilnya.
 */

const ST_DEFAULTS = {
    start: 'top 85%',
    toggleActions: 'play none none none' as const,
};

type GSAPInstance   = typeof import('gsap').gsap;
type STInstance     = typeof import('gsap/ScrollTrigger').ScrollTrigger;

let _gsap: GSAPInstance | null = null;
let _ST:   STInstance   | null = null;

async function getGSAP(): Promise<{ gsap: GSAPInstance; ScrollTrigger: STInstance }> {
    if (_gsap && _ST) return { gsap: _gsap, ScrollTrigger: _ST };

    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
    ]);

    gsap.registerPlugin(ScrollTrigger);
    _gsap = gsap;
    _ST   = ScrollTrigger;

    return { gsap, ScrollTrigger };
}

/** Heading / label — slide dari kiri */
export async function animateHeading(el: Element | null) {
    if (!el) return;
    const { gsap } = await getGSAP();
    gsap.fromTo(el,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, ...ST_DEFAULTS } }
    );
}

/** Paragraf / teks */
export async function animateText(el: Element | null, delay = 0) {
    if (!el) return;
    const { gsap } = await getGSAP();
    gsap.fromTo(el,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay, ease: 'power2.out',
          scrollTrigger: { trigger: el, ...ST_DEFAULTS } }
    );
}

/** Cards / grid — stagger dari bawah */
export async function animateCards(els: Element[] | NodeListOf<Element>) {
    if (!els.length) return;
    const { gsap } = await getGSAP();
    gsap.fromTo(els,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: els[0], ...ST_DEFAULTS } }
    );
}

/** Image / ilustrasi — scale in */
export async function animateImage(el: Element | null) {
    if (!el) return;
    const { gsap } = await getGSAP();
    gsap.fromTo(el,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, ...ST_DEFAULTS } }
    );
}

/** CTA / button — bounce dari bawah */
export async function animateCTA(el: Element | null, delay = 0) {
    if (!el) return;
    const { gsap } = await getGSAP();
    gsap.fromTo(el,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay, ease: 'elastic.out(1, 0.5)',
          scrollTrigger: { trigger: el, ...ST_DEFAULTS } }
    );
}

/** Generic fade up */
export async function animateFadeUp(el: Element | null, delay = 0) {
    if (!el) return;
    const { gsap } = await getGSAP();
    gsap.fromTo(el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay, ease: 'power3.out',
          scrollTrigger: { trigger: el, ...ST_DEFAULTS } }
    );
}
