$appContent = Get-Content -Path "c:\Users\LENOVO\izi saas pro\src\App.jsx" -Raw -Encoding UTF8

# Locate the exact root div
$startDiv = '<div className="relative min-h-screen text-brand-ghost'
$startIndex = $appContent.IndexOf($startDiv)
if ($startIndex -lt 0) {
    throw "Root div not found"
}

# The closing </div> is right before ");`r`n}" or ");`n}"
$endIndex = $appContent.LastIndexOf(");`r`n}")
if ($endIndex -lt 0) {
    $endIndex = $appContent.LastIndexOf(");`n}")
}
if ($endIndex -lt 0) {
    $endIndex = $appContent.LastIndexOf(");")
}

$jsx = $appContent.Substring($startIndex, $endIndex - $startIndex).Trim()

# Conversions
# 1. className="..." -> class="..."
$html = $jsx -replace 'className=', 'class='

# 2. JSX comments {/* ... */} -> <!-- ... -->
$html = [System.Text.RegularExpressions.Regex]::Replace($html, '\{\/\*([\s\S]*?)\*\/\}', '<!-- $1 -->')

# 3. Navbar dynamic class
$html = [System.Text.RegularExpressions.Regex]::Replace($html, 'class=\{`pointer-events-auto[^`]+`\}', 'id="main-nav" class="pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all duration-400 max-w-4xl w-full bg-white/[0.05] backdrop-blur-md border border-white/10"')

# 4. Remove ref={...}
$html = [System.Text.RegularExpressions.Regex]::Replace($html, '\s*ref=\{[a-zA-Z0-9]+\}', '')

# 5. Replace onClick={handleDownloadCV}
$html = $html -replace 'onClick=\{handleDownloadCV\}', 'onclick="handleDownloadCV(event)"'

# 6. Replace onClick={() => handleCopy(...)}
$html = [System.Text.RegularExpressions.Regex]::Replace($html, 'onClick=\{\(\)\s*=>\s*handleCopy\(([^)]+)\)\}', 'onclick="handleCopy($1)"')

# 7. Convert Lucide components to <i data-lucide="..." class="..."></i>
$iconMap = @{
    'Download' = 'download'
    'GraduationCap' = 'graduation-cap'
    'TrendingUp' = 'trending-up'
    'Code2' = 'code-2'
    'FileText' = 'file-text'
    'Mail' = 'mail'
    'ChevronDown' = 'chevron-down'
    'Award' = 'award'
    'CheckCircle2' = 'check-circle-2'
    'FileCheck' = 'file-check'
    'BookOpen' = 'book-open'
    'CandlestickChart' = 'candlestick-chart'
    'Calculator' = 'calculator'
    'Layout' = 'layout'
    'Database' = 'database'
    'PieChart' = 'pie-chart'
    'Phone' = 'phone'
    'Linkedin' = 'linkedin'
    'Activity' = 'activity'
    'Send' = 'send'
}

foreach ($key in $iconMap.Keys) {
    $lucideName = $iconMap[$key]
    $pattern = '<' + $key + '\s+class="([^"]*)"\s*\/>'
    $replacement = '<i data-lucide="' + $lucideName + '" class="$1"></i>'
    $html = [System.Text.RegularExpressions.Regex]::Replace($html, $pattern, $replacement)

    $patternNoClass = '<' + $key + '\s*\/>'
    $replacementNoClass = '<i data-lucide="' + $lucideName + '"></i>'
    $html = [System.Text.RegularExpressions.Regex]::Replace($html, $patternNoClass, $replacementNoClass)
}

