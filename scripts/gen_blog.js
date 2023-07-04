class headline {
    constructor(id_name, sentence) {
        this.id_name = id_name;
        this.sentence = sentence;
    }
}

function gen_footer(blog_num, page_num) {
    const blog_main = document.getElementById('blog-main-content');
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
    blog_main.innerHTML += html_content;
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

    const blog_main = document.getElementById('blog-main-content');
    blog_main.innerHTML = md;

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
    class BlogPage {
        constructor(title, date, id) {
            this.title = title;
            this.date = date;
            this.id = id;
        }
        
        toString() {
            var html_content = `<a href="../blog/?n=${this.id}" class="blog-card">`;
                html_content += '<div class="blog-card-title">';
                    html_content += this.title;
                html_content += '</div>';
                html_content += '<div class="blog-card-date">';
                    html_content += this.date;
                html_content += '</div>';
            html_content += '</a>';

            return html_content;
        }
    }
    const side_menu = document.getElementById('blog-side-menu');
    side_menu.remove();
    const blog_main = document.getElementById('blog-main-content');
    blog_main.style.width = '70%';
    blog_main.style.marginLeft = 'auto';
    blog_main.style.marginRight = 'auto';

    var blog_page_list = [];
    blog_page_list.push(new BlogPage('このサイトについて', '2023/05/11', 0));
    blog_page_list.push(new BlogPage('C++のDrogonを使ってみた', '2023/07/04', 1));

    var html_content = '<div class="blog-main-container">';
    html_content += '<div class="blog-main-container-headline">おがめのブログ</div>';
    html_content += '<div class="blog-main-list">';
    blog_page_list.forEach(element=>{html_content += element.toString()});
    html_content += '</div>';
    html_content += '</div>';

    blog_main.innerHTML = html_content;
}