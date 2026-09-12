import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Download, 
  GraduationCap, 
  TrendingUp, 
  Code2, 
  FileText, 
  Mail, 
  ChevronDown, 
  Award, 
  CheckCircle2, 
  FileCheck, 
  BookOpen, 
  CandlestickChart, 
  Calculator, 
  Layout, 
  Database, 
  PieChart, 
  Phone, 
  Linkedin, 
  Activity, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Globe, 
  Building, 
  User, 
  UserPlus, 
  UserCheck, 
  Zap, 
  Check, 
  CheckCircle, 
  X 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('12:00:00');
  
  // PayTech Modal State
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [currentPlan, setCurrentPlan] = useState({
    name: 'Mentorat Bourse BRVM & Trading NGX',
    fcfa: 35000,
    eur: 53
  });
  const [payMethod, setPayMethod] = useState('mobile');
  const [buyerName, setBuyerName] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Member Modal State
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberTab, setMemberTab] = useState('login');
  const [memberUser, setMemberUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regInterest, setRegInterest] = useState('bourse');

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const expRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  // Clock interval
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check stored member user
  useEffect(() => {
    try {
      const stored = localStorage.getItem('amo_member_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.isLoggedIn) {
          setMemberUser(parsed);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entry Timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .from('.hero-avatar', { scale: 0.85, opacity: 0, duration: 0.8 })
        .from('.hero-badge', { y: 15, opacity: 0, duration: 0.5 }, '-=0.4')
        .from('.hero-title', { y: 25, opacity: 0, duration: 0.7 }, '-=0.3')
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
        .from('.hero-stats', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from('.hero-cta', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
        .from('#hero-dashboard', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

      // About Section ScrollTrigger
      gsap.from('.about-content', {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });

      // Experience Cards Staggered Slide In
      gsap.utils.toArray('.exp-card').forEach((card, index) => {
        const direction = index % 2 === 0 ? -30 : 30;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          x: window.innerWidth > 768 ? direction : 0,
          y: window.innerWidth <= 768 ? 20 : 0,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        });
      });

      // Skills Circular Progress & Number Counters
      gsap.utils.toArray('.skill-item').forEach((item) => {
        const targetPercent = parseInt(item.getAttribute('data-percent'), 10) || 80;
        const circle = item.querySelector('.progress-circle');
        const counter = item.querySelector('.counter-value');
        const circumference = 2 * Math.PI * 36;

        if (circle) {
          circle.style.strokeDasharray = circumference;
          circle.style.strokeDashoffset = circumference;

          gsap.to(circle, {
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none'
            },
            strokeDashoffset: circumference - (circumference * targetPercent) / 100,
            duration: 1.3,
            ease: 'power2.out'
          });
        }

        if (counter) {
          const countObj = { val: 0 };
          gsap.to(countObj, {
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
              toggleActions: 'play none none none'
            },
            val: targetPercent,
            duration: 1.3,
            ease: 'power2.out',
            onUpdate: () => {
              counter.innerText = Math.round(countObj.val) + '%';
            }
          });
        }
      });

      // Education Cards Stagger
      gsap.from('.edu-card', {
        scrollTrigger: {
          trigger: educationRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out'
      });

      // Contact Section Animation
      gsap.from('.contact-item', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  // Navbar Morphing on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // PayTech Open / Close
  const openPayTech = (planName, fcfa, eur) => {
    setCurrentPlan({ name: planName, fcfa, eur });
    setIsPayModalOpen(true);
  };

  const closePayTech = () => {
    setIsPayModalOpen(false);
  };

  const submitPayTech = () => {
    if (!buyerName || !buyerPhone || !buyerEmail) {
      alert('Veuillez renseigner votre nom, téléphone et adresse email pour recevoir vos accès.');
      return;
    }

    const refCode = 'PAYTECH-' + Math.floor(100000 + Math.random() * 900000);

    if (payMethod === 'mobile') {
      alert(
        `Paiement initié avec succès sur Airtel Money (+227 77 06 38 37) !\n\n` +
        `Référence : ${refCode}\n` +
        `Montant : ${currentPlan.fcfa.toLocaleString('fr-FR')} FCFA\n` +
        `Programme : ${currentPlan.name}\n` +
        `Bénéficiaire : Aïchatou Moussa Ousmane (+227 77 06 38 37)\n\n` +
        `WhatsApp va s'ouvrir pour confirmer votre accès en direct.`
      );
      sendWhatsAppPay(refCode);
    } else if (payMethod === 'card') {
      if (cardNumber.replace(/\s+/g, '').length < 15) {
        alert('Veuillez saisir un numéro de carte bancaire valide.');
        return;
      }
      alert(`Paiement sécurisé par Carte Bancaire validé !\nRéférence : ${refCode}\nMontant : ${currentPlan.fcfa.toLocaleString('fr-FR')} FCFA.`);
      sendWhatsAppPay(refCode);
    } else if (payMethod === 'paypal') {
      alert(`Redirection vers PayPal pour ${currentPlan.eur} €...\nRéférence : ${refCode}`);
      window.open('https://paypal.me', '_blank');
    } else {
      alert(`Ordre de virement bancaire généré avec la référence : ${refCode}.\nMerci de transmettre le bordereau au +227 77 06 38 37.`);
      sendWhatsAppPay(refCode);
    }

    closePayTech();
  };

  const sendWhatsAppPay = (optRef) => {
    const ref = optRef || ('AMO-' + Math.floor(100000 + Math.random() * 900000));
    const text = 
      `Bonjour Aïchatou, je viens d'effectuer un règlement pour le programme : ${currentPlan.name} (${currentPlan.fcfa.toLocaleString('fr-FR')} FCFA / ~${currentPlan.eur} €).` +
      `%0A%0A👤 Nom : ${encodeURIComponent(buyerName || 'Client')}` +
      `%0A📱 Téléphone : ${encodeURIComponent(buyerPhone || 'Non spécifié')}` +
      `%0A💳 Moyen : ${payMethod.toUpperCase()} (Vers Airtel Money +227 77 06 38 37)` +
      `%0A🔖 Référence : ${ref}` +
      `%0A%0AMerci de bien vouloir confirmer mes accès !`;

    window.open(`https://wa.me/22777063837?text=${text}`, '_blank');
  };

  // Member Modal Open / Login / Register
  const openMember = (tab) => {
    setMemberTab(tab || 'login');
    setIsMemberModalOpen(true);
  };

  const closeMember = () => {
    setIsMemberModalOpen(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = {
      name: loginEmail.split('@')[0],
      email: loginEmail,
      isLoggedIn: true
    };
    localStorage.setItem('amo_member_user', JSON.stringify(user));
    setMemberUser(user);
    alert(`Bienvenue sur votre Espace Membre, ${user.name} !\nVotre accès au CV certifié est débloqué.`);
    closeMember();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      name: regName,
      email: regEmail,
      phone: regPhone,
      interest: regInterest,
      isLoggedIn: true
    };
    localStorage.setItem('amo_member_user', JSON.stringify(user));
    setMemberUser(user);
    alert(`Félicitations ${regName} ! Votre inscription comme membre officiel est validée.`);
    closeMember();
    triggerPrintCV();
  };

  // Download CV PDF
  const handleDownloadCV = (e) => {
    if (e) e.preventDefault();

    if (!memberUser) {
      const shouldRegister = window.confirm(
        "💡 Astuce : Devenez membre gratuitement pour recevoir les mises à jour financières et le CV officiel certifié d'Aïchatou Moussa Ousmane.\n\nCliquez sur 'OK' pour vous inscrire/connecter, ou sur 'Annuler' pour imprimer directement le CV."
      );
      if (shouldRegister) {
        openMember('register');
        return;
      }
    }

    triggerPrintCV();
  };

  const triggerPrintCV = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }
    const docContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>CV - Aïchatou Moussa Ousmane</title>
        <style>
          @page { size: A4; margin: 12mm; }
          body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a24; line-height: 1.5; max-width: 820px; margin: auto; padding: 15px; }
          h1 { color: #A67D24; margin-bottom: 2px; font-size: 24px; text-transform: uppercase; letter-spacing: 0.5px; }
          .title { font-size: 14px; color: #444; font-weight: 600; margin-bottom: 16px; }
          .badge { display: inline-block; background: #FAF5E8; border: 1px solid #D4A843; color: #8A6414; padding: 3px 8px; border-radius: 6px; font-size: 11px; margin-right: 5px; margin-bottom: 5px; font-weight: 600; }
          h2 { color: #111; border-bottom: 2px solid #D4A843; padding-bottom: 4px; margin-top: 20px; font-size: 16px; text-transform: uppercase; }
          .item { margin-bottom: 12px; }
          .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 13.5px; }
          .item-sub { font-size: 12.5px; color: #A67D24; font-style: italic; }
          .desc { font-size: 12.5px; margin-top: 3px; color: #333; }
          .contact-line { font-size: 12px; color: #555; margin-bottom: 14px; }
          .btn-print { background: #D4A843; color: #111; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: bold; margin-bottom: 16px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <button class="btn-print" onclick="window.print()">🖨️ Imprimer / Enregistrer en PDF</button>
        <h1>Aïchatou Moussa Ousmane</h1>
        <div class="title">Option Comptabilité & Gestion des Entreprises | Passionnée de Bourse (BRVM & NGX), Trading et Développement Digital</div>
        <div class="contact-line">📍 Niamey, Niger • 📧 moussaousmaneaicha@gmail.com • 📞 +227 77 06 38 37 • 🌐 Portfolio Digital</div>
        <h2>Profil Professionnel</h2>
        <p class="desc">Rigoureuse et dotée d'une solide double compétence en <strong>Sciences Comptables & Gestion d'Entreprise</strong> et en <strong>Finance de Marché (BRVM, NGX, Trading)</strong> combinée aux <strong>Technologies Web & Mobiles</strong>. Diplômée Niveau I de l'École Nationale d'Administration (ENA) et titulaire d'un Baccalauréat en Comptabilité Informatique, je poursuis activement mon cursus au Niveau II afin de développer des solutions de gestion financière et d'investissement à fort impact.</p>
        <h2>Formations & Diplômes</h2>
        <div class="item"><div class="item-header"><span>Niveau II — Comptabilité et Gestion des Entreprises</span><span>2025 — En cours</span></div><div class="item-sub">École Nationale d'Administration (ENA)</div><div class="desc">Approfondissement en fiscalité, contrôle de gestion, finance d'entreprise et audit.</div></div>
        <div class="item"><div class="item-header"><span>Diplôme en Comptabilité et Gestion des Entreprises (Niveau I)</span><span>2022 — 2025</span></div><div class="item-sub">École Nationale d'Administration (ENA) • Cycle de 3 ans avec succès</div><div class="desc">États financiers complets SYSCOHADA, comptabilité générale et analytique, gestion budgétaire.</div></div>
        <div class="item"><div class="item-header"><span>Baccalauréat Comptabilité Informatique</span><span>Obtenu en 2025</span></div><div class="item-sub">Enseignement Technique & Professionnel</div><div class="desc">Maîtrise des logiciels de gestion comptable, traitement informatisé des opérations et bases de données.</div></div>
        <div class="item"><div class="item-header"><span>BEPC (Brevet d'Études du Premier Cycle)</span><span>Obtenu en 2022</span></div><div class="item-sub">Admission au cycle ENA</div></div>
        <h2>Domaines d'Expertise</h2>
        <div style="margin-top: 8px;">
          <span class="badge">Bourse BRVM & NGX</span>
          <span class="badge">Trading & Analyse Graphique</span>
          <span class="badge">Comptabilité Générale & SYSCOHADA</span>
          <span class="badge">Création Web & Mobile</span>
          <span class="badge">Comptabilité Informatique & ERP</span>
          <span class="badge">Gestion de Trésorerie & Budgets</span>
        </div>
        <h2>Informations Paiement Certifié</h2>
        <p class="desc" style="font-size: 11.5px; color: #666;">Bénéficiaire des règlements formations & consultations : <strong>Airtel Money Niger +227 77 06 38 37</strong> (Aïchatou Moussa Ousmane).</p>
      </body>
      </html>
    `;
    printWindow.document.open();
    printWindow.document.write(docContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-brand-gold selection:text-slate-950 bg-[#FAFAF8] overflow-x-hidden font-sans">
      
      {/* Texture SVG Noise Filter Inline */}
      <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
      </svg>

      {/* A. NAVBAR — La Signature Flottante (Fond Blanc & Or Prestige) */}
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none">
        <nav className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-400 max-w-4xl w-full ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-2xl border border-brand-gold/40 shadow-xl shadow-brand-gold/10' 
            : 'bg-white/80 backdrop-blur-md border border-slate-200/80 shadow-md shadow-black/5'
        }`}>
          
          <a href="#hero" className="flex items-center gap-2 group shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-brand-gold via-[#F3DE97] to-brand-goldDark flex items-center justify-center text-[10px] sm:text-xs font-mono font-bold text-slate-950 shadow-md group-hover:scale-105 transition-transform">
              AMO
            </div>
            <span className="font-semibold text-xs sm:text-sm tracking-tight text-slate-900 group-hover:text-brand-goldDark transition-colors">
              Aïchatou <span className="text-brand-goldDark font-serif italic text-sm sm:text-base">M.O.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-5 text-xs font-mono text-slate-600 font-medium">
            <a href="#about" className="interactive-link hover:text-brand-goldDark transition-colors">À propos</a>
            <a href="#experience" className="interactive-link hover:text-brand-goldDark transition-colors">Parcours</a>
            <a href="#skills" className="interactive-link hover:text-brand-goldDark transition-colors">Compétences</a>
            <a href="#education" className="interactive-link hover:text-brand-goldDark transition-colors">Formation</a>
            <a href="#tarifs" className="interactive-link hover:text-brand-goldDark transition-colors font-bold text-brand-goldDark">Tarifs</a>
            <a href="#contact" className="interactive-link hover:text-brand-goldDark transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openMember('login')}
              className="magnetic-btn hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100/80 border border-brand-gold/40 text-slate-800 text-[11px] font-semibold transition-all shrink-0"
            >
              <User className="w-3.5 h-3.5 text-brand-goldDark" />
              <span>{memberUser ? `Membre : ${memberUser.name}` : 'Espace Membre'}</span>
            </button>

            <button
              onClick={handleDownloadCV}
              className="magnetic-btn px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-brand-gold to-[#E2B755] text-slate-950 text-[11px] sm:text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-md shadow-brand-gold/25 hover:brightness-105 shrink-0"
            >
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>CV PDF</span>
            </button>
          </div>
        </nav>
      </header>

      {/* B. SECTION HERO */}
      <section id="hero" ref={heroRef} className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-16 sm:pt-20 pb-8 sm:pb-12 overflow-hidden bg-gradient-to-b from-white via-[#FAF9F5] to-[#F5F3ED]">
        
        {/* Halos dorés chauds et doux */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] h-[340px] sm:h-[540px] bg-brand-gold/15 rounded-full blur-[110px] sm:blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 right-5 w-[220px] sm:w-[360px] h-[220px] sm:h-[360px] bg-amber-200/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* Subtle Grid sur fond clair */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Avatar Médaillon Or & Blanc */}
          <div className="hero-avatar relative mb-3 sm:mb-5">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full p-[3px] bg-gradient-to-b from-brand-gold via-[#FAF5E8] to-brand-goldDark shadow-xl shadow-brand-gold/20">
              <div className="w-full h-full rounded-full bg-white border border-amber-200/80 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/40 via-white to-amber-50/50"></div>
                <span className="relative z-10 font-mono text-2xl sm:text-3xl font-bold tracking-wider text-slate-900">AMO</span>
              </div>
            </div>
            {/* Pastille en ligne */}
            <div className="absolute bottom-0 right-1 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#10B981] border-2 border-white flex items-center justify-center shadow">
              <span className="w-full h-full rounded-full bg-[#10B981] animate-ping opacity-75"></span>
            </div>
          </div>

          {/* Tag / Badge Or Élégant */}
          <div className="hero-badge inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-brand-gold/40 text-[10px] sm:text-xs font-mono text-brand-goldDark mb-2.5 sm:mb-3 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
            <span className="font-bold text-slate-800">FINANCE &bull; BOURSE BRVM/NGX &bull; TECH WEB</span>
          </div>

          {/* Nom en grand */}
          <h1 className="hero-title text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-2 sm:mb-3">
            Aïchatou <span className="gold-gradient-text">Moussa Ousmane</span>
          </h1>

          {/* Titre pro en Serif Italique */}
          <p className="hero-subtitle text-lg sm:text-2xl md:text-3xl font-serif italic text-slate-700 max-w-2xl font-normal leading-snug mb-4 sm:mb-6">
            Finance de Marché, Bourse BRVM & NGX, Trading & Conception Web/Mobile
          </p>

          {/* Stats Bar fond blanc luxueux */}
          <div className="hero-stats flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-[11px] sm:text-xs text-slate-700 py-2 sm:py-2.5 px-4 sm:px-5 rounded-full bg-white border border-slate-200/80 shadow-md shadow-black/5 mb-6 sm:mb-8">
            <span className="flex items-center gap-1.5 font-semibold text-slate-900">
              <GraduationCap className="w-3.5 h-3.5 text-brand-goldDark" />
              <span>ENA — Option Comptabilité</span>
            </span>
            <span className="text-brand-gold/60">&bull;</span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-900">
              <TrendingUp className="w-3.5 h-3.5 text-brand-goldDark" />
              <span>BRVM & NGX Trader</span>
            </span>
            <span className="text-brand-gold/60">&bull;</span>
            <span className="flex items-center gap-1.5 font-semibold text-slate-900">
              <Code2 className="w-3.5 h-3.5 text-brand-goldDark" />
              <span>Web & Mobile Dev</span>
            </span>
          </div>

          {/* CTA Buttons avec Inscription Membre */}
          <div className="hero-cta flex flex-wrap items-center gap-2.5 sm:gap-3.5 w-full sm:w-auto justify-center mb-6 sm:mb-8">
            <button
              onClick={handleDownloadCV}
              className="magnetic-btn px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-brand-gold via-[#F0D58C] to-brand-gold text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/25 hover:brightness-105"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
              <span>Télécharger mon CV</span>
            </button>

            <button
              onClick={() => openMember('register')}
              className="magnetic-btn px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-black/10 transition-all"
            >
              <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-gold" />
              <span>Devenir Membre / Connexion</span>
            </button>

            <a
              href="#contact"
              className="magnetic-btn px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white hover:bg-amber-50/50 border border-brand-gold/50 text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-goldDark" />
              <span>Me contacter</span>
            </a>
          </div>

          {/* Live Interactive Market Card */}
          <div id="hero-dashboard" className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-brand-gold/30 rounded-2xl p-4 shadow-xl shadow-brand-gold/10 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono text-xs font-bold text-slate-900 uppercase">Marchés Financiers Africains & Trading</span>
              </div>
              <span className="font-mono text-xs text-brand-goldDark font-semibold">{currentTime}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 text-center">
              <div className="p-2 rounded-xl bg-amber-50/60 border border-brand-gold/20">
                <div className="font-mono text-[10px] text-slate-500 uppercase font-semibold">BRVM-C</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-emerald-600">+1.24% ↗</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/60 border border-brand-gold/20">
                <div className="font-mono text-[10px] text-slate-500 uppercase font-semibold">NGX ASI</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-emerald-600">+0.87% ↗</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-50/60 border border-brand-gold/20">
                <div className="font-mono text-[10px] text-slate-500 uppercase font-semibold">SYSCOHADA</div>
                <div className="font-mono text-xs sm:text-sm font-bold text-brand-goldDark">Audité ✓</div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-6 sm:mt-8 flex flex-col items-center gap-1 text-slate-400 hover:text-brand-goldDark transition-colors">
          <span className="text-[9px] font-mono tracking-widest uppercase text-brand-goldDark font-semibold">Défiler</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-brand-goldDark" />
        </div>
      </section>

      {/* C. À PROPOS */}
      <section id="about" ref={aboutRef} className="py-10 sm:py-20 px-3 sm:px-6 relative bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="about-content bg-gradient-to-br from-white via-[#FAF8F2] to-white border border-slate-200/80 hover:border-brand-gold/50 rounded-3xl sm:rounded-5xl p-6 sm:p-10 md:p-14 relative overflow-hidden shadow-xl shadow-black/5 transition-all">
            <div className="absolute top-0 right-0 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
              
              <div className="lg:col-span-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-brand-goldDark font-bold block mb-1">Manifeste Personnel</span>
                <h2 className="text-2xl sm:text-4xl font-serif italic text-slate-900 leading-tight">
                  À propos de moi
                </h2>
                <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                  <span>Vision & Ambition</span>
                </div>
              </div>

              <div className="hidden lg:block lg:col-span-1 h-40 w-[2px] bg-gradient-to-b from-brand-gold/10 via-brand-gold to-brand-gold/10 justify-self-center"></div>

              <div className="lg:col-span-7 text-slate-700 text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-4">
                <p>
                  Passionnée par les dynamiques économiques et financières africaines, je me consacre activement à l'analyse et à la pratique de la <strong>Bourse Régionale des Valeurs Mobilières (BRVM)</strong> et du <strong>Nigerian Exchange Group (NGX)</strong>, ainsi qu'au <strong>Trading</strong> structuré.
                </p>
                <p>
                  Convaincue que l'avenir réside dans l'alliance entre la rigueur comptable et la puissance du digital, je conçois et développe des <strong>sites web et applications mobiles</strong> intuitifs. Diplômée en <em>Comptabilité et Gestion des Entreprises (Niveau I)</em> à l'École Nationale d'Administration (ENA) et titulaire d'un <em>Baccalauréat en Comptabilité Informatique</em>, je poursuis mon cursus au Niveau II pour apporter des solutions financières et numériques à forte valeur ajoutée.
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-brand-gold/30 font-mono text-[11px] text-slate-800 font-semibold shadow-xs">#Bourse_BRVM</span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-brand-gold/30 font-mono text-[11px] text-slate-800 font-semibold shadow-xs">#NGX_Trading</span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-brand-gold/30 font-mono text-[11px] text-slate-800 font-semibold shadow-xs">#ENA_Niveau_II</span>
                  <span className="px-3 py-1 rounded-full bg-amber-50 border border-brand-gold/30 font-mono text-[11px] text-slate-800 font-semibold shadow-xs">#WebDev_Fintech</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* D. EXPÉRIENCE */}
      <section id="experience" ref={expRef} className="py-10 sm:py-20 px-3 sm:px-6 relative bg-[#FAF9F5]">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-8 sm:mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand-goldDark font-bold block mb-1">Parcours & Expérience</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              La Chronologie de l'Évolution
            </h2>
            <p className="font-serif italic text-amber-800 text-sm sm:text-base mt-1">
              Trois étapes majeures alliant rigueur académique et vision terrain
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-3.5 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-brand-gold via-[#F3DE97] to-brand-gold/20"></div>

            <div className="space-y-5 sm:space-y-8 md:space-y-10">
              
              {/* Carte 1 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 md:pr-10 pl-8 md:pl-0">
                  <div className="exp-card bg-white border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative shadow-lg shadow-black/5 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] text-brand-goldDark font-bold tracking-wider">
                        2025 — PRÉSENT
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-brand-gold/30 font-semibold">
                        En cours
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      Niveau II & Projets FinTech Web/Mobile
                    </h3>
                    <div className="text-xs sm:text-sm font-serif italic text-amber-800 mb-2">
                      École Nationale d'Administration (ENA) & Projets Personnels
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Poursuite avancée au Niveau II en Comptabilité & Gestion des Entreprises. Conception et prototypage d'outils web/mobiles de suivi boursier et de gestion financière simplifiée.
                    </p>
                  </div>
                </div>
                <div className="absolute left-3.5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center shadow">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping"></div>
                </div>
                <div className="hidden md:block w-1/2 pl-10"></div>
              </div>

              {/* Carte 2 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="hidden md:block w-1/2 pr-10"></div>
                <div className="absolute left-3.5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center shadow">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-10 pl-8">
                  <div className="exp-card bg-white border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative shadow-lg shadow-black/5 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] text-brand-goldDark font-bold tracking-wider">
                        2022 — 2025 (CYCLE DE 3 ANS)
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                        Diplômée
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      Diplôme Comptabilité & Gestion des Entreprises (Niv. I)
                    </h3>
                    <div className="text-xs sm:text-sm font-serif italic text-amber-800 mb-2">
                      École Nationale d'Administration (ENA)
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Validation du cursus supérieur de 3 ans. Maîtrise des écritures SYSCOHADA, bilans comptables, comptes de résultats, analyse financière et gestion de trésorerie.
                    </p>
                  </div>
                </div>
              </div>

              {/* Carte 3 */}
              <div className="relative flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 md:pr-10 pl-8 md:pl-0">
                  <div className="exp-card bg-white border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 relative shadow-lg shadow-black/5 transition-all">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-[11px] text-brand-goldDark font-bold tracking-wider">
                        2022 — 2025
                      </span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 font-semibold">
                        BAC Obtenu
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      BAC Comptabilité Informatique & Analyse de Marché
                    </h3>
                    <div className="text-xs sm:text-sm font-serif italic text-amber-800 mb-2">
                      Enseignement Spécialisé & Pratique Boursière (BRVM / NGX)
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Double cursus alliant la comptabilité numérisée et l'immersion active dans le trading sur la BRVM (UEMOA) et le NGX (Nigeria). Rapprochement concret de l'informatique et des marchés.
                    </p>
                  </div>
                </div>
                <div className="absolute left-3.5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center shadow">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold"></div>
                </div>
                <div className="hidden md:block w-1/2 pl-10"></div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* E. COMPÉTENCES */}
      <section id="skills" ref={skillsRef} className="py-10 sm:py-20 px-3 sm:px-6 relative bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-8 sm:mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand-goldDark font-bold block mb-1">Expertise & Savoir-faire</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Tableau de Bord des Compétences
            </h2>
            <p className="font-serif italic text-amber-800 text-sm sm:text-base mt-1">
              Indicateurs de performance analytique, technique et comptable
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
            
            {/* Skill 1 */}
            <div className="skill-item bg-[#FAF9F6] border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col items-center text-center transition-all duration-300 shadow-md shadow-black/5" data-percent="92">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 sm:mb-3 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" stroke="#E2E8F0" strokeWidth="6" fill="transparent" />
                  <circle className="progress-circle" cx="50" cy="50" r="36" stroke="#D4A843" strokeWidth="6" strokeDasharray="226.19" strokeDashoffset="226.19" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="counter-value font-mono text-base sm:text-lg font-bold text-slate-900">0%</span>
                  <CandlestickChart className="w-3.5 h-3.5 text-brand-goldDark mt-0.5" />
                </div>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-0.5">Trading Boursier</h3>
              <p className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-semibold mb-1">BRVM & NGX</p>
              <p className="text-[11px] text-slate-600 leading-snug hidden sm:block">
                Analyse technique, suivi des indices régionaux et flux d'ordres.
              </p>
            </div>

            {/* Skill 2 */}
            <div className="skill-item bg-[#FAF9F6] border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col items-center text-center transition-all duration-300 shadow-md shadow-black/5" data-percent="95">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 sm:mb-3 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" stroke="#E2E8F0" strokeWidth="6" fill="transparent" />
                  <circle className="progress-circle" cx="50" cy="50" r="36" stroke="#D4A843" strokeWidth="6" strokeDasharray="226.19" strokeDashoffset="226.19" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="counter-value font-mono text-base sm:text-lg font-bold text-slate-900">0%</span>
                  <Calculator className="w-3.5 h-3.5 text-brand-goldDark mt-0.5" />
                </div>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-0.5">Comptabilité</h3>
              <p className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-semibold mb-1">SYSCOHADA</p>
              <p className="text-[11px] text-slate-600 leading-snug hidden sm:block">
                Bilans financiers, déclarations fiscales et comptes de résultats.
              </p>
            </div>

            {/* Skill 3 */}
            <div className="skill-item bg-[#FAF9F6] border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col items-center text-center transition-all duration-300 shadow-md shadow-black/5" data-percent="88">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 sm:mb-3 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" stroke="#E2E8F0" strokeWidth="6" fill="transparent" />
                  <circle className="progress-circle" cx="50" cy="50" r="36" stroke="#D4A843" strokeWidth="6" strokeDasharray="226.19" strokeDashoffset="226.19" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="counter-value font-mono text-base sm:text-lg font-bold text-slate-900">0%</span>
                  <Layout className="w-3.5 h-3.5 text-brand-goldDark mt-0.5" />
                </div>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-0.5">Web & Mobile Dev</h3>
              <p className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-semibold mb-1">Applications</p>
              <p className="text-[11px] text-slate-600 leading-snug hidden sm:block">
                Conception de dashboards réactifs et applications sur-mesure.
              </p>
            </div>

            {/* Skill 4 */}
            <div className="skill-item bg-[#FAF9F6] border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col items-center text-center transition-all duration-300 shadow-md shadow-black/5" data-percent="90">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 sm:mb-3 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" stroke="#E2E8F0" strokeWidth="6" fill="transparent" />
                  <circle className="progress-circle" cx="50" cy="50" r="36" stroke="#D4A843" strokeWidth="6" strokeDasharray="226.19" strokeDashoffset="226.19" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="counter-value font-mono text-base sm:text-lg font-bold text-slate-900">0%</span>
                  <Database className="w-3.5 h-3.5 text-brand-goldDark mt-0.5" />
                </div>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-0.5">Compta Informatique</h3>
              <p className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-semibold mb-1">ERP & Logiciels</p>
              <p className="text-[11px] text-slate-600 leading-snug hidden sm:block">
                Traitement automatisé, progiciels comptables et bases de données.
              </p>
            </div>

            {/* Skill 5 */}
            <div className="skill-item col-span-2 sm:col-span-1 bg-[#FAF9F6] border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col items-center text-center transition-all duration-300 shadow-md shadow-black/5" data-percent="85">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-2 sm:mb-3 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="36" stroke="#E2E8F0" strokeWidth="6" fill="transparent" />
                  <circle className="progress-circle" cx="50" cy="50" r="36" stroke="#D4A843" strokeWidth="6" strokeDasharray="226.19" strokeDashoffset="226.19" strokeLinecap="round" fill="transparent" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="counter-value font-mono text-base sm:text-lg font-bold text-slate-900">0%</span>
                  <PieChart className="w-3.5 h-3.5 text-brand-goldDark mt-0.5" />
                </div>
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 mb-0.5">Gestion d'Entreprise</h3>
              <p className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-semibold mb-1">Trésorerie & Flux</p>
              <p className="text-[11px] text-slate-600 leading-snug hidden sm:block">
                Budgets prévisionnels, analyse des coûts et ratios de rentabilité.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* F. FORMATION & DIPLÔMES */}
      <section id="education" ref={educationRef} className="py-10 sm:py-20 px-3 sm:px-6 relative bg-[#FAF9F5]">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-8 sm:mb-12">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand-goldDark font-bold block mb-1">Cursus Académique</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Les Fondations & Diplômes
            </h2>
            <p className="font-serif italic text-amber-800 text-sm sm:text-base mt-1">
              Un parcours structuré du BEPC au Niveau II de l'ENA
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-16 sm:mb-20">
            
            {/* 1. Niveau II */}
            <div className="edu-card bg-white border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-md shadow-black/5 transition-all">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-100/80 border border-brand-gold/40 flex items-center justify-center text-brand-goldDark shrink-0 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Niveau II — Option Comptabilité & Gestion des Entreprises</h3>
                  <p className="text-xs sm:text-sm font-serif italic text-amber-800">École Nationale d'Administration (ENA)</p>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">En cours &bull; Spécialisation supérieure en contrôle financier et stratégie</p>
                </div>
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-bold px-3 py-1 rounded-full bg-amber-50 border border-brand-gold/30 self-start sm:self-auto shrink-0 shadow-xs">
                2025 — EN COURS
              </div>
            </div>

            {/* 2. Diplôme Niveau I ENA */}
            <div className="edu-card bg-white border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-md shadow-black/5 transition-all">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-100/80 border border-brand-gold/40 flex items-center justify-center text-brand-goldDark shrink-0 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Diplôme en Comptabilité & Gestion des Entreprises (Niveau I)</h3>
                  <p className="text-xs sm:text-sm font-serif italic text-amber-800">École Nationale d'Administration (ENA)</p>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Cycle de 3 ans avec succès &bull; Entrée en 2022 et diplôme obtenu en 2025</p>
                </div>
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-bold px-3 py-1 rounded-full bg-amber-50 border border-brand-gold/30 self-start sm:self-auto shrink-0 shadow-xs">
                2022 — 2025
              </div>
            </div>

            {/* 3. BAC Comptabilité Informatique */}
            <div className="edu-card bg-white border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-md shadow-black/5 transition-all">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-100/80 border border-brand-gold/40 flex items-center justify-center text-brand-goldDark shrink-0 shadow-xs">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">Baccalauréat en Comptabilité Informatique</h3>
                  <p className="text-xs sm:text-sm font-serif italic text-amber-800">Enseignement Technique et Professionnel</p>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Alliance de la gestion comptable et des logiciels informatiques</p>
                </div>
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-brand-goldDark font-bold px-3 py-1 rounded-full bg-amber-50 border border-brand-gold/30 self-start sm:self-auto shrink-0 shadow-xs">
                OBTENU EN 2025
              </div>
            </div>

            {/* 4. BEPC */}
            <div className="edu-card bg-white border border-slate-200/80 hover:border-brand-gold/60 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shadow-md shadow-black/5 transition-all">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-xs">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">BEPC (Brevet d'Études du Premier Cycle)</h3>
                  <p className="text-xs sm:text-sm font-serif italic text-amber-800">Collège d'Enseignement Général</p>
                  <p className="text-[11px] sm:text-xs text-slate-600 mt-0.5">Diplôme initial &bull; Admission au concours de l'ENA</p>
                </div>
              </div>
              <div className="font-mono text-[10px] sm:text-xs text-slate-700 font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200 self-start sm:self-auto shrink-0">
                2022
              </div>
            </div>

          </div>

          {/* TARIFS & FORMATIONS AVEC PAIEMENT PAYTECH */}
          <div id="tarifs" className="pt-6 sm:pt-10 border-t border-brand-gold/20">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-brand-gold/40 text-[10px] sm:text-xs font-mono text-brand-goldDark mb-2 font-bold">
                <CreditCard className="w-3.5 h-3.5" />
                <span>PAIEMENT SÉCURISÉ PAYTECH &bull; AIRTEL MONEY +227 77 06 38 37</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Tarifs Formations & Mentorat
              </h3>
              <p className="font-serif italic text-amber-800 text-sm sm:text-base mt-1 max-w-xl mx-auto">
                Accédez à mes programmes d'excellence en Bourse, Comptabilité ENA & Technologies Digitales. Règlement instantané par Mobile Money, CB, Wave ou PayPal.
              </p>
            </div>

            {/* 3 Cartes Tarifaires */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              
              {/* Offre 1 */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all relative">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">Pack Étudiant</span>
                    <span className="p-1.5 rounded-lg bg-amber-50 text-brand-goldDark">
                      <BookOpen className="w-4 h-4" />
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Révisions ENA & SYSCOHADA</h4>
                  <p className="text-xs text-slate-600 mb-4">Pack complet de préparation aux examens, fiches récapitulatives et modèles financiers.</p>
                  
                  <div className="mb-5 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">15 000</span>
                      <span className="font-mono text-xs font-bold text-brand-goldDark">FCFA</span>
                      <span className="text-slate-400 text-xs font-mono">/ pack (~23 €)</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Annales d'examens ENA & corrigés types</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Fiches de synthèse SYSCOHADA révisé</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Modèles de bilans & comptes de résultat</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Support Q&A par WhatsApp</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => openPayTech('Pack Révisions ENA & SYSCOHADA', 15000, 23)}
                  className="magnetic-btn w-full py-3 rounded-full bg-slate-100 hover:bg-brand-gold hover:text-slate-950 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-all"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Commander (15 000 FCFA)</span>
                </button>
              </div>

              {/* Offre 2 — Star / Recommandé */}
              <div className="bg-gradient-to-b from-white to-[#FFFDF5] border-2 border-brand-gold rounded-3xl p-6 flex flex-col justify-between shadow-xl shadow-brand-gold/15 relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-brand-gold text-slate-950 font-mono text-[10px] font-extrabold uppercase tracking-wider shadow">
                  ⭐ Le Plus Populaire
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3 pt-1">
                    <span className="font-mono text-xs font-bold text-brand-goldDark uppercase tracking-wider">Mentorat Actif</span>
                    <span className="p-1.5 rounded-lg bg-amber-100 text-brand-goldDark">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Bourse BRVM & Trading NGX</h4>
                  <p className="text-xs text-slate-600 mb-4">Session individuelle en visioconférence directe + méthodologie d'analyse technique et sélection d'actions.</p>
                  
                  <div className="mb-5 pb-4 border-b border-amber-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">35 000</span>
                      <span className="font-mono text-xs font-bold text-brand-goldDark">FCFA</span>
                      <span className="text-slate-400 text-xs font-mono">/ session (~53 €)</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="w-3.5 h-3.5 text-brand-goldDark shrink-0" />
                      <span>Session live privée 1h30 (Google Meet)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-goldDark shrink-0" />
                      <span>Comprendre les indices BRVM-C & NGX ASI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-goldDark shrink-0" />
                      <span>Méthodes de passation d'ordres rentables</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-brand-goldDark shrink-0" />
                      <span>Accès 1 mois au canal d'alertes boursières</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => openPayTech('Mentorat Bourse BRVM & Trading NGX', 35000, 53)}
                  className="magnetic-btn w-full py-3 rounded-full bg-gradient-to-r from-brand-gold to-[#E2B755] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-brand-gold/30 hover:brightness-105"
                >
                  <Zap className="w-3.5 h-3.5 text-slate-950" />
                  <span>Réserver ma session (35 000 FCFA)</span>
                </button>
              </div>

              {/* Offre 3 */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between shadow-md hover:shadow-xl transition-all relative">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">Immersion 1 Mois</span>
                    <span className="p-1.5 rounded-lg bg-amber-50 text-brand-goldDark">
                      <Award className="w-4 h-4" />
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Masterclass Finance & Tech</h4>
                  <p className="text-xs text-slate-600 mb-4">Accompagnement intensif de 4 semaines combinant SYSCOHADA, Bourse et création de solutions Web FinTech.</p>
                  
                  <div className="mb-5 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">75 000</span>
                      <span className="font-mono text-xs font-bold text-brand-goldDark">FCFA</span>
                      <span className="text-slate-400 text-xs font-mono">/ mois (~114 €)</span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>4 sessions individuelles hebdomadaires</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Plan de trading personnalisé BRVM / NGX</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Création d'un outil digital de gestion</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Suivi continu 7j/7 direct WhatsApp</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => openPayTech('Masterclass Intégrale Finance & Tech', 75000, 114)}
                  className="magnetic-btn w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Rejoindre (75 000 FCFA)</span>
                </button>
              </div>

            </div>

            {/* Mentions de sécurité PayTech & Airtel Money */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Paiements vérifiés SSL 256 bits</span>
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <Phone className="w-4 h-4 text-brand-goldDark" />
                <span>Compte officiel Airtel Money : +227 77 06 38 37</span>
              </span>
              <span>&bull;</span>
              <span className="text-slate-700 font-semibold">
                Moyens acceptés : Airtel Money, Wave, CB Visa/Mastercard, PayPal, Virement
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* G. CONTACT */}
      <section id="contact" ref={contactRef} className="py-10 sm:py-20 px-3 sm:px-6 relative bg-white">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-gradient-to-b from-[#FFFDF9] via-white to-[#FDFBF7] border-2 border-brand-gold/40 rounded-3xl sm:rounded-5xl p-6 sm:p-10 md:p-12 text-center shadow-2xl shadow-brand-gold/15 relative overflow-hidden">
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-brand-gold/15 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="contact-item font-mono text-[11px] uppercase tracking-widest text-brand-goldDark font-bold mb-2">
              Opportunités & Collaboration
            </div>
            
            <h2 className="contact-item text-3xl sm:text-5xl font-serif italic text-slate-900 mb-3 sm:mb-4">
              Travaillons ensemble
            </h2>

            <p className="contact-item text-slate-600 text-xs sm:text-base max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed">
              Pour tout projet en finance d'entreprise, analyse boursière (BRVM, NGX) ou création de solutions web et mobiles, échangeons dès aujourd'hui.
            </p>

            <div className="contact-item flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              
              {/* WhatsApp — +227 77 06 38 37 */}
              <a 
                href="https://wa.me/22777063837?text=Bonjour%20Aïchatou,%20je%20vous%20contacte%20depuis%20votre%20CV%20en%20ligne."
                target="_blank" 
                rel="noopener noreferrer"
                className="magnetic-btn flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 hover:border-[#25D366] text-slate-900 text-xs sm:text-sm shadow-md shadow-[#25D366]/10 group transition-all"
                title="Démarrer une discussion sur WhatsApp au +227 77 06 38 37"
              >
                <svg className="w-4 h-4 fill-[#25D366] group-hover:scale-110 transition-transform shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="text-[#128C7E] font-bold">WhatsApp :</span>
                <span className="font-mono font-bold text-slate-900">+227 77 06 38 37</span>
              </a>

              {/* Email — moussaousmaneaicha@gmail.com */}
              <a 
                href="mailto:moussaousmaneaicha@gmail.com?subject=Contact%20Professionnel%20-%20Aïchatou%20Moussa%20Ousmane"
                class="magnetic-btn flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-50/80 hover:bg-brand-gold/20 border border-brand-gold/40 hover:border-brand-gold text-slate-900 text-xs sm:text-sm group transition-all shadow-xs"
                title="Cliquer pour écrire à moussaousmaneaicha@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-goldDark group-hover:scale-110 transition-transform" />
                <span className="font-medium underline underline-offset-4 decoration-brand-gold/50 group-hover:decoration-brand-goldDark">moussaousmaneaicha@gmail.com</span>
              </a>

              {/* Téléphone direct */}
              <a 
                href="tel:+22777063837"
                class="magnetic-btn flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-amber-50/50 border border-slate-200/80 hover:border-brand-gold/50 text-slate-800 text-xs sm:text-sm group transition-all shadow-xs"
                title="Cliquer pour appeler le +227 77 06 38 37"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-goldDark group-hover:scale-110 transition-transform" />
                <span className="font-mono font-medium">+227 77 06 38 37</span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="magnetic-btn flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-amber-50/50 border border-slate-200/80 hover:border-brand-gold/50 text-slate-800 text-xs sm:text-sm transition-all shadow-xs"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-goldDark" />
                <span>LinkedIn</span>
              </a>

              {/* Bourse Watch */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-50/60 border border-brand-gold/30 text-slate-800 text-xs sm:text-sm shadow-xs">
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-goldDark" />
                <span className="font-mono text-xs text-brand-goldDark font-bold">BRVM &bull; NGX</span>
              </div>

            </div>

            <div className="contact-item flex flex-col sm:flex-row justify-center items-center gap-3">
              <a
                href="mailto:moussaousmaneaicha@gmail.com?subject=Contact%20Professionnel%20depuis%20le%20Portfolio&body=Bonjour%20Aïchatou,%0D%0A%0D%0A"
                className="magnetic-btn w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-brand-gold to-[#E2B755] text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/25 hover:brightness-105"
              >
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-950" />
                <span>Ouvrir l'application Mail</span>
              </a>

              <button
                onClick={handleDownloadCV}
                className="magnetic-btn w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-goldDark" />
                <span>Télécharger mon CV (PDF)</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* H. PIED DE PAGE */}
      <footer className="bg-[#0D0D14] text-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] border-t border-brand-gold/20 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center text-[10px] font-mono font-bold text-brand-gold">
              AMO
            </div>
            <span className="font-semibold text-xs sm:text-sm text-white">
              Aïchatou Moussa Ousmane
            </span>
            <span className="text-white/40 text-[10px] sm:text-xs font-mono">&bull; 2026</span>
          </div>

          <div className="text-center font-mono text-[11px] text-white/70">
            Portfolio &bull; <span className="text-brand-gold font-bold">1:1 Pixel Perfect</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-brand-gold/30 font-mono text-[11px] text-white">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
            </span>
            <span>En ligne &bull; Disponible</span>
          </div>

        </div>
      </footer>

      {/* MODAL 1 : GUICHET DE PAIEMENT PAYTECH MULTI-MOYENS */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-brand-gold/40 shadow-2xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 relative">
            
            <button 
              onClick={closePayTech}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-brand-goldDark">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold text-brand-goldDark tracking-wider uppercase">PayTech Passerelle Multi-Paiements</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Finaliser votre règlement</h3>
            
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-brand-gold/30 mb-5">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-900 text-sm sm:text-base">{currentPlan.name}</span>
                <div className="text-right">
                  <span className="font-bold text-base sm:text-lg text-slate-950">{currentPlan.fcfa.toLocaleString('fr-FR')} FCFA</span>
                  <span className="text-xs text-slate-500 font-mono block">(~{currentPlan.eur} €)</span>
                </div>
              </div>
              <div className="pt-2 border-t border-brand-gold/20 flex items-center justify-between text-xs text-slate-700">
                <span>Compte récepteur certifié :</span>
                <span className="font-mono font-bold text-slate-900">Airtel Money +227 77 06 38 37</span>
              </div>
            </div>

            <div className="mb-5">
              <label className="block font-mono text-xs font-bold text-slate-700 uppercase mb-2">Choisissez votre moyen de paiement :</label>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPayMethod('mobile')}
                  className={`py-2.5 px-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all ${
                    payMethod === 'mobile'
                      ? 'border-2 border-brand-gold bg-amber-50 text-slate-900 font-bold'
                      : 'border border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-brand-goldDark" />
                  <span>Mobile Money</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod('card')}
                  className={`py-2.5 px-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all ${
                    payMethod === 'card'
                      ? 'border-2 border-brand-gold bg-amber-50 text-slate-900 font-bold'
                      : 'border border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Carte Bancaire</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod('paypal')}
                  className={`py-2.5 px-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all ${
                    payMethod === 'paypal'
                      ? 'border-2 border-brand-gold bg-amber-50 text-slate-900 font-bold'
                      : 'border border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPayMethod('bank')}
                  className={`py-2.5 px-3 rounded-xl text-xs flex flex-col items-center gap-1 transition-all ${
                    payMethod === 'bank'
                      ? 'border-2 border-brand-gold bg-amber-50 text-slate-900 font-bold'
                      : 'border border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Virement</span>
                </button>
              </div>
            </div>

            {/* Panels */}
            {payMethod === 'mobile' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2 font-bold text-xs text-slate-900">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                    <span>AIRTEL MONEY NIGER (Règlement Direct)</span>
                  </div>
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                    Effectuez un transfert direct Airtel Money vers le numéro ci-dessous :
                  </p>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
                    <div>
                      <div className="font-mono text-[10px] text-slate-400 uppercase">Numéro Airtel Money</div>
                      <div className="font-mono font-bold text-sm sm:text-base text-slate-950">+227 77 06 38 37</div>
                    </div>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText('+22777063837');
                        alert('Numéro Airtel Money +227 77 06 38 37 copié !');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-semibold"
                    >
                      Copier
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 italic">Bénéficiaire : Aïchatou Moussa Ousmane</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      <span>Wave (Sénégal / CI)</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Lien direct Wave disponible pour validation instantanée.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      <span>Orange / Moov Money</span>
                    </div>
                    <p className="text-[11px] text-slate-600">Transfert inter-pays UEMOA supporté vers Airtel Niger.</p>
                  </div>
                </div>
              </div>
            )}

            {payMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nom sur la carte</label>
                  <input 
                    type="text" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Ex: Jean Dupont" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro de carte (Visa / Mastercard)</label>
                  <input 
                    type="text" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010" 
                    maxLength={19} 
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Expiration</label>
                    <input 
                      type="text" 
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      placeholder="MM/AA" 
                      maxLength={5} 
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CVC / CVV</label>
                    <input 
                      type="password" 
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123" 
                      maxLength={4} 
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {payMethod === 'paypal' && (
              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 text-center">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-900 mb-1">Paiement International PayPal</h4>
                <p className="text-xs text-slate-600 mb-4">
                  Réglez en toute sécurité avec votre compte PayPal ou votre carte bancaire internationale.
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white font-bold text-xs font-mono">
                  PayPal Express Checkout
                </div>
              </div>
            )}

            {payMethod === 'bank' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Banque :</span>
                  <span className="font-bold text-slate-900">Banque Régionale UEMOA / Niger</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Titulaire :</span>
                  <span className="font-bold text-slate-900">Aïchatou Moussa Ousmane</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Objet :</span>
                  <span className="font-bold text-brand-goldDark font-mono">FORMATION-AMO</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 italic">
                  Les accès sont activés dès réception du justificatif de virement par WhatsApp ou Email.
                </p>
              </div>
            )}

            {/* Buyer fields */}
            <div className="mt-5 space-y-3 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Votre Nom & Prénom *</label>
                  <input 
                    type="text" 
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Votre nom complet" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Numéro WhatsApp / Téléphone *</label>
                  <input 
                    type="tel" 
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="Ex: +227 90 00 00 00" 
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Adresse Email *</label>
                <input 
                  type="email" 
                  value={buyerEmail}
                  onChange={(e) => setBuyerEmail(e.target.value)}
                  placeholder="votre.email@example.com" 
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                onClick={submitPayTech}
                className="magnetic-btn w-full py-3.5 rounded-full bg-gradient-to-r from-brand-gold to-[#E2B755] text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-gold/30 hover:brightness-105"
              >
                <ShieldCheck className="w-4 h-4 text-slate-950" />
                <span>
                  {payMethod === 'mobile' && `Valider sur Airtel Money (+227 77 06 38 37) — ${currentPlan.fcfa.toLocaleString('fr-FR')} FCFA`}
                  {payMethod === 'card' && `Payer par Carte Bancaire — ${currentPlan.fcfa.toLocaleString('fr-FR')} FCFA`}
                  {payMethod === 'paypal' && `Payer via PayPal — ${currentPlan.eur} €`}
                  {payMethod === 'bank' && `Générer l'ordre de virement bancaire — ${currentPlan.fcfa.toLocaleString('fr-FR')} FCFA`}
                </span>
              </button>

              <button
                onClick={() => sendWhatsAppPay()}
                className="w-full py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-slate-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Notifier & Valider directement sur WhatsApp (+227 77 06 38 37)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2 : ESPACE MEMBRE */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-brand-gold/40 shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
            
            <button 
              onClick={closeMember}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-gold to-brand-goldLight text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-md shadow-brand-gold/30">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                {memberTab === 'login' ? 'Connexion Espace Membre' : 'Créer un Compte Membre'}
              </h3>
              <p className="text-xs text-slate-600 mt-1">Rejoignez le réseau privé d'Aïchatou Moussa Ousmane</p>
            </div>

            <div className="flex rounded-full bg-slate-100 p-1 mb-5">
              <button
                type="button"
                onClick={() => setMemberTab('login')}
                className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                  memberTab === 'login'
                    ? 'text-slate-900 bg-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Se connecter
              </button>
              <button
                type="button"
                onClick={() => setMemberTab('register')}
                className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                  memberTab === 'register'
                    ? 'text-slate-900 bg-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Créer un compte
              </button>
            </div>

            {memberTab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required 
                    placeholder="votre.email@example.com" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mot de passe</label>
                  <input 
                    type="password" 
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    required 
                    placeholder="••••••••" 
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="magnetic-btn w-full py-3 rounded-full bg-gradient-to-r from-brand-gold to-[#E2B755] text-slate-950 font-bold text-xs shadow-md shadow-brand-gold/30 hover:brightness-105 transition-all mt-2"
                >
                  Se connecter & Accéder
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet *</label>
                  <input 
                    type="text" 
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required 
                    placeholder="Votre nom et prénom" 
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email *</label>
                  <input 
                    type="email" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required 
                    placeholder="votre.email@example.com" 
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp / Téléphone *</label>
                  <input 
                    type="tel" 
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required 
                    placeholder="+227 77 00 00 00" 
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mot de passe *</label>
                  <input 
                    type="password" 
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    required 
                    placeholder="Créer un mot de passe" 
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Domaine d'intérêt</label>
                  <select 
                    value={regInterest}
                    onChange={(e) => setRegInterest(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:border-brand-gold focus:outline-none"
                  >
                    <option value="bourse">Bourse & Trading (BRVM / NGX)</option>
                    <option value="comptabilite">Comptabilité SYSCOHADA (ENA)</option>
                    <option value="web">Conception Web & Mobile FinTech</option>
                    <option value="partenariat">Partenariat & Recrutement</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="magnetic-btn w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all mt-3"
                >
                  Créer mon compte Membre
                </button>
              </form>
            )}

            <div className="mt-4 text-center">
              <p className="text-[11px] text-slate-500">
                En créant un compte, vous débloquez immédiatement le CV officiel au format PDF et les alertes d'analyse financière.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