$fullHtml = @'
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aïchatou Moussa Ousmane — Portfolio & CV Digital Cinématographique</title>
  <meta name="description" content="Portfolio et CV en ligne d'Aïchatou Moussa Ousmane — Étudiante ENA Niveau II en Comptabilité & Gestion des Entreprises, Bourse (BRVM, NGX), Trading et Création Web/Mobile.">

  <!-- Google Fonts: Sora, Instrument Serif, Fira Code -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            brand: {
              void: '#0B0B10',
              gold: '#D4A843',
              goldLight: '#F3DE97',
              goldDark: '#A67D24',
              goldGlow: 'rgba(212, 168, 67, 0.35)',
              ghost: '#F8F8FC',
              graphite: '#16161F',
              surface: '#12121A',
              surfaceCard: '#1A1A26',
              borderSubtle: 'rgba(212, 168, 67, 0.18)'
            }
          },
          fontFamily: {
            sans: ['"Sora"', 'sans-serif'],
            serif: ['"Instrument Serif"', 'serif'],
            mono: ['"Fira Code"', 'monospace']
          },
          borderRadius: {
            '3xl': '1.5rem',
            '4xl': '2rem',
            '5xl': '2.5rem'
          }
        }
      }
    }
  </script>

  <!-- GSAP & ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>

  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    /* Global Noise Overlay via inline SVG feTurbulence at 0.04 opacity */
    .noise-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.04;
    }

    /* Selection styling Or */
    ::selection {
      background-color: #D4A843;
      color: #0B0B10;
    }

    /* Magnetic & hover transitions */
    .magnetic-btn {
      transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .magnetic-btn:hover {
      transform: scale(1.03);
    }

    .interactive-link {
      transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.2s ease;
    }
    .interactive-link:hover {
      transform: translateY(-1px);
    }

    .experience-card {
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .experience-card:hover {
      transform: scale(1.01);
      box-shadow: 0 16px 36px -12px rgba(212, 168, 67, 0.22);
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0B0B10;
    }
    ::-webkit-scrollbar-thumb {
      background: #2E2E3E;
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #D4A843;
    }

    /* Glow utilities Or */
    .gold-glow {
      box-shadow: 0 0 28px rgba(212, 168, 67, 0.25);
    }
    .gold-glow-lg {
      box-shadow: 0 0 50px rgba(212, 168, 67, 0.32);
    }
    .gold-gradient-text {
      background: linear-gradient(135deg, #FFFFFF 20%, #F5E5BE 60%, #D4A843 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gold-border-gradient {
      border-image: linear-gradient(to bottom, #D4A843, rgba(212,168,67,0.2)) 1;
    }
  </style>
</head>
<body class="bg-brand-void text-brand-ghost antialiased selection:bg-brand-gold selection:text-brand-void relative overflow-x-hidden font-sans">
'@

$footerJs = @'

  <!-- Client-side Interactive Logic (Standard JS, GSAP & Lucide) -->
  <script>
    // Initialize Lucide Icons immediately
    document.addEventListener("DOMContentLoaded", function() {
      if (window.lucide) {
        window.lucide.createIcons();
      }

      // Initialize GSAP & ScrollTrigger
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Animation
        var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        heroTl
          .from('.hero-avatar', { scale: 0.85, opacity: 0, duration: 0.8 })
          .from('.hero-badge', { y: 15, opacity: 0, duration: 0.5 }, '-=0.4')
          .from('.hero-title', { y: 25, opacity: 0, duration: 0.7 }, '-=0.3')
          .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.7 }, '-=0.4')
          .from('.hero-stats', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3')
          .from('.hero-cta', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3');

        // About Section
        var aboutEl = document.getElementById('about');
        if (aboutEl) {
          gsap.from('.about-content', {
            scrollTrigger: {
              trigger: '#about',
              start: 'top 80%',
              toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        }

        // Experience Cards
        gsap.utils.toArray('.exp-card').forEach(function(card, index) {
          var direction = index % 2 === 0 ? -30 : 30;
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

        // Skills Circular Counters
        gsap.utils.toArray('.skill-item').forEach(function(item) {
          var targetPercent = parseInt(item.getAttribute('data-percent'), 10) || 80;
          var circle = item.querySelector('.progress-circle');
          var counter = item.querySelector('.counter-value');
          var circumference = 2 * Math.PI * 36;

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
            var countObj = { val: 0 };
            gsap.to(countObj, {
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none'
              },
              val: targetPercent,
              duration: 1.3,
              ease: 'power2.out',
              onUpdate: function() {
                counter.innerText = Math.round(countObj.val) + '%';
              }
            });
          }
        });

        // Education Section
        gsap.from('.edu-card', {
          scrollTrigger: {
            trigger: '#education',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 25,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power3.out'
        });

        // Contact Section
        gsap.from('.contact-item', {
          scrollTrigger: {
            trigger: '#contact',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out'
        });
      }
    });

    // Navbar Scroll Morphing
    window.addEventListener('scroll', function() {
      var nav = document.getElementById('main-nav');
      if (nav) {
        if (window.scrollY > 40) {
          nav.classList.remove('bg-white/[0.05]', 'border-white/10');
          nav.classList.add('bg-[#0F0F16]/90', 'backdrop-blur-xl', 'border-brand-gold/30', 'shadow-xl', 'gold-glow');
        } else {
          nav.classList.remove('bg-[#0F0F16]/90', 'backdrop-blur-xl', 'border-brand-gold/30', 'shadow-xl', 'gold-glow');
          nav.classList.add('bg-white/[0.05]', 'border-white/10');
        }
      }
    });

    // Copy to Clipboard
    function handleCopy(text, label) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
        alert(label + ' copié dans le presse-papiers !');
      }
    }

    // Download / Print CV in High Quality PDF
    function handleDownloadCV(e) {
      if (e) e.preventDefault();
      var printWindow = window.open('', '_blank');
      if (!printWindow) {
        window.print();
        return;
      }
      var cvHtml = `
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
  <div class="title">Étudiante ENA Niveau II — Option Comptabilité & Gestion des Entreprises | Passionnée de Bourse (BRVM & NGX), Trading et Développement Digital</div>
  <div class="contact-line">
    📍 Niamey, Niger &bull; 📧 aichatou.moussa.ousmane@example.com &bull; 📞 +227 77 06 38 37 &bull; 🌐 Portfolio Digital
  </div>

  <h2>Profil Professionnel</h2>
  <p class="desc">
    Rigoureuse et dotée d'une solide double compétence en <strong>Sciences Comptables & Gestion d'Entreprise</strong> et en <strong>Finance de Marché (BRVM, NGX, Trading)</strong> combinée aux <strong>Technologies Web & Mobiles</strong>. Diplômée Niveau I de l'École Nationale d'Administration (ENA) et titulaire d'un Baccalauréat en Comptabilité Informatique, je poursuis activement mon cursus au Niveau II afin de développer des solutions de gestion financière et d'investissement à fort impact.
  </p>

  <h2>Formations & Diplômes</h2>
  <div class="item">
    <div class="item-header"><span>Niveau II — Comptabilité et Gestion des Entreprises</span><span>2025 — En cours</span></div>
    <div class="item-sub">École Nationale d'Administration (ENA)</div>
    <div class="desc">Approfondissement en fiscalité, contrôle de gestion, finance d'entreprise et audit.</div>
  </div>
  <div class="item">
    <div class="item-header"><span>Diplôme en Comptabilité et Gestion des Entreprises (Niveau I)</span><span>2022 — 2025</span></div>
    <div class="item-sub">École Nationale d'Administration (ENA) &bull; Cycle de 3 ans avec succès</div>
    <div class="desc">États financiers complets SYSCOHADA, comptabilité générale et analytique, gestion budgétaire.</div>
  </div>
  <div class="item">
    <div class="item-header"><span>Baccalauréat Comptabilité Informatique</span><span>Obtenu en 2025</span></div>
    <div class="item-sub">Enseignement Technique & Professionnel</div>
    <div class="desc">Maîtrise des logiciels de gestion comptable, traitement informatisé des opérations et bases de données.</div>
  </div>
  <div class="item">
    <div class="item-header"><span>BEPC (Brevet d'Études du Premier Cycle)</span><span>Obtenu en 2022</span></div>
    <div class="item-sub">Admission au cycle ENA</div>
  </div>

  <h2>Domaines d'Expertise</h2>
  <div style="margin-top: 8px;">
    <span class="badge">Bourse BRVM & NGX</span>
    <span class="badge">Trading & Analyse Graphique</span>
    <span class="badge">Comptabilité Générale & SYSCOHADA</span>
    <span class="badge">Création Web & Mobile</span>
    <span class="badge">Comptabilité Informatique & ERP</span>
    <span class="badge">Gestion de Trésorerie & Budgets</span>
  </div>
</body>
</html>
      `;
      printWindow.document.write(cvHtml);
      printWindow.document.close();
      setTimeout(function() {
        printWindow.print();
      }, 400);
    }
  </script>
</body>
</html>
'@

$finalOutput = $fullHtml + "`r`n" + $html + "`r`n" + $footerJs
[System.IO.File]::WriteAllText("c:\Users\LENOVO\izi saas pro\index.html", $finalOutput, [System.Text.Encoding]::UTF8)
Write-Output "Native HTML build perfectly completed!"
