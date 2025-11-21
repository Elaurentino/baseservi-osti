let cardContainer = document.querySelector(".card-container");
const searchInput = document.querySelector('input[type="text"]');
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const hardwareForm = document.getElementById('hardware-form');
let dados = [];

// Carrega os dados do JSON uma vez quando a página é carregada.
window.addEventListener('DOMContentLoaded', async () => {
    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggleButton.textContent = '🌙';
    } else {
        themeToggleButton.textContent = '☀️';
    }

    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        mostrarMensagemBoasVindas(); // Mostra a mensagem de boas-vindas após carregar os dados
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        cardContainer.innerHTML = "<p>Não foi possível carregar os dados da base de conhecimento.</p>";
    }

    // Adiciona o listener para o formulário de hardware
    if (hardwareForm) {
        hardwareForm.addEventListener('submit', analisarUpgrade);
    }

});

// Event listener para o botão de alternar tema
themeToggleButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
        themeToggleButton.textContent = '🌙';
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleButton.textContent = '☀️';
    }
});

function iniciarBusca() {
    const termoBusca = searchInput.value.toLowerCase().trim();

    if (!termoBusca) {
        // Se a busca estiver vazia, mostra a mensagem de boas-vindas novamente
        mostrarMensagemBoasVindas();
        return;
    }

    const resultados = dados.filter(item => {
        const nome = item.nome ? item.nome.toLowerCase() : '';
        const descricao = item.descricao ? item.descricao.toLowerCase() : ''; // Corrigido para 'descricao'
        const servicos = item.serviços ? item.serviços.toLowerCase() : '';

        return nome.includes(termoBusca) ||
               descricao.includes(termoBusca) ||
               servicos.includes(termoBusca) || (item.tags && item.tags.includes(termoBusca));
    });

    renderizarCards(resultados);
}

function analisarUpgrade(event) {
    event.preventDefault(); // Impede o recarregamento da página

    const memoria = parseInt(document.getElementById('memoria').value);
    const armazenamento = document.getElementById('armazenamento').value;
    const geracao = parseInt(document.getElementById('geracao').value);
    const armazenamento_gb = parseInt(document.getElementById('armazenamento_gb').value);

    let recommendations = [];

    // 1. Análise de Armazenamento
    if (armazenamento === 'hdd') {
        recommendations.push({
            title: "Upgrade Urgente: Troque seu HDD por um SSD",
            description: "A substituição do seu disco rígido (HDD) por um SSD (Solid State Drive) é a melhoria de maior impacto que você pode fazer. O sistema operacional e os programas iniciarão muito mais rápido, e o computador ficará mais ágil."
        });
    }

    // 1.5. Análise de Capacidade de Armazenamento
    if (armazenamento_gb < 256) {
        recommendations.push({
            title: "Considere Aumentar o Espaço de Armazenamento",
            description: `Com ${armazenamento_gb}GB de espaço, você pode ficar sem armazenamento rapidamente com novos programas e arquivos. Considere um upgrade para um SSD de pelo menos 512GB para ter mais tranquilidade.`
        });
    }
    // 2. Análise de Memória RAM
    if (memoria < 8) {
        recommendations.push({
            title: "Aumente sua Memória RAM para 8GB ou 16GB",
            description: `Você tem ${memoria}GB de RAM. Para tarefas modernas e multitarefa, o ideal é ter pelo menos 8GB. Se você joga ou usa programas pesados, considere um upgrade para 16GB para uma experiência mais fluida.`
        });
    } else if (memoria < 16) {
        recommendations.push({
            title: "Considere Aumentar a Memória RAM para 16GB",
            description: `Com ${memoria}GB de RAM, sua máquina já é capaz. No entanto, se você usa softwares de edição, virtualização ou joga títulos recentes, um upgrade para 16GB pode eliminar gargalos e melhorar o desempenho geral.`
        });
    }

    // 3. Análise de Processador (baseado na geração)
    if (geracao < 8) {
        recommendations.push({
            title: "Processador de Geração Mais Antiga",
            description: `Seu processador é de uma geração (${geracao}ª) mais antiga. Embora ainda funcional, ele pode ser um gargalo para upgrades futuros de placa de vídeo e para rodar softwares mais exigentes. Um upgrade de plataforma (placa-mãe + CPU + RAM) pode ser considerado a longo prazo.`
        });
    }

    const recommendationsContainer = document.getElementById('upgrade-recommendations');
    recommendationsContainer.innerHTML = '<h3>Recomendações de Upgrade:</h3>';

    if (recommendations.length > 0) {
        recommendations.forEach(rec => {
            recommendationsContainer.innerHTML += `<article class="card"><h2>${rec.title}</h2><p>${rec.description}</p></article>`;
        });
    } else {
        recommendationsContainer.innerHTML += '<p>Sua máquina parece bem equilibrada! No momento, não há sugestões óbvias de upgrade com base nas informações fornecidas.</p>';
    }
}

function mostrarMensagemBoasVindas() {
    cardContainer.innerHTML = `
        <div class="welcome-message">
            <h3>Bem-vindo à Base de Prestação de Serviços</h3>
            <p>Utilize a barra de busca acima para encontrar informações sobre serviços, procedimentos e links úteis.</p>
            <p>Você pode pesquisar por termos como "formatação", "drivers", "backup", etc.</p>
        </div>
    `;
}

function renderizarCards(resultados) {
    // Limpa os cards antigos antes de renderizar os novos
    cardContainer.innerHTML = "";

    if (resultados.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum serviço encontrado para o termo pesquisado.</p>";
        return;
    }

    for (const item of resultados) {
        let article = document.createElement("article");
        article.classList.add("card");

        let content = `<h2>${item.nome}</h2><p>${item.descricao || ''}</p>`; // Corrigido para 'descricao'

        if (item.serviços) {
            content += `<p><strong>Serviços:</strong> ${item.serviços}</p>`;
        }

        if (item.links && item.links.length > 0) {
            item.links.forEach(link => {
                content += `<p><a href="${link.url}" target="_blank">${link.nome}</a></p>`;
            });
        }
        article.innerHTML = content;
        cardContainer.appendChild(article);
    }
}
