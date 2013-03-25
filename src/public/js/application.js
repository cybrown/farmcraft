/*global console: true, define: true */
define(
    [
        'graphics/drawer',
        'graphics/animator',
        'world/world',
        'guiemitter',
        'networkemitter',
        'farmer',
        'keyboard',
        'culture',
        'domready!'
    ],
    function (Drawer, Animator, World, guiemitter, nemitter, Farmer, Keyboard, Culture) {
        'use strict';

        var Application = function () {
            this.drawer = null;
            this.animator = null;
            this.world = null;
            this.player = null;
            this.keyboard = null;
            this.net = null;
            this.culture = null;
        };

        Application.prototype.init = function (canvas, net) {
            this.net = net;
            this.initGraphics(canvas);
            this.initNetworkEvents();
            this.initGuiEvents();
            this.initWorld();
            this.initKeyboard();
            return this;
        };

        Application.prototype.initGraphics = function (canvas) {
            this.drawer = new Drawer();
            this.drawer.init(canvas.getContext('2d'));
            this.drawer.createLayer('tilemap');
            this.drawer.createLayer('entities');
            this.drawer.createLayer('sky');
            this.animator = new Animator();
            this.animator.init(20);
        };

        Application.prototype.initWorld = function () {
            this.world = new World();
            this.world.init(this.drawer, this.animator);
        };

        Application.prototype.initKeyboard = function () {
            this.keyboard = new Keyboard();
            this.keyboard.enable();
            guiemitter.on('keyboard.up.down', function () {
                console.log('start move player up');
                if (this.player !== null) {
                    this.net.notifychange({
                        'id': this.player.id,
                        'x': this.player.x,
                        'y': this.player.y - 32
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.up.up', function () {
                console.log('stop move player up');
            }.bind(this));
            guiemitter.on('keyboard.down.down', function () {
                console.log('start move player down');
                if (this.player !== null) {
                    this.net.notifychange({
                        'id': this.player.id,
                        'x': this.player.x,
                        'y': this.player.y + 32
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.down.up', function () {
                console.log('stop move player down');
            }.bind(this));
            guiemitter.on('keyboard.right.down', function () {
                console.log('start move player right');
                if (this.player !== null) {
                    this.net.notifychange({
                        'id': this.player.id,
                        'x': this.player.x + 32,
                        'y': this.player.y
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.right.up', function () {
                console.log('stop move player right');
            }.bind(this));
            guiemitter.on('keyboard.left.down', function () {
                console.log('start move player left');
                if (this.player !== null) {
                    this.net.notifychange({
                        'id': this.player.id,
                        'x': this.player.x - 32,
                        'y': this.player.y
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.left.up', function () {
                console.log('stop move player left');
            }.bind(this));

        };

        Application.prototype.initNetworkEvents = function () {
            // FARMER
            nemitter.on('farmer.add', function (farmer) {
                this.world.entities.add(farmer);
            }.bind(this));

            nemitter.on('farmer.remove', function (farmer) {
                this.world.entities.remove(farmer);
            }.bind(this));

            nemitter.on('farmer.change', function (farmer) {
                var f = this.world.entities.find(farmer.id);
                f.x = farmer.x;
                f.y = farmer.y;
            }.bind(this));
            // CULTURE
            nemitter.on('culture.add', function (culture) {
                this.world.entities.add(culture);
            }.bind(this));
            // CHUNK
            nemitter.on('chunk.add', function (chunk) {
                console.log('TODO: chunk.add');
            }.bind(this));

            nemitter.on('chunk.change', function (chunk) {
                console.log('TODO: chunk.change');
            }.bind(this));

            // EVENT
            nemitter.on('event.add', function (event) {
                this.world.events.add(event);
            }.bind(this));

            nemitter.on('event.remove', function (event) {
                this.world.events.remove(event);
            }.bind(this));

            nemitter.on('event.change', function (event) {
                console.log('TODO: event.change');
            }.bind(this));
        };

        Application.prototype.addDrawableToLayer = function (layerName) {
            return function (drawable) {
                this.drawer.getLayer(layerName).add(drawable);
                this.animator.add(drawable);
            }.bind(this);
        };

        Application.prototype.removeDrawableFromLayer = function (layerName) {
            return function (drawable) {
                this.drawer.getLayer(layerName).remove(drawable);
                this.animator.remove(drawable);
            }.bind(this);
        };

        Application.prototype.initGuiEvents = function () {
            // ENTITY
            guiemitter.on('entity.add', this.addDrawableToLayer('entities'));
            guiemitter.on('entity.add', function (player) {
                this.player = player;
            }.bind(this));
            guiemitter.on('entity.remove', this.removeDrawableFromLayer('entities'));

            // EVENT
            guiemitter.on('event.add', this.addDrawableToLayer('sky'));
            guiemitter.on('event.remove', this.removeDrawableFromLayer('sky'));

             //CULTURE
            guiemitter.on('entity.add', this.addDrawableToLayer('entities'));
            guiemitter.on('entity.add', function (culture) {
                this.culture = culture;
            }.bind(this));
            // TILEMAP
            guiemitter.on('tilemap.set', this.addDrawableToLayer('tilemap'));


            guiemitter.on('entity.change', function (entity) {
                
                console.log(entity);
            });
        };

        Application.prototype.start = function () {
            guiemitter.emit('application.start-begin');
            this.drawer.start();
            this.animator.start();
            guiemitter.emit('application.start-end');
            return this;
        };

        return Application;
    }
);
