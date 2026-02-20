/**
 * Odyssey AI — Shared Sidebar Navigation
 * Injected into all lesson pages automatically.
 * Sets active state based on current URL filename.
 */

(function () {
  const lessons = [
    {
      module: 1, id: '1-1', slug: '1-1-introduction',
      label: '1.1 코스 소개', icon: '🏕️'
    },
    {
      module: 1, id: '1-2', slug: '1-2-file-exploration',
      label: '1.2 파일 탐색', icon: '🔍'
    },
    {
      module: 1, id: '1-3', slug: '1-3-working-with-files',
      label: '1.3 @ 파일 다루기', icon: '@'
    },
    {
      module: 1, id: '1-4', slug: '1-4-commands-navigation',
      label: '1.4 명령어 & 단축키', icon: '⚡'
    },
    {
      module: 1, id: '1-5', slug: '1-5-agents',
      label: '1.5 AI 팀 운영', icon: '🧪', exp: true
    },
    {
      module: 1, id: '1-6', slug: '1-6-custom-subagents',
      label: '1.6 AI 팀원 만들기', icon: '🤝'
    },
    {
      module: 1, id: '1-7', slug: '1-7-gemini-md',
      label: '1.7 GEMINI.md', icon: '📝'
    },
    {
      module: 1, id: '1-8', slug: '1-8-power-features',
      label: '1.8 고급 기능 정리', icon: '🚀'
    },
    {
      module: 2, id: '2-1', slug: '2-1-setup',
      label: '2.1 준비 시작', icon: '🧱'
    },
    {
      module: 2, id: '2-2', slug: '2-2-plan',
      label: '2.2 기획 정리', icon: '📋'
    },
    {
      module: 2, id: '2-3', slug: '2-3-build-iterate',
      label: '2.3 만들기 & 다듬기', icon: '🔨'
    },
    {
      module: 2, id: '2-4', slug: '2-4-github',
      label: '2.4 GitHub 저장', icon: '🐙'
    },
    {
      module: 2, id: '2-5', slug: '2-5-go-live',
      label: '2.5 인터넷에 올리기 🚀', icon: '🌐'
    }
  ];

  const currentFile = window.location.pathname.split('/').pop().replace('.html', '');
  const isIndex = currentFile === 'index' || currentFile === '';

  // Determine root path (index.html is one level up from lessons/)
  const root = isIndex ? './' : '../';

  const m1 = lessons.filter(l => l.module === 1);
  const m2 = lessons.filter(l => l.module === 2);

  function navLink(l) {
    const active = currentFile === l.slug ? 'active' : '';
    const exp = l.exp ? '<span class="nav-badge new" style="font-size:9px;">🧪</span>' : '';
    return `<a class="nav-link ${active}" href="${root}lessons/${l.slug}.html">${l.label}${exp}</a>`;
  }

  const html = `
    <div class="sidebar-logo">
      <a href="${root}index.html" style="text-decoration:none;">
        <div class="logo-mark">
          <div class="logo-icon">✦</div>
          <span class="logo-text">Odyssey AI</span>
        </div>
        <div class="logo-sub">GC4E · The Art of AI Leverage</div>
      </a>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section">
        <div class="nav-section-label">시작하기</div>
        <a class="nav-link ${isIndex ? 'active' : ''}" href="${root}index.html">🏠 코스 소개</a>
        <a class="nav-link" href="${root}index.html#quickstart">⚡ 빠른 시작</a>
        <a class="nav-link" href="${root}index.html#features">🛠 핵심 기능</a>
      </div>

      <div class="nav-section">
        <div class="nav-section-label">모듈 1 · 기초 다지기</div>
        ${m1.map(navLink).join('\n        ')}
      </div>

      <div class="nav-section">
        <div class="nav-section-label">모듈 2 · 바이브 코딩</div>
        ${m2.map(navLink).join('\n        ')}
      </div>

      <div class="nav-section">
        <div class="nav-section-label">참고 자료</div>
        <a class="nav-link" href="https://geminicli.com/docs" target="_blank" rel="noopener">📖 공식 문서 ↗</a>
        <a class="nav-link" href="https://geminicli.com/docs/reference/policy-engine" target="_blank" rel="noopener">🛡 행동 규칙 설정 ↗</a>
        <a class="nav-link" href="https://geminicli.com/docs/core/subagents" target="_blank" rel="noopener">🤖 AI 팀원 API ↗</a>
      </div>
    </nav>

    <div class="sidebar-footer">
      <a href="https://geminicli.com/docs" target="_blank" rel="noopener">
        <span>geminicli.com/docs</span>
        <span style="font-size:10px;opacity:0.5;">↗</span>
      </a>
    </div>
  `;

  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.innerHTML = html;

  // Mobile topbar logo link
  const topbarLogo = document.getElementById('topbarLogoLink');
  if (topbarLogo) topbarLogo.href = root + 'index.html';

  // Mobile sidebar toggle
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      menuToggle.textContent = sidebar.classList.contains('open') ? '✕' : '☰';
    });
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove('open');
        menuToggle.textContent = '☰';
      }
    });
  }

  // Scroll progress bar
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = `scaleX(${docHeight > 0 ? scrollTop / docHeight : 0})`;
    }, { passive: true });
  }
})();
