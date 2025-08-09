<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';

  let form = $state({
    name: '',
    email: '',
    message: ''
  });

  let currentYear = $state(new Date().getFullYear());
  let activeSection = $state('home');

  // ナビゲーション機能
  onMount(() => {
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
      let current = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          current = section.id;
        }
      });
      if (current) activeSection = current;
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
    return () => window.removeEventListener('scroll', updateActiveNav);
  });

  function handleNavClick(sectionId) {
    activeSection = sectionId;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Form submitted:', form);
    // ここでフォーム送信処理を実装
  }

  // メンバーデータ（写真は /static/members に配置）
  const members = [
    { name: '山口暁帆', initials: 'AY', specialty: 'Hello AI 運営責任者', photo: `${base}/members/akiho.avif` },
    { name: '世良将之', initials: 'MS', specialty: 'Hello AI 技術責任者', photo: `${base}/members/sera2.avif` },
    { name: '小川椋徹', initials: 'RO', specialty: '2WINS 代表取締役 Co-CEO', photo: `${base}/members/ogawa.avif` },
    { name: '鈴木友李江', initials: 'YS', specialty: '2WINS 取締役 経営管理本部 Senior Director', photo: `${base}/members/yurie.avif` }
  ];
</script>

<svelte:head>
  <title>HELLO AI | AIサークル</title>
  <meta name="description" content="東京大学発のAIコミュニティ「Hello AI」。AIをこれから学びたい大学生が、基礎から実践までステップアップできる環境を提供します。全国どこからでも'本郷クオリティ'の学びを。" />
  <meta name="theme-color" content="#000000" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap" rel="stylesheet" />
</svelte:head>

<a class="sr-only" href="#main">メインコンテンツへスキップ</a>

