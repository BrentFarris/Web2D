var rectangles = [];

function add(rect) {
    if (this.rectangles.indexOf(rect) === -1) {
        this.rectangles.push(rect);
    }
}

function remove(rect) {
    var index = this.rectangles.indexOf(rect);
    if (index !== -1) {
        this.rectangles.splice(index, 1);
    }
}

function check(otherParent, evt) {
    for (var i = 0; i < this.rectangles.length; i++) {
        // TODO:  Check only ones within range
        if (otherParent.rect.intersects(this.rectangles[i])) {
            evt(otherParent, this.rectangles[i]);
        }
    }
}

//while (true) {
//    postMessage(workerResult);
//}

onmessage = function(e) {
    if (e.data.add) {
        for (var i = 0; i < e.data.add.length; i++) {
            add(e.data.add[i]);
        }
    }

    if (e.data.remove) {
        for (var i = 0; i < e.data.remove.length; i++) {
            remove(e.data.remove[i]);
        }
    }

    postMessage("Added");
}