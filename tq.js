let inpValue = document.querySelector("input");
let sosuo = document.querySelector("nav>span"); //搜索按钮

let div = document.querySelector("div");
const p = document.createElement("p");
div.appendChild(p);
axios.get("https://v1.hitokoto.cn").then(({ data }) => {
  let from = data.from;
  let hitokoto = data.hitokoto;
  p.innerHTML = hitokoto + "&nbsp;&nbsp;&nbsp;——" + from;
});

//写入天气数据
sosuo.onclick = () => {
  // 获取城市
  let cs;
  if (inpValue.value != "") {
    cs = inpValue.value;
  } else {
    cs = "扶绥";
  }
  // 发送请求
  axios.get("http://wthrcdn.etouch.cn/weather_mini?city=" + cs).then((res) => {
    let city = res.data.data.city; //城市
    let ganmao = res.data.data.ganmao; //提示
    let forecast = res.data.data.forecast; //最近五天天气
    let arr = []; //用数组保存遍历的值
    for (let i = 0; i < forecast.length; i++) {
      let obj = {
        date: forecast[i].date, //日期
        fengxiang: forecast[i].fengxiang, //风向
        high: forecast[i].high, //高温
        low: forecast[i].low, //低温
        type: forecast[i].type, //天气情况
      };
      arr.push(obj);
    }

    //批量添加span标签
    for (let i = 0; i < 7; i++) {
      const span = document.createElement("span");
      div.appendChild(span);
    }

    //设置span标签的值
    let spans = document.querySelectorAll("div>span");
    for (let i = 0; i < spans.length; i++) {
      spans[i].innerHTML =
        "日期:" +
        arr[i].date +
        "&nbsp;&nbsp;&nbsp;" +
        "天气情况:" +
        arr[i].type +
        "&nbsp;&nbsp;&nbsp;" +
        "风向:" +
        arr[i].fengxiang +
        "&nbsp;&nbsp;&nbsp;" +
        "最高温度:" +
        arr[i].high +
        "&nbsp;&nbsp;&nbsp;" +
        "最低温度:" +
        arr[i].low +
        "&nbsp;&nbsp;&nbsp;" +
        "温馨提示:" +
        ganmao +
        "<br/><br/><br/>";
    }
  });
};
