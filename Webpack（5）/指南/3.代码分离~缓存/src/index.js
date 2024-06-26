import _ from "lodash";
import Print from "./print.js";

function component() {
  const element = document.createElement("div");

  // lodash 现在使用 import 引入
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.onclick = Print.bind(null, "Hello webpack!");


  return element;
}

document.body.appendChild(component());
