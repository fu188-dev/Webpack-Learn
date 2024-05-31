import _ from "lodash";
import "./style.css";
import Icon from "./icon.jpg";
import Data from "./data.xml";
import Notes from "./data.csv";
import  toml from "./data.toml";
import yaml from "./data.yaml";
import json from "./data.json5";

console.log("toml===", toml);
console.log("toml.title===", toml.title);
console.log("toml.owner.name===", toml.owner.name);

console.log("yaml===", yaml);
console.log("yaml.title===", yaml.title);
console.log("yaml.owner.name===", yaml.owner.name);

console.log("json===", json);
console.log("json.title===", json.title);
console.log("json.owner.name===", json.owner.name);

function component() {
    const element = document.createElement("div");

    // lodash 用 import 引入
    element.innerHTML = _.join(["Hello", "webpack"], "~");
    element.classList.add("hello");

    // 将图像添加到已经存在的 div 中
    const myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    console.log("xml data: ", Data);
    console.log("csv data: ", Notes);

    return element;
}

document.body.appendChild(component());