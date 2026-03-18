(() => {
  const translations = {
    en: {
      meta: {
        title: 'React Find · Source-Aware React Debugging',
        description:
          'Inspect any rendered React node, trace it back to the exact source file, walk parent ownership, and jump to your editor in one click.',
        locale: 'en_US',
      },
      nav: {
        features: 'Features',
        quickstart: 'Quick Start',
        workflow: 'Workflow',
        faq: 'FAQ',
        github: 'GitHub',
        languageSwitch: 'Language switch',
        menuOpen: 'Open navigation',
        menuClose: 'Close navigation',
      },
      hero: {
        eyebrow: 'Premium React source inspector',
        title: 'Trace the rendered UI',
        subtitle: 'Jump straight back to the source.',
        description:
          'react-find overlays the real interface, not component trees. Hover the element you care about, open the exact source line, or walk upward through ownership when the render path gets messy.',
        primaryCta: 'Start with Quick Start',
        secondaryCta: 'View GitHub',
      },
      stats: [
        { value: '1 click', label: 'Open the exact source line' },
        { value: '4 paths', label: 'React 18, React 19, Next/Webpack, Remote SSH' },
      ],
      demo: {
        currentNode: 'Current node',
        shortcut: 'Cmd/Ctrl + Hover',
        description: 'Click opens source. Right click reveals parent ownership.',
        code: `init({
  protocol: 'cursor',
  remoteServerName: 'app-dev'
});`,
        noteEyebrow: 'Built for real UI',
        noteTitle: 'Overlay + ancestry menu for dense interfaces',
        noteBody:
          'Keep the page interactive while moving from the selected node to its parent ownership chain.',
      },
      sections: {
        features: {
          eyebrow: 'Why teams ship it',
          title: 'Made for the messy parts of real React debugging.',
          description:
            'Trace rendered output, jump to source faster, and understand ownership without leaving the page.',
        },
        quickstart: {
          eyebrow: 'Quick Start',
          title: 'Choose the setup path that matches your app.',
          description:
            'Pick the integration that matches your stack, copy the snippet, and validate it in a few minutes.',
        },
        workflow: {
          eyebrow: 'Workflow',
          title: 'Three actions. No guessing.',
          description: 'Stay inside the running interface and move from node selection to source inspection quickly.',
        },
        support: {
          eyebrow: 'Support matrix',
          title: 'Use the path that matches your runtime and build pipeline.',
        },
        faq: {
          eyebrow: 'FAQ',
          title: 'Questions that come up before rolling it out to the team.',
          description: 'These answers cover the setup paths people hit most often during adoption.',
        },
      },
      features: {
        tags: ['Hover live UI', 'Jump to editor', 'No React runtime dependency'],
        cards: [
          {
            title: 'Open the exact source',
            body:
              'Hold Command or Control, hover the real interface, and click to open the file and line that produced the current DOM node.',
          },
          {
            title: 'Inspect parent ownership',
            body:
              'Right click the overlay to see the component ancestry and compare who owns the rendered output.',
          },
          {
            title: 'Fit every React stack',
            body:
              'Support direct runtime mode for older React, a dedicated runtime entry for React 18, and source-attribute flows for Vite, Webpack, and Next.',
          },
          {
            title: 'Remote SSH ready',
            body:
              'Pass protocol plus remoteServerName to jump into files even when the app is running over Remote SSH.',
          },
          {
            title: 'Made for dense interfaces',
            body:
              'Cards, tables, layout shells, and deeply nested surfaces stay debuggable because the overlay maps what is rendered, not what you guess.',
          },
        ],
      },
      install: {
        label: 'Install',
        footnote: 'Keep it in development only. Production builds stay clean.',
      },
      snippets: {
        vite19: {
          tab: 'Vite / React 19',
          eyebrow: 'Plugin mode',
          title: 'Add source attributes before init',
          code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginReactSource } from 'react-find/vite';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [vitePluginReactSource(), react()],
});`,
        },
        react18: {
          tab: 'React 18',
          eyebrow: 'Runtime entry',
          title: 'Use the dedicated React 18 entry',
          code: `import { init } from 'react-find/next';

init();`,
        },
        webpack: {
          tab: 'Webpack / Next',
          eyebrow: 'Loader mode',
          title: 'Inject source-file-path during build',
          code: `{
  test: /\.(ts|tsx|js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
    },
    {
      loader: require.resolve('react-find/webpack/webpack-react-source-loader'),
    },
  ],
}`,
        },
        remote: {
          tab: 'Remote SSH',
          eyebrow: 'Editor protocol',
          title: 'Jump into remote files too',
          code: `import { init } from 'react-find/next';

init({
  protocol: 'cursor',
  remoteServerName: 'your-server-name',
});`,
        },
      },
      steps: [
        {
          title: 'Install and initialize',
          body: 'Add react-find to development mode, then choose the runtime or build-time integration that matches the app.',
        },
        {
          title: 'Hover the real surface',
          body: 'Move across buttons, forms, cards, or nested shells until the exact rendered node is highlighted.',
        },
        {
          title: 'Open source or climb ownership',
          body:
            'Left click opens the current source line. Right click gives you the parent stack when the render path needs more context.',
        },
      ],
      support: {
        items: [
          'React 17 and lower: direct runtime entry',
          'React 18: dedicated next runtime entry',
          'React 19 and higher: Vite plugin or Webpack loader',
          'Remote SSH: set protocol and remoteServerName',
        ],
        rolloutEyebrow: 'Team rollout',
        rolloutTitle: 'Bilingual docs, remote-friendly setup, and clear onboarding',
        rolloutBody:
          'English and Chinese setup guidance helps local and remote teams share one onboarding flow.',
      },
      faq: [
        {
          q: 'Which React versions are supported?',
          a:
            'React 17 and lower can use the direct runtime entry. React 18 can use the next runtime entry. React 19 and higher should use the source-attribute plugin or loader path.',
        },
        {
          q: 'Does it work only in development?',
          a:
            'Yes. react-find is designed for local development and should only be initialized when your app is running in development mode.',
        },
        {
          q: 'Can I use another editor protocol?',
          a:
            'Yes. Pass protocol in init, for example cursor, or persist react_find_protocol in localStorage for repeated use.',
        },
        {
          q: 'What if my app runs over Remote SSH?',
          a: 'Provide remoteServerName in init so the generated editor URL uses the vscode-remote style path format.',
        },
      ],
      cta: {
        eyebrow: 'Ready to use it?',
        title: 'Ship source inspection into your local React workflow.',
        primary: 'Start setup',
        secondary: 'View GitHub',
      },
      footer: {
        tagline: 'React source inspection for local development.',
      },
      seo: {
        siteName: 'React Find',
        type: 'website',
      },
      copy: {
        default: 'Copy',
        success: 'Copied',
        error: 'Copy failed',
      },
    },
    zh: {
      meta: {
        title: 'React Find · React 源码定位工具',
        description:
          '直接在页面里定位任意 React 渲染节点，回到准确源码文件和行号，查看父级归属，并一键跳转到编辑器。',
        locale: 'zh_CN',
      },
      nav: {
        features: '能力亮点',
        quickstart: '快速开始',
        workflow: '使用流程',
        faq: '常见问题',
        github: 'GitHub',
        languageSwitch: '语言切换',
        menuOpen: '打开导航',
        menuClose: '关闭导航',
      },
      hero: {
        eyebrow: '面向开发者的源码定位工具',
        title: '直接追踪页面里的渲染结果',
        subtitle: '一键回到对应源码',
        description:
          'react-find 关注的是真实渲染出来的界面，而不是抽象组件树。你可以在页面上悬停目标元素，直接打开准确源码，或者沿着父级归属一路向上排查复杂渲染链路。',
        primaryCta: '从快速开始入手',
        secondaryCta: '查看 GitHub',
      },
      stats: [
        { value: '1 次点击', label: '直接打开准确源码行' },
        { value: '4 条路径', label: 'React 18、React 19、Next/Webpack、Remote SSH' },
      ],
      demo: {
        currentNode: '当前节点',
        shortcut: 'Cmd/Ctrl + Hover',
        description: '左键打开源码，右键查看父级归属链路。',
        code: `init({
  protocol: 'cursor',
  remoteServerName: 'app-dev'
});`,
        noteEyebrow: '真实界面调试',
        noteTitle: '悬浮层与父级菜单，适合复杂页面',
        noteBody:
          '定位当前节点后，可以继续沿着父级归属向上追踪，同时尽量不打断页面操作。',
      },
      sections: {
        features: {
          eyebrow: '核心能力',
          title: '专门解决 React 调试里最容易变乱的那部分。',
          description:
            '更快定位渲染结果、直接跳回源码，并在复杂页面里看清组件归属。',
        },
        quickstart: {
          eyebrow: '快速开始',
          title: '按你的应用栈选择最合适的接入方式。',
          description: '按工程栈选择对应方案，直接复制代码，几分钟内就能完成验证。',
        },
        workflow: {
          eyebrow: '使用流程',
          title: '三步完成，不再靠猜。',
          description: '在运行中的真实页面里完成定位、跳转和归属排查。',
        },
        support: {
          eyebrow: '支持矩阵',
          title: '按你的运行时和构建方式选择对应接法。',
        },
        faq: {
          eyebrow: '常见问题',
          title: '团队准备接入前最常问的几件事。',
          description: '这些回答覆盖了落地时最常见的接入和协作问题。',
        },
      },
      features: {
        tags: ['悬停真实 UI', '直接跳编辑器', '无 React 运行时依赖'],
        cards: [
          {
            title: '打开准确源码',
            body: '按住 Command 或 Control，在真实页面上悬停并点击，就能打开当前 DOM 节点对应的源码文件和行号。',
          },
          {
            title: '查看父级归属',
            body: '右键打开悬浮菜单，沿着组件祖先链一路向上，快速判断到底是谁拥有这段渲染结果。',
          },
          {
            title: '适配多种 React 工程',
            body: '老项目可直接走运行时模式，React 18 有专用入口，Vite、Webpack、Next 则支持构建时注入源码属性。',
          },
          {
            title: '支持 Remote SSH',
            body: '传入 protocol 和 remoteServerName 后，即使应用跑在 Remote SSH 环境里，也能继续跳转到远程文件。',
          },
          {
            title: '复杂界面也能用',
            body: '卡片、表格、布局容器和多层嵌套节点都能稳定定位，因为它映射的是最终渲染结果，而不是主观猜测。',
          },
        ],
      },
      install: {
        label: '安装',
        footnote: '建议只在开发环境启用，生产构建保持干净。',
      },
      snippets: {
        vite19: {
          tab: 'Vite / React 19',
          eyebrow: '插件模式',
          title: '在初始化前注入源码属性',
          code: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePluginReactSource } from 'react-find/vite';

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [vitePluginReactSource(), react()],
});`,
        },
        react18: {
          tab: 'React 18',
          eyebrow: '运行时入口',
          title: '使用 React 18 专用入口',
          code: `import { init } from 'react-find/next';

init();`,
        },
        webpack: {
          tab: 'Webpack / Next',
          eyebrow: 'Loader 模式',
          title: '构建阶段注入 source-file-path',
          code: `{
  test: /\.(ts|tsx|js|jsx)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
    },
    {
      loader: require.resolve('react-find/webpack/webpack-react-source-loader'),
    },
  ],
}`,
        },
        remote: {
          tab: 'Remote SSH',
          eyebrow: '编辑器协议',
          title: '远程文件也能直接跳转',
          code: `import { init } from 'react-find/next';

init({
  protocol: 'cursor',
  remoteServerName: 'your-server-name',
});`,
        },
      },
      steps: [
        {
          title: '安装并初始化',
          body: '在开发环境引入 react-find，再根据应用实际情况选择运行时或构建时接入方式。',
        },
        {
          title: '悬停真实界面',
          body: '在按钮、表单、卡片或复杂布局上移动鼠标，直到你想分析的渲染节点被准确高亮。',
        },
        {
          title: '打开源码或向上追踪',
          body: '左键直接打开当前源码行，右键则进入父级链路，适合处理归属不明确的渲染问题。',
        },
      ],
      support: {
        items: [
          'React 17 及以下：直接运行时入口',
          'React 18：使用 next 专用运行时入口',
          'React 19 及以上：Vite 插件或 Webpack Loader',
          'Remote SSH：设置 protocol 和 remoteServerName',
        ],
        rolloutEyebrow: '团队推广',
        rolloutTitle: '双语文档、远程友好、上手路径清晰',
        rolloutBody:
          '中英文接入说明适合本地和远程协作团队共享同一套上手路径。',
      },
      faq: [
        {
          q: '支持哪些 React 版本？',
          a: 'React 17 及以下可使用直接运行时入口，React 18 可使用 next 入口，React 19 及以上推荐使用源码属性插件或 Loader 方案。',
        },
        {
          q: '只能在开发环境里用吗？',
          a: '是的。react-find 的设计目标就是本地开发调试，建议仅在应用运行于 development 模式时启用。',
        },
        {
          q: '可以换别的编辑器协议吗？',
          a: '可以。你可以在 init 中传入 protocol，例如 cursor，也可以把 react_find_protocol 持久化到 localStorage 里复用。',
        },
        {
          q: '应用跑在 Remote SSH 上怎么办？',
          a: '给 init 传入 remoteServerName 后，生成的编辑器链接会走 vscode-remote 风格路径，从而定位到远程文件。',
        },
      ],
      cta: {
        eyebrow: '准备开始？',
        title: '把源码定位能力接进你的 React 开发流。',
        primary: '开始配置',
        secondary: '查看 GitHub',
      },
      footer: {
        tagline: '面向本地开发的 React 源码定位工具。',
      },
      seo: {
        siteName: 'React Find',
        type: 'website',
      },
      copy: {
        default: '复制',
        success: '已复制',
        error: '复制失败',
      },
    },
  };

  const state = {
    lang: getInitialLanguage(),
    activeSnippet: 'vite19',
    mobileMenuOpen: false,
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const canonicalLink = document.getElementById('link-canonical');
  const metaOgUrl = document.getElementById('meta-og-url');
  const metaOgLocale = document.getElementById('meta-og-locale');
  const metaTwitterTitle = document.getElementById('meta-twitter-title');
  const metaTwitterDescription = document.getElementById('meta-twitter-description');
  const structuredData = document.getElementById('structured-data');

  function getInitialLanguage() {
    const stored = localStorage.getItem('react-find-docs-lang');
    if (stored === 'en' || stored === 'zh') {
      return stored;
    }
    return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  }

  function getByPath(source, path) {
    return path.split('.').reduce((value, segment) => (value == null ? value : value[segment]), source);
  }

  function currentCopyText(stateName) {
    return translations[state.lang].copy[stateName];
  }

  function applyTranslations() {
    const content = translations[state.lang];

    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    document.title = content.meta.title;

    const metaDescription = document.getElementById('meta-description');
    const metaOgTitle = document.getElementById('meta-og-title');
    const metaOgDescription = document.getElementById('meta-og-description');

    if (metaDescription) {
      metaDescription.setAttribute('content', content.meta.description);
    }

    if (metaOgTitle) {
      metaOgTitle.setAttribute('content', content.meta.title);
    }

    if (metaOgDescription) {
      metaOgDescription.setAttribute('content', content.meta.description);
    }

    if (metaOgLocale) {
      metaOgLocale.setAttribute('content', content.meta.locale);
    }

    if (metaTwitterTitle) {
      metaTwitterTitle.setAttribute('content', content.meta.title);
    }

    if (metaTwitterDescription) {
      metaTwitterDescription.setAttribute('content', content.meta.description);
    }

    document.querySelectorAll('[data-i18n]').forEach(node => {
      const value = getByPath(content, node.dataset.i18n);
      if (typeof value === 'string') {
        node.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
      const value = getByPath(content, node.dataset.i18nPlaceholder);
      if (typeof value === 'string') {
        node.setAttribute('placeholder', value);
      }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(node => {
      const key = node.dataset.i18nAriaLabel;
      const value = getByPath(content, key);
      if (typeof value === 'string') {
        node.setAttribute('aria-label', value);
      }
    });

    document.querySelectorAll('[data-language]').forEach(button => {
      const active = button.dataset.language === state.lang;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    resetCopyButtons();
    updateSeo(content);
    syncMenuLabel();
  }

  function getCanonicalUrl() {
    if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
      const url = new URL(window.location.href);
      url.search = '';
      url.hash = '';
      return url.toString();
    }

    return './index.html';
  }

  function buildStructuredData(content) {
    const canonicalUrl = getCanonicalUrl();

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: content.seo.siteName,
          url: canonicalUrl,
          inLanguage: document.documentElement.lang,
          description: content.meta.description,
        },
        {
          '@type': 'FAQPage',
          inLanguage: document.documentElement.lang,
          mainEntity: content.faq.map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.a,
            },
          })),
        },
      ],
    };
  }

  function updateSeo(content) {
    const canonicalUrl = getCanonicalUrl();

    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    if (metaOgUrl) {
      metaOgUrl.setAttribute('content', canonicalUrl);
    }

    if (structuredData) {
      structuredData.textContent = JSON.stringify(buildStructuredData(content));
    }
  }

  function syncMenuLabel() {
    if (!menuToggle) {
      return;
    }

    const key = state.mobileMenuOpen ? 'nav.menuClose' : 'nav.menuOpen';
    const label = getByPath(translations[state.lang], key);
    if (label) {
      menuToggle.setAttribute('aria-label', label);
    }
  }

  function syncSnippetPanels() {
    document.querySelectorAll('[data-snippet-tab]').forEach(button => {
      const active = button.dataset.snippetTab === state.activeSnippet;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    document.querySelectorAll('[data-snippet-panel]').forEach(panel => {
      const active = panel.dataset.snippetPanel === state.activeSnippet;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  }

  function resetCopyButtons() {
    document.querySelectorAll('[data-copy-target]').forEach(button => {
      button.classList.remove('is-copied', 'is-error');
      button.textContent = currentCopyText('default');
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }

  function toggleMenu(nextValue) {
    state.mobileMenuOpen = nextValue;

    if (mobileMenu) {
      mobileMenu.hidden = !state.mobileMenuOpen;
    }

    if (menuToggle) {
      menuToggle.classList.toggle('is-open', state.mobileMenuOpen);
      menuToggle.setAttribute('aria-expanded', state.mobileMenuOpen ? 'true' : 'false');
    }

    document.body.classList.toggle('menu-open', state.mobileMenuOpen);
    syncMenuLabel();
  }

  function bindEvents() {
    document.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => {
        const nextLang = button.dataset.language;
        if (nextLang !== 'en' && nextLang !== 'zh') {
          return;
        }

        state.lang = nextLang;
        localStorage.setItem('react-find-docs-lang', nextLang);
        applyTranslations();
      });
    });

    document.querySelectorAll('[data-snippet-tab]').forEach(button => {
      button.addEventListener('click', () => {
        state.activeSnippet = button.dataset.snippetTab || 'vite19';
        syncSnippetPanels();
      });
    });

    document.querySelectorAll('[data-copy-target]').forEach(button => {
      button.addEventListener('click', async () => {
        const targetId = button.dataset.copyTarget;
        const source = targetId ? document.getElementById(targetId) : null;
        const value = source ? source.textContent || '' : '';

        try {
          await copyText(value);
          button.textContent = currentCopyText('success');
          button.classList.remove('is-error');
          button.classList.add('is-copied');
        } catch (error) {
          button.textContent = currentCopyText('error');
          button.classList.remove('is-copied');
          button.classList.add('is-error');
        }

        window.setTimeout(() => {
          button.classList.remove('is-copied', 'is-error');
          button.textContent = currentCopyText('default');
        }, 1400);
      });
    });

    window.addEventListener('keydown', event => {
      if (event.key === 'Escape' && state.mobileMenuOpen) {
        toggleMenu(false);
      }
    });

    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        toggleMenu(!state.mobileMenuOpen);
      });
    }

    document.querySelectorAll('.mobile-menu a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && state.mobileMenuOpen) {
        toggleMenu(false);
      }
    });
  }

  function initSpotlights() {
    if (reducedMotion) {
      return;
    }

    document.querySelectorAll('[data-spotlight]').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--spotlight-x', `${x}%`);
        card.style.setProperty('--spotlight-y', `${y}%`);
      });
    });
  }

  function initParallax() {
    if (reducedMotion) {
      return;
    }

    const update = () => {
      const progress = Math.min(window.scrollY / 720, 1);
      document.documentElement.style.setProperty('--hero-progress', progress.toFixed(3));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  applyTranslations();
  syncSnippetPanels();
  bindEvents();
  initSpotlights();
  initParallax();
})();
