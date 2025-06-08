let isLoggedIn = false;
let currentTheme = 'light';
let loggedInMatricula = ''; // guarda matricula do login

// BANCO DE DADOS SIMULADO !!! -> apenas para demonstrar o funcionamento do sistema

//Vagas Disponiveis
const allVacancies = [
    { id: 1, title: 'Estágio em Desenvolvimento Front-end', company: 'Empresa X', description: 'Empresa X busca estagiário para atuar no desenvolvimento de interfaces web utilizando React e Tailwind CSS.', location: 'Remoto', status: 'open', qntAplicacoes: 0, isSaved: false },
    { id: 2, title: 'Analista de Dados Júnior', company: 'Startup Y', description: 'Startup Y procura analista de dados com conhecimento em SQL e Python para auxiliar na análise de grandes volumes de dados.', location: 'São Paulo, SP', status: 'open', qntAplicacoes: 0, isSaved: false },
    { id: 3, title: 'Engenheiro de Software (Back-end)', company: 'Empresa Z', description: 'Empresa Z busca engenheiro de software com experiência em Node.js e bancos de dados NoSQL.', location: 'Santa Rita do Sapucaí, MG', status: 'open', qntAplicacoes: 0, isSaved: false },
    { id: 4, title: 'Desenvolvedor Mobile Pleno', company: 'Tech Solutions', description: 'Tech Solutions procura desenvolvedor mobile com experiência em Flutter ou React Native.', location: 'Belo Horizonte, MG', status: 'open', qntAplicacoes: 0, isSaved: false },
    { id: 5, title: 'Designer UX/UI Júnior', company: 'Creative Minds', description: 'Creative Minds busca designer UX/UI para criar interfaces intuitivas e agradáveis.', location: 'Remoto', status: 'closed', qntAplicacoes: 0, isSaved: false },
];

let applications = [];

// Dados de Frequência 
const frequencyData = [
    { subject: 'Programação Web', currentFrequency: 95, totalAllowedAbsences: 10, currentAbsences: 2 },
    { subject: 'Cálculo Diferencial e Integral', currentFrequency: 88, totalAllowedAbsences: 15, currentAbsences: 5 },
    { subject: 'Circuitos Elétricos', currentFrequency: 92, totalAllowedAbsences: 12, currentAbsences: 3 },
    { subject: 'Sistemas Operacionais', currentFrequency: 75, totalAllowedAbsences: 10, currentAbsences: 8 },
    { subject: 'Redes de Computadores', currentFrequency: 98, totalAllowedAbsences: 8, currentAbsences: 0 },
];

