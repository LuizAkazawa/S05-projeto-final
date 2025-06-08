let isLoggedIn = false;
let currentTheme = 'light'; 
let loggedInMatricula = ''; // guarda matricula do login

// simulando vagas disponiveis
const allVacancies = [
    { id: 1, title: 'Estágio em Desenvolvimento Front-end', company: 'Empresa X', description: 'Empresa X busca estagiário para atuar no desenvolvimento de interfaces web utilizando React e Tailwind CSS.', location: 'Remoto', status: 'available' },
    { id: 2, title: 'Analista de Dados Júnior', company: 'Startup Y', description: 'Startup Y procura analista de dados com conhecimento em SQL e Python para auxiliar na análise de grandes volumes de dados.', location: 'São Paulo, SP', status: 'available' },
    { id: 3, title: 'Engenheiro de Software (Back-end)', company: 'Empresa Z', description: 'Empresa Z busca engenheiro de software com experiência em Node.js e bancos de dados NoSQL.', location: 'Santa Rita do Sapucaí, MG', status: 'available' },
    { id: 4, title: 'Desenvolvedor Mobile Pleno', company: 'Tech Solutions', description: 'Tech Solutions procura desenvolvedor mobile com experiência em Flutter ou React Native.', location: 'Belo Horizonte, MG', status: 'available' },
    { id: 5, title: 'Designer UX/UI Júnior', company: 'Creative Minds', description: 'Creative Minds busca designer UX/UI para criar interfaces intuitivas e agradáveis.', location: 'Remoto', status: 'available' },
];

// frequencia simulada
const frequencyData = [
    { subject: 'Programação Web', currentFrequency: 95, totalAllowedAbsences: 10, currentAbsences: 2 },
    { subject: 'Cálculo Diferencial e Integral', currentFrequency: 88, totalAllowedAbsences: 15, currentAbsences: 5 },
    { subject: 'Circuitos Elétricos', currentFrequency: 92, totalAllowedAbsences: 12, currentAbsences: 3 },
    { subject: 'Sistemas Operacionais', currentFrequency: 75, totalAllowedAbsences: 10, currentAbsences: 8 },
    { subject: 'Redes de Computadores', currentFrequency: 98, totalAllowedAbsences: 8, currentAbsences: 0 },
];

