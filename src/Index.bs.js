'use strict';

var React = require("react");
var ReactDom = require("react-dom");
var ExampleStyles$ReasonReactDemo = require("./ExampleStyles.bs.js");
var BlinkingGreeting$ReasonReactDemo = require("./BlinkingGreeting/BlinkingGreeting.bs.js");
var FetchedDogPictures$ReasonReactDemo = require("./FetchedDogPictures/FetchedDogPictures.bs.js");
var ReducerFromReactJSDocs$ReasonReactDemo = require("./ReducerFromReactJSDocs/ReducerFromReactJSDocs.bs.js");
var ReasonUsingJSUsingReason$ReasonReactDemo = require("./ReasonUsingJSUsingReason/ReasonUsingJSUsingReason.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$ReasonReactDemo.style;

function makeContainer(text) {
  var container = document.createElement("div");
  container.className = "container";
  var title = document.createElement("div");
  title.className = "containerTitle";
  title.innerText = text;
  var content = document.createElement("div");
  content.className = "containerContent";
  container.appendChild(title);
  container.appendChild(content);
  document.body.appendChild(container);
  return content;
}

ReactDom.render(React.createElement(BlinkingGreeting$ReasonReactDemo.make, {
          children: "Hello testing again call!"
        }), makeContainer("Blinking Greeting"));

ReactDom.render(React.createElement(ReducerFromReactJSDocs$ReasonReactDemo.make, {}), makeContainer("Reducer From ReactJS Docs"));

ReactDom.render(React.createElement(FetchedDogPictures$ReasonReactDemo.make, {}), makeContainer("Fetched Dog Pictures"));

ReactDom.render(React.createElement(ReasonUsingJSUsingReason$ReasonReactDemo.make, {}), makeContainer("Reason Using JS Using Reason"));

exports.style = style;
exports.makeContainer = makeContainer;
/* style Not a pure module */
