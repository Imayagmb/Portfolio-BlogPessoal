// ABOUT
const about = document.querySelector('#about');

//PROJECTS
const swiperWrapper = document.querySelector('.swiper-wrapper');

//FORMULÁRIO
const formulario = document.querySelector('#formulario');

//VALIDAÇÃO DE E-MAIL
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


//FUNÇÃO DE PREENCHIMENTO DA SEÇÃO ABOUT
async function getAboutGitHub() {

    try {

        const resposta = await fetch('https://api.github.com/users/imayagmb');//REQUISIÇÃO DO TIPO GET PARA A API DO GITHUB
        const perfil = await resposta.json(); //CONVERTER A RESPOSTAA PARA JSON

        about.innerHTML = '';

        about.innerHTML = `<figure class="about-image">
                <img src="${perfil.avatar_url}" alt="${perfil.name}">
            </figure>

            <article class="about-content">
                <h2>Quem sou?</h2>
                <p><strong>Desenvolvedora Full Stack | Carioca</strong></p>

                <p> Experiência com desenvolvimento de aplicações web e integração de APIs REST, utilizando tecnologias
                    como React, Angular, Node.js, NestJS, PHP e MySQL.

                    Perfil analítico, proativa e colaborativa, com foco em resolução de problemas e aprendizado
                    contínuo.

                </p> <!-- GitHub + Curriculo e dados do GH -->
                <div class="about-buttons-data">

                    <!-- LINKS -->
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">GitHub</a>
                        <a href="https://drive.google.com/file/d/15v_hkzPCPK0fmHGgmYfsvr9uZT9kgem3/view?usp=sharing" target="_blank" class="botao-outline"> Curriculo </a>
                    </div>

                    <!-- DADOS -->
                    <div class="data-container">

                        <!-- Seguidores -->
                        <div class="data-item">
                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <!-- Respositórios Públicos -->
                        <div class="data-container">
                            <div class="data-item">
                                <span class="data-number">${perfil.public_repos}</span>
                                <span class="data-label">Repositórios</span>
                            </div>
                        </div>
                    </div>
            </article>
            `;

    } catch (error) {
        console.error('Erro ao buscar dados do GitHub', error);
    }
}

// BUSCAR OS DADOS
async function getProjectsGitHub() {
    try {
        //TRAZ OS 6 ÚLTIMOS REPOSITÓRIOS PUBLICOS NO GIT HUB
        const resposta = await fetch('https://api.github.com/users/imayagmb/repos?sort=updated&per_page=9');
        const repositorios = await resposta.json(); //CONVERTER A RESPOSTAA PARA JSON

        swiperWrapper.innerHTML = '';

        // CORES E ÍCONES DAS LINGUAGENS
        const linguagens = {
            'JavaScript': { icone: 'javascript' },
            'React': { icone: 'react' },
            'TypeScript': { icone: 'typescript' },
            'Python': { icone: 'python' },
            'Java': { icone: 'java' },
            'HTML': { icone: 'html' },
            'CSS': { icone: 'css' },
            'PHP': { icone: 'php' },
            'C#': { icone: 'csharp' },
            'Go': { icone: 'go' },
            'Kotlin': { icone: 'kotlin' },
            'Swift': { icone: 'swift' },
            'GitHub': { icone: 'github' },
        }

        repositorios.forEach(repositorio => {

            //IDENTIFICA A LINGUAGEM PADRÃO DO REPOSITÓRIO
            const linguagem = repositorio.language || 'GitHub'

            //SELECIONA O ÍCONE DA LINGUAGEM PADRÃO
            const config = linguagens[linguagem] || linguagens['GitHub']

            // MONTA A URL QUE APONTA O ÍCONE DA LINGUAGEM PADRÃO
            const urlIcone = `./assets/icons/languages/${config.icone}.svg`;

            //FORMATA O NOME DO REPOSITÓRIO
            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ') // SUBSTITUI HÍFENS E UNDERLINES POR ESPAÇOS EM BRANCO
                .replace(/[^a-zA-Z0-9\s]/g, '') //REMOVE CARACTERES ESPECIAIS
                .toUpperCase(); // CONVERTE A STRING EM LETRAS MAIÚSCULAS


            //DESCRIÇÃO DO REPOSITÓRIO
            const descricao = repositorio.description
				? repositorio.description.length > 100
					? repositorio.description.substring(0, 97) + '...'
					: repositorio.description
				: 'Projeto desenvolvido no GitHub'

            //TAGS DO REPOSITÓRIO
                const tags = repositorio.topics?.length > 0
					? repositorio.topics.slice(0, 3).map( (topic) =>
						`<span class="tag">${topic}</span>`,).join('')
					: `<span class="tag">${linguagem}</span>`

            //BOTÕES DE AÇÃO (botão deploy)
            const botoesAcao = `
                <div class="project-buttons">
                        <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm"> GitHub </a>
                        ${repositorio.homepage ?
                    `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm"> Deploy </a>`
                    : ""}
                </div>
            `


            //CONSTRUIR O CARD
            swiperWrapper.innerHTML += `
                <div class="swiper-slide">

                        <article class="project-card">

                            <figure class="project-image">
                                <img src="${urlIcone}" alt="Ícone ${linguagem}">
                            </figure>

                            <div class="project-content">

                                <h3>${nomeFormatado}</h3>
                                <p>${descricao}</p>

                                <div class="project-tags">
                                    ${tags}
                                </div>
                                ${botoesAcao}                          
                            </div>
                        </article>
                    </div>
                    `
        })

        iniciarSwiper();



    } catch (error) {
        console.error('Erro ao buscar dados do GitHub', error);
    }

    function iniciarSwiper() {
        new Swiper('.projects-swiper', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 24,
            centeredSlides: false,
            loop: true,
            watchOverflow: true,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 40,
                    centeredSlides: false
                },
                769: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 40,
                    centeredSlides: false
                },
                1025: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 54,
                    centeredSlides: false
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            autoplay: {
                delay: 5000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
            },
            grabCursor: true,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        });
    }
}


formulario.addEventListener('submit', function(event){
    event.preventDefault();

    document.querySelectorAll('form span')
        .forEach(span => span.innerHTML = '');
    
    let isValid = true;

    const nome= document.querySelector('#nome');
    const erroNome= document.querySelector('#erro-nome');

    if(nome.value.trim().length < 3){
        erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
        if(isValid) nome.focus();
        isValid = false;
    }

    const email= document.querySelector('#email');
    const erroEmail= document.querySelector('#erro-email');

    if(!email.value.trim().match(emailRegex)){
        erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
        if(isValid) email.focus();
        isValid = false;
    }

    const assunto= document.querySelector('#assunto');
    const erroAssunto= document.querySelector('#erro-assunto');

    if(assunto.value.trim().length < 5){
        erroAssunto.innerHTML = 'O assunto deve ter no mínimo 5 caracteres'
        if(isValid) assunto.focus();
        isValid = false;
    }

    const mensagem= document.querySelector('#mensagem');
    const erroMensagem= document.querySelector('#erro-mensagem');

    if(mensagem.value.trim().length === 0){
        erroMensagem.innerHTML = 'O mensagem deve ter no mínimo 5 caracteres'
        if(isValid) mensagem.focus();
        isValid = false;
    }

    if (isValid){
        const submitButton = formulario.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando ...';

        formulario.submit();
    }

    
})
//EXECUTAR A FUNÇÃO getAboutGitHub
getAboutGitHub();

// EXECUTAR A FUNÇÃO getProjectsGitHub
getProjectsGitHub();