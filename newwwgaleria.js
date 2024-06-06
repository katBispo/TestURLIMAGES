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
                const latestImage = getLatestImage(links);
                displayImage(latestImage);
            })
            .catch(error => console.error('Erro ao obter imagens:', error));
    }

    function getLatestImage(links) {
        if (links.length === 0) {
            return null;
        }

        let latestImage = links[0];
        let latestTime = extractDateTimeFromName(latestImage.getAttribute('href'));

        links.forEach(link => {
            const dateTime = extractDateTimeFromName(link.getAttribute('href'));
            if (dateTime > latestTime) {
                latestTime = dateTime;
                latestImage = link;
            }
        });

        return latestImage;
    }

    function extractDateTimeFromName(name) {
        const regex = /RGVP_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/;
        const match = name.match(regex);
        if (match) {
            const [_, year, month, day, hour, minute, second] = match.map(Number);
            return new Date(year, month - 1, day, hour, minute, second).getTime();
        }
        return 0;
    }

    function displayImage(link) {
        galleryElement.innerHTML = ''; // Limpa o conteúdo existente
        if (link) {
            const img = document.createElement('img');
            img.src = directory + '/' + link.getAttribute('href').split('/').pop();
            img.alt = 'Última imagem adicionada';
            galleryElement.appendChild(img);
        } else {
            galleryElement.textContent = 'Nenhuma imagem encontrada.';
        }
    }

    getImages();

    window.setInterval(getImages, 1000); // 60000 milissegundos = 60 segundos
};
