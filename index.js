const puppeteer = require('puppeteer');

async function getPage() {
    let optins={
        defaultViewport :{
            width :1400,
            height:800
        } ,
        headless: false 
    };
    const browser = await puppeteer.launch(optins);
    const page = await browser.newPage();
    await page.goto('https://www.dytt8.net/html/gndy/index.html');
    //await page.screenshot({path: 'example.png'});

    page.$$eval("#menu ul li a",(elements)=>{
        elements.forEach((item,i)=>{
            console.log(item.innerHTML);
        })
    });

    page.on("console",(...args)=>{
        console.log(args);
    })

    //await browser.close();
}

getPage();