// aulas durante o mes
const dailyClassesData = {
    1: [], // Sunday
    2: [
        { time: '08:00 - 09:40', subject: 'Eletrônica Analógica', room: 'Sala 201' },
        { time: '10:00 - 11:40', subject: 'Programação Orientada a Objetos', room: 'Laboratório 3' }
    ], // Monday
    3: [
        { time: '10:00 - 11:40', subject: 'Algoritmos e Estruturas de Dados I', room: 'Laboratório 1' },
        { time: '14:00 - 15:40', subject: 'Física Moderna', room: 'Sala 105' }
    ], // Tuesday
    4: [
        { time: '08:00 - 09:40', subject: 'Cálculo III', room: 'Sala 202' },
        { time: '14:00 - 15:40', subject: 'Sistemas Operacionais', room: 'Sala 305' },
        { time: '16:00 - 17:40', subject: 'Inteligência Artificial', room: 'Laboratório 4' }
    ], // Wednesday
    5: [
        { time: '08:00 - 09:40', subject: 'Cálculo Numérico', room: 'Sala 203' },
        { time: '14:00 - 15:40', subject: 'Banco de Dados', room: 'Sala 301' },
        { time: '16:00 - 17:40', subject: 'Programação Web', room: 'Laboratório 2' }
    ], // Thursday
    6: [
        { time: '08:00 - 09:40', subject: 'Física IV', room: 'Sala 102' },
        { time: '10:00 - 11:40', subject: 'Redes de Computadores', room: 'Sala 401' }
    ], // Friday
    7: [], // Saturday
    8: [], // Sunday
    9: [
        { time: '08:00 - 09:40', subject: 'Eletrônica Analógica', room: 'Sala 201' },
        { time: '14:00 - 15:40', subject: 'Sistemas Operacionais', room: 'Sala 305' }
    ], // Monday
    10: [
        { time: '10:00 - 11:40', subject: 'Algoritmos e Estruturas de Dados I', room: 'Laboratório 1' },
        { time: '16:00 - 17:40', subject: 'Redes de Computadores', room: 'Sala 401' }
    ], // Tuesday
    11: [
        { time: '14:00 - 15:40', subject: 'Sistemas Operacionais', room: 'Sala 305' }
    ], // Wednesday
    12: [
        { time: '08:00 - 09:40', subject: 'Cálculo Numérico', room: 'Sala 203' },
        { time: '16:00 - 17:40', subject: 'Programação Web', room: 'Laboratório 2' }
    ], // Thursday
    13: [
        { time: '08:00 - 09:40', subject: 'Física IV', room: 'Sala 102' }
    ], // Friday
    14: [], // Saturday
    15: [], // Sunday
    16: [
        { time: '08:00 - 09:40', subject: 'Eletrônica Analógica', room: 'Sala 201' }
    ], // Monday
    17: [
        { time: '10:00 - 11:40', subject: 'Algoritmos e Estruturas de Dados I', room: 'Laboratório 1' }
    ], // Tuesday
    18: [
        { time: '14:00 - 15:40', subject: 'Sistemas Operacionais', room: 'Sala 305' }
    ], // Wednesday
    19: [
        { time: '08:00 - 09:40', subject: 'Cálculo Numérico', room: 'Sala 203' },
        { time: '16:00 - 17:40', subject: 'Programação Web', room: 'Laboratório 2' }
    ], // Thursday
    20: [
        { time: '08:00 - 09:40', subject: 'Física IV', room: 'Sala 102' }
    ], // Friday
    21: [], // Saturday
    22: [], // Sunday
    23: [
        { time: '08:00 - 09:40', subject: 'Eletrônica Analógica', room: 'Sala 201' },
        { time: '14:00 - 15:40', subject: 'Sistemas Operacionais', room: 'Sala 305' }
    ], // Monday
    24: [
        { time: '10:00 - 11:40', subject: 'Algoritmos e Estruturas de Dados I', room: 'Laboratório 1' },
        { time: '16:00 - 17:40', subject: 'Redes de Computadores', room: 'Sala 401' }
    ], // Tuesday
    25: [
        { time: '14:00 - 15:40', subject: 'Sistemas Operacionais', room: 'Sala 305' }
    ], // Wednesday
    26: [
        { time: '08:00 - 09:40', subject: 'Cálculo Numérico', room: 'Sala 203' },
        { time: '16:00 - 17:40', subject: 'Programação Web', room: 'Laboratório 2' }
    ], // Thursday
    27: [
        { time: '08:00 - 09:40', subject: 'Física IV', room: 'Sala 102' }
    ], // Friday
    28: [], // Saturday
    29: [], // Sunday
    30: [
        { time: '08:00 - 09:40', subject: 'Eletrônica Analógica', room: 'Sala 201' }
    ], // Monday
    31: [
        { time: '10:00 - 11:40', subject: 'Algoritmos e Estruturas de Dados I', room: 'Laboratório 1' }
    ], // Tuesday
};


// Get DOM elements
const authPage = document.getElementById('authPage');
const mainApp = document.getElementById('mainApp');
const authTitle = document.getElementById('authTitle'); 
const authButton = document.getElementById('authButton');
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

// variaveis para auxiliar na interação com as vagas
const btnAvailableVacancies = document.getElementById('btnAvailableVacancies');
const btnAppliedVacancies = document.getElementById('btnAppliedVacancies');
const availableVacanciesContent = document.getElementById('availableVacanciesContent');
const appliedVacanciesContent = document.getElementById('appliedVacanciesContent');
const noAppliedVacanciesMessage = document.getElementById('noAppliedVacanciesMessage');


function showModal(message) {
    modalMessage.textContent = message;
    messageModal.style.display = 'flex';
}

function closeModal() {
    messageModal.style.display = 'none';
}

