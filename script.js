// script.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchEngineSelect = document.getElementById('search-engine-select');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Lógica do Tema Claro/Escuro ---
    const currentTheme = localStorage.getItem('theme'); // Pega o tema salvo no localStorage

    // Define o tema inicial. Se nenhum tema for salvo, o padrão é 'dark-mode'.
    // Caso contrário, usa o tema salvo.
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateThemeToggleIcon(currentTheme);
    } else {
        body.classList.add('dark-mode'); 
        updateThemeToggleIcon('dark-mode');
    }

    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeToggleIcon('light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeToggleIcon('dark-mode');
        }
        // Após a troca de tema, reaplica a cor neon do seletor para garantir consistência
        // Isso é crucial para que a sombra do seletor se ajuste corretamente.
        updateSelectNeonColor(); 
    }

    function updateThemeToggleIcon(theme) {
        if (theme === 'light-mode') {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para indicar modo escuro
        } else {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para indicar modo claro
        }
    }

    // --- Lógica da Busca e Seletor ---
    // Foca o campo de busca automaticamente ao carregar a página
    if (searchInput) {
        searchInput.focus();
    }

    // Objeto para mapear a opção selecionada para a URL de busca
    const searchEngines = {
        google: 'https://www.google.com/search?q=',
        brave: 'https://search.brave.com/search?q=',
        bing: 'https://www.bing.com/search?q=',
        startpage: 'https://www.startpage.com/do/dsearch?query=',
        duckduckgo: 'https://duckduckgo.com/?q=',
        yahoo: 'https://search.yahoo.com/search?p=',
        ecosia: 'https://www.ecosia.org/search?q='
    };

    // Função para aplicar a cor neon ao seletor
    function updateSelectNeonColor() {
        const selectedOption = searchEngineSelect.options[searchEngineSelect.selectedIndex];
        const neonColorVar = selectedOption.dataset.neonColor || 'var(--element-glow-default)'; 

        // Aplica a cor na borda principal do elemento
        searchEngineSelect.style.borderColor = neonColorVar;
        
        // Ajusta a intensidade da sombra de acordo com o tema
        if (body.classList.contains('light-mode')) {
            searchEngineSelect.style.boxShadow = `0 4px 10px rgba(0,0,0,0.1)`; // Sombra suave e definida no modo claro
        } else {
            searchEngineSelect.style.boxShadow = `0 0 18px ${neonColorVar}`; // Brilho neon no modo escuro
        }
        
        // Atualiza a variável CSS para que o ::before do seletor também pegue a cor (se ativo)
        searchEngineSelect.style.setProperty('--element-glow-default', neonColorVar);
    }

    // Função para realizar a busca
    function performSearch() {
        const query = searchInput.value.trim();
        const selectedEngine = searchEngineSelect.value;

        if (query.length === 0) {
            alert('Por favor, digite algo para buscar!');
            searchInput.focus();
            return;
        }

        const baseUrl = searchEngines[selectedEngine];
        if (!baseUrl) {
            alert('Buscador selecionado inválido. Por favor, recarregue a página.');
            return;
        }

        const fullSearchUrl = `${baseUrl}${encodeURIComponent(query)}`;
        window.open(fullSearchUrl, '_blank');
    }

    // Event Listeners
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    }

    // Adiciona evento de mudança ao seletor para atualizar a cor neon
    if (searchEngineSelect) {
        searchEngineSelect.addEventListener('change', updateSelectNeonColor);
        // Chama a função uma vez ao carregar a página para definir a cor inicial
        updateSelectNeonColor();
    }

    // Event Listener para o botão de alternar tema
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
});
