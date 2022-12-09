// 数据来自美团

export const headers = {
  Cookie:
    '_lxsdk_cuid=184f5d142e2c8-0c7c5749ae548a-26021151-1fa400-184f5d142e3c8; latlng=21.861876%2C111.920693; ci=285; cityname=%E9%98%B3%E6%B1%9F; lat=21.861876; lng=111.920693; ci3=285; IJSESSIONID=node0fp0oax9pds3x1k5uceyqr5b0s38214263; iuuid=2CDC55BFA0B20E14D12DE1563921BA893504F15021FCF292DF5D0EB71C14300A; ndr=i.meituan.com; _hc.v=ec7cf076-ef5b-84f4-36e4-bcda485976fe.1670571489; _lxsdk=2CDC55BFA0B20E14D12DE1563921BA893504F15021FCF292DF5D0EB71C14300A; WEBDFPID=u7xww058z95z57y61yw5vu5v3zv459yy815u4w8uv0197958zx18905x-1985931489827-1670571488265SGSWUUCfd79fef3d01d5e9aadc18ccd4d0c95071953; webp=1; uuid=62f2612616ed447db46b.1670571596.1.0.0; _lx_utm=utm_source%3Dgoogle%26utm_medium%3Dorganic; token=AgHyIJC_KcVosk3vAT9VmFDOZl2EEZ06woZEFd3y8oS5p8VvpDPJifZiWkRsD4Jz0hmciH881zLAWwAAAABaFQAAeSe9_7fLnyMZALd9QFl5xVZsUiQ4x4psaRzrJHT0I6-kLEn2xgImdX0W0XPk_aNQ; mt_c_token=AgHyIJC_KcVosk3vAT9VmFDOZl2EEZ06woZEFd3y8oS5p8VvpDPJifZiWkRsD4Jz0hmciH881zLAWwAAAABaFQAAeSe9_7fLnyMZALd9QFl5xVZsUiQ4x4psaRzrJHT0I6-kLEn2xgImdX0W0XPk_aNQ; oops=AgHyIJC_KcVosk3vAT9VmFDOZl2EEZ06woZEFd3y8oS5p8VvpDPJifZiWkRsD4Jz0hmciH881zLAWwAAAABaFQAAeSe9_7fLnyMZALd9QFl5xVZsUiQ4x4psaRzrJHT0I6-kLEn2xgImdX0W0XPk_aNQ; userId=3137579518; u=3137579518; isid=AgHyIJC_KcVosk3vAT9VmFDOZl2EEZ06woZEFd3y8oS5p8VvpDPJifZiWkRsD4Jz0hmciH881zLAWwAAAABaFQAAeSe9_7fLnyMZALd9QFl5xVZsUiQ4x4psaRzrJHT0I6-kLEn2xgImdX0W0XPk_aNQ; i_extend=E105458822414442576139879673204167058642_e7288227251037818333_c0_dhotelpoitagb_a%e6%b5%b7%e9%99%b5%e5%b2%9bnull_o1_k1002Gempty__xhotelhomepage__yselect__zday; _lxsdk_s=184f5d142e5-86c-330-f53%7C%7C77'
}

export function getRoomListUrl(searchName: string) {
  return `https://ihotel.meituan.com/hbsearch/HotelSearch?utm_medium=touch&version_name=999.9&platformid=1&cateId=20&newcate=1&limit=20&offset=0&cityId=285&ci=285&startendday=20221209~20221209&startDay=20221209&endDay=20221209&q=${searchName}&attr_28=129&sort=defaults`
}

export function getRoomDetailUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}?utm_medium=touch&version_name=999.9&platformid=1&start=1670544000000&end=1670630400000&mypos=21.861876&lat=21.861876&gpsCityId=285&cityId=285&subtype=0&type=1&isRecommend=0`
}

export function getImgUrl(roomId: number) {
  return `https://ihotel.meituan.com/group/v1/poi/${roomId}/imgs?utm_medium=touch&version_name=999.9&platformid=1&classified=true`
}