// Dados de Aulas
const dailyClassesData = {1:[],2:[{time:"08:00 - 09:40",subject:"Eletrônica Analógica",room:"Sala 201"},{time:"10:00 - 11:40",subject:"Programação Orientada a Objetos",room:"Laboratório 3"}],3:[{time:"10:00 - 11:40",subject:"Algoritmos e Estruturas de Dados I",room:"Laboratório 1"},{time:"14:00 - 15:40",subject:"Física Moderna",room:"Sala 105"}],4:[{time:"08:00 - 09:40",subject:"Cálculo III",room:"Sala 202"},{time:"14:00 - 15:40",subject:"Sistemas Operacionais",room:"Sala 305"},{time:"16:00 - 17:40",subject:"Inteligência Artificial",room:"Laboratório 4"}],5:[{time:"08:00 - 09:40",subject:"Cálculo Numérico",room:"Sala 203"},{time:"14:00 - 15:40",subject:"Banco de Dados",room:"Sala 301"},{time:"16:00 - 17:40",subject:"Programação Web",room:"Laboratório 2"}],6:[{time:"08:00 - 09:40",subject:"Física IV",room:"Sala 102"},{time:"10:00 - 11:40",subject:"Redes de Computadores",room:"Sala 401"}],7:[],8:[],9:[{time:"08:00 - 09:40",subject:"Eletrônica Analógica",room:"Sala 201"},{time:"14:00 - 15:40",subject:"Sistemas Operacionais",room:"Sala 305"}],10:[{time:"10:00 - 11:40",subject:"Algoritmos e Estruturas de Dados I",room:"Laboratório 1"},{time:"16:00 - 17:40",subject:"Redes de Computadores",room:"Sala 401"}],11:[{time:"14:00 - 15:40",subject:"Sistemas Operacionais",room:"Sala 305"}],12:[{time:"08:00 - 09:40",subject:"Cálculo Numérico",room:"Sala 203"},{time:"16:00 - 17:40",subject:"Programação Web",room:"Laboratório 2"}],13:[{time:"08:00 - 09:40",subject:"Física IV",room:"Sala 102"}],14:[],15:[],16:[{time:"08:00 - 09:40",subject:"Eletrônica Analógica",room:"Sala 201"}],17:[{time:"10:00 - 11:40",subject:"Algoritmos e Estruturas de Dados I",room:"Laboratório 1"}],18:[{time:"14:00 - 15:40",subject:"Sistemas Operacionais",room:"Sala 305"}],19:[{time:"08:00 - 09:40",subject:"Cálculo Numérico",room:"Sala 203"},{time:"16:00 - 17:40",subject:"Programação Web",room:"Laboratório 2"}],20:[{time:"08:00 - 09:40",subject:"Física IV",room:"Sala 102"}],21:[],22:[],23:[{time:"08:00 - 09:40",subject:"Eletrônica Analógica",room:"Sala 201"},{time:"14:00 - 15:40",subject:"Sistemas Operacionais",room:"Sala 305"}],24:[{time:"10:00 - 11:40",subject:"Algoritmos e Estruturas de Dados I",room:"Laboratório 1"},{time:"16:00 - 17:40",subject:"Redes de Computadores",room:"Sala 401"}],25:[{time:"14:00 - 15:40",subject:"Sistemas Operacionais",room:"Sala 305"}],26:[{time:"08:00 - 09:40",subject:"Cálculo Numérico",room:"Sala 203"},{time:"16:00 - 17:40",subject:"Programação Web",room:"Laboratório 2"}],27:[{time:"08:00 - 09:40",subject:"Física IV",room:"Sala 102"}],28:[],29:[],30:[{time:"08:00 - 09:40",subject:"Eletrônica Analógica",room:"Sala 201"}],31:[{time:"10:00 - 11:40",subject:"Algoritmos e Estruturas de Dados I",room:"Laboratório 1"}]};


// DOM 
const authPage = document.getElementById('authPage');
const mainApp = document.getElementById('mainApp');
const authForm = document.getElementById('authForm');
const matriculaInput = document.getElementById('matricula');
const sidebar = document.getElementById('sidebar');
const contentArea = document.getElementById('contentArea');
const messageModal = document.getElementById('messageModal');
const modalMessage = document.getElementById('modalMessage');
const displayMatricula = document.getElementById('displayMatricula');
const displayEmail = document.getElementById('displayEmail');
const frequencyContent = document.getElementById('frequencyContent');
const calendarGrid = document.getElementById('calendarGrid');
const jobVacanciesPage = document.getElementById('jobVacanciesPage');
const btnAvailableVacancies = document.getElementById('btnAvailableVacancies');
const btnAppliedVacancies = document.getElementById('btnAppliedVacancies');
const btnSavedVacancies = document.getElementById('btnSavedVacancies');
const availableVacanciesContent = document.getElementById('availableVacanciesContent');
const appliedVacanciesContent = document.getElementById('appliedVacanciesContent');
const savedVacanciesContent = document.getElementById('savedVacanciesContent');
const noAppliedVacanciesMessage = document.getElementById('noAppliedVacanciesMessage');

function showModal(message) {
    modalMessage.textContent = message;
    messageModal.style.display = 'flex';
}

function closeModal() {
    messageModal.style.display = 'none';
}

/**
 * calcula uma data limite de resposta.
 * @param {Date} applicationDate - A data em que a aplicação foi feita.
 * @returns {string} - A data formatada para exibição.
 */
