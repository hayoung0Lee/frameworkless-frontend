# Rendering
- Rendering이란 요소를 화면이나 출력장치에 렌더링 하는 것
- W3C는 프로그래밍 방식으로 요소를 렌더링 하는 방식을 문서 객체 모델(DOM, Document Object Model 로 정의함)
- 프레임워크 없이 DOM을 효과적으로 조작하는 방법
- DOM은 `HTML요소로 정의된 트리를 관리하는 방법이다`
- [MDN definition of DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)


## FPS
```javascript
// requestAnimationFrame callback을 사용해 현재 렌더링 사이클과 다음사이클 사이의 시간 추적하기. 콜백이 1초내에 호출되는 횟수를 추적하면된다
let panel = -1;
let start = -1;
let frames = 0;

const create = () => {
const div = document.createElement("div");

div.style.position = "fixed";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "50px";
div.style.height = "50px";
div.style.backgroundColor = "black";
div.style.color = "white";

return div;
};

const tick = () => {
frames++;
const now = window.performance.now();
if (now >= start + 1000) {
    panel.innerText = frames;
    frames = 0;
    start = now;
}
window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
panel = create();

window.requestAnimationFrame(() => {
    start = window.performance.now();
    parent.appendChild(panel);
    tick();
});
};

init();
```





## 출처
프레임워크 없는 프론트엔드 개발
