const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const qs=new URLSearchParams(location.search);

/* ---------- COMPONENTES ---------- */
const ini=(k,d)=>(k==='vagas'?d.s:d.t).split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase();
const card=(k,d,i,badge)=>`<li class="card">${badge&&d.p?'<span class="badge">★ Premium</span>':''}<div class="card__top"><div class="avatar" style="background:${d.c}">${ini(k,d)}</div><div><h3>${d.t}</h3><p class="who">${d.s}</p></div></div><ul class="meta">${d.meta.map(m=>`<li>${m}</li>`).join('')}</ul><p class="price">${d.preco}</p><button class="btn btn--primary" data-open="${k}:${i}">${k==='vagas'?'Ver vaga':'Ver perfil'}</button></li>`;
const postCard=(p,i)=>`<article class="post"><div class="post__cover" style="background:${p.cor}">${p.emoji}</div><div class="post__body"><span class="badge">${p.cat}</span><time>${p.data} · ${p.min} de leitura</time><h3>${p.t}</h3><p>${p.resumo}</p><a class="btn" href="post.html?id=${i+1}">Ler postagem completa</a></div></article>`;
const opts=a=>a.map(c=>`<option>${c}</option>`).join('');

/* ---------- LISTAS COM FILTRO (vagas.html e profissionais.html) ---------- */
function mountList(k){
  const root=$('#list-'+k);if(!root)return;
  const v=k==='vagas';
  root.innerHTML=`<form class="filters" role="search"><input type="search" id="${k}-q" placeholder="${v?'Buscar vaga, empresa ou área':'Buscar profissional ou serviço'}" aria-label="Buscar"><select id="${k}-cat" aria-label="Área"><option value="">Todas as áreas</option>${opts(CATS)}</select><select id="${k}-cidade" aria-label="Cidade"><option value="">Todas as cidades</option>${opts(CITIES)}</select><select id="${k}-x" aria-label="${v?'Contrato':'Ordenar'}">${v?'<option value="">Todos os contratos</option><option>CLT</option><option>PJ</option><option>Estágio</option>':'<option value="">Destaques primeiro</option><option value="nota">Melhor avaliados</option>'}</select></form><p class="count" id="${k}-count" aria-live="polite"></p><ul class="cards cards--grid" id="${k}-res"></ul><div class="empty" id="${k}-empty" hidden><span class="mascot big"></span><p>Nada encontrado. Tente outros filtros.</p></div>`;
  root.addEventListener('input',()=>apply(k));
  root.addEventListener('submit',e=>e.preventDefault());
  if(v){ // filtros vindos da busca da home (vagas.html?q=...&cidade=...)
    $('#vagas-q').value=qs.get('q')||'';
    const c=(qs.get('cidade')||'').split(',')[0],s=$('#vagas-cidade');
    s.value=[...s.options].some(o=>o.value===c)?c:'';
  }
  apply(k);
}
function apply(k){
  const v=k==='vagas',data=v?V:P,g=id=>$(`#${k}-${id}`).value,q=norm(g('q').trim());
  const r=data.map((d,i)=>({d,i})).filter(({d})=>(!q||norm([d.t,d.s,d.cat,...d.meta].join(' ')).includes(q))&&(!g('cat')||d.cat===g('cat'))&&(!g('cidade')||d.cid===g('cidade'))&&(!v||!g('x')||d.contrato===g('x')));
  r.sort((a,b)=>(!v&&g('x')==='nota')?b.d.nota-a.d.nota:b.d.p-a.d.p);
  $(`#${k}-res`).innerHTML=r.map(({d,i})=>card(k,d,i,true)).join('');
  $(`#${k}-count`).textContent=r.length+(v?(r.length===1?' vaga encontrada':' vagas encontradas'):(r.length===1?' profissional encontrado':' profissionais encontrados'));
  $(`#${k}-empty`).hidden=r.length>0;
}
mountList('vagas');mountList('prof');

/* ---------- HOME (index.html) ---------- */
if($('#home-vagas')){
  $('#home-vagas').innerHTML=V.map((d,i)=>d.p?card('vagas',d,i):'').join('');
  $('#home-prof').innerHTML=P.map((d,i)=>d.p?card('prof',d,i):'').join('');
  $('#home-posts').innerHTML=POSTS.slice(0,3).map(postCard).join('');
}

