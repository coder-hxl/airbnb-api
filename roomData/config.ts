// 数据来自美团

export const headers = {
  Cookie: 'xxx'
}

export const regionURLMap = [
  {
    name: '十里银滩',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=33&offset=0&cityId=285&ci=285&startendday=20221215~20221215&startDay=20221215&endDay=20221215&q=%E5%8D%81%E9%87%8C%E9%93%B6%E6%BB%A9&ste=_b400201&attr_28=129&sort=defaults&userid=3839670455&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&keyword=%E5%8D%81%E9%87%8C%E9%93%B6%E6%BB%A9&lng=21.877616'
  },
  {
    name: '广州',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=30&offset=0&cityId=20&ci=20&startendday=20221215~20221215&startDay=20221215&endDay=20221215&ste=_b400201&attr_28=129&sort=defaults&userid=3839670455&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.877616'
  },
  {
    name: '佛山',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=22&offset=0&cityId=92&ci=92&startendday=20221215~20221215&startDay=20221215&endDay=20221215&ste=_b400201&attr_28=129&sort=defaults&userid=3839670455&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.877616'
  },
  {
    name: '台北',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=16&offset=0&cityId=401&ci=401&startendday=20221215~20221215&startDay=20221215&endDay=20221215&ste=_b400201&attr_28=129&sort=defaults&userid=3839670455&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.877616'
  },
  {
    name: '新北',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=10&offset=0&cityId=704&ci=704&startendday=20221215~20221215&startDay=20221215&endDay=20221215&ste=_b400201&attr_28=129&sort=defaults&userid=3839670455&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.877616'
  },
  {
    name: '长沙',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=18&offset=0&cityId=70&ci=70&startendday=20221215~20221215&startDay=20221215&endDay=20221215&ste=_b400201&attr_28=129&sort=defaults&userid=3839670455&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.877616'
  },
  {
    name: '永州',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=18&offset=0&cityId=272&ci=272&startendday=20221215~20221215&startDay=20221215&endDay=20221215&ste=_b400201&attr_28=129&sort=defaults&userid=3839670455&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.877616'
  }
]

export function getRoomDetailUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}?utm_medium=touch&version_name=999.9&platformid=1&start=1670544000000&end=1670630400000&mypos=21.861876&lat=21.861876&gpsCityId=285&cityId=285&subtype=0&type=1&isRecommend=0`
}

export function getImgUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}/imgs?utm_medium=touch&version_name=999.9&platformid=1&classified=true`
}
