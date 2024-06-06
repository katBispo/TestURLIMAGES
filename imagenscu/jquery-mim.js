$(document).ready(function() {
    // Verifica se a query string 'token' está presente na URL
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get('?FUNCIONA');

    if (token !== null && token !== undefined && token === 'true') {
        // Token válido, permitir acesso aos arquivos
        // Coloque o código aqui para mostrar ou listar os arquivos da pasta
        console.log('Acesso permitido!');
    } else {
        // Token inválido, redirecionar para o portal de login
        window.location.href = 'https://sua_url_do_portal_de_login';
    }
});
