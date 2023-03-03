import xCrawl from 'x-crawl'

const myXCrawl = xCrawl({
  timeout: 10000,
  intervalTime: { max: 3000, min: 2000 }
})
