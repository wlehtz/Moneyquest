// ===== CONSTANTES =====
const LEVELS = [
  { name:'Bronze I',   min:0     },
  { name:'Bronze II',  min:150   },
  { name:'Bronze III', min:350   },
  { name:'Prata I',    min:600   },
  { name:'Prata II',   min:1000  },
  { name:'Prata III',  min:1500  },
  { name:'Ouro I',     min:2200  },
  { name:'Ouro II',    min:3000  },
  { name:'Ouro III',   min:4000  },
  { name:'Platina',    min:5500  },
  { name:'Diamante',   min:8000  },
  { name:'Lendário',   min:12000 },
];

const CAT_LABEL = {
  salario:'Salário', bico:'Bico / Freela', beneficio:'Benefício',
  'outros-entrada':'Outros ganhos', moradia:'Moradia / Aluguel',
  alimentacao:'Alimentação', transporte:'Transporte', saude:'Saúde / Remédio',
  educacao:'Educação', contas:'Contas (luz, água, gás)', telefone:'Telefone / Internet',
  vestuario:'Roupas', divida:'Dívida / Parcela', outros:'Outros gastos',
  deposit:'Entrada', withdraw:'Saída',
};

const CAT_ICON = {
  salario:'💼', bico:'🔧', beneficio:'🤝', 'outros-entrada':'💰',
  moradia:'🏠', alimentacao:'🛒', transporte:'🚌', saude:'💊',
  educacao:'📚', contas:'💡', telefone:'📱', vestuario:'👟',
  divida:'📄', outros:'📌', deposit:'⬆️', withdraw:'⬇️',
};

const GOAL_ICON = {
  divida:'💳', emergencia:'🛡️', compra:'🛍️', educacao:'📚', viagem:'✈️', outro:'🎯',
};

const GOAL_LABEL = {
  divida:'Zerar dívida', emergencia:'Fundo emergência', compra:'Compra', educacao:'Educação', viagem:'Viagem', outro:'Outro',
};

const VIDEOS = [
  { id:1, title:'Construindo um orçamento com R$0', instructor:'Finance Tip', category:'orcamento', difficulty:'iniciante', durationMinutes:13, youtubeId:'dQw4w9WgXcQ', xpReward:80, description:'Passo a passo para criar orçamento pessoal e manter controle.' },
  { id:2, title:'Economizando sem sofrer', instructor:'Smart Money', category:'orcamento', difficulty:'iniciante', durationMinutes:14, youtubeId:'9bZkp7q19f0', xpReward:60, description:'Técnicas fáceis de cortar despesas e poupar mês a mês.' },
  { id:3, title:'Fundo de emergência de verdade', instructor:'EducaFin', category:'orcamento', difficulty:'iniciante', durationMinutes:12, youtubeId:'3JZ_D3ELwOQ', xpReward:60, description:'Como montar fundo de emergência em 3 etapas simples.' },
  { id:4, title:'Negociando contas e dívidas', instructor:'Papo Financeiro', category:'divida', difficulty:'iniciante', durationMinutes:10, youtubeId:'fJ9rUzIMcZQ', xpReward:50, description:'Como renegociar dívidas com banco e sair do vermelho.' },
  { id:5, title:'Ideias de renda extra em 2026', instructor:'Renda Hoje', category:'renda', difficulty:'iniciante', durationMinutes:20, youtubeId:'LXb3EKWsInQ', xpReward:70, description:'Rendas paralelas que cabem em qualquer rotina.' },
  { id:6, title:'Supermercado inteligente', instructor:'Compras Inteligentes', category:'orcamento', difficulty:'iniciante', durationMinutes:15, youtubeId:'2Vv-BfVoq4g', xpReward:55, description:'Melhores práticas para gastar menos e comer bem.' },
];

const ACHIEVEMENTS_BASE = [
  { id:1, title:'Primeira Entrada', description:'Registrou sua primeira entrada de dinheiro', icon:'💳', category:'milestone', rarity:'common', xpReward:50, check: d => d.transactions.some(t=>t.type==='deposit') },
  { id:2, title:'Controlado', description:'Registrou pelo menos 5 transações', icon:'📊', category:'milestone', rarity:'common', xpReward:80, check: d => d.transactions.length >= 5 },
  { id:3, title:'Poupador', description:'Criou seu primeiro cofrinho', icon:'🐷', category:'savings', rarity:'common', xpReward:100, check: d => d.cofrinhos.length >= 1 },
  { id:4, title:'Foco', description:'Criou uma meta financeira', icon:'🎯', category:'milestone', rarity:'common', xpReward:80, check: d => d.goals.length >= 1 },
  { id:5, title:'Estudioso', description:'Assistiu seu primeiro vídeo educativo', icon:'📚', category:'milestone', rarity:'rare', xpReward:120, check: d => d.watchedVideos.length >= 1 },
  { id:6, title:'Disciplinado', description:'Registrou transações por 3 dias seguidos', icon:'🔥', category:'streak', rarity:'rare', xpReward:200, check: d => d.streakDays >= 3 },
  { id:7, title:'Meta Batida!', description:'Completou uma meta financeira', icon:'🏆', category:'savings', rarity:'epic', xpReward:300, check: d => d.goals.some(g=>g.completed) },
  { id:8, title:'Cofrinho Cheio', description:'Encheu um cofrinho completamente', icon:'🐷', category:'savings', rarity:'epic', xpReward:250, check: d => d.cofrinhos.some(c=>c.guardado>=c.meta) },
  { id:9, title:'Sem Dívidas', description:'Zerou uma dívida', icon:'✅', category:'milestone', rarity:'epic', xpReward:400, check: d => d.goals.some(g=>g.category==='divida'&&g.completed) },
  { id:10, title:'Mestre do Dinheiro', description:'Chegou ao nível Ouro', icon:'⭐', category:'milestone', rarity:'legendary', xpReward:500, check: d => d.user.xp >= 2200 },
];

const MISSIONS_BASE = [
  { id:1, title:'Registrar uma transação', description:'Anote qualquer entrada ou saída de hoje', type:'transaction', xpReward:30, targetValue:1, icon:'💳' },
  { id:2, title:'Guardar no cofrinho', description:'Adicione qualquer valor ao cofrinho', type:'cofrinho', xpReward:40, targetValue:1, icon:'🐷' },
  { id:3, title:'Verificar o saldo', description:'Veja o dashboard e confira sua situação', type:'login', xpReward:20, targetValue:1, icon:'👀' },
  { id:4, title:'Adicionar progresso em meta', description:'Avance em uma das suas metas', type:'goal', xpReward:50, targetValue:1, icon:'🎯' },
  { id:5, title:'Assistir um vídeo educativo', description:'Veja qualquer vídeo da seção de educação', type:'video', xpReward:60, targetValue:1, icon:'📺' },
];

