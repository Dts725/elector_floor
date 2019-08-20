
export class _AddIcon {
    constructor({
        width = 38,
        height = 49,
        uri = ""
    }) {
        this.uri = uri,
            this.width = width,
            this.height = height
    }
    createIcorn() {
        // 创建一个 icon
        console.log(this.uri)
        return new AMap.Icon({
            size: new AMap.Size(this.width, this.height),
            image: this.uri,
            imageSize: new AMap.Size(this.width, this.height),
          
          
        });
    }
}
/***
 * 
 * @argument  {
 * lng : Number , //经度
 * lat : Number   // 纬度
 * }
 * 
 * 
 *  */
export class _Maker {
    constructor ({lng,lat,icon}) {
        this.lng =lng;
        this.lat = lat;
        this.icon = icon
    }
     maker () {
            // 将 icon 传入 marker
            return new AMap.Marker({
                position: new AMap.LngLat(this.lng, this.lat),
                icon: this.icon,
                offset: new AMap.Pixel(-13, -30)
            });
    }

}

// 创建海量点
