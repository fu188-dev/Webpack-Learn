import _ from "lodash";
import "./style.css";
import Icon from "./icon.jpg";

function component() {
    const element = document.createElement("div");

    // lodash 用 import 引入
    element.innerHTML = _.join(["Hello", "webpack"], "~");
    element.classList.add("hello");

    // 将图像添加到已经存在的 div 中
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());