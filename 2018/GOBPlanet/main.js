var canvas = new web2d.canvas(document.getElementById("canvas"), 1.0, 1.0);
web2d.canvasHelpers.start(canvas);

var world = {
    objects: [],
    width: 1280,
    height: 736,
    gravity: 0.298,
    assets: {
        floor: {
            image: "images/brick.png",
            animation: null
        },
        hero: {
            image: "images/mario.png",
            animation: {
                fps: 12,
                right: [
                    { x:  0, y:  0, w: 16, h: 16 },
                    { x: 16, y:  0, w: 16, h: 16 },
                    { x: 32, y:  0, w: 16, h: 16 },
                    { x: 48, y:  0, w: 16, h: 16 },
                    { x:  0, y: 16, w: 16, h: 16 },
                    { x: 16, y: 16, w: 16, h: 16 },
                    { x: 32, y: 16, w: 16, h: 16 },
                    { x: 48, y: 16, w: 16, h: 16 }
                ],
                left: [
                    { x:  0, y: 32, w: 16, h: 16 },
                    { x: 16, y: 32, w: 16, h: 16 },
                    { x: 32, y: 32, w: 16, h: 16 },
                    { x: 48, y: 32, w: 16, h: 16 },
                    { x:  0, y: 48, w: 16, h: 16 },
                    { x: 16, y: 48, w: 16, h: 16 },
                    { x: 32, y: 48, w: 16, h: 16 },
                    { x: 48, y: 48, w: 16, h: 16 }
                ],
                jumpRight: [{ x: 0, y: 64, w: 16, h:16 }],
                jumpLeft: [{ x: 16, y: 64, w: 16, h:16 }],
                die: [{ x: 32, y: 64, w: 16, h:16 }],
            }
        }
    },
    managers: {
        grid: {
            /**
             * @property {number} size
             */
            size: 32,

            /**
             * @method get
             * @param {!number} x
             * @param {!number} y
             * @param {!number} width
             */
            get: function(x, y, width) {
                // Convert x and y to the unit space and then find their array index
                return Math.floor((x / this.size) + (y / this.size) * (width / this.size));
            },

            /**
             * @method toPixel
             * @param {!number} index
             * @param {!number} width
             */
            toPixel: function(index, width) {
                var ratio = width / this.size;
                return [Math.floor(index % ratio) * this.size, Math.floor(index / ratio) * this.size];
            }
        },
        collision: {
            /**
             * @property {web2d.rectangle[]}
             */
            rectangles: [],

            /**
             * @method add
             * @param {web2d.rectangle} rect
             */
            add: function(rect) {
                if (this.rectangles.indexOf(rect) === -1) {
                    this.rectangles.push(rect);
                }
            },

            /**
             * @method remove
             * @param {web2d.rectangle} rect
             */
            remove: function(rect) {
                var index = this.rectangles.indexOf(rect);
                if (index !== -1) {
                    this.rectangles.splice(index, 1);
                }
            },

            /**
             * @method check
             * @param {Object} otherParent
             * @param {Function} evt
             */
            check: function(rect) {
                return new Promise(function (resolve, reject) {
                    var collisionCount = 0;
                    for (var i = 0; i < this.rectangles.length; i++) {
                        // Only check collisions within horizontal screen distance
                        // of supplied object
                        if (Math.abs(this.rectangles[i].x - rect.x) < world.width) {
                            if (rect.intersects(this.rectangles[i])) {
                                resolve(this.rectangles[i], ++collisionCount);
                            }
                        }
                    }

                    if (!collisionCount) {
                        reject();
                    }
                });
            }
        },
        map: {
            load: function(data) {
                web2d.each(data, function(key, value) {
                    for (var i = 0; i < value.length; i++) {
                        var loc = world.managers.grid.toPixel(value[i], world.width);
                        world.objects.push({module: new world.modules[key](loc[0], loc[1])});
                    }
                });
            }
        }
    },
    map: function() {

    },
    modules: {
        module: function(x, y, useGravity) {
            /**
             * @property {web2d.rectangle} rect
             */
            this.rect = new web2d.rectangle(x || 0, y || 0, world.managers.grid.size, world.managers.grid.size);

            /**
             * @property {web2d.vec2} velocity
             */
            this.velocity = new web2d.vec2();

            this.__defineGetter__("position", function() {
                return new web2d.vec2(this.rect.x, this.rect.y);
            });

            /**
             * @method _fixedUpdate
             * @private
             */
            this._fixedUpdate = function() {
                this.velocity.y += world.gravity;
                this.rect.y += this.velocity.y;
            };

            /**
             * @method _destroy
             * @private
             */
            this._destroy = function() {
                canvas.updating.remove(this._fixedUpdate);
                world.managers.collision.remove(this.rect);
            };

            /**
             * @method destroy
             */
            this.destroy = function() { this._destroy() };

            // Now that this module is created, we need to add it's rect to the collision
            // manager for collision detections
            world.managers.collision.add(this.rect);

            if (useGravity) {
                canvas.updating.register(this._fixedUpdate, this);
            }
        },
        floor: function(x, y, useGravity) {
            world.modules.module.call(this, x, y, false);

            /**
             * The image for this floor object
             * @property {web2d.image} img
             */
            this.img = new web2d.image(world.assets.floor.image, this.rect);

            /**
             * @method draw
             * @param {web2d.canvas} canvas 
             */
            this.draw = function(canvas) {
                this.img.draw(canvas, this.rect.x, this.rect.y);
            };

            this.destry = function() {
                this._destroy();
                canvas.drawing.remove(this.draw);
            };

            // This module requires drawing
            canvas.drawing.register(this.draw, this);
        }
    }
};

(function() {
    var ratio = Math.min(canvas.elm.height / world.height, canvas.elm.width / world.width);
    canvas.scale(ratio, ratio);

    world.managers.map.load({ floor: [880, 881, 882, 883, 884, 885, 886] });
})();