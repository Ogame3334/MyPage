class headline {
    constructor(id_name, sentence) {
        this.id_name = id_name;
        this.sentence = sentence;
    }
}

/* <div class="blog-main-content-footer-button">
<a>&lt;&lt; 前の記事へ</a>
<a style="margin-left: auto;">次の記事へ &gt;&gt;</a>
</div> */

function gen_footer(blog_num, page_num) {
    const hoge = document.getElementById('blog-main-content');
    var html_content = ""
    html_content += '<div class="blog-main-content-footer">'
    html_content += '<a href="../blog/">ブログ一覧</a>';
    html_content += '<div class="blog-main-content-footer-buttons">';
    if(+blog_num > 0){
        html_content += `<a href="../blog/?n=${+blog_num - 1}">&lt;&lt; 前の記事へ</a>`;
    }
    if(+blog_num < page_num - 1){
        html_content += `<a href="../blog/?n=${+blog_num + 1}" style="margin-left: auto;">次の記事へ &gt;&gt;</a>`;
    }
    html_content += '</div>';
    html_content += '</div>';
    hoge.innerHTML += html_content;
}

function gen_side_menu_html(headline_list) {
    var side_menu = document.getElementById('blog-side-menu-inner-headline');
    side_menu.innerHTML = "<h2>目次</h2>\n";
    headline_list.forEach(element => {
        side_menu.innerHTML += `<li><a href="#${element.id_name}">${element.sentence}</a></li>\n`
    });
}

async function MDtoHtml(data, page_num) {
    var headline_list = [];

    await markdown.ready;

    var md = markdown.parse(data);
    md = md.replace('<table>', '<table border="1">');
    md = md.replace('<h1>', '<h1 id="title">');
    md = md.replaceAll('<a id="" class="anchor" aria-hidden="true" href="#"></a>', '');
    md = md.replaceAll('<h2>', '<h2 class="headline">');
    
    var i = 0;
    while(true) {
        var temp = md.replace('<h2 class="headline">', `<h2 class="headline anchor" id="headline-${i}">`);
        if(temp == md){
            break;
        }
        var temp_headline_name = temp.split(`id="headline-${i}">`)[1].split('</h2>')[0];
        temp_headline = new headline(`headline-${i}`, temp_headline_name);
        headline_list.push(temp_headline);
        md = temp;
        i++;
    }
    
    gen_side_menu_html(headline_list);

    const hoge = document.getElementById('blog-main-content');
    hoge.innerHTML = md;

    gen_footer(blog_num, page_num);
}

var blog_num = "";

var page_num = 0;

const param = window.location.search;
if(/\?n=\d/.test(param)) {
    fetch(`./page_num.txt`)
        .then(response => response.text())
        .then(data => {
            page_num = data;
        })
        .catch(error => {
            console.error(error);
        });

    blog_num = ('000' + param.replace('?n=', '')).slice(-3);
    
    fetch(`./page/blog_${blog_num}/blog_${blog_num}.md`)
        .then(response => response.text())
        .then(data => {
            MDtoHtml(data, page_num);
        })
        .catch(error => {
            console.error(error);
        });
}
else{

}