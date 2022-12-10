// 数据来自美团

export const headers = {
  Cookie: 'xxx'
}

export function getRoomListUrl(searchName: string) {
  return `https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=20&offset=0&cityId=285&ci=285&startendday=20221210~20221210&startDay=20221211&endDay=20221211&q=${searchName}&attr_28=129&sort=defaults`
}

export function getRoomDetailUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}?utm_medium=touch&version_name=999.9&platformid=1&start=1670544000000&end=1670630400000&mypos=21.861876&lat=21.861876&gpsCityId=285&cityId=285&subtype=0&type=1&isRecommend=0`
}

export function getImgUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}/imgs?utm_medium=touch&version_name=999.9&platformid=1&classified=true`
}
