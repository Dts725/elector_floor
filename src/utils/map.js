const _ = require('lodash');


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
    constructor({
        lng,
        lat,
        icon
    }) {
        this.lng = lng;
        this.lat = lat;
        this.icon = icon
    }
    maker() {
        // 将 icon 传入 marker
        return new AMap.Marker({
            position: new AMap.LngLat(this.lng, this.lat),
            icon: this.icon,
            offset: new AMap.Pixel(-13, -30)
        });
    }

}
//海量点样式


export const _MapStyle = [

    {
        url: require('../static/icon/icon_map01.png'),
        anchor: new AMap.Pixel(38, 49),
        size: new AMap.Size(38, 49)
    },
    {
        url: require('../static/icon/icon_map02.png'),
        anchor: new AMap.Pixel(38, 49),
        size: new AMap.Size(38, 49)
    },
    {
        url: require('../static/icon/icon_map03.png'),
        anchor: new AMap.Pixel(38, 49),
        size: new AMap.Size(38, 49)
    },
    {
        url: require('../static/icon/icon_map04.png'),
        anchor: new AMap.Pixel(38, 49),
        size: new AMap.Size(38, 49)
    },
    {
        url: require('../static/icon/icon_map05.png'),
        anchor: new AMap.Pixel(38, 49),
        size: new AMap.Size(38, 49)
    },
]

// 创建海量点

export class _MoreMass {
    static massLocal = null
    constructor({
        data,
        map,
        style,
    

    }) {

        this.data = data
        this.map = map
        this.style = style
      
    }
    //绑定地图实例
    create() {
     
        //  设置卫星地图
        // this.stateLite(this.map)
        // let mass = 
        _MoreMass.massLocal = this.mass();

        let marker = this.maker()
        // 关闭信息框

        _MoreMass.massLocal.setMap(this.map)
        _MoreMass.massLocal.on('mouseover', function (e) {
      

            marker.setPosition(e.data.lnglat);
            marker.setLabel({
                content: e.data.name
            })
        });
        _MoreMass.massLocal.on('mouseout', function (e) {

            marker.setPosition(e.data.lnglat);
            marker.setLabel({
                content: ""
            })
        });
        //此处返回 保证全局只有一个map   实例
        return _MoreMass.massLocal

    }
    //海量点实例化
    mass() {
        // 坐标转换
        // let lnglat = super.translate(this.data);
        let lnglat = this.data

        return new AMap.MassMarks(lnglat, {
            opacity: 0.8,
            zIndex: 111,
            cursor: 'pointer',
            style: this.style
        });
    }

    //创建maker
    maker() {
        return new AMap.Marker({
            content: ' ',
            map: this.map
        });
    }
    // //清空海量点
  static  _clear() {
    
        _MoreMass.massLocal.clear()

    }

    // 卫星地图
    stateLite(map) {
        new AMap.TileLayer.Satellite({
            map: map,
        });
    }


    //设置覆盖物集合在事业中点

    setViewCenter({
        map,
        ArrayMarker
    }) {
        map.setFitView(ArrayMarker);
    }

    //添加地图插件
    addControl(map) {

        AMap.plugin(['AMap.ToolBar', 'AMap.MapType'], function () { //异步同时加载多个插件
            let toolbar = new AMap.ToolBar({
                position: {
                    top: '200px',
                    right: '300px'
                }
            });


            map.addControl(toolbar);



        });
    }

}

export class _ConvertFrom {
    constructor() {

        this.style = 'baidu'
    }

    translate(lnglat) {


        return new Promise(resolve => {
            AMap.convertFrom(lnglat, 'baidu', (status, result) => {
                if (result.info === 'ok') {


                    let res = result.locations


                    resolve([res[0].lng, res[0].lat]) // Array.<LngLat>
                }
            })
        })



    }


    // // 地址解析 
    static geocoder(address) {


        return new Promise(resolve => {
            AMap.service("AMap.Geocoder", function () {
                var geocoder = new AMap.Geocoder({
                    radius: 1000,
                    extensions: "all",
                    city: "021"
                });
                geocoder.getLocation(address, function (status, result) {
                    if (status === "complete" && result.info === "OK") {

                        resolve(result.geocodes)
                    }
                });
            });
        })
    }
}




//标注信息框
export class _InfoWindow {
    static infoBody = null
    constructor({
        position = "middle-left",
        address,
        map,
        lnglat,

    }) {
        this.position = position
        this.address = address
        this.map = map
        this.lnglat = lnglat

    }
    // 设置信息窗
    infoWindow() {
        return new AMap.InfoWindow({
            anchor: this.position,
            content: this.address,
            offset: new AMap.Pixel(0, -35)
        });
    }
    open() {
        _InfoWindow.infoBody = this.infoWindow();
        return _InfoWindow.infoBody.open(this.map, this.lnglat);
    }

    //打开的实体
    static close() {

        _InfoWindow.infoBody.close()
    }

}

// 添加控件

export class _AddControl {
    constructor(map) {
        this.map = map;
    }

    add() {
        let map = this.map;
        AMapUI.loadUI(["control/BasicControl"], function (BasicControl) {
            //添加一个缩放控件
            map.addControl(
                new BasicControl.Zoom({
                    position: "lt"
                })
            );

            //缩放控件，显示Zoom值
            map.addControl(
                new BasicControl.Zoom({
                    position: "lb",
                    showZoomNum: true
                })
            );

            //图层切换控件
            map.addControl(
                new BasicControl.LayerSwitcher({
                    position: "rt"
                })
            );
        });
    }
}