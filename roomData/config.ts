// 数据来自美团

type IRegionURLMap = {
  name: string
  filename: string
  url: string
}[]

export const headers = {
  Cookie:
    '_lxsdk_cuid=184f5d142e2c8-0c7c5749ae548a-26021151-1fa400-184f5d142e3c8; WEBDFPID=106399343x0957zwz1uv66v9z593x5uv815uzz0vv3897958v72y724v-1986012751388-1670652750785AAAQKKMfd79fef3d01d5e9aadc18ccd4d0c95072900; iuuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900; _lxsdk=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900; cityname=%E9%98%B3%E6%B1%9F; _ga_95GX0SH5GM=GS1.1.1670832530.1.1.1670832649.0.0.0; webp=1; __utma=74597006.736970641.1670832530.1670995578.1670995578.1; __utmz=74597006.1670995578.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ga=GA1.1.736970641.1670832530; _ga_LYVVHCWVNG=GS1.1.1671514460.1.1.1671516210.0.0.0; IJSESSIONID=node0rk2tqnptb930bf9w7c7qg1qq1259161; ndr=i.meituan.com; uuid=8e89be4e602b48eb91a9.1671866580.1.0.0; ci3=285; rvct=1; latlng=21.862318%2C111.920631; ci=285; _lx_utm=utm_source%3Dgoogle%26utm_medium%3Dorganic; token=AgHrI3dchFgBXwEm2gOUSF14NkVlHHr8YyQEkhjxJsL_CDEncDAyPoeMu63KtdC2nDMzznIWqoKxqgAAAACfFQAAhi5LtPzdp5u_zD6RIBR7ovhW_2waz_-sBJEPTeMInWQBaKK5SAXu-Jtdh9lNXBC8; mt_c_token=AgHrI3dchFgBXwEm2gOUSF14NkVlHHr8YyQEkhjxJsL_CDEncDAyPoeMu63KtdC2nDMzznIWqoKxqgAAAACfFQAAhi5LtPzdp5u_zD6RIBR7ovhW_2waz_-sBJEPTeMInWQBaKK5SAXu-Jtdh9lNXBC8; oops=AgHrI3dchFgBXwEm2gOUSF14NkVlHHr8YyQEkhjxJsL_CDEncDAyPoeMu63KtdC2nDMzznIWqoKxqgAAAACfFQAAhi5LtPzdp5u_zD6RIBR7ovhW_2waz_-sBJEPTeMInWQBaKK5SAXu-Jtdh9lNXBC8; userId=3124971210; u=3124971210; isid=AgHrI3dchFgBXwEm2gOUSF14NkVlHHr8YyQEkhjxJsL_CDEncDAyPoeMu63KtdC2nDMzznIWqoKxqgAAAACfFQAAhi5LtPzdp5u_zD6RIBR7ovhW_2waz_-sBJEPTeMInWQBaKK5SAXu-Jtdh9lNXBC8; i_extend=E267663374782597126299091746169757853733_c0_e6079179898000492301_anull_o1_dhotelpoitagb_k1002_b400202Gempty__xhotelhomepage__yselect__zday; _lxsdk_s=1854cdc117d-fe0-04f-fd9%7C%7C66'
}

export const regionURLMap: IRegionURLMap = [
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
  },
  {
    name: '潮州',
    filename: 'chaozhou',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=30&offset=0&cityId=287&ci=287&startendday=20221226~20221226&startDay=20221226&endDay=20221226&attr_28=129&sort=defaults&userid=3124971210&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.862318'
  },
  {
    name: '清远',
    filename: 'qingyuan',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=30&offset=0&cityId=286&ci=286&startendday=20221226~20221226&startDay=20221226&endDay=20221226&attr_28=129&sort=defaults&userid=3124971210&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.862318'
  },
  {
    name: '江门',
    filename: 'jiangmen',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=30&offset=0&cityId=277&ci=277&startendday=20221226~20221226&startDay=20221226&endDay=20221226&attr_28=129&sort=defaults&userid=3124971210&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.862318'
  },
  {
    name: '湛江',
    filename: 'zhanjiang',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=30&offset=0&cityId=278&ci=278&startendday=20221226~20221226&startDay=20221226&endDay=20221226&attr_28=129&sort=defaults&userid=3124971210&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.862318'
  },
  {
    name: '茂名',
    filename: 'maoming',
    url: 'https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=30&offset=0&cityId=279&ci=279&startendday=20221226~20221226&startDay=20221226&endDay=20221226&attr_28=129&sort=defaults&userid=3124971210&uuid=43EC326BD7BD595FCD8D84C55024269801BEF4E7DBB4C12B62B8C9CB5DD2E900&accommodationType=1&lng=21.862318'
  }
]

export function getRoomDetailUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}?utm_medium=touch&version_name=999.9&platformid=1&start=1670544000000&end=1670630400000&mypos=21.861876&lat=21.861876&gpsCityId=285&cityId=285&subtype=0&type=1&isRecommend=0`
}

export function getImgUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}/imgs?utm_medium=touch&version_name=999.9&platformid=1&classified=true`
}
