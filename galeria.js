window.onload = function() {
    const directory = '/imagenscu';
    const galleryElement = document.getElementById('gallery');
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

    function getImages() {
        fetch(directory)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const links = Array.from(doc.querySelectorAll('a[href]'))
                    .filter(link => {
                        const href = link.getAttribute('href');
                        const ext = href.split('.').pop().toLowerCase();
                        return imageExtensions.includes(ext);
                    });
                renderImageLinks(links);
            })
            .catch(error => console.error('Erro ao obter imagens:', error));
    }

    function renderImageLinks(links) {
        const ul = document.createElement('ul');
        galleryElement.appendChild(ul);

        links.forEach(link => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = directory + '/' + link.getAttribute('href').split('/').pop();
            a.textContent = link.getAttribute('href').split('/').pop();
            a.target = '_blank'; // Abre a imagem em uma nova aba
            li.appendChild(a);
            ul.appendChild(li);
        });
    }

    getImages();
};
