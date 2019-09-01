const _ = require("lodash");

export class _AddIcon {
  constructor({ width = 38, height = 49, uri = "" }) {
    (this.uri = uri), (this.width = width), (this.height = height);
  }
  createIcorn() {
    // 创建一个 icon
    console.log(this.uri);
    return new AMap.Icon({
      size: new AMap.Size(this.width, this.height),
      image: this.uri,
      imageSize: new AMap.Size(this.width, this.height)
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
  constructor({ lng, lat, icon }) {
    this.lng = lng;
    this.lat = lat;
    this.icon = icon;
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
    url: require("../static/icon/icon_map01.png"),
    anchor: new AMap.Pixel(38, 49),
    size: new AMap.Size(38, 49)
  },
  {
    url: require("../static/icon/icon_map02.png"),
    anchor: new AMap.Pixel(38, 49),
    size: new AMap.Size(38, 49)
  },
  {
    url: require("../static/icon/icon_map03.png"),
    anchor: new AMap.Pixel(38, 49),
    size: new AMap.Size(38, 49)
  },
  {
    url: require("../static/icon/icon_map04.png"),
    anchor: new AMap.Pixel(38, 49),
    size: new AMap.Size(38, 49)
  },
  {
    url: require("../static/icon/icon_map05.png"),
    anchor: new AMap.Pixel(38, 49),
    size: new AMap.Size(38, 49)
  }
];

// 创建海量点

export class _MoreMass {
  constructor({ data, map, style }) {
    this.data = data;
    this.map = map;
    this.style = style;
  }
  //绑定地图实例
  create() {
    //  设置卫星地图
    // this.stateLite(this.map)
    //清除地图标注信息窗
    this.map.clearInfoWindow();

    let mass = this.mass();

    let marker = this.maker();
    // 关闭信息框
    mass.setMap(this.map);

    _MoreMass._clear(this.map);
    let map = this.map;
    //  自适应视野
    this.setViewCenter();

    mass.on("mouseover", function(e) {
      map.clearInfoWindow();

      marker.setPosition(e.data.lnglat);
      marker.setLabel({
        content: e.data.name
      });
    });
    mass.on("mouseout", function(e) {
      marker.setPosition(e.data.lnglat);
      marker.setLabel({
        content: ""
      });
    });
    //此处返回 保证全局只有一个map   实例
    return mass;
  }
  //海量点实例化
  mass() {
    // 坐标转换
    // let lnglat = super.translate(this.data);
    let lnglat = this.data;
    return new AMap.MassMarks(lnglat, {
      opacity: 0.8,
      zIndex: 111,
      cursor: "pointer",
      style: this.style
    });
  }

  //创建maker
  maker() {
    return new AMap.Marker({
      content: " ",
      map: this.map
    });
  }
  // //清空海量点
  static _clear(map, flag = false) {
    let layer = map.getLayers();

    let tmpArray = [];

    if (layer.length > 1) {
      tmpArray = layer.map(el => {
        if (el.CLASS_NAME === "AMap.MassMarks") {
          return el;
        } else {
          return false;
        }
      });
    }
    tmpArray = tmpArray.filter(d => d);

    if (flag) {
      map.remove(tmpArray);
    } else {
      map.remove(tmpArray.slice(0, tmpArray.length - 1));
    }
  }

  // 卫星地图
  stateLite(map) {
    new AMap.TileLayer.Satellite({
      map: map
    });
  }

  //设置覆盖物集合在事业中点

  setViewCenter() {
    let positions = this.data.map(e => [e.lnglat.Q, e.lnglat.P]);
    let map = this.map;
    new _Polygon({ positions, map }).polygon();
  }

  //添加地图插件
  addControl(map) {
    AMap.plugin(["AMap.ToolBar", "AMap.MapType"], function() {
      //异步同时加载多个插件
      let toolbar = new AMap.ToolBar({
        position: {
          top: "200px",
          right: "300px"
        }
      });

      map.addControl(toolbar);
    });
  }
}

export class _ConvertFrom {
  constructor() {
    this.style = "baidu";
  }

  translate(lnglat) {
    return new Promise(resolve => {
      AMap.convertFrom(lnglat, "baidu", (status, result) => {
        if (result.info === "ok") {
          let res = result.locations;

          resolve([res[0].lng, res[0].lat]); // Array.<LngLat>
        }
      });
    });
  }

  // // 地址解析
  static geocoder(address) {
    return new Promise(resolve => {
      AMap.service("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          radius: 3000,
          extensions: "base",
          city: "021"
        });
        geocoder.getLocation(address, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            resolve(result.geocodes);
          }
        });
      });
    });
  }
}

//标注信息框
export class _InfoWindow {
  constructor({ position = "middle-left", address, map, lnglat }) {
    this.position = position;
    this.address = address;
    this.map = map;
    this.lnglat = lnglat;
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
    let infoBody = this.infoWindow();
    return infoBody.open(this.map, this.lnglat);
  }
}

// 添加控件

export class _AddControl {
  constructor(map) {
    this.map = map;
  }

  add() {
    let map = this.map;
    AMapUI.loadUI(["control/BasicControl"], function(BasicControl) {
      //添加一个缩放控件
      // map.addControl(
      //     new BasicControl.Zoom({
      //         position: "lt"
      //     })
      // );

      //缩放控件，显示Zoom值
      map.addControl(
        new BasicControl.Zoom({
          position: {
            bottom: "80px",
            right: "40px"
          },
          showZoomNum: true
        })
      );

      //图层切换控件
      map.addControl(
        new BasicControl.LayerSwitcher({
          position: {
            bottom: "20px",
            right: "40px"
          }
        })
      );
    });
  }
}

//绘制多边形用于点自动显示
export class _Polygon {
  constructor({ positions, map }) {
    this.positions = positions;
    this.map = map;
  }
  //
  polygon() {
    let positions = this.positions;

    let map = this.map;
    let polygon = new AMap.Polygon({
      path: positions, //以5个点的坐标创建一个隐藏的多边形
      map: map,
      strokeOpacity: 0, //透明
      fillOpacity: 0, //透明
      bubble: true //事件穿透到地图
    });

    // var overlaysList = map.getAllOverlays('polygon');//获取多边形图层
    // console.dir(overlaysList,"多边形")
    map.setFitView(polygon); //自适应显示
  }
}