// ===== DADOS INICIAIS =====
function seedData() {
  const hoje = new Date();
  const mesAtual = hoje.getMonth();
  const anoAtual = hoje.getFullYear();

  function d(diasAtras) {
    const dt = new Date(hoje);
    dt.setDate(dt.getDate() - diasAtras);
    return dt.toISOString();
  }

  return {
    user: {
      name: 'João Silva',
      xp: 80,
      createdAt: d(15),
    },
    transactions: [
      { id:'t1', type:'deposit', amount:1412.00, description:'Salário de março', category:'salario', xpEarned:50, createdAt:d(14) },
      { id:'t2', type:'withdraw', amount:600.00, description:'Aluguel', category:'moradia', xpEarned:10, createdAt:d(13) },
      { id:'t3', type:'withdraw', amount:87.40, description:'Conta de luz', category:'contas', xpEarned:10, createdAt:d(12) },
      { id:'t4', type:'withdraw', amount:49.90, description:'Conta de água', category:'contas', xpEarned:10, createdAt:d(11) },
      { id:'t5', type:'withdraw', amount:79.90, description:'Internet + celular', category:'telefone', xpEarned:10, createdAt:d(10) },
      { id:'t6', type:'withdraw', amount:296.00, description:'Mercado do mês', category:'alimentacao', xpEarned:10, createdAt:d(9) },
      { id:'t7', type:'withdraw', amount:148.00, description:'Vale transporte', category:'transporte', xpEarned:10, createdAt:d(8) },
      { id:'t8', type:'withdraw', amount:130.00, description:'Parcela do empréstimo', category:'divida', xpEarned:10, createdAt:d(7) },
      { id:'t9', type:'deposit', amount:120.00, description:'Bico: entrega de fim de semana', category:'bico', xpEarned:30, createdAt:d(5) },
      { id:'t10', type:'withdraw', amount:38.50, description:'Remédio para pressão', category:'saude', xpEarned:10, createdAt:d(3) },
      { id:'t11', type:'withdraw', amount:25.00, description:'Lanche fora de casa', category:'alimentacao', xpEarned:10, createdAt:d(1) },
    ],
    cofrinhos: [
      { id:'c1', nome:'Fundo de emergência 🛡️', meta:500.00, guardado:45.00, criadoEm:d(14) },
      { id:'c2', nome:'Quitar empréstimo 💳', meta:1300.00, guardado:260.00, criadoEm:d(10) },
    ],
    goals: [
      { id:'g1', title:'Zerar dívida do banco', description:'', category:'divida', targetAmount:1300, currentAmount:260, deadline:new Date(anoAtual, mesAtual+5, 1).toISOString(), xpReward:300, completed:false, createdAt:d(10) },
      { id:'g2', title:'Montar fundo de emergência', description:'', category:'emergencia', targetAmount:1412, currentAmount:45, deadline:new Date(anoAtual+1, 0, 1).toISOString(), xpReward:400, completed:false, createdAt:d(14) },
    ],
    watchedVideos: [],
    streakDays: 1,
    lastActive: d(0),
    missionsDate: '',
    missions: [],
    achievements: [],
    videos: [...VIDEOS],
  };
}

// ===== STATE =====
let D = null;
try { D = JSON.parse(localStorage.getItem('mq_data') || 'null'); } catch (e) { D = null; }
if (!D) { D = seedData(); save(); }

let S = { videoFilter:'all', currentVideoId:null, selectedGoalId:null, selectedCofrinhoId:null };

function save() { localStorage.setItem('mq_data', JSON.stringify(D)); }

function mergeVideosFromDB(dbVideos) {
  if (!Array.isArray(dbVideos) || !dbVideos.length) return;
  D.videos = dbVideos.map(raw => {
    const canonical = VIDEOS.find(v => v.id === raw.id) || {};
    return { ...canonical, ...raw };
  });
  save();
}

function refreshVideosFromServer() {
  fetch('/api/db')
    .then(res => { if (!res.ok) throw new Error('Falha ao buscar vídeos'); return res.json(); })
    .then(json => {
      if (json && Array.isArray(json.videos) && json.videos.length > 0) {
        mergeVideosFromDB(json.videos);
      }
    })
    .catch(err => {
      console.warn('Não foi possível sincronizar videos do servidor:', err);
    });
}

function getVideosList() {
  if (Array.isArray(D.videos) && D.videos.length) return D.videos;
  return [...VIDEOS];
}

function setAppVisible(visible) {
  document.getElementById('mainApp').style.display = visible ? 'flex' : 'none';
  document.getElementById('loginScreen').style.display = visible ? 'none' : 'flex';
}

function loadRememberMe() {
  const remember = localStorage.getItem('mq_rememberMe');
  if (!remember) return;
  try {
    const data = JSON.parse(remember);
    if (data.email) document.getElementById('loginEmail').value = data.email;
    if (data.password) document.getElementById('loginPassword').value = data.password;
    document.getElementById('rememberMe').checked = !!data.remember;
  } catch (e) {
    console.warn('Falha ao carregar remember-me', e);
  }
}

function saveRememberMe(email, password, remember) {
  if (remember) {
    localStorage.setItem('mq_rememberMe', JSON.stringify({ email, password, remember: true }));
  } else {
    localStorage.removeItem('mq_rememberMe');
  }
}

function togglePassword() {
  const input = document.getElementById('loginPassword');
  const btn = document.querySelector('.show-password-btn');
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? '👁' : '🙈';
}

function forgotPassword(evt) {
  if (evt && evt.preventDefault) evt.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const msgEl = document.getElementById('loginMsg');
  if (!email) {
    msgEl.textContent = 'Informe seu email para recuperar a senha.';
    return;
  }
  msgEl.textContent = 'Link de recuperação enviado para ' + email + ' (simulado).';
}

function attemptLogin() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const remember = document.getElementById('rememberMe').checked;
  const msgEl = document.getElementById('loginMsg');

  if (!email || !password) {
    msgEl.textContent = 'Preencha email e senha.';
    return;
  }

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  .then(r => {
    if (!r.ok) throw new Error('Credenciais inválidas');
    return r.json();
  })
  .then(user => {
    msgEl.textContent = '';
    localStorage.setItem('mq_loggedUser', JSON.stringify({ email: user.email, name: user.name }));
    saveRememberMe(email, password, remember);
    D.user.name = user.name;
    setAppVisible(true);
    initializeAppAfterLogin();
  })
  .catch(fetchErr => {
    // Fallback local (sem backend) - chave provisória
    const localUsers = [
      { email: 'user@moneyquest.com', password: '123456', name: 'João Silva' },
      { email: 'demo@moneyquest.com', password: 'dem0', name: 'Usuário Demo' }
    ];
    const user = localUsers.find(u => u.email === email && u.password === password);
    if (user) {
      msgEl.textContent = 'Login feito em modo local (sem servidor).';
      localStorage.setItem('mq_loggedUser', JSON.stringify({ email: user.email, name: user.name }));
      saveRememberMe(email, password, remember);
      D.user.name = user.name;
      setAppVisible(true);
      initializeAppAfterLogin();
      return;
    }

    msgEl.textContent = (fetchErr && fetchErr.message) ? fetchErr.message : 'Falha ao logar';
  });
}

function checkLoginStatus() {
  const user = localStorage.getItem('mq_loggedUser');
  loadRememberMe();
  if (!user) {
    setAppVisible(false);
    return false;
  }
  const parsed = JSON.parse(user);
  if (parsed && parsed.name) {
    D.user.name = parsed.name;
    setAppVisible(true);
    return true;
  }
  setAppVisible(false);
  return false;
}

function logout() {
  localStorage.removeItem('mq_loggedUser');
  setAppVisible(false);
  document.getElementById('loginEmail').value = '';
  document.getElementById('loginPassword').value = '';
  initializeAppAfterLogin(true);
}

