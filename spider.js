const puppeteer = require('puppeteer');

let httpUrl = "https://sobooks.cc/";
(async function () {
    let debugOptions = {
        defaultViewport: {
            width: 1400,
            height: 800
        },
        headless: false,
        slowMo: 250
    };

    let options = {
        headless: true
    }
    const browser = await puppeteer.launch(debugOptions);

    // 获取总页数
    async function getAlNum() {
        let page = await browser.newPage();
        await page.goto(httpUrl);
        let pageNum = await page.$eval(".pagination li:last-child span", (element) => {
            let text = element.innerHTML;
            // console.log(text);
            text = text.substring(1, text.length - 1);
            return text
        })
        return pageNum;
    }

    // let pageNum = await getAlNum();
    // console.log(pageNum);
    // 获取page列表
    async function pageList(num) {
        let pageListUrl = "https://sobooks.cc/page/" + num;
        let page = await browser.newPage();
        //访问列表页
        await page.goto(pageListUrl);
        let arrPage = await page.$$eval(".cardlist .card-item .thumb-img>a", (elements) => {
            let arr = [];
            elements.forEach((item, i) => {
                var obj = {
                    href: item.getAttribute("href"),
                    title: item.getAttribute("title")
                }
                arr.push(obj)
            })
            // console.log(arr);
            return arr;
        })

        //page.close();

        // arrPage.forEach((pageObj, i) => {
        //     getPageInfo(pageObj)
        // })
        getPageInfo(arrPage[0]);
    }

    let arr = await pageList(1);
    // console.log(arr);
    // 通过地址和标题去请求书籍详情页
    async function getPageInfo(pageObj) {
        let page = await browser.newPage();
        //访问列表页
        await page.goto(pageObj.href);
        let inputEle = await page.$(".euc-y-i");
        await inputEle.focus();
        await page.keyboard.type('543578');
        let btnEle=await page.$(".euc-y-s");

        await Promise.all([
            page.waitForNavigation(), // The promise resolves after navigation has finished
            await btnEle.click(), // 点击该链接将间接导致导航(跳转)
          ]);

        // page.waitForNavigation();
        // await btnEle.click();
        
        //await page.keyboard.press('Enter');

        // await elementHandle.type('543578');
        // await elementHandle.press('Enter');
        // await page.reload(pageObj.href);
        //await page.waitForNavigation();
        //page.waitForSelector(".e-secret b a")
        //await page.reload();
        let eleA = await page.$(".e-secret b a");
        console.log(eleA);

        let aHref = await eleA.getProperty("href");
        console.log(aHref);

    }

    async function setPageInfo(pageObj){
        let page = await browser.newPage();
        //访问列表页
        await page.goto(pageObj.href);
        let inputEle = await page.$(".euc-y-i");
        await inputEle.focus();
        await page.keyboard.type('543578');
        await page.keyboard.press('Enter');
        //page.close();
    }
})();


