const FRAME_HTML_FORMAT = {
    "div": {
        "className": "framecontainer",
        "children": [
            {"img": {
                "src":"$1",
                "onclick":"javascript:frameSelected($2, this.parentNode)"
            }},
            {"div": {
                "className": "close",
                "onclick": "javascript:deleteFrame($2)",
                "children": [
                    {"img": {
                        "src": "$3"
                    }}]
                }
            },
            {"div": {
                "name": "indexValue",
                "innerHTML": "$2"
            }}
        ]
    }
};

function GENERATE_FRAME(imgPath, idx, closeImgPath) {
    let counter = 0;
    let map = {};
    for (let i = 0 ; i < arguments.length ; i++) {
            map["$"+(i+1)] = arguments[i];
    }
    return GENERATE_TAG("div", FRAME_HTML_FORMAT["div"], map);
}

function GENERATE_TAG(tagName, attributes, mapArg) {
    let el = tag(tagName);
    let children;
    for (let attr in attributes) {
        if (attr === "children") {
            children = attributes["children"];
        } else {
            let result = attributes[attr];
            if (result.includes("$")) {
                for (let mapKey in mapArg) {
                       result = result.replace(mapKey, mapArg[mapKey]);
                }
            }
            if (attr === "innerHTML") {
                el.innerHTML = result;
            } else if(attr === "className") {
                el.className = result;
            } else {
                el.setAttribute(attr, result);
            }
            //el[attr] = attributes[attr];
        }
    }
    if (!children) {
        return el;
    }
    for (let i  = 0 ; i < children.length ; i++) {
        const entry = Object.entries(children[i])[0];
        let subEl = GENERATE_TAG(entry[0], entry[1], mapArg);
        el.appendChild(subEl);
    }

    return el;
}

/*
function setAttribute(obj, attr, value) {
    if (attr === "className") {
        obj.className = value;
    } else if (attr === "name") {
        obj.setAttribute("name", value);
    } else if (attr === "") {
    } else if (attr === "") {
    }
}*/