function initializeAppAfterLogin(force) {
  if (!force && !checkLoginStatus()) return;
  refreshVideosFromServer();
  refreshUser();
  checkAchievements();
  loadDash();
  loadProfile();
  completeMission('login');
  const d6 = new Date(); d6.setMonth(d6.getMonth()+6);
  document.getElementById('gDeadline').value = d6.toISOString().split('T')[0];
}

// ===== HELPERS =====
const $R = n => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n||0);
const $N = n => new Intl.NumberFormat('pt-BR').format(n||0);
const $D = s => new Date(s).toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'});
const $DS = s => { if(!s) return '—'; const d = s.includes('T') ? new Date(s) : new Date(s+'T12:00:00'); return isNaN(d) ? '—' : d.toLocaleDateString('pt-BR'); };

function getLevel(xp) {
  let lv = LEVELS[0];
  for (const l of LEVELS) { if (xp >= l.min) lv = l; }
  const idx = LEVELS.indexOf(lv);
  const next = LEVELS[idx+1];
  const progress = next ? Math.round(((xp - lv.min)/(next.min - lv.min))*100) : 100;
  const toNext = next ? next.min - xp : 0;
  return { name:lv.name, level:idx+1, progress, toNext };
}

function getBalance() {
  return D.transactions.reduce((s,t) => t.type==='deposit' ? s+t.amount : s-t.amount, 0);
}

function addXP(amount) {
  D.user.xp += amount;
  save();
  refreshUser();
}

function toast(msg, type='info') {
  const el = document.createElement('div');
  el.className = 'toast '+type;
  const icons = {success:'✓', error:'✗', info:'⚡'};
  el.innerHTML = `<div class="toast-icon">${icons[type]||'ℹ'}</div><div class="toast-msg">${msg}</div>`;
  document.getElementById('toasts').appendChild(el);
  setTimeout(()=>el.remove(), 4000);
}

// ===== NAV =====
const PAGES = ['dashboard','transactions','cofrinho','goals','missions','videos','achievements','rewards','leaderboard','profile'];
const PAGE_LABELS = { dashboard:'Dashboard', transactions:'Transações', cofrinho:'🐷 Cofrinho', goals:'Metas', missions:'Missões Diárias', videos:'Vídeos Educativos', achievements:'Conquistas', rewards:'🎁 Recompensas', leaderboard:'🏆 Ranking Global', profile:'Perfil' };

