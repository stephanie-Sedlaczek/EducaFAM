<img width="1600" height="1000" alt="media-fidelidade" src="https://github.com/user-attachments/assets/2723fdb5-8e35-465b-ac6d-f720190b405a" />
<img width="1600" height="1000" alt="baixa-fidelidade" src="https://github.com/user-attachments/assets/79cb0a4b-dae2-4f61-83d3-ac74acbb46eb" />
<img width="1600" height="1000" alt="media-fidelidade" src="https://github.com/user-attachments/assets/1af41be8-6cb8-4b6f-8ab1-3b85aeb959b4" />


# EducaFAM — Projeto Integrador

## Problema
Famílias podem ter dificuldade para organizar receitas, despesas e objetivos financeiros e, ao mesmo tempo, envolver crianças em situações práticas de educação financeira.

## Público-alvo
Famílias com crianças em idade escolar e responsáveis que desejam transformar planejamento, economia e tomada de decisão financeira em uma atividade compartilhada.

## Funcionalidades desta versão
- Cadastro de família e login real no navegador com Web Crypto API (PBKDF2 + salt).
- Perfil Responsável e perfil Criança com PIN de 4 dígitos.
- Proteção de rotas e expiração da sessão por 30 minutos de inatividade.
- Dashboard financeiro e familiar.
- Receitas, despesas, edição, exclusão com desfazer, categorias, recorrências e parcelamentos.
- Importação e exportação CSV.
- Metas familiares e individuais, prazo, histórico de contribuições e estimativa de conclusão.
- Missões por tipo, prazo, XP, criança, estados e aprovação/recusa.
- Missões de registro de despesa e poupança integradas às finanças/metas.
- Histórico de XP, níveis e notificações internas.
- Experiência infantil separada dentro do `index.html`.
- Cofrinho e contribuição da criança para metas familiares.
- Relatórios com gráficos em SVG, comparação mensal, insights e impressão/PDF.
- Orçamentos por categoria com alertas de 80% e 100%.
- Backup/importação JSON com versão de esquema e migração básica.
- Favicon, meta description, noscript, página 404 e PWA opcional.
- Acessibilidade: skip link, foco visível, modal com ARIA, focus trap e Esc.

## Estrutura
- `index.html` — dashboard / espaço infantil
- `login.html` — login e cadastro
- `financas.html` — lançamentos e orçamento
- `metas.html` — metas e contribuições
- `missoes.html` — missões e aprovação
- `criancas.html` — perfis infantis
- `relatorios.html` — análises e gráficos
- `configuracoes.html` — família, categorias, orçamento e backup
- `404.html` — página não encontrada
- `css/styles.css` — identidade visual e responsividade
- `js/data.js` — persistência, modelo e criptografia
- `js/app.js` — interface e regras de negócio
- `docs/` — documentação do Projeto Integrador

## Como executar
1. Extraia o projeto.
2. Abra a pasta no VS Code.
3. Use Live Server ou outro servidor HTTP local para testar o PWA e o `service worker`.
4. Abra `login.html`.
5. Para testar a conta de demonstração, use manualmente:
   - E-mail: `familia@educafam.local`
   - Senha: `123456`
6. Para testar as crianças, entre como responsável e use o botão “Entrar como criança”. Os perfis demo usam PIN `1234`.

> O login não possui campos pré-preenchidos. As credenciais acima existem apenas para facilitar a demonstração.

## Decisões técnicas
O projeto usa HTML5, CSS3 e JavaScript puro. O armazenamento é local via LocalStorage, sem frameworks, bibliotecas ou backend. Senhas e PINs são armazenados como hash PBKDF2-SHA-256 com salt usando Web Crypto API.

## Limitações
- Não existe backend.
- O LocalStorage é específico do navegador/dispositivo.
- Não há colaboração real entre dispositivos.
- A autenticação é adequada para protótipo acadêmico, não para produção.
- Dados de menores ficam localmente no navegador; não devem ser usados com dados reais sem uma arquitetura de segurança e privacidade adequada.

## Roadmap
1. Backend e banco de dados.
2. Autenticação server-side e sincronização entre dispositivos.
3. Colaboração real entre membros da família.
4. Notificações externas.
5. Política de privacidade completa e revisão jurídica.

## Checklist do enunciado
- [ ] Pesquisa primária — falta executar/documentar.
- [ ] Protótipo de baixa fidelidade — falta anexar artefato final.
- [ ] Protótipo de alta fidelidade — falta anexar artefato final.
- [x] Desenvolvimento web funcional local.
- [x] HTML/CSS/JavaScript puro.
- [x] LocalStorage.
- [x] Git/GitHub — preparar publicação/repositório final.
- [x] Documentação técnica inicial em `docs/`.
- [x] Execução local.

## Créditos
Projeto acadêmico EducaFAM — Projeto Integrador de Design Profissional.
