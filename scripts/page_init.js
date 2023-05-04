function gen_head(){
    document.write(
        '<title>OgamePortfolio</title>\n' + 
        '<link rel="icon" href="favicon.ico">\n' +
        '<link rel="icon" type="image/png" href="../images/icon.jpg"></link>'
    );
}

function url_rewrite(){
    window.location.href = window.location.href.replace(/\.html$/, '');
}