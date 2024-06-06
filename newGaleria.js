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
              renderImageLink(latestImage);
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
      // Example name: RGVP_20240523_103226
      const regex = /RGVP_(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/;
      const match = name.match(regex);
      if (match) {
          const [_, year, month, day, hour, minute, second] = match.map(Number);
          return new Date(year, month - 1, day, hour, minute, second).getTime();
      }
      return 0;
  }

  function renderImageLink(link) {
      galleryElement.innerHTML = ''; // Clear existing content
      if (link) {
          const ul = document.createElement('ul');
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = directory + '/' + link.getAttribute('href').split('/').pop();
          a.textContent = link.getAttribute('href').split('/').pop();
          a.target = '_blank'; // Open the image in a new tab
          li.appendChild(a);
          ul.appendChild(li);
          galleryElement.appendChild(ul);
      } else {
          galleryElement.textContent = 'Nenhuma imagem encontrada.';
      }
  }

  getImages();
};