function calcDataLimiteResposta(applicationDate) {
    const responseDate = new Date(applicationDate);
    responseDate.setDate(responseDate.getDate() + 14); // Adiciona 14 dias para a resposta
    return responseDate.toLocaleDateString('pt-BR');
}

// simulação de autenticação simples
authForm.addEventListener('submit', function(event) {
    event.preventDefault();
    loggedInMatricula = matriculaInput.value;
    isLoggedIn = true;
    authPage.classList.add('hidden');
    mainApp.classList.remove('hidden');
    showPage('homePage');
});

function logout() {
    isLoggedIn = false;
    loggedInMatricula = '';
    authPage.classList.remove('hidden');
    mainApp.classList.add('hidden');
    authForm.reset();
    sidebar.classList.remove('open');
    contentArea.classList.remove('shifted');
    
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        currentTheme = 'light';
        const themeToggleLink = document.querySelector('a[onclick="toggleDarkMode()"]');
        if (themeToggleLink) {
            themeToggleLink.innerHTML = '<i class="fas fa-moon mr-2"></i> Tema Escuro';
        }
    }
    
    allVacancies.forEach(v => v.isSaved = false);
    renderVacancies();
}

function toggleSidebar() {
    sidebar.classList.toggle('open');
    contentArea.classList.toggle('shifted');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active-page');
    });
    const activePage = document.getElementById(pageId);
    activePage.classList.remove('hidden');
    activePage.classList.add('active-page');

    if (pageId === 'jobVacanciesPage') {
        renderVacancies(); 
        showVacanciesTab('available');
    } else if (pageId === 'studentInfoPage') {
        renderStudentInfo();
    } else if (pageId === 'frequencyPage') {
        renderFrequency();
    } else if (pageId === 'dailyClassesPage') {
        renderDailyClasses();
    }
}

function renderStudentInfo() {
    displayMatricula.textContent = loggedInMatricula || 'N/A';
    displayEmail.textContent = `${loggedInMatricula}@ges.inatel.br`; //simulando email
}

function renderFrequency() {
    frequencyContent.innerHTML = ''; 
    frequencyData.forEach(data => {
        const percentage = data.currentFrequency;
        const faltasRestantes = data.totalAllowedAbsences - data.currentAbsences;
        const faltasStatusClass = faltasRestantes <= 2 && faltasRestantes > 0 ? 'text-orange-500' : (faltasRestantes <= 0 ? 'text-red-600' : 'text-green-600');
        frequencyContent.innerHTML += `<div class="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700"><p class="font-semibold text-lg mb-2">${data.subject}</p><div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mb-2"><div class="bg-blue-600 h-4 rounded-full" style="width: ${percentage}%"></div></div><p class="text-right text-sm text-gray-600 mt-1">${percentage}% de Frequência</p><div class="flex justify-between text-sm mt-2"><p>Faltas Atuais: <span class="font-bold">${data.currentAbsences}</span></p><p>Faltas Permitidas: <span class="font-bold">${data.totalAllowedAbsences}</span></p></div><p class="text-sm mt-1 ${faltasStatusClass}">Faltas Restantes: <span class="font-bold">${faltasRestantes}</span></p></div>`;
    });
}

function renderDailyClasses() {
    calendarGrid.innerHTML = '';
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); 

    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarGrid.innerHTML += '<div class="py-2 text-gray-400"></div>';
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const classesForDay = dailyClassesData[day] || [];
        let dayClassesHtml = '';
        let dayClassesIndicatorClass = '';

        if (classesForDay.length > 0) {
            dayClassesIndicatorClass = 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 font-bold rounded-md relative group cursor-pointer';
            dayClassesHtml += `<div class="absolute hidden group-hover:block bg-blue-600 text-white text-xs rounded-md p-2 z-10 w-48 -mt-1 -ml-24 left-1/2 transform -translate-x-1/2 shadow-lg">`;
            classesForDay.forEach(cls => {
                dayClassesHtml += `<p class="font-bold">${cls.time} - ${cls.subject}</p><p>${cls.room}</p>`;
            });
            dayClassesHtml += `</div>`;
        }

        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
        const todayClass = isToday ? 'border-2 border-blue-500 font-bold' : '';

        calendarGrid.innerHTML += `<div class="py-2 ${dayClassesIndicatorClass} ${todayClass}">${day}${dayClassesHtml}</div>`;
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    const themeToggleLink = document.querySelector('a[onclick="toggleDarkMode()"]');
    if (themeToggleLink) {
        themeToggleLink.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun mr-2"></i> Tema Claro' : '<i class="fas fa-moon mr-2"></i> Tema Escuro';
    }
}

