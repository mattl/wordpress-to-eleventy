// fetch WordPress posts
const
  domainName = process.env.DOMAIN_NAME;
  wordpressAPI = 'https://' + domainName + '/wp-json/wp/v2/posts?orderby=date&order=desc&per_page=100',
  fetch = require('node-fetch');

// fetch number of WordPress post pages
async function wpPostPages() {

  try {

    const res = await fetch(`${ wordpressAPI }&_fields=id&page=1`);
    console.log ("Found " + res.headers.get('X-WP-TotalPages') + " posts");
    return res.headers.get('X-WP-TotalPages') || 0;

  }
  catch(err) {
    console.log(`WordPress API call failed: ${err}`);
    return 0;
  }

}

// fetch list of WordPress posts
async function wpPosts(page = 1) {

  try {

    const
      res = await fetch(`${ wordpressAPI }&_fields=id,slug,date,title,excerpt,content&page=${ page }`),
      json = await res.json();

    // return formatted data
    return json
      .filter(p => p.content.rendered && !p.content.protected)
      .map(p => {
        return {
          slug: p.slug,
          date: new Date(p.date),
          dateYMD: dateYMD(p.date),
          dateURL: dateURL(p.date),
          dateFriendly: dateFriendly(p.date),
          title: p.title.rendered,
          excerpt: wpStringClean(p.excerpt.rendered),
          content: wpStringClean(p.content.rendered)
        };
      });

  }
  catch (err) {
    console.log(`WordPress posts API call failed: ${err}`);
    return null;
  }

}


// pad date digits
function pad(v = '', len = 2, chr = '0') {
  return String(v).padStart(len, chr);
}

// format date as YYYY/MM/DD
function dateURL(d) {

  d = new Date(d);
  return d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate());

}

// format date as YYYY-MM-DD
function dateYMD(d) {

  d = new Date(d);
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

}

// format friendly date
function dateFriendly(d) {

  const toMonth = new Intl.DateTimeFormat('en', { month: 'long' });
  d = new Date(d);
  return d.getDate() + ' ' + toMonth.format(d) + ', ' + d.getFullYear();

}


// clean WordPress strings
function wpStringClean(str) {

  return str
    .replace(/https:\/\/blog.mat.tl/ig, '')
    .trim();

}

// process WordPress posts
module.exports = async function() {

  const posts = [];

  // get number of pages
  const wpPages = await wpPostPages();
  //const wpPages = 50;
  if (!wpPages) return posts;

  // fetch all pages of posts
  const wpList = [];
  for (let w = 1; w <= wpPages; w++) {
    wpList.push( wpPosts(w) );
  }

  const all = await Promise.all( wpList );
  return all.flat();

};