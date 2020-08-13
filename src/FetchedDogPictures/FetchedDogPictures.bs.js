'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Belt_Array = require("bs-platform/lib/js/belt_Array.js");

function FetchedDogPictures(Props) {
  var match = React.useState(function () {
        return /* LoadingDogs */0;
      });
  var setState = match[1];
  var state = match[0];
  var loadDogs = function (param) {
    Curry._1(setState, (function (param) {
            return /* LoadingDogs */0;
          }));
    fetch("https://dog.ceo/api/breeds/image/random/3").then(function (response) {
              return response.json();
            }).then(function (jsonResponse) {
            Curry._1(setState, (function (_previousState) {
                    return /* LoadedDogs */{
                            _0: jsonResponse.message
                          };
                  }));
            return Promise.resolve(undefined);
          }).catch(function (_err) {
          Curry._1(setState, (function (_previousState) {
                  return /* ErrorFetchingDogs */1;
                }));
          return Promise.resolve(undefined);
        });
    
  };
  React.useEffect((function () {
          loadDogs(undefined);
          
        }), []);
  var tmp;
  if (typeof state === "number") {
    tmp = state !== 0 ? "An error occurred!" : "Loading...";
  } else {
    var dogs = state._0;
    tmp = React.createElement("div", undefined, Belt_Array.mapWithIndex(dogs, (function (i, dog) {
                var imageStyle = {
                  backgroundImage: "url(" + dog + ")",
                  backgroundPosition: "center",
                  display: "inline-block",
                  height: "120px",
                  marginRight: i === (dogs.length - 1 | 0) ? "0px" : "8px",
                  width: "120px",
                  backgroundSize: "cover",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 16px rgb(200, 200, 200)"
                };
                return React.createElement("div", {
                            key: dog,
                            style: imageStyle
                          });
              })), React.createElement("button", {
              onClick: (function (param) {
                  return loadDogs(undefined);
                })
            }, "Refresh dogs"));
  }
  return React.createElement("div", {
              style: {
                display: "flex",
                height: "120px",
                alignItems: "center",
                justifyContent: "center"
              }
            }, tmp);
}

var make = FetchedDogPictures;

exports.make = make;
/* react Not a pure module */
