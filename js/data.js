/* Dados de exemplo — substitua por dados reais ou uma API */
const COLORS=['#1f5fc4','#1a8a52','#e07a1f','#7c3aed','#0891b2','#be123c','#0d9488','#c2410c','#1d4ed8','#4d7c0f'];
const CATS=['Administrativo','Design','Logística','Saúde','Serviços','Tecnologia','Vendas'];
const CITIES=['Porto Alegre','Canoas','Gravataí','Remoto'];

/* ---------- DADOS DE EXEMPLO (troque por sua API/back-end) ---------- */
const V=[
['Analista de Suporte','TechSul Soluções','Tecnologia','Porto Alegre','CLT','Híbrido','R$ 3.200 – 4.000',1,'Atendimento técnico a clientes, abertura e acompanhamento de chamados.'],
['Vendedor(a) Externo','Mercado Bom Preço','Vendas','Canoas','CLT','Presencial','R$ 2.400 + comissão',1,'Visitas a clientes, apresentação de produtos e fechamento de pedidos.'],
['Assistente Administrativo','Clínica Lumi','Administrativo','Porto Alegre','CLT','Presencial','R$ 2.600',1,'Rotinas de agenda, cadastro de pacientes e apoio ao financeiro.'],
['Motorista Entregador','LogRápido','Logística','Gravataí','PJ','Presencial','R$ 3.000 – 3.800',1,'Entregas na região metropolitana com veículo próprio. CNH B.'],
['Desenvolvedor(a) Front-end','DevWave','Tecnologia','Remoto','CLT','Remoto','R$ 6.500 – 9.000',1,'Desenvolvimento de interfaces com HTML, CSS e JavaScript em equipe ágil.'],
['Auxiliar de Estoque','Armazém Sul','Logística','Canoas','CLT','Presencial','R$ 2.100',0,'Separação, conferência e organização de mercadorias no estoque.'],
['Recepcionista','Hotel Pampa','Administrativo','Porto Alegre','CLT','Presencial','R$ 2.200',0,'Recepção de hóspedes, check-in e atendimento telefônico.'],
['Técnico(a) de Enfermagem','Hospital Vida','Saúde','Porto Alegre','CLT','Presencial','R$ 3.100',0,'Cuidado de pacientes, aferição de sinais e apoio à equipe médica.'],
['Estagiário(a) de Marketing','Agência Pulso','Vendas','Porto Alegre','Estágio','Híbrido','R$ 1.500',0,'Apoio em redes sociais, campanhas e relatórios de resultados.'],
['Encarregado de Obras','Construtora Alicerce','Serviços','Gravataí','CLT','Presencial','R$ 3.400',0,'Coordenação de equipe de obra, leitura de projetos e controle de materiais.']
].map(([t,s,cat,cid,contrato,modo,preco,p,desc],i)=>({t,s,cat,cid,contrato,meta:['📍 '+cid,contrato,modo],preco,p,desc,c:COLORS[i]}));

const P=[
['Ricardo Alves','Eletricista residencial','Serviços','Porto Alegre',4.9,12,'A partir de R$ 120',1,'Instalações, reparos e manutenção elétrica residencial com garantia.'],
['Juliana Matos','Designer gráfica','Design','Remoto',5.0,7,'A partir de R$ 250',1,'Logotipos, identidade visual e peças para redes sociais.'],
['Carlos Pereira','Encanador','Serviços','Canoas',4.8,9,'A partir de R$ 100',1,'Vazamentos, instalações e desentupimentos com atendimento rápido.'],
['Ana Souza','Diarista e organização','Serviços','Porto Alegre',4.9,5,'R$ 150 / diária',1,'Limpeza completa e organização de casas e apartamentos.'],
['Felipe Torres','Técnico de informática','Tecnologia','Gravataí',4.7,10,'A partir de R$ 90',1,'Formatação, redes, remoção de vírus e upgrade de computadores.'],
['Marina Lopes','Fotógrafa','Design','Porto Alegre',4.8,6,'A partir de R$ 300',0,'Ensaios, eventos e fotos de produtos.'],
['Paulo Ramos','Pintor','Serviços','Canoas',4.6,15,'A partir de R$ 80 / m²',0,'Pintura residencial e comercial, textura e grafiato.'],
['Camila Dias','Personal trainer','Saúde','Porto Alegre',4.9,8,'R$ 90 / aula',0,'Treinos individuais em casa, academia ou ao ar livre.'],
['Bruno Neves','Desenvolvedor freelancer','Tecnologia','Remoto',4.7,6,'Sob orçamento',0,'Sites e sistemas sob medida para pequenos negócios.'],
['Letícia Prado','Contadora','Administrativo','Gravataí',4.8,11,'A partir de R$ 150 / mês',0,'Contabilidade para MEI e pequenas empresas, impostos e declarações.']
].map(([t,s,cat,cid,nota,anos,preco,p,desc],i)=>({t,s,cat,cid,nota,meta:['📍 '+cid,'⭐ '+nota.toFixed(1).replace('.',','),anos+' anos'],preco,p,desc,c:COLORS[(i+3)%10]}));

