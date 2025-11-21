⚙️ Base de Prestação de Serviços de TI & Analisador de Upgrade
Uma aplicação web leve para consulta de serviços de TI e análise básica de hardware com dicas de upgrade.
Este projeto funciona como uma base de conhecimento rápida para técnicos de informática e, ao mesmo tempo, oferece uma ferramenta interativa para análise e sugestão de upgrades de computadores.

✨ Recursos Principais (Features)

🔍 Motor de Busca de Serviços: Permite pesquisar serviços de TI (ex: formatação, drivers, backup) em uma base de conhecimento interna (data.json).

💡 Analisador de Upgrade de Hardware: Uma ferramenta interativa que recebe informações de hardware (Processador/Geração, RAM, Armazenamento) e fornece recomendações de upgrade personalizadas.

🌗 Alternância de Tema (Dark/Light Mode): Possibilidade de alternar entre o tema escuro (padrão) e o tema claro, com a preferência salva no Local Storage.

🔗 Links Úteis Integrados: Os resultados da busca de serviços podem incluir links diretos para downloads de software ou páginas de suporte de fabricantes (ex: Windows 11, Drivers Dell).

📱 Design Responsivo: O layout é otimizado para dispositivos móveis, garantindo boa usabilidade em diferentes tamanhos de tela.

🎨 Variáveis CSS: Uso de variáveis CSS (:root) para gerenciamento fácil e consistente de cores e temas.

🛠️ Tecnologias UtilizadasO projeto é construído com tecnologias web básicas, focando em leveza e rapidez:HTML5 (index.html): Estrutura da página e do formulário de análise de hardware.CSS3 (layout.css): Estilização, variáveis CSS e Media Queries para responsividade.JavaScript Vanilla (script.js): Lógica de busca, carregamento de dados, controle de tema e a função de análise de hardware.JSON (data.json): Estrutura de dados para a base de conhecimento dos serviços.

💡 Como a Análise de Upgrade Funciona?A função analisarUpgrade no script.js processa os dados de hardware fornecidos pelo usuário e aplica uma lógica de regras simples:Tipo de Armazenamento: Se for detectado um hdd, é recomendado um Upgrade Urgente para SSD.Capacidade de Armazenamento: Se for menor que 256GB, é sugerido aumentar o espaço para mais tranquilidade.Memória RAM:Se for menor que 8GB, é recomendada a atualização para 8GB ou 16GB.Se for menor que 16GB (mas 8GB ou mais), é sugerida a atualização para 16GB para tarefas mais exigentes.Geração do Processador: Se a geração for menor que 8, é sinalizado que o processador pode ser um gargalo a longo prazo.

📝 Estrutura de ArquivosArquivoFunçãoindex.htmlEstrutura principal, incluindo cabeçalho, barra de busca, o contêiner de cards e a seção de análise de upgrade.layout.cssDefine a aparência visual, o tema Dark/Light e a adaptação a dispositivos móveis.script.jsContém a lógica de inicialização, a função iniciarBusca(), o controle de tema e a função analisarUpgrade().data.jsonBase de dados com os serviços, descrições, links e tags para pesquisa.