// forma de login sem necessariamente estar com as credenciais corretas (apenas para simular o login)
authForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Formulário de login submetido.'); // Debug

    loggedInMatricula = matriculaInput.value; 

    isLoggedIn = true;

    authPage.classList.add('hidden');
    mainApp.classList.remove('hidden');

    console.log('authPage agora está hidden:', authPage.classList.contains('hidden')); // Debug: Verifica se authPage está oculto
    console.log('mainApp agora está visível:', !mainApp.classList.contains('hidden')); // Debug: Verifica se mainApp está visível

    showPage('homePage'); // vai pra home
    console.log('Redirecionando para a homePage.'); // Debug chamada da home page
});

function toggleSidebar() {
    sidebar.classList.toggle('open');
    contentArea.classList.toggle('shifted');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('active-page');
    });
    document.getElementById(pageId).classList.remove('hidden');
    document.getElementById(pageId).classList.add('active-page');

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
    displayEmail.textContent = `${loggedInMatricula}@ges.inatel.br`; //definindo um email de acordo com a matricula
}

function renderFrequency() {
    frequencyContent.innerHTML = ''; 

    frequencyData.forEach(data => {
        const percentage = data.currentFrequency;
        const faltasRestantes = data.totalAllowedAbsences - data.currentAbsences;
        const faltasStatusClass = faltasRestantes <= 2 && faltasRestantes > 0 ? 'text-orange-500' : (faltasRestantes <= 0 ? 'text-red-600' : 'text-green-600');

        frequencyContent.innerHTML += `
            <div class="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <p class="font-semibold text-lg mb-2">${data.subject}</p>
                <div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 mb-2">
                    <div class="bg-blue-600 h-4 rounded-full" style="width: ${percentage}%"></div>
                </div>
                <p class="text-right text-sm text-gray-600 mt-1">${percentage}% de Frequência</p>
                <div class="flex justify-between text-sm mt-2">
                    <p>Faltas Atuais: <span class="font-bold">${data.currentAbsences}</span></p>
                    <p>Faltas Permitidas: <span class="font-bold">${data.totalAllowedAbsences}</span></p>
                </div>
                <p class="text-sm mt-1 ${faltasStatusClass}">
                    Faltas Restantes: <span class="font-bold">${faltasRestantes}</span>
                </p>
            </div>
        `;
    });
}


function renderDailyClasses() {
    calendarGrid.innerHTML = '';e

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
            dayClassesIndicatorClass = 'bg-blue-100 rounded-md relative group cursor-pointer';
            dayClassesHtml += `<div class="absolute hidden group-hover:block bg-blue-600 text-white text-xs rounded-md p-2 z-10 w-48 -mt-1 -ml-24 left-1/2 transform -translate-x-1/2 shadow-lg">`;
            classesForDay.forEach(cls => {
                dayClassesHtml += `<p class="font-bold">${cls.time} - ${cls.subject}</p><p>${cls.room}</p>`;
            });
            dayClassesHtml += `</div>`;
        }

        const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
        const todayClass = isToday ? 'border-2 border-blue-500 font-bold' : '';

        calendarGrid.innerHTML += `
            <div class="py-2 ${dayClassesIndicatorClass} ${todayClass}">
                ${day}
                ${dayClassesHtml}
            </div>
        `;
    }
}


// darkmode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';

    const themeToggleLink = document.querySelector('a[onclick="toggleDarkMode()"]');
    if (themeToggleLink) {
        themeToggleLink.innerHTML = currentTheme === 'dark' ? '<i class="fas fa-sun mr-2"></i> Tema Claro' : '<i class="fas fa-moon mr-2"></i> Tema Escuro';
    }
}

// Function to render vacancies based on their applied status
function renderVacancies() {
    availableVacanciesContent.innerHTML = '';
    appliedVacanciesContent.innerHTML = '';

    const available = allVacancies.filter(v => v.status === 'available');
    const applied = allVacancies.filter(v => v.status !== 'available');  //se não estiver disponível, está aplicada

    if (available.length === 0) {
        availableVacanciesContent.innerHTML = '<p class="text-gray-600 text-center col-span-full">Nenhuma vaga disponível no momento.</p>';
    } else {
        available.forEach(vacancy => {
            availableVacanciesContent.innerHTML += createVacancyCard(vacancy);
        });
    }

    if (applied.length === 0) {
        noAppliedVacanciesMessage.classList.remove('hidden');
    } else {
        noAppliedVacanciesMessage.classList.add('hidden');
        applied.forEach(vacancy => {
            appliedVacanciesContent.innerHTML += createVacancyCard(vacancy);
        });
    }

    document.querySelectorAll('.apply-button').forEach(button => {
        button.removeEventListener('click', handleApplyButtonClick); // Avoid duplicate listeners
        button.addEventListener('click', handleApplyButtonClick);
    });
}