function navigate(page) {
  PAGES.forEach(p => {
    const sec = document.getElementById('sec-'+p);
    if (sec) sec.classList.toggle('active', p===page);
    const nav = document.querySelector(`[data-page="${p}"]`);
    if (nav) nav.classList.toggle('active', p===page);
  });
  document.getElementById('tbPage').textContent = PAGE_LABELS[page] || page;

  // Fechar sidebar mobile
  if (window.innerWidth <= 680) {
    document.getElementById('sidebar').classList.remove('open');
  }

  const loaders = { dashboard:loadDash, transactions:loadTx, cofrinho:loadCofrinho, goals:loadGoals, missions:loadMiss, videos:loadVideos, achievements:loadAch, rewards:loadRew, leaderboard:loadLB, profile:loadProfile };
  if (loaders[page]) loaders[page]();
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ===== USER =====
function refreshUser() {
  const lv = getLevel(D.user.xp);
  const initials = D.user.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  document.getElementById('sbAvatar').textContent = initials;
  document.getElementById('sbName').textContent = D.user.name;
  document.getElementById('sbLevel').textContent = `${lv.name} · Nível ${lv.level}`;
  document.getElementById('sbXP').textContent = $N(D.user.xp)+' XP';
  document.getElementById('sbXPNext').textContent = lv.toNext > 0 ? '→ '+$N(D.user.xp+lv.toNext) : 'Nível máximo!';
  document.getElementById('sbXPBar').style.width = lv.progress+'%';
  document.getElementById('tbXP').textContent = $N(D.user.xp);
  document.getElementById('tbLevel').textContent = lv.name+' · Nível '+lv.level;
}

// ===== DASHBOARD =====
function loadDash() {
  const bal = getBalance();
  const lv = getLevel(D.user.xp);
  const entradas = D.transactions.filter(t=>t.type==='deposit').reduce((s,t)=>s+t.amount,0);
  const saidas   = D.transactions.filter(t=>t.type==='withdraw').reduce((s,t)=>s+t.amount,0);

  const recent = [...D.transactions].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,5);
  const activeGoals = D.goals.filter(g=>!g.completed).slice(0,3).map(g => ({
    ...g,
    progressPercent: Math.min(100, Math.round((g.currentAmount/g.targetAmount)*100))
  }));

  const todayStr = new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  document.getElementById('dashDate').textContent = todayStr.charAt(0).toUpperCase()+todayStr.slice(1)+'.';
  document.getElementById('dashHi').textContent = D.user.name.split(' ')[0]+'!';

  const totalGuardado = D.cofrinhos.reduce((s,c)=>s+c.guardado, 0);
  const missoesConcluidas = (D.missions||[]).filter(m=>m.completed).length;
  const missoesTotal = MISSIONS_BASE.length;

  document.getElementById('dashContent').innerHTML = `
    <div class="g4">
      <div class="stat-card" style="--accent-color:var(--green2)">
        <div class="stat-card-icon" style="background:var(--g2-glow)">💰</div>
        <div class="stat-card-label">Saldo Atual</div>
        <div class="stat-card-value" style="color:${bal>=0?'var(--green2)':'var(--red2)'}">${$R(bal)}</div>
        <div class="stat-card-sub">Entradas: ${$R(entradas)}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--red2)">
        <div class="stat-card-icon" style="background:var(--r-glow)">📉</div>
        <div class="stat-card-label">Total de Saídas</div>
        <div class="stat-card-value" style="color:var(--red2)">${$R(saidas)}</div>
        <div class="stat-card-sub">${D.transactions.filter(t=>t.type==='withdraw').length} lançamentos</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--pig2)">
        <div class="stat-card-icon" style="background:var(--pig-glow)">🐷</div>
        <div class="stat-card-label">No Cofrinho</div>
        <div class="stat-card-value" style="color:var(--pig2)">${$R(totalGuardado)}</div>
        <div class="stat-card-sub">${D.cofrinhos.length} cofrinhos ativos</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--gold2)">
        <div class="stat-card-icon" style="background:var(--g-glow)">⚡</div>
        <div class="stat-card-label">Missões Hoje</div>
        <div class="stat-card-value" style="font-size:24px">${missoesConcluidas}<span style="font-size:14px;color:var(--text3);font-weight:500"> / ${missoesTotal}</span></div>
        <div class="stat-card-sub">${D.user.xp} XP acumulado</div>
      </div>
    </div>

    <div class="g21">
      <div>
        <div class="sec-title">Últimas movimentações <span class="sec-title-count">${recent.length} registros</span></div>
        <div class="card" style="padding:0 18px">
          ${recent.length===0 ? '<div class="empty"><div class="empty-icon">📭</div><h4>Nenhuma movimentação</h4></div>' :
            recent.map(tx=>`
              <div class="tx-row">
                <div class="tx-icon" style="background:${tx.type==='deposit'?'var(--g2-glow)':'var(--r-glow)'}">
                  ${CAT_ICON[tx.category]||'📌'}
                </div>
                <div class="tx-info">
                  <div class="tx-desc">${tx.description||CAT_LABEL[tx.category]||tx.category}</div>
                  <div class="tx-date">${CAT_LABEL[tx.category]||''} · ${$D(tx.createdAt)}</div>
                </div>
                <div class="tx-right">
                  <div class="tx-amount" style="color:${tx.type==='deposit'?'var(--green2)':'var(--red2)'}">
                    ${tx.type==='deposit'?'+':'−'}${$R(tx.amount)}
                  </div>
                  ${tx.xpEarned>0?`<div class="tx-xp">⚡ +${tx.xpEarned}</div>`:''}
                </div>
              </div>
            `).join('')}
        </div>
      </div>
      <div>
        <div class="sec-title">Metas em andamento <span class="sec-title-count">${activeGoals.length}</span></div>
        <div class="card" style="padding:0 18px">
          ${activeGoals.length===0 ? `<div class="empty" style="padding:24px 0"><div class="empty-icon">🎯</div><h4>Nenhuma meta ainda</h4><p><a href="#" onclick="navigate('goals')" style="color:var(--purple3)">Criar uma meta</a></p></div>` :
            activeGoals.map(g=>`
              <div class="goal-row">
                <div class="goal-header-row">
                  <div>
                    <div class="goal-name">${GOAL_ICON[g.category]||'🎯'} ${g.title}</div>
                    <div class="goal-meta">${GOAL_LABEL[g.category]||g.category} · ${$DS(g.deadline)}</div>
                  </div>
                  <div class="goal-pct">${g.progressPercent}%</div>
                </div>
                <div class="prog" style="height:5px"><div class="prog-fill" style="width:${g.progressPercent}%"></div></div>
                <div class="goal-amounts">
                  <span>${$R(g.currentAmount)}</span>
                  <span style="color:var(--gold2)">⚡ ${g.xpReward} XP</span>
                  <span>${$R(g.targetAmount)}</span>
                </div>
              </div>
            `).join('')}
        </div>
        <div class="sec-title" style="margin-top:18px">Situação financeira</div>
        <div class="card">
          <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px">
            <span style="color:var(--text2)">Meu nível</span>
            <span style="font-weight:700;color:var(--purple3)">${lv.name} · Nível ${lv.level}</span>
          </div>
          <div class="prog" style="height:6px;margin-bottom:5px"><div class="prog-fill" style="width:${lv.progress}%"></div></div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text3)">
            <span>${$N(D.user.xp)} XP</span>
            <span>${lv.toNext>0?'Faltam '+$N(lv.toNext)+' XP':'Nível máximo!'}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ===== TRANSACTIONS =====
function loadTx() {
  const txs = [...D.transactions].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  document.getElementById('txContent').innerHTML = `
    <div class="card" style="padding:0 18px">
      ${txs.length===0 ? '<div class="empty"><div class="empty-icon">📭</div><h4>Nenhuma transação ainda</h4><p>Clique em "+ Nova Transação" para começar</p></div>' : `
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Tipo</th><th>Descrição</th><th>Categoria</th><th>Data</th>
              <th style="text-align:right">Valor</th><th style="text-align:right">XP</th><th></th>
            </tr></thead>
            <tbody>
              ${txs.map(tx=>`<tr>
                <td><span class="badge ${tx.type==='deposit'?'b-green':'b-red'}">${tx.type==='deposit'?'Entrada':'Saída'}</span></td>
                <td style="color:var(--text);font-weight:600">${tx.description||'—'}</td>
                <td style="color:var(--text2)">${CAT_LABEL[tx.category]||tx.category||'—'}</td>
                <td style="color:var(--text3)">${$D(tx.createdAt)}</td>
                <td style="text-align:right;font-weight:800;color:${tx.type==='deposit'?'var(--green2)':'var(--red2)'}">
                  ${tx.type==='deposit'?'+':'−'}${$R(tx.amount)}
                </td>
                <td style="text-align:right;font-weight:700;color:var(--gold2)">${tx.xpEarned>0?'+'+tx.xpEarned+' ⚡':'—'}</td>
                <td><button style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:14px" onclick="deleteTx('${tx.id}')" title="Remover">✕</button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

function deleteTx(id) {
  D.transactions = D.transactions.filter(t=>t.id!==id);
  save();
  loadTx();
  loadDash();
}

function submitTx() {
  const type = document.getElementById('txType').value;
  const amount = parseFloat(document.getElementById('txAmt').value);
  const description = document.getElementById('txDesc').value.trim();
  const category = document.getElementById('txCat').value;
  if (!amount || amount<=0 || !description) { toast('Preencha todos os campos','error'); return; }
  const xp = type==='deposit' ? 30 : 10;
  D.transactions.push({ id:'t'+Date.now(), type, amount, description, category, xpEarned:xp, createdAt:new Date().toISOString() });
  addXP(xp);
  D.streakDays = Math.min((D.streakDays||0)+1, 99);
  completeMission('transaction');
  save();
  toast(type==='deposit' ? `Entrada de ${$R(amount)} registrada! +${xp} XP 🎉` : `Saída de ${$R(amount)} registrada`, 'success');
  closeModal('txModal');
  document.getElementById('txAmt').value=''; document.getElementById('txDesc').value='';
  loadTx();
}

// ===== COFRINHO =====
const COFRINHO_EMOJIS = ['🐷','🐷','🐷','🐷','🐷'];

function loadCofrinho() {
  const cs = D.cofrinhos;
  const totalGuardado = cs.reduce((s,c)=>s+c.guardado, 0);
  const totalMeta = cs.reduce((s,c)=>s+c.meta, 0);
  const completos = cs.filter(c=>c.guardado>=c.meta).length;

  document.getElementById('cofrinhoContent').innerHTML = `
    <div class="g3 mb24">
      <div class="stat-card" style="--accent-color:var(--pig2)">
        <div class="stat-card-label">Total guardado</div>
        <div class="stat-card-value" style="color:var(--pig2)">${$R(totalGuardado)}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--purple2)">
        <div class="stat-card-label">Falta guardar</div>
        <div class="stat-card-value">${$R(Math.max(0, totalMeta-totalGuardado))}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--green2)">
        <div class="stat-card-label">Cofrinhos cheios</div>
        <div class="stat-card-value" style="color:var(--green2)">${completos} <span style="font-size:14px;color:var(--text3);font-weight:500">/ ${cs.length}</span></div>
      </div>
    </div>

    ${cs.length===0 ? `<div class="card empty"><div class="empty-icon">🐷</div><h4>Nenhum cofrinho criado</h4><p>Clique em "+ Novo Cofrinho" para começar a guardar dinheiro aos poucos.</p></div>` : `
      <div class="cofrinho-grid">
        ${cs.map(c=>{
          const pct = Math.min(100, Math.round((c.guardado/c.meta)*100));
          const cheio = c.guardado >= c.meta;
          return `
            <div class="cofrinho-card">
              <span class="cofrinho-emoji">🐷</span>
              <div class="cofrinho-nome">${c.nome}</div>
              <div class="cofrinho-valores">
                <span class="cofrinho-atual">${$R(c.guardado)}</span>
                <span class="cofrinho-meta-txt">meta: ${$R(c.meta)}</span>
              </div>
              <div class="prog" style="margin-bottom:6px"><div class="prog-fill prog-fill-pig" style="width:${pct}%"></div></div>
              <div class="cofrinho-pct">${pct}% guardado ${cheio?'· ✅ Meta atingida!':''}</div>
              <div class="cofrinho-acoes">
                ${!cheio ? `<button class="btn-pig" onclick="abrirDeposito('${c.id}','${c.nome.replace(/'/g,"\\'")}')">+ Guardar</button>` : '<span class="badge b-green">Meta atingida! 🎉</span>'}
                <button class="btn btn-ghost btn-sm" onclick="deleteCofrinho('${c.id}')">Remover</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

function abrirDeposito(id, nome) {
  S.selectedCofrinhoId = id;
  document.getElementById('cofDepNome').textContent = '🐷 '+nome;
  document.getElementById('cofDepVal').value = '';
  openModal('cofDepModal');
}

function submitDeposito() {
  const valor = parseFloat(document.getElementById('cofDepVal').value);
  if (!valor || valor<=0 || !S.selectedCofrinhoId) { toast('Informe um valor válido','error'); return; }
  const c = D.cofrinhos.find(x=>x.id===S.selectedCofrinhoId);
  if (!c) return;
  c.guardado = Math.min(c.meta, c.guardado+valor);
  addXP(20);
  completeMission('cofrinho');
  save();
  const cheio = c.guardado >= c.meta;
  toast(cheio ? `🎉 Cofrinho cheio! +20 XP` : `${$R(valor)} guardado no cofrinho! +20 XP`, 'success');
  if (cheio) checkAchievements();
  closeModal('cofDepModal');
  loadCofrinho();
}

function deleteCofrinho(id) {
  D.cofrinhos = D.cofrinhos.filter(c=>c.id!==id);
  save();
  loadCofrinho();
}

function submitCofrinho() {
  const nome = document.getElementById('cofNome').value.trim();
  const meta = parseFloat(document.getElementById('cofMeta').value);
  const guardado = parseFloat(document.getElementById('cofGuardado').value)||0;
  if (!nome || !meta || meta<=0) { toast('Preencha o nome e o valor da meta','error'); return; }
  D.cofrinhos.push({ id:'c'+Date.now(), nome, meta, guardado, criadoEm:new Date().toISOString() });
  addXP(50);
  completeMission('cofrinho');
  checkAchievements();
  save();
  toast('Cofrinho criado! +50 XP 🐷', 'success');
  closeModal('cofrinhoModal');
  document.getElementById('cofNome').value=''; document.getElementById('cofMeta').value=''; document.getElementById('cofGuardado').value='0';
  loadCofrinho();
}

// ===== GOALS =====
function loadGoals() {
  const gs = D.goals;
  const done = gs.filter(g=>g.completed).length;
  document.getElementById('goalsContent').innerHTML = `
    <div class="g3 mb24">
      <div class="stat-card" style="--accent-color:var(--purple2)">
        <div class="stat-card-label">Metas ativas</div>
        <div class="stat-card-value">${gs.filter(g=>!g.completed).length}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--green2)">
        <div class="stat-card-label">Concluídas</div>
        <div class="stat-card-value" style="color:var(--green2)">${done}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--gold2)">
        <div class="stat-card-label">XP disponível</div>
        <div class="stat-card-value" style="color:var(--gold2)">${$N(gs.filter(g=>!g.completed).reduce((s,g)=>s+g.xpReward,0))}</div>
      </div>
    </div>
    <div class="g2">
      ${gs.length===0 ? '<div class="card empty"><div class="empty-icon">🎯</div><h4>Nenhuma meta ainda</h4><p>Crie uma meta para se manter motivado!</p></div>' :
        gs.map(g=>{
          const pct = Math.min(100, Math.round((g.currentAmount/g.targetAmount)*100));
          return `
            <div class="card">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
                <div>
                  <div style="font-size:15px;font-weight:800;color:var(--text)">${GOAL_ICON[g.category]||'🎯'} ${g.title}</div>
                  <div style="font-size:11px;color:var(--text2);margin-top:3px">${GOAL_LABEL[g.category]||g.category} · Prazo: ${$DS(g.deadline)}</div>
                </div>
                ${g.completed ? '<span class="badge b-green">✓ Concluída</span>' : `<span class="badge b-gold">⚡ ${g.xpReward} XP</span>`}
              </div>
              <div class="prog" style="height:7px;margin-bottom:7px">
                <div class="${g.completed?'prog-fill prog-fill-green':'prog-fill'}" style="width:${pct}%"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text2);margin-bottom:10px">
                <span>${$R(g.currentAmount)}</span>
                <span style="font-weight:700;color:var(--purple3)">${pct}%</span>
                <span>${$R(g.targetAmount)}</span>
              </div>
              ${!g.completed?`<button class="btn btn-ghost btn-sm" style="width:100%" onclick="openGP('${g.id}','${g.title.replace(/'/g,"\\'")}')">+ Adicionar progresso</button>`:''}
            </div>
          `;
        }).join('')}
    </div>
  `;
}

function openGP(id, title) {
  S.selectedGoalId = id;
  document.getElementById('gpDesc').textContent = `Meta: "${title}"`;
  document.getElementById('gpAmt').value = '';
  openModal('gpModal');
}

function submitGP() {
  const amount = parseFloat(document.getElementById('gpAmt').value);
  if (!amount || amount<=0 || !S.selectedGoalId) { toast('Informe um valor','error'); return; }
  const g = D.goals.find(x=>x.id===S.selectedGoalId);
  if (!g) return;
  g.currentAmount = Math.min(g.targetAmount, g.currentAmount+amount);
  if (g.currentAmount >= g.targetAmount && !g.completed) {
    g.completed = true;
    addXP(g.xpReward);
    toast(`🎉 Meta concluída! +${g.xpReward} XP ganhos!`, 'success');
    checkAchievements();
  } else {
    addXP(15);
    completeMission('goal');
    toast(`Progresso adicionado: ${$R(amount)} +15 XP`, 'success');
  }
  save();
  closeModal('gpModal');
  document.getElementById('gpAmt').value='';
  loadGoals();
}

function submitGoal() {
  const title = document.getElementById('gTitle').value.trim();
  const category = document.getElementById('gCat').value;
  const targetAmount = parseFloat(document.getElementById('gTarget').value);
  const deadline = document.getElementById('gDeadline').value;
  if (!title || !targetAmount || !deadline) { toast('Preencha todos os campos','error'); return; }
  D.goals.push({ id:'g'+Date.now(), title, description:'', category, targetAmount, currentAmount:0, deadline:new Date(deadline).toISOString(), xpReward:200, completed:false, createdAt:new Date().toISOString() });
  addXP(30);
  checkAchievements();
  save();
  toast('Meta criada! +30 XP 🎯', 'success');
  closeModal('goalModal');
  document.getElementById('gTitle').value=''; document.getElementById('gTarget').value=''; document.getElementById('gDeadline').value='';
  loadGoals();
}

// ===== MISSIONS =====
function getTodayMissions() {
  const today = new Date().toDateString();
  if (D.missionsDate !== today) {
    D.missionsDate = today;
    D.missions = MISSIONS_BASE.map(m => ({ ...m, completed:false, currentValue:0 }));
    save();
  }
  return D.missions;
}

function completeMission(type) {
  const ms = getTodayMissions();
  const m = ms.find(x=>x.type===type && !x.completed);
  if (m) {
    m.currentValue++;
    if (m.currentValue >= m.targetValue) {
      m.completed = true;
      addXP(m.xpReward);
      toast(`Missão concluída: "${m.title}" +${m.xpReward} XP ⚡`, 'success');
    }
    D.missions = ms;
    save();
  }
}

function loadMiss() {
  const ms = getTodayMissions();
  const totals = ms.reduce((acc, m) => {
    if (m.completed) {
      acc.done++;
      acc.doneXP += m.xpReward;
    } else {
      acc.pendingXP += m.xpReward;
    }
    return acc;
  }, { done: 0, doneXP: 0, pendingXP: 0 });

  document.getElementById('missContent').innerHTML = `
    <div class="g3 mb24">
      <div class="stat-card" style="--accent-color:var(--green2)">
        <div class="stat-card-label">Concluídas hoje</div>
        <div class="stat-card-value" style="color:var(--green2)">${totals.done} <span style="font-size:14px;color:var(--text3);font-weight:500">/ ${ms.length}</span></div>
      </div>
      <div class="stat-card" style="--accent-color:var(--gold2)">
        <div class="stat-card-label">XP disponível</div>
        <div class="stat-card-value" style="color:var(--gold2)">${$N(totals.pendingXP)}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--purple2)">
        <div class="stat-card-label">XP ganho hoje</div>
        <div class="stat-card-value" style="color:var(--purple3)">${$N(totals.doneXP)}</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:10px">
      ${ms.map(m=>`
        <div class="mission-card ${m.completed?'done':''}">
          <div class="mission-icon" style="background:${m.completed?'var(--g2-glow)':'var(--p-glow)'}">
            ${m.icon||'⭐'}
          </div>
          <div class="mission-body">
            <div class="mission-title">${m.title}${m.completed?' ✓':''}</div>
            <div class="mission-desc">${m.description}</div>
            <div class="mission-prog-row">
              <div class="mission-prog-bar">
                <div class="mission-prog-fill" style="width:${Math.min(100,Math.round((m.currentValue/m.targetValue)*100))}%;background:${m.completed?'var(--green2)':'var(--purple2)'}"></div>
              </div>
              <span class="mission-prog-label">${m.currentValue}/${m.targetValue}</span>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div class="mission-xp">+${m.xpReward}<span style="font-size:11px;font-weight:500;color:var(--text3)"> XP</span></div>
            <div style="margin-top:8px">
              ${m.completed
                ? '<span class="badge b-green" style="font-size:11px">Feita ✓</span>'
                : `<button class="btn btn-primary btn-sm" onclick="forceCompleteMission('${m.id}')">Completar</button>`
              }
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function forceCompleteMission(id) {
  const ms = getTodayMissions();
  const m = ms.find(x=>x.id===id && !x.completed);
  if (!m) return;
  m.currentValue = m.targetValue;
  m.completed = true;
  D.missions = ms;
  addXP(m.xpReward);
  toast(`Missão concluída! +${m.xpReward} XP ⚡`, 'success');
  save();
  loadMiss();
}

// ===== VIDEOS =====
let _vids = [...VIDEOS].map(v => ({ ...v, watched: (D.watchedVideos||[]).includes(v.id) }));

function loadVideos() {
  const list = getVideosList();
  _vids = list.map(v => ({ ...v, watched: (D.watchedVideos||[]).includes(v.id) }));
  const cats = ['all','orcamento','divida','renda'];
  const cLabs = { all:'Todos', orcamento:'Orçamento', divida:'Dívidas', renda:'Renda Extra' };
  const watched = _vids.filter(v=>v.watched).length;
  const xpGanho = _vids.filter(v=>v.watched).reduce((s,v)=>s+v.xpReward,0);
  const filtered = S.videoFilter==='all' ? _vids : _vids.filter(v=>v.category===S.videoFilter);

  const diffCls = { iniciante:'diff-i', intermediario:'diff-m', avancado:'diff-a' };
  const catBadge = { orcamento:{label:'Orçamento',cls:'b-blue'}, divida:{label:'Dívidas',cls:'b-red'}, renda:{label:'Renda Extra',cls:'b-gold'}, aposentadoria:{label:'Aposentadoria',cls:'b-purple'} };

  document.getElementById('videoContent').innerHTML = `
    <div class="g3 mb24">
      <div class="stat-card" style="--accent-color:var(--blue2)">
        <div class="stat-card-label">Vídeos disponíveis</div>
        <div class="stat-card-value">${_vids.length}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--green2)">
        <div class="stat-card-label">Assistidos</div>
        <div class="stat-card-value" style="color:var(--green2)">${watched}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--gold2)">
        <div class="stat-card-label">XP ganho com vídeos</div>
        <div class="stat-card-value" style="color:var(--gold2)">${$N(xpGanho)}</div>
      </div>
    </div>
    <div class="filters">
      ${cats.map(c=>`<div class="filter-btn ${S.videoFilter===c?'on':''}" onclick="setVF('${c}')">${cLabs[c]||c}</div>`).join('')}
    </div>
    <div class="g3">
      ${filtered.map(v=>{
        const vc = catBadge[v.category]||{label:v.category,cls:'b-cyan'};
        return `
          <div class="video-card ${v.watched?'watched-card':''}">
            <div class="video-thumb" onclick="openVid(${v.id})">
              <img src="https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg" alt="${v.title}" loading="lazy">
              <div class="video-thumb-overlay">
                <div class="play-circle">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21"/></svg>
                </div>
              </div>
              ${v.watched?'<div class="watched-chip">✓ Assistido</div>':''}
              <div class="video-duration-chip">${v.durationMinutes} min</div>
            </div>
            <div class="video-body">
              <div class="video-cat-row">
                <span class="badge ${vc.cls}">${vc.label}</span>
                <span class="video-diff ${diffCls[v.difficulty]||''}">${v.difficulty.charAt(0).toUpperCase()+v.difficulty.slice(1)}</span>
              </div>
              <div class="video-title">${v.title}</div>
              <div class="video-instructor">Por ${v.instructor}</div>
              <div class="video-footer">
                <div class="video-xp-tag">⚡ ${v.watched?'Concluído':'+'+v.xpReward+' XP'}</div>
              </div>
            </div>
            <div class="video-action" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              ${v.watched
                ? `<button class="btn btn-ghost btn-sm" onclick="openVid(${v.id})">▶ Rever</button>`
                : `<button class="btn btn-gold btn-sm" onclick="openVid(${v.id})">Assistir +${v.xpReward} XP</button>`
              }
              <a class="btn btn-ghost btn-sm" href="https://www.youtube.com/watch?v=${v.youtubeId}" target="_blank" rel="noreferrer" onclick="event.stopPropagation();">Ver no YouTube</a>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function setVF(c) { S.videoFilter=c; loadVideos(); }

function openVid(id) {
  const v = _vids.find(x=>x.id===id); if (!v) return;
  S.currentVideoId = id;
  document.getElementById('vmTitle').textContent = v.title;
  document.getElementById('vmDesc').textContent = v.description;
  document.getElementById('vmDur').textContent = `⏱ ${v.durationMinutes} minutos · ${v.difficulty}`;

  const youtubeVideoId = String(v.youtubeId || '').trim();
  if (!youtubeVideoId) {
    toast('ID de vídeo inválido.', 'error');
    return;
  }

  const embedUrl = `https://www.youtube.com/embed/${encodeURIComponent(youtubeVideoId)}?rel=0&modestbranding=1&autoplay=1&showinfo=0`;
  const iframe = document.getElementById('vmFrame');
  iframe.src = embedUrl;
  iframe.title = `Vídeo: ${v.title}`;

  const watchBtn = document.getElementById('vmWatchBtn');
  if (v.watched) {
    watchBtn.textContent = '✓ Já assistido';
    watchBtn.disabled = true;
    watchBtn.className = 'btn btn-ghost';
  } else {
    watchBtn.innerHTML = `⚡ Marcar como assistido (+${v.xpReward} XP)`;
    watchBtn.disabled = false;
    watchBtn.className = 'btn btn-gold';
  }

  // botão extra com link direto para YouTube no modal
  const previousLink = document.getElementById('vmYoutubeLink');
  if (previousLink) previousLink.remove();

  const footer = document.querySelector('#videoModal .modal-footer');
  const linkBtn = document.createElement('a');
  linkBtn.id = 'vmYoutubeLink';
  linkBtn.href = `https://www.youtube.com/watch?v=${encodeURIComponent(youtubeVideoId)}`;
  linkBtn.target = '_blank';
  linkBtn.rel = 'noreferrer noopener';
  linkBtn.className = 'btn btn-ghost btn-sm';
  linkBtn.textContent = 'Abrir no YouTube';
  linkBtn.style.marginRight = 'auto';
  linkBtn.onclick = evt => evt.stopPropagation();
  footer.insertBefore(linkBtn, footer.firstChild);

  openModal('videoModal');
}

// fallback se iframe não carregar
window.addEventListener('message', e => {
  // ignora
});


function markWatched() {
  if (!S.currentVideoId) return;
  if ((D.watchedVideos||[]).includes(S.currentVideoId)) { toast('Você já assistiu este vídeo','info'); return; }
  D.watchedVideos = [...(D.watchedVideos||[]), S.currentVideoId];
  const v = VIDEOS.find(x=>x.id===S.currentVideoId);
  if (v) { addXP(v.xpReward); toast(`Vídeo concluído! +${v.xpReward} XP ⚡`, 'success'); }
  completeMission('video');
  checkAchievements();
  save();
  closeModal('videoModal');
  loadVideos();
}

// ===== ACHIEVEMENTS =====
function checkAchievements() {
  let newUnlocks = 0;
  ACHIEVEMENTS_BASE.forEach(base => {
    const existing = (D.achievements||[]).find(a=>a.id===base.id);
    if (!existing || !existing.unlocked) {
      if (base.check(D)) {
        if (!D.achievements) D.achievements = [];
        const idx = D.achievements.findIndex(a=>a.id===base.id);
        if (idx>=0) { D.achievements[idx].unlocked=true; D.achievements[idx].unlockedAt=new Date().toISOString(); }
        else { D.achievements.push({ id:base.id, unlocked:true, unlockedAt:new Date().toISOString() }); }
        addXP(base.xpReward);
        newUnlocks++;
        toast(`🏅 Conquista desbloqueada: "${base.title}" +${base.xpReward} XP`, 'success');
      }
    }
  });
  if (newUnlocks > 0) save();
}

function loadAch() {
  const unlocked = D.achievements||[];
  const rarCls = { common:'', rare:'', epic:'', legendary:'' };
  const rarBadge = { common:'b-cyan', rare:'b-blue', epic:'b-purple', legendary:'b-gold' };

  document.getElementById('achContent').innerHTML = `
    <div class="g3 mb24">
      <div class="stat-card" style="--accent-color:var(--green2)">
        <div class="stat-card-label">Desbloqueadas</div>
        <div class="stat-card-value" style="color:var(--green2)">${unlocked.filter(a=>a.unlocked).length}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--text3)">
        <div class="stat-card-label">Bloqueadas</div>
        <div class="stat-card-value" style="color:var(--text2)">${ACHIEVEMENTS_BASE.length-unlocked.filter(a=>a.unlocked).length}</div>
      </div>
      <div class="stat-card" style="--accent-color:var(--gold2)">
        <div class="stat-card-label">XP de conquistas</div>
        <div class="stat-card-value" style="color:var(--gold2)">${$N(ACHIEVEMENTS_BASE.filter(base=>unlocked.find(a=>a.id===base.id&&a.unlocked)).reduce((s,b)=>s+b.xpReward,0))}</div>
      </div>
    </div>
    <div class="g3">
      ${ACHIEVEMENTS_BASE.map(base=>{
        const u = unlocked.find(a=>a.id===base.id&&a.unlocked);
        return `
          <div class="ach-card ${u?'unlocked':'locked'}">
            <div class="ach-icon">${u?base.icon:'🔒'}</div>
            <div class="ach-name">${base.title}</div>
            <div class="ach-desc">${u?base.description:'???'}</div>
            <div class="ach-badges">
              <span class="badge ${rarBadge[base.rarity]||'b-cyan'}">${{common:'Comum',rare:'Raro',epic:'Épico',legendary:'Lendário'}[base.rarity]||base.rarity}</span>
              <span class="badge b-gold">+${base.xpReward} XP</span>
            </div>
            ${u&&u.unlockedAt?`<div class="ach-date">🔓 ${$D(u.unlockedAt)}</div>`:''}
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ===== REWARDS =====
const REWARDS_CATALOG = [
  { id:'r1', title:'Dia de Folga nas Contas', description:'Lembre-se de que você merece uma pausa! Use esse XP como motivação para continuar.', icon:'☕', cost:200, category:'motivacao' },
  { id:'r2', title:'Planilha Financeira Gratuita', description:'Acesse o modelo de planilha financeira para salário mínimo — prático e simples.', icon:'📊', cost:300, category:'ferramenta' },
  { id:'r3', title:'Guia: Negocie suas Dívidas', description:'PDF com passo a passo para negociar dívidas bancárias e conseguir desconto.', icon:'📄', cost:400, category:'conteudo' },
  { id:'r4', title:'Título de "Poupador do Mês"', description:'Você virou o Poupador do Mês! Mostre pra galera que você sabe guardar dinheiro.', icon:'🏅', cost:500, category:'titulo' },
  { id:'r5', title:'Receitas Econômicas', description:'Ebook com 30 receitas saborosas e baratas para o dia a dia de quem controla o orçamento.', icon:'🍲', cost:350, category:'conteudo' },
  { id:'r6', title:'Bônus XP Duplo por 1 dia', description:'Suas próximas transações do dia valem o dobro de XP. Use com sabedoria!', icon:'⚡', cost:600, category:'bonus' },
];

function loadRew() {
  const lv = getLevel(D.user.xp);
  const redeemed = D.redeemed || [];
  document.getElementById('rewContent').innerHTML = `
    <div class="card mb24" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;background:var(--bg3);border-color:var(--border3)">
      <div>
        <div style="font-size:11px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Seu saldo de XP</div>
        <div style="font-size:38px;font-weight:900;color:var(--gold2);letter-spacing:-1px">${$N(D.user.xp)} <span style="font-size:18px;font-weight:600">XP</span></div>
        <div style="font-size:13px;color:var(--text2);margin-top:4px">${lv.name} · Nível ${lv.level}</div>
      </div>
      <div style="font-size:56px;line-height:1">⚡</div>
    </div>
    <div class="g3">
      ${REWARDS_CATALOG.map(r => {
        const podeResgatar = D.user.xp >= r.cost;
        const jaResgatou = redeemed.includes(r.id);
        return `
          <div class="card" style="display:flex;flex-direction:column;gap:10px;${jaResgatou?'opacity:.55':''}">
            <div style="font-size:34px;line-height:1">${r.icon}</div>
            <div style="font-size:14px;font-weight:800;color:var(--text)">${r.title}</div>
            <div style="font-size:12px;color:var(--text2);flex:1;line-height:1.5">${r.description}</div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
              <span class="badge b-gold">⚡ ${$N(r.cost)} XP</span>
              ${jaResgatou
                ? '<span class="badge b-green">✓ Resgatado</span>'
                : `<button class="btn btn-gold btn-sm" onclick="redeemRew('${r.id}',${r.cost},'${r.title.replace(/'/g,"\\'")}',this)" ${podeResgatar?'':'disabled'}>${podeResgatar?'Resgatar':'Falta XP'}</button>`
              }
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function redeemRew(id, cost, title, btn) {
  if (D.user.xp < cost) { toast('XP insuficiente','error'); return; }
  D.user.xp -= cost;
  if (!D.redeemed) D.redeemed = [];
  D.redeemed.push(id);
  save();
  refreshUser();
  toast(`🎁 "${title}" resgatado com sucesso!`, 'success');
  loadRew();
}

// ===== LEADERBOARD =====
const LB_PLAYERS = [
  { name:'Ana Lima',     avatar:'AL', xp:3840, level:'Ouro II',    levelN:8 },
  { name:'Carlos Souza', avatar:'CS', xp:3120, level:'Ouro I',     levelN:7 },
  { name:'Fernanda M.',  avatar:'FM', xp:2780, level:'Prata III',  levelN:6 },
  { name:'Diego Alves',  avatar:'DA', xp:2100, level:'Prata II',   levelN:5 },
  { name:'Juliana R.',   avatar:'JR', xp:1680, level:'Prata I',    levelN:4 },
  { name:'Ricardo P.',   avatar:'RP', xp:980,  level:'Bronze III', levelN:3 },
  { name:'Patrícia N.',  avatar:'PN', xp:620,  level:'Bronze II',  levelN:2 },
];
const AV_COLORS = ['#7c3aed','#2563eb','#059669','#d97706','#dc2626','#0891b2','#7c3aed','#be185d'];

function loadLB() {
  const lv = getLevel(D.user.xp);
  const mePlayer = { name: D.user.name, avatar: D.user.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase(), xp: D.user.xp, level: lv.name, levelN: lv.level, isMe: true };

  // Mistura o usuário na lista e ordena por XP
  const all = [...LB_PLAYERS, mePlayer].sort((a,b) => b.xp - a.xp);
  const rank1 = ['👑','🥈','🥉'];

  document.getElementById('lbContent').innerHTML = `
    <div style="max-width:640px">
      <div class="card mb24" style="background:var(--bg3);border-color:var(--border3)">
        <div style="font-size:12px;color:var(--text3);font-weight:700;text-transform:uppercase;letter-spacing:.05em;margin-bottom:14px">Top participantes este mês</div>
        ${all.map((p,i) => `
          <div class="lb-item ${p.isMe?'lb-me':''}">
            <div class="lb-rank" style="color:${i<3?'var(--gold2)':'var(--text3)'}">
              ${rank1[i] || `${i+1}º`}
            </div>
            <div class="lb-avatar" style="background:${AV_COLORS[i%AV_COLORS.length]}">${p.avatar}</div>
            <div class="lb-info">
              <div class="lb-name">
                ${p.name}
                ${p.isMe?'<span class="badge b-purple" style="font-size:10px">Você</span>':''}
              </div>
              <div class="lb-lvl">${p.level} · Nível ${p.levelN}</div>
            </div>
            <div class="lb-xp">${$N(p.xp)} XP</div>
          </div>
        `).join('')}
      </div>
      <div class="card" style="text-align:center;padding:20px">
        <div style="font-size:22px;margin-bottom:8px">💡</div>
        <div style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">Quer subir no ranking?</div>
        <div style="font-size:13px;color:var(--text2);line-height:1.6">Complete missões diárias, registre transações, guarde no cofrinho e assista vídeos educativos para ganhar mais XP!</div>
      </div>
    </div>
  `;
}

function loadProfile() {
  const loggedUser = localStorage.getItem('mq_loggedUser');
  const profileEmail = loggedUser ? JSON.parse(loggedUser).email : '';
  const lv = getLevel(D.user.xp);

  document.getElementById('profileName').value = D.user.name || '';
  document.getElementById('profileEmail').value = profileEmail;
  document.getElementById('profileLevel').value = `${lv.name} (Nível ${lv.level})`;
  document.getElementById('profileXP').value = `${$N(D.user.xp)} XP`;
  document.getElementById('profileGoal').value = D.user.savingGoal || '';
  document.getElementById('profileNotif').value = D.user.notificationsEnabled === false ? 'off' : 'on';
  document.getElementById('profileCurrentPassword').value = '';
  document.getElementById('profileNewPassword').value = '';
  document.getElementById('profileMsg').textContent = '';
}

function saveProfile() {
  const name = document.getElementById('profileName').value.trim();
  const goal = parseFloat(document.getElementById('profileGoal').value);
  const currentPassword = document.getElementById('profileCurrentPassword').value;
  const newPassword = document.getElementById('profileNewPassword').value;
  const notif = document.getElementById('profileNotif').value;

  if (!name) {
    document.getElementById('profileMsg').textContent = 'Informe seu nome.';
    return;
  }

  if (newPassword && !currentPassword) {
    document.getElementById('profileMsg').textContent = 'Informe a senha atual para trocar a senha.';
    return;
  }

  if (newPassword && currentPassword) {
    const db = JSON.parse(localStorage.getItem('mq_data') || '{}');
    // validação também pode ser realizada no backend em API /api/user
    const loggedUser = JSON.parse(localStorage.getItem('mq_loggedUser') || '{}');
    const userItemIndex = (db.users || []).findIndex(u => u.email === loggedUser.email);
    if (userItemIndex >= 0) {
      if (db.users[userItemIndex].password !== currentPassword) {
        document.getElementById('profileMsg').textContent = 'Senha atual incorreta.';
        return;
      }
      db.users[userItemIndex].password = newPassword;
      localStorage.setItem('mq_data', JSON.stringify(db));
      save();
    }
  }

  D.user.name = name;
  if (!isNaN(goal)) D.user.savingGoal = goal;
  D.user.notificationsEnabled = notif === 'on';
  save();
  refreshUser();
  document.getElementById('profileMsg').textContent = 'Perfil salvo com sucesso.';
  document.getElementById('profileCurrentPassword').value = '';
  document.getElementById('profileNewPassword').value = '';
}

// ===== MODALS =====
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.getElementById('overlay').classList.add('open');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  if (id==='videoModal') document.getElementById('vmFrame').src='';
  // Fechar overlay apenas se nenhum modal estiver aberto
  const anyOpen = document.querySelectorAll('.modal.open').length > 0;
  if (!anyOpen) document.getElementById('overlay').classList.remove('open');
}
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m=>m.classList.remove('open'));
  document.getElementById('vmFrame').src='';
  document.getElementById('overlay').classList.remove('open');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();
});