const POSTS=[
['Como montar um currículo que chama atenção','Currículo','20 out 2026','4 min','📄','#e0e7ff','Estrutura simples, palavras-chave certas e o que recrutadores realmente leem nos primeiros segundos.',['Recrutadores passam poucos segundos no primeiro olhar. Por isso, coloque nome, contato e objetivo no topo, de forma limpa e fácil de ler.','Liste as experiências da mais recente para a mais antiga e use números sempre que puder: quantos clientes atendeu, quanto vendeu, quanto tempo economizou.','Revise o texto, salve em PDF e adapte o currículo para cada vaga, repetindo as palavras-chave do anúncio.']],
['Entrevista de emprego: 7 perguntas e como respondê-las','Entrevista','15 out 2026','5 min','🎤','#dcfce7','Prepare-se para as perguntas mais comuns e aprenda a transformar nervosismo em segurança.',['Pesquise a empresa antes: o que ela faz, quem atende e quais valores divulga. Isso mostra interesse real.','Prepare respostas para as perguntas clássicas, como “fale sobre você”, pontos fortes e por que quer a vaga, sempre com exemplos curtos.','Chegue com antecedência, leve perguntas para o entrevistador e agradeça ao final. Postura e educação contam muito.']],
['Autônomo: como precificar seu serviço sem perder cliente','Autônomos','9 out 2026','6 min','🤝','#fef3c7','Calcule sua hora, considere custos ocultos e apresente orçamentos que fecham negócio.',['Comece somando seus custos fixos mensais e quanto você precisa ganhar por mês. Divida pelas horas que realmente consegue vender.','Inclua deslocamento, materiais e impostos. Muita gente esquece esses itens e acaba trabalhando quase de graça.','Apresente o orçamento por escrito, com prazo e o que está incluso. Isso passa confiança e evita desentendimentos.']],
['Primeiro emprego: como começar sem experiência','Carreira','2 out 2026','4 min','🌱','#fce7f3','Cursos, projetos e atitude também contam. Veja como mostrar o seu valor desde o começo.',['Falta de experiência não é falta de valor. Cursos, trabalho voluntário, projetos escolares e tarefas do dia a dia mostram suas habilidades.','Destaque o que você sabe fazer: comunicação, organização, vontade de aprender. Peça indicações a professores e conhecidos.','Candidate-se a vagas de entrada e estágios, e trate cada entrevista como aprendizado, mesmo quando a resposta for não.']],
['Cuidado com golpes de vagas falsas','Segurança','25 set 2026','3 min','🛡️','#fee2e2','Aprenda a identificar sinais de fraude antes de passar seus dados ou dinheiro.',['Desconfie de vagas que prometem ganhos fáceis, pedem pagamento para participar do processo ou exigem dados bancários logo no início.','Confira se a empresa existe, pesquise o nome na internet e converse apenas por canais oficiais.','Nunca envie senhas ou códigos recebidos por mensagem. Ao ver algo suspeito, denuncie o anúncio e avise outras pessoas.']]
].map(([t,cat,data,min,emoji,cor,resumo,corpo])=>({t,cat,data,min,emoji,cor,resumo,corpo}));