function renderVacancies() {
    availableVacanciesContent.innerHTML = '';
    appliedVacanciesContent.innerHTML = '';
    savedVacanciesContent.innerHTML = '';

    const userApplications = applications.filter(app => app.matricula === loggedInMatricula);
    const appliedVacancyIds = userApplications.map(app => app.vacancyId);

    //Vagas Disponíveis
    const available = allVacancies.filter(v => v.status === 'open' && !appliedVacancyIds.includes(v.id));
    if (available.length === 0) {
        availableVacanciesContent.innerHTML = '<p class="text-gray-600 dark:text-gray-300 text-center col-span-full">Nenhuma vaga nova disponível no momento.</p>';
    } else {
        available.forEach(vacancy => {
            availableVacanciesContent.innerHTML += createVacancyCard(vacancy, null);
        });
    }

    //Vagas Candidatadas
    if (userApplications.length === 0) {
        appliedVacanciesContent.innerHTML = '<p class="text-gray-600 dark:text-gray-300 text-center col-span-full" id="noAppliedVacanciesMessage">Nenhuma vaga candidata ainda.</p>';
    } else {
        userApplications.forEach(application => {
            const vacancy = allVacancies.find(v => v.id === application.vacancyId);
            if (vacancy) {
                appliedVacanciesContent.innerHTML += createVacancyCard(vacancy, application);
            }
        });
    }

    //Vagas Salvas
    const saved = allVacancies.filter(v => v.isSaved);
    if (saved.length === 0) {
        savedVacanciesContent.innerHTML = '<p class="text-gray-600 dark:text-gray-300 text-center col-span-full">Nenhuma vaga salva ainda.</p>';
    } else {
        const userAppliedToTheseSaved = saved.filter(v => appliedVacancyIds.includes(v.id));
        const userNotAppliedToTheseSaved = saved.filter(v => !appliedVacancyIds.includes(v.id));

        userNotAppliedToTheseSaved.forEach(vacancy => savedVacanciesContent.innerHTML += createVacancyCard(vacancy, null));
        userAppliedToTheseSaved.forEach(vacancy => {
             const application = userApplications.find(app => app.vacancyId === vacancy.id);
             savedVacanciesContent.innerHTML += createVacancyCard(vacancy, application);
        });
    }
}

function createVacancyCard(vacancy, application) {
    let buttonOrStatusHtml = '';

    if (application) {
        // Se há uma aplicação, mostra o status e as datas
        const statusText = { pending: 'Em espera', accepted: 'Aceito', rejected: 'Rejeitado' }[application.status] || 'Desconhecido';
        const statusColorClass = { pending: 'text-orange-500', accepted: 'text-green-600', rejected: 'text-red-600' }[application.status] || 'text-gray-500';
        
        buttonOrStatusHtml = `
            <div class="application-details">
                <p class="font-semibold ${statusColorClass}">Status da Candidatura: ${statusText}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Aplicado em: ${application.applicationDate.toLocaleDateString('pt-BR')}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">Resposta esperada até: ${calcDataLimiteResposta(application.applicationDate)}</p>
            </div>
        `;
    } else {
        // Se não há aplicação, mostra o botão para se candidatar
        buttonOrStatusHtml = `<button class="apply-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full">Candidatar-se</button>`;
    }
    
    const saveButtonIcon = vacancy.isSaved ? 'fas fa-bookmark' : 'far fa-bookmark';
    const saveButtonTitle = vacancy.isSaved ? 'Remover vaga salva' : 'Salvar vaga';
    const saveButtonTextColor = vacancy.isSaved ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400';

    return `
        <div class="bg-white p-6 rounded-lg shadow-md vacancy-card dark:bg-gray-800" data-id="${vacancy.id}">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white w-11/12">${vacancy.title}</h3>
                <button class="save-button ${saveButtonTextColor} hover:text-blue-500 focus:outline-none" title="${saveButtonTitle}">
                    <i class="${saveButtonIcon} fa-lg"></i>
                </button>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">Empresa: ${vacancy.company}</p>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-1">Local: ${vacancy.location}</p>
            <p class="text-gray-700 dark:text-gray-300 text-sm mb-3">Total de Aplicações: ${vacancy.qntAplicacoes}</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-3">${vacancy.description}</p>
            <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                ${buttonOrStatusHtml}
            </div>
        </div>
    `;
}

