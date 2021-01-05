const fs = require('fs');
const moment = require("moment");
const cheerio = require("cheerio");

fs.readFile('result3.html', 'utf8', (err, data) => {
  if (err) throw err;
  const html = JSON.parse(data, null, 2);
  const $ = cheerio.load(html);

  $('.post').each((i, ele) => {
    const post = $(ele);

    const title = post.find('h2').first().text().trim();
    
    const url = post.find('a').last().attr('href');
    
    let date = post
      .find('table > tbody tr:nth-child(2) td:last-child')
      .contents().not('span').text();
    
    date = new Date(date);
    date = moment(date).format('YYYY-MM-DD');

    const eachCase = {
      title: title,
      url: url,
      date: date
    }

    console.log(eachCase);  
  })
})

