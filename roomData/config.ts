// 数据来自美团

export const headers = {
  Cookie: 'xxx'
}

export const regionURLMap = [
  {
    name: '阳江',
    filename: 'yangjiang',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=100&offset=0&cityId=285&ci=285&startendday=20221222~20221222&startDay=20221222&endDay=20221222&ste=_b400202&attr_28=129&sort=defaults&userid=3137579518&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1'
  },
  {
    name: '海陵岛',
    filename: 'hailingdao',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=20&offset=0&cityId=285&ci=285&startendday=20221222~20221222&startDay=20221222&endDay=20221222&q=%E6%B5%B7%E9%99%B5%E5%B2%9B&ste=_b400202&attr_28=129&sort=defaults&userid=3137579518&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&keyword=%E6%B5%B7%E9%99%B5%E5%B2%9B&accommodationType=1'
  },
  {
    name: '阳东区',
    filename: 'yangdongqu',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=20&offset=0&cityId=285&ci=285&startendday=20221222~20221222&startDay=20221222&endDay=20221222&ste=_b400202&attr_28=129&sort=defaults&areaId=3687&userid=3137579518&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1'
  },
  {
    name: '广州',
    filename: 'guangzhou',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=100&offset=0&cityId=20&ci=20&startendday=20221222~20221222&startDay=20221222&endDay=20221222&ste=_b400202&attr_28=129&sort=defaults&userid=3137579518&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1'
  },
  {
    name: '深圳',
    filename: 'shenzhen',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=100&offset=0&cityId=30&ci=30&startendday=20221222~20221222&startDay=20221222&endDay=20221222&ste=_b400202&attr_28=129&sort=defaults&userid=3137579518&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1'
  },
  {
    name: '佛山',
    filename: 'foshan',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=100&offset=0&cityId=92&ci=92&startendday=20221222~20221222&startDay=20221222&endDay=20221222&ste=_b400202&attr_28=129&sort=defaults&userid=3137579518&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1'
  },
  {
    name: '珠海',
    filename: 'zhuhai',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=100&offset=0&cityId=108&ci=108&startendday=20221222~20221222&startDay=20221222&endDay=20221222&ste=_b400202&attr_28=129&sort=defaults&userid=3137579518&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1'
  }
]

export function getRoomDetailUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}?utm_medium=touch&version_name=999.9&platformid=1&start=1670544000000&end=1670630400000&mypos=21.861876&lat=21.861876&gpsCityId=285&cityId=285&subtype=0&type=1&isRecommend=0`
}

export function getImgUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}/imgs?utm_medium=touch&version_name=999.9&platformid=1&classified=true`
}