/* ---------- BLOG (blog.html) ---------- */
let tema='Todas';
function drawBlog(){
  const cats=['Todas',...new Set(POSTS.map(p=>p.cat))];
  $('#blog-chips').innerHTML=cats.map(c=>`<button class="chip" type="button" aria-pressed="${c===tema}">${c}</button>`).join('');
  $('#blog-grid').innerHTML=POSTS.map((p,i)=>tema==='Todas'||p.cat===tema?postCard(p,i):'').join('');
}
if($('#blog-chips')){
  drawBlog();
  $('#blog-chips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(b){tema=b.textContent;drawBlog()}});
}

/* ---------- POSTAGEM (post.html?id=1) ---------- */
if($('#post-body')){
  const i=(+qs.get('id'))-1,p=POSTS[i];
  if(!p)location.replace('blog.html');
  else{
    const more=POSTS.map((x,j)=>j!==i?`<a class="btn" href="post.html?id=${j+1}">${x.t}</a>`:'').join('');
    $('#post-body').innerHTML=`<a class="link" href="blog.html">← Voltar ao blog</a><h1>${p.t}</h1><p class="muted"><span class="badge">${p.cat}</span> ${p.data} · ${p.min} de leitura</p><div class="cover" style="background:${p.cor}">${p.emoji}</div>${p.corpo.map(t=>`<p>${t}</p>`).join('')}<div class="cta"><div><h2>Pronto para o próximo passo?</h2><p>Crie seu cadastro gratuito e encontre oportunidades.</p></div><a class="btn btn--primary" href="cadastro.html">Cadastre-se</a></div><h2 style="margin-top:28px;font-size:1.1rem">Leia também</h2><div class="more">${more}</div>`;
    document.title=p.t+' — CONECTA TINGA';
  }
}

/* ---------- CADASTRO (cadastro.html?perfil=empresa) ---------- */
if($('#cad')){
  $('#cidade').innerHTML='<option value="">Selecione…</option>'+opts([...CITIES.slice(0,3),'Outra']);
  $('#area').innerHTML='<option value="">Selecione…</option>'+opts(CATS);
  const HINTS={candidato:'Gratuito. Monte seu perfil e candidate-se às vagas.',empresa:'Publique vagas e contrate profissionais. Opção de destaque na página inicial.',autonomo:'Anuncie seu serviço e seja encontrado por quem precisa.'};
  const setPerfil=v=>{
    const r=$(`input[name=perfil][value=${v}]`);if(!r)return;r.checked=true;
    $('#hint').textContent=HINTS[v];
    $$('[data-for]').forEach(el=>{const on=el.dataset.for.split(' ').includes(v);el.hidden=!on;$$('input,select',el).forEach(i=>i.disabled=!on)});
  };
  $$('input[name=perfil]').forEach(r=>r.addEventListener('change',()=>setPerfil(r.value)));
  setPerfil(HINTS[qs.get('perfil')]?qs.get('perfil'):'candidato');
  $('#tel').addEventListener('input',e=>{const d=e.target.value.replace(/\D/g,'').slice(0,11);e.target.value=d.replace(/^(\d{2})(\d)/,'($1) $2').replace(/(\d{5})(\d{1,4})$/,'$1-$2')});
  $('#cad').addEventListener('submit',e=>{
    e.preventDefault();
    const nome=$('#nome').value.split(' ')[0];
    $('#ok-msg').textContent=`Obrigado, ${nome}! Enviamos um e-mail de confirmação para ${$('#email').value}. (Demonstração: nenhum dado é salvo ainda.)`;
    $('#cad').hidden=true;$('#ok').hidden=false;$('#cad').reset();setPerfil('candidato');scrollTo(0,0);
  });
}

/* ---------- JANELA DE DETALHES (vaga / profissional) ---------- */
const dlg=$('#dlg');
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-open]');
  if(b&&dlg){
    const [k,i]=b.dataset.open.split(':'),v=k==='vagas',d=(v?V:P)[i];
    dlg.innerHTML=`<div class="dlg"><button class="close" data-close aria-label="Fechar">×</button><h2>${d.t}</h2><p class="who">${d.s}</p><ul class="meta">${d.meta.map(m=>`<li>${m}</li>`).join('')}</ul><p class="price">${d.preco}</p><p>${d.desc}</p><a class="btn btn--primary btn--block" href="cadastro.html${v?'':'?perfil=empresa'}">${v?'Quero me candidatar':'Solicitar contato'}</a><small>Crie sua conta gratuita para ${v?'enviar seu currículo':'ver os contatos'}.</small></div>`;
    dlg.showModal();
  }else if(dlg&&(e.target.closest('[data-close]')||e.target===dlg))dlg.close();
});