<header>
  <div class="container nav">
    <div class="brand" aria-label="HELLO AI">
      <span class="brand__mark" aria-hidden="true"></span>
      <span class="brand__name">HELLO AI</span>
    </div>
    <nav aria-label="主要ナビゲーション">
      <ul>
        <li><a href="#home" aria-current={activeSection === 'home' ? 'page' : null} onclick={() => handleNavClick('home')}>ホーム</a></li>
        <li><a href="#about" aria-current={activeSection === 'about' ? 'page' : null} onclick={() => handleNavClick('about')}>Hello AIとは</a></li>
        <li><a href="#members" aria-current={activeSection === 'members' ? 'page' : null} onclick={() => handleNavClick('members')}>メンバー</a></li>
        <li><a href="#education" aria-current={activeSection === 'education' ? 'page' : null} onclick={() => handleNavClick('education')}>教育</a></li>
        <li><a href="#competitions" aria-current={activeSection === 'competitions' ? 'page' : null} onclick={() => handleNavClick('competitions')}>コンペ</a></li>
        <li><a href="#quests" aria-current={activeSection === 'quests' ? 'page' : null} onclick={() => handleNavClick('quests')}>クエスト</a></li>
        <li><a href="#contact" aria-current={activeSection === 'contact' ? 'page' : null} onclick={() => handleNavClick('contact')}>お問い合わせ</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  <!-- Hero（最新情報のasideは削除済み） -->
  <section id="home" class="hero">
    <div class="container hero__grid">
      <div>
        <span class="eyebrow">"本郷クオリティ"を全国どこからでも</span>
        <h1>東京大学発のAIコミュニティ「Hello AI」へようこそ。</h1>
        <p class="hero__lead">
          私たちは、AIをこれから学びたい大学生を対象に、基礎から実践までステップアップできる環境を提供しています。<br />
          「本郷クオリティ」と呼ばれる高水準の学びを、全国どこからでも。仲間と一緒に、AIの基礎を身につけ、社会で活躍できる力を育てます。
        </p>
        <div class="cta">
          <a class="btn btn--primary" href="#contact" aria-label="入会の問い合わせ">ご参加はこちらから</a>
          <a class="btn btn--ghost" href="#about">もっと詳しく</a>
        </div>
      </div>
    </div>
  </section>

  <!-- About -->
  <section id="about" class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <p class="badge"><span class="dot" aria-hidden="true"></span> HELLO AIとは</p>
          <h2 class="section__title">学びと経験をつなぐ"橋渡し"</h2>
          <p class="section__desc">
            Hello AIは、東京大学発AI企業「2WINS」が運営する、大学生向けのAI学習・実践サークルです。AI初心者でも安心して学べる教材と、少しずつ実務に挑戦できる機会を用意しています。
          </p>
        </div>
      </div>

      <div class="cards">
        <article class="card">
          <h3>運営</h3>
          <p>東京大学発AI企業「2WINS」が運営。信頼できる環境で学びを進められます。</p>
        </article>
        <article class="card">
          <h3>学べる教材</h3>
          <p>初心者に寄り添った教材で、安心して基礎から取り組めます。</p>
        </article>
        <article class="card">
          <h3>実務への橋渡し</h3>
          <p>学びと経験を重ね、地域や企業で活躍できる人材へ成長していくことを支援します。</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Members -->
  <section id="members" class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <p class="badge"><span class="dot" aria-hidden="true"></span> メンバー</p>
          <h2 class="section__title">全国の大学生が中心</h2>
          <p class="section__desc">
            多くがAIやプログラミングを学び始めたばかりの初学者。仲間と学び、先輩やメンターのサポートを受けながら、課題解決や開発に挑戦します。できることを少しずつ増やし、将来の選択肢を広げます。
          </p>
        </div>
      </div>

      <div class="members" role="list">
        {#each members as member (member.name)}
          <div class="member" role="listitem">
            <div class="avatar" aria-hidden="true">
              <img src={member.photo} alt={member.name} />
              <span class="avatar__fallback">{member.initials}</span>
            </div>
            <div class="member__meta">
              <h4>{member.name}</h4>
              <span>{member.specialty}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- Education -->
  <section id="education" class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <p class="badge"><span class="dot" aria-hidden="true"></span> 教育</p>
          <h2 class="section__title">初学者のための教育プログラム</h2>
          <p class="section__desc">
            Pythonの基礎からデータ分析、機械学習の入門、そして簡単なアプリ開発まで、段階的にステップアップ。学びながら小さな実務経験も積める「Learn to Earn」を導入しています。
          </p>
        </div>
      </div>

      <div class="cards">
        <article class="card">
          <h3>Pythonの基礎</h3>
          <p>手を動かしながら、文法・ライブラリ・データ処理の基礎を習得します。</p>
        </article>
        <article class="card">
          <h3>データ分析・機械学習入門</h3>
          <p>前処理から基本モデルまでを実践形式で学び、理解を深めます。</p>
        </article>
        <article class="card">
          <h3>かんたんアプリ開発</h3>
          <p>小さなプロダクトを作り、成果物として形に。Learn to Earnで座学だけで終わらない学習へ。</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Competitions -->
  <section id="competitions" class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <p class="badge"><span class="dot" aria-hidden="true"></span> コンペ</p>
          <h2 class="section__title">学んだ知識を実際に試す</h2>
          <p class="section__desc">
            初学者でも取り組めるKaggle入門コンペ「Titanic: Machine Learning from Disaster」などを活用し、実戦形式で力を伸ばします。
          </p>
        </div>
        <a class="btn btn--ghost" href="#contact">参加相談</a>
      </div>

      <div class="cards">
        <article class="card">
          <h3>最初の一歩</h3>
          <p>用意されたサンプルコードからスタートし、環境構築の不安を減らします。</p>
        </article>
        <article class="card">
          <h3>スコアアップの工夫</h3>
          <p>特徴量やモデルの改善を少しずつ加え、着実に精度を伸ばします。</p>
        </article>
        <article class="card">
          <h3>自然と身につく流れ</h3>
          <p>データ理解から評価まで、機械学習の一連の流れを体験的に学べます。</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Quests -->
  <section id="quests" class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <p class="badge"><span class="dot" aria-hidden="true"></span> クエスト</p>
          <h2 class="section__title">初学者でも挑戦できる開発タスク</h2>
          <p class="section__desc">
            簡単な機能開発から始め、少しずつレベルを上げながら、実際に使えるアプリやシステムを作っていきます。2WINSのエンジニアがフィードバックを行い、短期間で大きく成長できます。成果次第ではインターン参加や報酬のチャンスも。
          </p>
        </div>
        <a class="btn btn--ghost" href="#contact">クエスト一覧を受け取る</a>
      </div>

      <div class="cards">
        <article class="card">
          <h3>はじめの開発</h3>
          <p>小さな機能から着手し、成功体験を積みながら次の挑戦へ。</p>
        </article>
        <article class="card">
          <h3>丁寧なフィードバック</h3>
          <p>2WINSエンジニアがレビュー。改善点が明確になり成長が加速します。</p>
        </article>
        <article class="card">
          <h3>次のステップへ</h3>
          <p>成果に応じてインターンや報酬の機会も。実務につながる経験を獲得。</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="section">
    <div class="container">
      <div class="section__head">
        <div>
          <p class="badge"><span class="dot" aria-hidden="true"></span> お問い合わせ</p>
          <h2 class="section__title">Hello AIへのご連絡</h2>
          <p class="section__desc">
            Hello AIに関するご質問や、入会希望はお気軽にご連絡ください。<br />
            「AIを学びたいけど、何から始めればいいかわからない」という初学者の方も大歓迎です。あなたの第一歩を、私たちが全力でサポートします。
          </p>
        </div>
      </div>

      <form class="form" onsubmit={handleSubmit}>
        <div class="field">
          <label class="label" for="name">お名前</label>
          <input 
            class="input" 
            type="text" 
            id="name" 
            name="name" 
            placeholder="山田 太郎" 
            bind:value={form.name}
            required 
          />
        </div>
        <div class="field">
          <label class="label" for="email">メールアドレス</label>
          <input 
            class="input" 
            type="email" 
            id="email" 
            name="email" 
            placeholder="hello@example.com" 
            bind:value={form.email}
            required 
          />
        </div>
        <div class="field">
          <label class="label" for="message">ご用件</label>
          <textarea 
            class="textarea" 
            id="message" 
            name="message" 
            placeholder="入会について相談したいです。"
            bind:value={form.message}
          ></textarea>
        </div>
        <button class="btn btn--primary" type="submit">送信する</button>
      </form>
    </div>
  </section>
</main>

<footer>
  <div class="container footer__row">
    <p class="fine">© {currentYear} HELLO AI. All rights reserved.</p>
    <a class="fine" href="#home" aria-label="ページ上部へ戻る">トップへ戻る</a>
  </div>
</footer>

<style>
  :global(:root) {
    /* Color scheme */
    --bg: #000000;
    --fg: #ffffff;
    --accent: #d4af37; /* subtle gold for luxury */
    --muted: #a1a1a1;
    --border: #1a1a1a;

    /* Unified type scale */
    --fs-lg: 40px; /* 大 */
    --fs-md: 18px; /* 中 */
    --fs-sm: 14px; /* 小 */

    /* Layout */
    --container: 1200px;
    --radius: 12px;
    --gap: 20px;
  }

  /* Base reset (minimal) */
  :global(*, *::before, *::after) { box-sizing: border-box; }
  :global(html) { color-scheme: dark; scroll-behavior: smooth; }
  :global(body) {
    margin: 0;
    background: var(--bg);
    color: var(--fg);
    font-family: "Zen Kaku Gothic New", "Noto Sans JP", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: var(--fs-md);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  :global(img, svg) { display: block; max-width: 100%; height: auto; }
  :global(a) { color: var(--fg); text-decoration: none; }
  :global(a:hover) { color: var(--fg); }
  :global(button, input, textarea, select) { font: inherit; color: inherit; background: transparent; }
  :global(::selection) { background: var(--accent); color: #000; }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  .container {
    width: min(var(--container), 92%);
    margin-inline: auto;
  }

  /* Header / Nav */
  header {
    position: sticky; top: 0; z-index: 50;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(6px);
    border-bottom: 1px solid var(--border);
  }
  .nav {
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
  .brand {
    display: inline-flex; align-items: center; gap: 12px;
    font-weight: 700; letter-spacing: 0.06em;
  }
  .brand__mark {
    width: 20px; height: 20px; border-radius: 4px;
    background: var(--accent);
    box-shadow: 0 0 0 1px var(--border) inset;
  }
  .brand__name { font-size: var(--fs-md); }
  nav ul {
    list-style: none; margin: 0; padding: 0;
    display: flex; gap: 18px; align-items: center;
  }
  nav a {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 8px 10px; border-radius: 8px;
    border: 1px solid transparent;
    font-size: var(--fs-sm);
    opacity: 0.9;
    transition: border-color 160ms ease, opacity 160ms ease, background-color 160ms ease;
  }
  nav a:hover { border-color: var(--border); opacity: 1; }
  nav a[aria-current="page"] { border-color: var(--accent); }

  /* Hero */
  .hero {
    padding: 80px 0;
    border-bottom: 1px solid var(--border);
  }
  .hero__grid {
    display: grid;
    /* 最新情報 aside を削除したので 1 カラムに */
    grid-template-columns: 1fr;
    gap: 36px;
    align-items: center;
  }
  .eyebrow {
    display: inline-block;
    font-size: var(--fs-sm);
    color: var(--fg);
    letter-spacing: 0.08em;
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 999px;
    background: linear-gradient(180deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04));
  }
  :global(h1) {
    font-size: var(--fs-lg);
    line-height: 1.2;
    margin: 14px 0 16px;
    font-weight: 700;
  }
  .hero__lead {
    color: var(--muted);
    margin: 0 0 22px;
  }
  .cta {
    display: flex; gap: 12px; flex-wrap: wrap;
  }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 12px 18px; border-radius: 10px;
    border: 1px solid var(--border);
    font-size: var(--fs-sm);
    font-weight: 600; letter-spacing: 0.02em;
    transition: transform 120ms ease, background-color 160ms ease, border-color 160ms ease, color 160ms ease;
    cursor: pointer;
  }
  .btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .btn--primary {
    background: var(--accent);
    color: #000;
    border-color: var(--accent);
  }
  .btn--primary:hover { transform: translateY(-1px); }
  .btn--ghost:hover { background: #0a0a0a; border-color: var(--border); }

  /* Section Base */
  section.section {
    padding: 64px 0;
    border-bottom: 1px solid var(--border);
  }
  .section__head {
    display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 28px;
  }
  .section__title {
    font-size: var(--fs-md); margin: 0; font-weight: 700; letter-spacing: 0.04em;
  }
  .section__desc { color: var(--muted); font-size: var(--fs-sm); margin: 4px 0 0; }

  /* Cards */
  .cards {
    display: grid; gap: 16px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .card {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 18px;
    background: #060606;
    display: flex; flex-direction: column; gap: 8px;
  }
  .card h3 { font-size: var(--fs-md); margin: 0; font-weight: 700; }
  .card p { font-size: var(--fs-sm); color: var(--muted); margin: 0; }
  .badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: var(--fs-sm);
    color: var(--fg);
    border: 1px solid var(--border);
    border-radius: 999px;
    padding: 6px 10px;
    background: #0a0a0a;
  }
  .dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
    box-shadow: 0 0 0 1px #000 inset;
  }

  /* Members（丸く小さめの写真＋縦レイアウト） */
  .members {
    display: grid; gap: 16px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .member {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    background: #060606;
    padding: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    border: 2px solid var(--border);
    background: linear-gradient(180deg, var(--accent), #b38f2a);
  }
  .avatar img {
    width: 100%; height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
  .avatar__fallback {
    position: absolute; inset: 0;
    display: grid; place-items: center;
    font-size: var(--fs-md); font-weight: 700; color: #000;
    background: linear-gradient(180deg, var(--accent), #b38f2a);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 200ms ease;
  }
  .avatar img:not([src]),
  .avatar img[src=""],
  .avatar img:not([alt]) + .avatar__fallback {
    opacity: 1;
  }
  .member__meta {
    display: grid; gap: 4px;
    text-align: center;
  }
  .member h4 { margin: 4px 0 2px; font-size: var(--fs-sm); font-weight: 700; }
  .member span { color: var(--muted); font-size: var(--fs-sm); }

  /* Contact form */
  .form {
    display: grid; gap: 12px; max-width: 560px;
  }
  .field {
    display: grid; gap: 6px;
  }
  .label { font-size: var(--fs-sm); color: var(--fg); }
  .input, .textarea {
    width: 100%;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: #060606;
    color: var(--fg);
    padding: 12px 14px;
    font-size: var(--fs-sm);
    transition: border-color 160ms ease, background-color 160ms ease;
  }
  .input:focus, .textarea:focus {
    outline: none; border-color: var(--accent); background: #0a0a0a;
  }
  .textarea { min-height: 140px; resize: vertical; }

  /* Footer */
  footer {
    padding: 28px 0;
  }
  .footer__row {
    display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: space-between;
    border-top: 1px solid var(--border); padding-top: 20px;
  }
  .fine { color: var(--muted); font-size: var(--fs-sm); }

  /* Responsive */
  @media (max-width: 960px) {
    .hero__grid { grid-template-columns: 1fr; }
    .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .members { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 640px) {
    .nav { height: auto; padding: 12px 0; gap: 12px; flex-direction: column; align-items: stretch; }
    nav ul { flex-wrap: wrap; justify-content: center; }
    .cards { grid-template-columns: 1fr; }
    .members { grid-template-columns: 1fr; }
    :root { --fs-lg: 32px; } /* 小画面で見出し少し小さく */
  }
</style>
