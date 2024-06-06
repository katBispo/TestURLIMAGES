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
              renderImages(links);
          })
          .catch(error => console.error('Erro ao obter imagens:', error));
  }

// Função para renderizar as imagens na página
function renderImages(links) {
  const ul = document.createElement('ul');
  ul.style.listStyleType = 'none'; // Remova os marcadores de lista
  galleryElement.appendChild(ul);

  links.forEach(link => {
      const li = document.createElement('li');
      const img = new Image();
      img.src = directory + link.getAttribute('href');
      img.alt = link.textContent;
      img.style.maxWidth = '200px'; // Defina o tamanho desejado
      img.style.cursor = 'pointer';
      img.onclick = () => openImage(img.src);
      li.appendChild(img);
      ul.appendChild(li);
  });
}


  function openImage(src) {
      window.open(src, '_blank');
  }

  getImages();
};
