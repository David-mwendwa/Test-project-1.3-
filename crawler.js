const fs = require("fs");
const nodeFetch = require("node-fetch");
const fetch = require("fetch-cookie")(nodeFetch);

let url = "http://kenyalaw.org/caselaw/cases/advanced_search/";

const from = "01 Dec 1999";
const to = "14 Jan 2000";
let i = 1;

async function getCases(page) {
  try {
    if (page > 30) {
      return;
    } else {
      if (page) {
        url = "http://kenyalaw.org/caselaw/cases/advanced_search/" + "page/" + page;
        page += 10;
      }
      console.log(url);

      const res = await fetch(url, {
        method: "post",
        body: `content=&subject=&case_number=&parties=&date_from=${from}&date_to=${to}&submit=Search`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
       
      const html = await res.text();
      
      fs.writeFile(`result${i}.html`, JSON.stringify(html), () => true);
      console.log(`page ${i} saved to result${i}.html successfully`);
      i = i + 1;
      

      page ? getCases(page) : getCases(10);
    }
  } catch (err) {
    console.error(err);
  }
}

getCases();