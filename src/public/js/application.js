/*global console: true, define: true */
define(
    [
        'graphics/drawer',
        'graphics/animator',
        'world/world',
        'guiemitter',
        'networkemitter',
        'views/farmer',
        'keyboard',
        'globalviewcontainer',
        'domready!'
    ],
    function (Drawer, Animator, World, guiemitter, nemitter, Farmer, Keyboard, views) {
        'use strict';

        var Application = function () {
            this.drawer = null;
            this.animator = null;
            this.world = null;
            this.player = null;
            this.keyboard = null;
            this.net = null;
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
                if (this.player !== null) {
                    this.net.update(this.player.modelName, this.player._id, {
                        '_id': this.player._id,
                        'x': this.player.x,
                        'y': this.player.y - 32
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.up.up', function () {

            }.bind(this));
            guiemitter.on('keyboard.down.down', function () {
                if (this.player !== null) {
                    this.net.update(this.player.modelName, this.player._id, {
                        '_id': this.player._id,
                        'x': this.player.x,
                        'y': this.player.y + 32
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.down.up', function () {

            }.bind(this));
            guiemitter.on('keyboard.right.down', function () {
                if (this.player !== null) {
                    this.net.update(this.player.modelName, this.player._id, {
                        '_id': this.player._id,
                        'x': this.player.x + 32,
                        'y': this.player.y
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.right.up', function () {
                
            }.bind(this));
            guiemitter.on('keyboard.left.down', function () {
                if (this.player !== null) {
                    this.net.update(this.player.modelName, this.player._id, {
                        '_id': this.player._id,
                        'x': this.player.x - 32,
                        'y': this.player.y
                    });
                }
            }.bind(this));
            guiemitter.on('keyboard.left.up', function () {

            }.bind(this));

        };

        Application.prototype.initNetworkEvents = function () {
            // COMMAND
            nemitter.on('command', function (command) {
                console.log('Command: [' + command.type + '] Execute.');
                switch (command.type) {
                    case 'player.current':
                        this.player = this.world.entities.find(command.data);
                        break;
                    default:
                        console.log('Command: [' + command.type + '] Unknown command.');
                }
            }.bind(this));

            // TODO Cy - Trouver un moyen d'injecter cette dependence
            views.add('Farmer', Farmer);

            nemitter.on('model', function (event) {
                if (event.object === null) {
                    this.world.entities.remove(event._id);
                } else {
                    var object = this.world.entities.find(event._id);
                    if (object === null) {
                        object = (new (views.get(event.model))).init();
                        object._id = event._id;
                        this.world.entities.add(object);
                    }
                    object.fromArray(event.object);
                }
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
            guiemitter.on('entity.remove', this.removeDrawableFromLayer('entities'));

            // EVENT
            guiemitter.on('event.add', this.addDrawableToLayer('sky'));
            guiemitter.on('event.remove', this.removeDrawableFromLayer('sky'));

            // TILEMAP
            guiemitter.on('tilemap.set', this.addDrawableToLayer('tilemap'));
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