/**
 * aplica para uma vaga.
 * @param {HTMLButtonElement} button
 */
function handleApplyButtonClick(button) {
    const vacancyCard = button.closest('.vacancy-card');
    const vacancyId = parseInt(vacancyCard.dataset.id, 10);
    const vacancy = allVacancies.find(v => v.id === vacancyId);

    if (vacancy) {
        button.disabled = true;
        button.textContent = 'Enviando...';

        // Simula uma chamada de API -> apenas para fins de demonstração
        setTimeout(() => {
            const newApplication = {
                applicationId: Date.now(), // ID único para a aplicação
                vacancyId: vacancy.id,
                matricula: loggedInMatricula,
                applicationDate: new Date(),
                responseDate: null,
                status: 'pending' // Status inicial
            };
            applications.push(newApplication);

            // Atualiza a contagem de aplicações na vaga
            vacancy.qntAplicacoes++;
            
            showModal(`Você se candidatou à vaga "${vacancy.title}" com sucesso!`);
            renderVacancies(); 
            showVacanciesTab('applied'); 
        }, 1000);
    }
}

function handleSaveButtonClick(button) {
    const vacancyCard = button.closest('.vacancy-card');
    const vacancyId = parseInt(vacancyCard.dataset.id, 10);
    const vacancy = allVacancies.find(v => v.id === vacancyId);

    if (vacancy) {
        vacancy.isSaved = !vacancy.isSavesd;
        renderVacancies();
    }
}

function showVacanciesTab(tab) {
    availableVacanciesContent.classList.add('hidden');
    appliedVacanciesContent.classList.add('hidden');
    savedVacanciesContent.classList.add('hidden');

    const allTabButtons = [btnAvailableVacancies, btnAppliedVacancies, btnSavedVacancies];
    allTabButtons.forEach(btn => {
        btn.classList.remove('active', 'bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300', 'dark:bg-gray-700', 'dark:text-gray-200', 'dark:hover:bg-gray-600');
    });

    let activeBtn, activeContent;
    if (tab === 'available') {
        activeBtn = btnAvailableVacancies;
        activeContent = availableVacanciesContent;
    } else if (tab === 'applied') {
        activeBtn = btnAppliedVacancies;
        activeContent = appliedVacanciesContent;
    } else if (tab === 'saved') {
        activeBtn = btnSavedVacancies;
        activeContent = savedVacanciesContent;
    }

    if (activeBtn && activeContent) {
        activeContent.classList.remove('hidden');
        activeBtn.classList.add('active', 'bg-blue-500', 'text-white');
        activeBtn.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300', 'dark:bg-gray-700', 'dark:text-gray-200', 'dark:hover:bg-gray-600');
    }
}

btnAvailableVacancies.addEventListener('click', () => showVacanciesTab('available'));
btnAppliedVacancies.addEventListener('click', () => showVacanciesTab('applied'));
btnSavedVacancies.addEventListener('click', () => showVacanciesTab('saved'));

jobVacanciesPage.addEventListener('click', function(event) {
    const applyButton = event.target.closest('.apply-button');
    const saveButton = event.target.closest('.save-button');
    if (applyButton) handleApplyButtonClick(applyButton);
    if (saveButton) handleSaveButtonClick(saveButton);
});

document.addEventListener('DOMContentLoaded', () => {
    showVacanciesTab('available');
    renderVacancies();
});