// Base de dados simulada de notícias
const noticias = [
    {
        id: 1,
        titulo: "Novo filme de Demon Slayer quebra recordes de bilheteria",
        categoria: "Animes",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvBf1_Vu4qTN0SwQdDXaDTjxHynhwtNLfvEswSeIvVkDYQrPBW7SP1bjSmUr3gDRfaTIvdag&s=10",
        resumo: "A nova adaptação cinematográfica superou todas as expectativas na semana de estreia."
    },
    {
        id: 2,
        titulo: "Mangá de One Piece entra em arco decisivo segundo autor",
        categoria: "Mangás",
        imagem: "https://radiogeekbr.com.br/wp-content/uploads/2026/07/radiogeekbr-1785381915-696x597.jpg.webp",
        resumo: "Eiichiro Oda confirma em entrevista que os próximos capítulos definirão o fim da jornada."
    },
    {
        id: 3,
        titulo: "Novo RPG de ação baseado em Jujutsu Kaisen é anunciado",
        categoria: "Games",
        imagem: "https://imgeucdn.gamespress.com/cdn/files/Games%20Press/2025/08/271022-d4339c1b/01.jpg?w=533&mode=max&otf=y&quality=90&format=jpg&bgcolor=white&sky=1df0c7b02f2c89395d01d86f317acf452c9b7cb992b8c0178dce459c0fcc6d08",
        resumo: "O jogo estará disponível para PC e consoles da última geração no final deste ano."
    },
    {
        id: 4,
        titulo: "Chainsaw Man: Segunda temporada ganha primeiro teaser oficial",
        categoria: "Animes",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE_OV_1bs4c6nPA28HZkscFJDWZhPq_X3RunaEa52Ihg&s=10",
        resumo: "O estúdio MAPPA divulgou as primeiras cenas da animação com qualidade impressionante."
    }
];

// Alternador de Tema Dark/Light
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
});

// Renderizar notícias no DOM
function renderizarNoticias(lista) {
    const grid = document.getElementById('newsGrid');
    grid.innerHTML = '';

    if(lista.length === 0) {
        grid.innerHTML = `<p class="text-gray-400 col-span-2 text-center py-8">Nenhuma notícia encontrada.</p>`;
        return;
    }

    lista.forEach(item => {
        const card = `
            <article class="bg-white dark:bg-brand-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition">
                <img src="${item.imagem}" alt="${item.titulo}" class="w-full h-40 object-cover">
                <div class="p-4">
                    <span class="text-xs font-bold text-brand-purple bg-purple-500/10 px-2 py-1 rounded">${item.categoria}</span>
                    <h3 class="font-bold text-md mt-2 line-clamp-2">${item.titulo}</h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">${item.resumo}</p>
                </div>
            </article>
        `;
        grid.innerHTML += card;
    });
}

// Filtro por Categoria
function filtrarCategoria(cat) {
    if (cat === 'todas') {
        renderizarNoticias(noticias);
    } else {
        const filtradas = noticias.filter(n => n.categoria === cat);
        renderizarNoticias(filtradas);
    }
}

// Busca por Palavra-Chave
function buscarNoticia() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const resultado = noticias.filter(n => 
        n.titulo.toLowerCase().includes(termo) || 
        n.resumo.toLowerCase().includes(termo)
    );
    renderizarNoticias(resultado);
}

// Gerenciador de Comentários
function adicionarComentario(event) {
    event.preventDefault();
    const autor = document.getElementById('authorInput').value;
    const texto = document.getElementById('commentInput').value;
    const commentsList = document.getElementById('commentsList');

    const novoComentario = document.createElement('div');
    novoComentario.className = "bg-gray-100 dark:bg-gray-800 p-2.5 rounded text-xs border-l-2 border-brand-accent";
    novoComentario.innerHTML = `<strong>${autor}:</strong> <p class="text-gray-400 mt-0.5">${texto}</p>`;

    commentsList.prepend(novoComentario);
    
    // Limpar campos
    document.getElementById('authorInput').value = '';
    document.getElementById('commentInput').value = '';
}

// Inicializar renderização
document.addEventListener('DOMContentLoaded', () => renderizarNoticias(noticias));