function createVacancyCard(vacancy) {
    const isApplied = vacancy.status !== 'available';
    let buttonOrStatusHtml = '';

    if (isApplied) {
        let statusColorClass = '';
        let statusText = '';
        if (vacancy.status === 'pending') {
            statusText = 'Em espera';
            statusColorClass = 'text-orange-500';
        } else if (vacancy.status === 'accepted') {
            statusText = 'Aceito';
            statusColorClass = 'text-green-600';
        } else if (vacancy.status === 'rejected') {
            statusText = 'Rejeitado';
            statusColorClass = 'text-red-600';
        } else {
            statusText = 'Status Desconhecido';
            statusColorClass = 'text-gray-500';
        }
        buttonOrStatusHtml = `<p class="application-status text-center text-sm mt-2 ${statusColorClass} font-semibold">Status: ${statusText}</p>`;
    } else {
        buttonOrStatusHtml = `<button class="apply-button bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full">Candidatar-se</button>`;
    }

    return `
        <div class="bg-white p-6 rounded-lg shadow-md vacancy-card" data-id="${vacancy.id}">
            <h3 class="text-xl font-semibold text-gray-800 mb-2">${vacancy.title}</h3>
            <p class="text-gray-600 text-sm mb-3">Empresa: ${vacancy.company}</p>
            <p class="text-gray-600 text-sm mb-3">${vacancy.description}</p>
            <p class="text-gray-700 font-medium mb-3">Local: ${vacancy.location}</p>
            ${buttonOrStatusHtml}
        </div>
    `;
}

function handleApplyButtonClick() {
    const vacancyCard = this.closest('.vacancy-card');
    const vacancyId = parseInt(vacancyCard.dataset.id);
    const vacancy = allVacancies.find(v => v.id === vacancyId);

    if (vacancy && vacancy.status === 'available') {
        this.disabled = true;
        this.classList.remove('bg-green-500', 'hover:bg-green-600');
        this.classList.add('bg-gray-400', 'cursor-not-allowed');
        this.textContent = 'Candidatando...';

        setTimeout(() => {
            vacancy.status = 'pending';
            renderVacancies(); 
            showVacanciesTab('applied'); 
            showModal(`Você se candidatou à vaga "${vacancy.title}" com sucesso! Status: Em espera.`);
        }, 1500);
    }
}


function showVacanciesTab(tab) {
    if (tab === 'available') {
        availableVacanciesContent.classList.remove('hidden');
        appliedVacanciesContent.classList.add('hidden');
        btnAvailableVacancies.classList.add('active', 'bg-blue-500', 'text-white');
        btnAvailableVacancies.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        btnAppliedVacancies.classList.remove('active', 'bg-blue-500', 'text-white');
        btnAppliedVacancies.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
    } else if (tab === 'applied') {
        availableVacanciesContent.classList.add('hidden');
        appliedVacanciesContent.classList.remove('hidden');
        btnAppliedVacancies.classList.add('active', 'bg-blue-500', 'text-white');
        btnAppliedVacancies.classList.remove('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        btnAvailableVacancies.classList.remove('active', 'bg-blue-500', 'text-white');
        btnAvailableVacancies.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
    }
}

btnAvailableVacancies.addEventListener('click', () => showVacanciesTab('available'));
btnAppliedVacancies.addEventListener('click', () => showVacanciesTab('applied'));


function logout() {
    isLoggedIn = false;
    authPage.classList.remove('hidden');
    mainApp.classList.add('hidden');

    authForm.reset();
    authTitle.textContent = 'Login'; 
    authButton.textContent = 'Entrar';
   
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
    
    allVacancies.forEach(v => v.status = 'available');
    renderVacancies();
}

document.addEventListener('DOMContentLoaded', renderVacancies);