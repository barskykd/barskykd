/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const helpers_1 = __webpack_require__(1);
	const easing_1 = __webpack_require__(2);
	const animation_manager_1 = __webpack_require__(3);
	const model_1 = __webpack_require__(4);
	function toggle_orient(orient) {
	    switch (orient) {
	        case 'h': return 'v';
	        case 'v': return 'h';
	        default: return 'h';
	    }
	}
	let game = new model_1.Game();
	var renderer;
	var stage;
	var textures;
	var gameUI;
	let current_view = null;
	var do_render = () => {
	    if (renderer && current_view) {
	        renderer.render(current_view);
	    }
	};
	let animation_manager = new animation_manager_1.default(do_render);
	function main() {
	    PIXI.ticker.shared.autoStart = true;
	    renderer = PIXI.autoDetectRenderer(800, 600);
	    renderer.backgroundColor = 0xFFFFFF; // "white";
	    stage = new PIXI.Container();
	    PIXI.loader
	        .add("assets/sprites.json")
	        .load(setup);
	    document.body.appendChild(renderer.view);
	    renderer.view.addEventListener("contextmenu", function (e) {
	        e.preventDefault();
	        return false;
	    });
	}
	exports.main = main;
	class ShipSprite extends PIXI.Sprite {
	    constructor(ship) {
	        super(textures['ship_' + ship.length + '.png']);
	        this.ship = ship;
	    }
	    setOrientation(orient) {
	        if (orient == 'v') {
	            animation_manager.animate({
	                obj: this,
	                prop: 'rotation',
	                start_v: this.rotation,
	                d_v: Math.PI / 2 - this.rotation,
	                easing: easing_1.default.easeInOutSine,
	                duration: 20
	            });
	            animation_manager.animate({
	                obj: this.pivot,
	                prop: 'y',
	                start_v: this.pivot.y,
	                d_v: this.height - this.pivot.y,
	                easing: easing_1.default.easeInOutSine,
	                duration: 20
	            });
	        }
	        else {
	            animation_manager.animate({
	                obj: this,
	                prop: 'rotation',
	                start_v: this.rotation,
	                d_v: 0 - this.rotation,
	                easing: easing_1.default.easeInOutSine,
	                duration: 20
	            });
	            animation_manager.animate({
	                obj: this.pivot,
	                prop: 'y',
	                start_v: this.pivot.y,
	                d_v: 0 - this.pivot.y,
	                easing: easing_1.default.easeInOutSine,
	                duration: 20
	            });
	        }
	    }
	    moveAnimated(pos) {
	        if (pos.equals(this.position)) {
	            return;
	        }
	        if (this.movingTo && this.movingTo.equals(pos)) {
	            return;
	        }
	        animation_manager.animate({
	            obj: this,
	            prop: 'x',
	            start_v: this.x,
	            d_v: pos.x - this.x,
	            easing: easing_1.default.easeInOutSine,
	            duration: 20
	        });
	        animation_manager.animate({
	            obj: this,
	            prop: 'y',
	            start_v: this.y,
	            d_v: pos.y - this.y,
	            easing: easing_1.default.easeInOutSine,
	            duration: 20
	        });
	    }
	}
	class FieldSprite extends PIXI.Sprite {
	    constructor() {
	        super(textures['field.png']);
	        this.field = new model_1.Field(10, 10);
	    }
	    pointToCell(p) {
	        const x = Math.floor(p.x / 20);
	        const y = Math.floor(p.y / 20);
	        return new model_1.Cell(x, y);
	    }
	    cellToPoint(c) {
	        return new PIXI.Point(c.x * 20, c.y * 20);
	    }
	}
	class FieldView extends PIXI.Container {
	    constructor(player) {
	        super();
	        this.player = player;
	        this.shipSprites = [];
	        this.shotSprites = {};
	        this.fieldSprite = new FieldSprite();
	        this.fieldSprite.interactive = true;
	        this.addChild(this.fieldSprite);
	        for (let sh of game.shipsByPlayer(player)) {
	            let sh_sp = new ShipSprite(sh);
	            sh_sp.visible = false;
	            this.shipSprites.push(sh_sp);
	            this.addChild(sh_sp);
	        }
	        this.update();
	        this.fieldSprite.on('mousemove', e => {
	            if (e.target === this.fieldSprite) {
	                let point = e.data.getLocalPosition(this);
	                let cell = this.fieldSprite.pointToCell(point);
	                this.emit('cell_mousemove', cell, point, e);
	            }
	        });
	        this.fieldSprite.on('click', e => {
	            if (e.target === this.fieldSprite) {
	                let point = e.data.getLocalPosition(this);
	                let cell = this.fieldSprite.pointToCell(point);
	                this.emit('cell_click', cell, point, e);
	            }
	        });
	        this.fieldSprite.on('rightclick', e => {
	            if (e.target === this.fieldSprite) {
	                let point = e.data.getLocalPosition(this);
	                let cell = this.fieldSprite.pointToCell(point);
	                this.emit('cell_rightclick', cell, point, e);
	            }
	        });
	        this.fieldSprite.on('mouseout', e => {
	            this.emit('field_mouseout', e);
	        });
	    }
	    update() {
	        for (let sh_sprite of this.shipSprites) {
	            let sh = sh_sprite.ship;
	            if (sh.position) {
	                if (this.player == 'me') {
	                    sh_sprite.visible = true;
	                }
	                else {
	                    sh_sprite.visible = sh.hp <= 0;
	                }
	                sh_sprite.moveAnimated(this.fieldSprite.cellToPoint(sh.position.cell));
	                sh_sprite.setOrientation(sh.position.orient);
	            }
	            else {
	                sh_sprite.visible = false;
	            }
	        }
	        for (let shot of game.shotsByPlayer(this.player)) {
	            let sh_sprite = this.shotSprites[shot.id];
	            if (!sh_sprite) {
	                let tex = shot.hit ? textures['hit.png'] : textures['miss.png'];
	                sh_sprite = new PIXI.Sprite(tex);
	                this.addChild(sh_sprite);
	                this.shotSprites[shot.id] = sh_sprite;
	                sh_sprite.position = this.fieldSprite.cellToPoint(shot.cell);
	                if (shot.auto) {
	                    sh_sprite.alpha = 0.1;
	                }
	                animate_shot(sh_sprite);
	            }
	        }
	    }
	}
	function animate_shot(sh_sprite) {
	    sh_sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	    sh_sprite.pivot.set(sh_sprite.width / 2, sh_sprite.height / 2);
	    sh_sprite.position.set(sh_sprite.position.x + sh_sprite.width / 2, sh_sprite.position.y + sh_sprite.height / 2);
	    animation_manager.animate({
	        obj: sh_sprite.scale,
	        prop: 'x',
	        start_v: 0,
	        d_v: 1,
	        easing: easing_1.default.easeOutSine,
	        duration: 20
	    });
	}
	class PlaceShipsControl extends PIXI.Container {
	    constructor() {
	        super();
	        this.fieldView = new FieldView('me');
	        this.addChild(this.fieldView);
	        this.fieldView.on('cell_mousemove', this._cell_mousemove.bind(this));
	        this.fieldView.on('cell_click', this._click.bind(this));
	        this.fieldView.on('cell_rightclick', this._right_click.bind(this));
	        this.fieldView.on('field_mouseout', this._mouse_out.bind(this));
	        this._pick_next_ship();
	    }
	    autoplace() {
	        game.autoplace('me');
	        this.fieldView.update();
	        this._render();
	        this.emit('ships_placed');
	    }
	    _render() {
	        this.fieldView.update();
	        do_render();
	    }
	    _move_ship(cell) {
	        if (this.current_ship) {
	            if (this.current_ship.position) {
	                this.current_ship.position = new model_1.ShipPosition(cell, this.current_ship.position.orient);
	            }
	            else {
	                this.current_ship.position = new model_1.ShipPosition(cell, 'h');
	            }
	        }
	    }
	    _pick_next_ship() {
	        let ship = game.shipsByPlayer('me').find(x => !x.position);
	        console.log('_pick_next_ship', ship);
	        if (ship) {
	            this.current_ship = ship;
	            this._render();
	        }
	        else {
	            this.current_ship = undefined;
	            this.fieldView.update();
	            this._render();
	            this.emit('ships_placed');
	        }
	    }
	    _can_place() {
	        if (this.current_ship) {
	            return game.isValidPlacement('me');
	        }
	        return false;
	    }
	    _place() {
	        if (this._can_place()) {
	            this._pick_next_ship();
	        }
	    }
	    _cell_mousemove(cell, point) {
	        if (this.current_ship) {
	            this._move_ship(cell);
	            if (this._can_place()) {
	                renderer.view.style.cursor = 'pointer';
	            }
	            else {
	                renderer.view.style.cursor = 'not-allowed';
	            }
	            this._render();
	        }
	    }
	    _mouse_out() {
	        if (this.current_ship) {
	            renderer.view.style.cursor = 'default';
	            this.current_ship.position = undefined;
	            this._render();
	        }
	    }
	    _click(e) {
	        this._place();
	    }
	    _right_click(e) {
	        if (this.current_ship) {
	            if (this.current_ship.position) {
	                this.current_ship.position.orient = toggle_orient(this.current_ship.position.orient);
	            }
	            else {
	                this.current_ship.position = new model_1.ShipPosition(new model_1.Cell(0, 0), 'h');
	            }
	            this._render();
	        }
	    }
	}
	class PlacingUi extends PIXI.Container {
	    constructor() {
	        super();
	        this.field = new PlaceShipsControl();
	        this.addChild(this.field);
	        this.field.position.set(10, 60);
	        this.autoPlaceButton = new PIXI.Text("Place ships automatically", { fontFamily: "sans-serif", fontSize: "32px", fill: "Black" });
	        this.autoPlaceButton.interactive = true;
	        this.autoPlaceButton.buttonMode = true;
	        this.autoPlaceButton.position.set(300, 60);
	        this.addChild(this.autoPlaceButton);
	        this.autoPlaceButton.on('click', () => this.field.autoplace());
	        this.field.on('ships_placed', ships => this.emit('ships_placed', ships));
	    }
	    render() {
	        do_render();
	    }
	}
	class MyBattleField extends FieldView {
	    constructor() {
	        super('me');
	    }
	}
	class TheirBattleField extends FieldView {
	    constructor() {
	        super('ai');
	        game.autoplace('ai');
	        this.update();
	    }
	}
	class BattleUi extends PIXI.Container {
	    constructor(ships, on_finished) {
	        super();
	        this.field1 = new MyBattleField();
	        this.field1.position.set(10, 60);
	        this.addChild(this.field1);
	        this.field2 = new TheirBattleField();
	        this.field2.position.set(300, 60);
	        this.addChild(this.field2);
	        this.on_finished = on_finished;
	        this.field2.on('click', this._click.bind(this));
	        this.field2.on('cell_click', cell => {
	            let sh = game.addShot(cell, 'ai');
	            this.field2.update();
	            do_render();
	            if (sh) {
	                console.log('Player shot at', cell.x, cell.y, sh.hit);
	            }
	            if (sh && !sh.hit) {
	                this.ai_shot();
	            }
	            if (game.whichPlayerWon()) {
	                this.emit('game_over');
	            }
	        });
	        do_render();
	    }
	    ai_shot() {
	        while (true) {
	            let c = game.randomCell();
	            let sh = game.addShot(c, 'me');
	            if (sh) {
	                console.log('Shot at', c.x, c.y, sh.hit);
	            }
	            if ((sh && !sh.hit) || game.whichPlayerWon()) {
	                break;
	            }
	            this.field1.update();
	            do_render();
	        }
	        this.field1.update();
	        do_render();
	    }
	    _click() {
	        if (this.on_finished) {
	            this.on_finished('WIN');
	        }
	    }
	}
	class GameOverView extends PIXI.Container {
	    constructor(message) {
	        super();
	        let text = new PIXI.Text(message, { fontFamily: "sans-serif", fontSize: "32px", fill: "Black" });
	        text.position.set(300, 60);
	        this.addChild(text);
	        this.interactive = true;
	        this.buttonMode = true;
	    }
	}
	class GameUi {
	    constructor(stage) {
	        this.playerWon = new GameOverView('You won!');
	        this.playerLost = new GameOverView('You lost...');
	        this.stage = stage;
	        this.playerWon.on('click', () => this.toSplash());
	        this.playerLost.on('click', () => this.toSplash());
	        this.splash = new PIXI.Container();
	        this.splash.buttonMode = true;
	        this.splash.interactive = true;
	        this.splash.on("click", () => this.toPlacing());
	        this.playGame = new PIXI.Sprite(textures['play_game.png']);
	        this.playGame.position.set(10, 10);
	        this.splash.addChild(this.playGame);
	        this.toSplash();
	    }
	    placing_mouse_move() {
	    }
	    toSplash() {
	        game = new model_1.Game();
	        current_view = this.splash;
	        do_render();
	    }
	    toPlacing() {
	        this.placingUi = new PlacingUi();
	        current_view = this.placingUi;
	        do_render();
	        this.placingUi.on('ships_placed', ships => this.toBattle(ships));
	    }
	    toBattle(ships) {
	        this.battleUi = new BattleUi(ships);
	        current_view = this.battleUi;
	        do_render();
	        this.battleUi.on('game_over', () => this.toGameOver());
	    }
	    toGameOver() {
	        switch (game.whichPlayerWon()) {
	            case 'ai':
	                current_view = this.playerLost;
	                break;
	            case 'me':
	                current_view = this.playerWon;
	                break;
	        }
	        do_render();
	    }
	}
	function setup() {
	    textures = PIXI.loader.resources["assets/sprites.json"].textures;
	    gameUI = new GameUi(stage);
	}
	helpers_1.$on(window, 'load', main);


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	exports.$on = function (target, type, callback, useCapture) {
	    target.addEventListener(type, callback, !!useCapture);
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	// forked from https://raw.githubusercontent.com/danro/jquery-easing/master/jquery.easing.js
	// removed unnecessary jquery dependency and converted to typescript module
	"use strict";
	/* ============================================================
	 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	 *
	 * Open source under the BSD License.
	 *
	 * Copyright © 2008 George McGinley Smith
	 * All rights reserved.
	 * https://raw.github.com/danro/jquery-easing/master/LICENSE
	 * ======================================================== */
	var Easing = {
	    // t: current time, b: begInnIng value, c: change In value, d: duration	
	    easeInQuad: function (t, b, c, d) {
	        return c * (t /= d) * t + b;
	    },
	    easeOutQuad: function (t, b, c, d) {
	        return -c * (t /= d) * (t - 2) + b;
	    },
	    easeInOutQuad: function (t, b, c, d) {
	        if ((t /= d / 2) < 1)
	            return c / 2 * t * t + b;
	        return -c / 2 * ((--t) * (t - 2) - 1) + b;
	    },
	    easeInCubic: function (t, b, c, d) {
	        return c * (t /= d) * t * t + b;
	    },
	    easeOutCubic: function (t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t + 1) + b;
	    },
	    easeInOutCubic: function (t, b, c, d) {
	        if ((t /= d / 2) < 1)
	            return c / 2 * t * t * t + b;
	        return c / 2 * ((t -= 2) * t * t + 2) + b;
	    },
	    easeInQuart: function (t, b, c, d) {
	        return c * (t /= d) * t * t * t + b;
	    },
	    easeOutQuart: function (t, b, c, d) {
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    },
	    easeInOutQuart: function (t, b, c, d) {
	        if ((t /= d / 2) < 1)
	            return c / 2 * t * t * t * t + b;
	        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    },
	    easeInQuint: function (t, b, c, d) {
	        return c * (t /= d) * t * t * t * t + b;
	    },
	    easeOutQuint: function (t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	    },
	    easeInOutQuint: function (t, b, c, d) {
	        if ((t /= d / 2) < 1)
	            return c / 2 * t * t * t * t * t + b;
	        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    },
	    easeInSine: function (t, b, c, d) {
	        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	    },
	    easeOutSine: function (t, b, c, d) {
	        return c * Math.sin(t / d * (Math.PI / 2)) + b;
	    },
	    easeInOutSine: function (t, b, c, d) {
	        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	    },
	    easeInExpo: function (t, b, c, d) {
	        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	    },
	    easeOutExpo: function (t, b, c, d) {
	        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	    },
	    easeInOutExpo: function (t, b, c, d) {
	        if (t == 0)
	            return b;
	        if (t == d)
	            return b + c;
	        if ((t /= d / 2) < 1)
	            return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	    },
	    easeInCirc: function (t, b, c, d) {
	        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	    },
	    easeOutCirc: function (t, b, c, d) {
	        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	    },
	    easeInOutCirc: function (t, b, c, d) {
	        if ((t /= d / 2) < 1)
	            return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	    },
	    easeInElastic: function (t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t == 0)
	            return b;
	        if ((t /= d) == 1)
	            return b + c;
	        if (!p)
	            p = d * .3;
	        if (a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        }
	        else
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    },
	    easeOutElastic: function (t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t == 0)
	            return b;
	        if ((t /= d) == 1)
	            return b + c;
	        if (!p)
	            p = d * .3;
	        if (a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        }
	        else
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	    },
	    easeInOutElastic: function (t, b, c, d) {
	        var s = 1.70158;
	        var p = 0;
	        var a = c;
	        if (t == 0)
	            return b;
	        if ((t /= d / 2) == 2)
	            return b + c;
	        if (!p)
	            p = d * (.3 * 1.5);
	        if (a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        }
	        else
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        if (t < 1)
	            return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	    },
	    easeInBack: function (t, b, c, d, s) {
	        if (s == undefined)
	            s = 1.70158;
	        return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    },
	    easeOutBack: function (t, b, c, d, s) {
	        if (s == undefined)
	            s = 1.70158;
	        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    },
	    easeInOutBack: function (t, b, c, d, s) {
	        if (s == undefined)
	            s = 1.70158;
	        if ((t /= d / 2) < 1)
	            return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
	        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	    },
	    easeInBounce: function (t, b, c, d) {
	        return c - Easing.easeOutBounce(d - t, 0, c, d) + b;
	    },
	    easeOutBounce: function (t, b, c, d) {
	        if ((t /= d) < (1 / 2.75)) {
	            return c * (7.5625 * t * t) + b;
	        }
	        else if (t < (2 / 2.75)) {
	            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
	        }
	        else if (t < (2.5 / 2.75)) {
	            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
	        }
	        else {
	            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
	        }
	    },
	    easeInOutBounce: function (t, b, c, d) {
	        if (t < d / 2)
	            return Easing.easeInBounce(t * 2, 0, c, d) * .5 + b;
	        return Easing.easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Easing;
	/*
	 *
	 * TERMS OF USE - EASING EQUATIONS
	 *
	 * Open source under the BSD License.
	 *
	 * Copyright © 2001 Robert Penner
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 * Redistributions of source code must retain the above copyright notice, this list of
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list
	 * of conditions and the following disclaimer in the documentation and/or other materials
	 * provided with the distribution.
	 *
	 * Neither the name of the author nor the names of contributors may be used to endorse
	 * or promote products derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
	 * OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 */ 


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	class AnimationManager {
	    constructor(render_cb // function to do rendering
	    ) {
	        this.render_cb = render_cb; // function to do rendering
	        this.ticker = new PIXI.ticker.Ticker();
	        let self = this;
	        this.ticker.autoStart = true;
	        // Patching ticker.update to do rendering after all animation changes
	        (function patch_ticker(f) {
	            self.ticker.update = function (...args) {
	                f(...args);
	                self.render_cb();
	            };
	        })(this.ticker.update.bind(this.ticker));
	    }
	    // obj[prop] will change from start_v to start_v + d_v 
	    // using specified easing function
	    animate(conf) {
	        let self = this;
	        conf.obj.__animations = conf.obj.__animations || {};
	        // TODO: remove generator function to make code es5 targetable
	        conf.obj.__animations[conf.prop] = (function* () {
	            let time = 0;
	            while (time < conf.duration) {
	                let dt = yield null;
	                time += dt;
	                let new_v = conf.easing(time, conf.start_v, conf.d_v, conf.duration);
	                conf.obj[conf.prop] = new_v;
	            }
	        })();
	        conf.obj[conf.prop] = conf.start_v;
	        this.ticker.add(tick);
	        function tick(dt) {
	            let done = true;
	            let anim = conf.obj.__animations[conf.prop];
	            if (anim) {
	                done = anim.next(dt).done;
	            }
	            if (done) {
	                self.ticker.remove(tick);
	            }
	        }
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AnimationManager;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	class ShipPosition {
	    constructor(cell, orient) {
	        this.cell = cell;
	        this.orient = orient;
	    }
	}
	exports.ShipPosition = ShipPosition;
	class Ship {
	    constructor(length, player) {
	        this.length = length;
	        this.player = player;
	        this.hp = length;
	    }
	}
	exports.Ship = Ship;
	class Cell {
	    constructor(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	}
	exports.Cell = Cell;
	class Field {
	    constructor(width, height) {
	        this.width = width;
	        this.height = height;
	    }
	}
	exports.Field = Field;
	class Shot {
	    constructor(id, cell, player, hit, auto) {
	        this.id = id;
	        this.cell = cell;
	        this.player = player;
	        this.hit = hit;
	        this.auto = auto;
	    }
	}
	class Game {
	    constructor() {
	        this.rules = {
	            ships: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
	            field: {
	                width: 10,
	                height: 10
	            }
	        };
	        this.shots = [];
	        this.ships = [];
	        this.rules.ships.forEach(l => this.createShip('me', l));
	        this.rules.ships.forEach(l => this.createShip('ai', l));
	    }
	    _field() {
	        return new Field(this.rules.field.width, this.rules.field.height);
	    }
	    createShip(player, length) {
	        return this.ships.push(new Ship(length, player));
	    }
	    shipsByPlayer(player) {
	        return this.ships.filter(x => x.player == player);
	    }
	    isValidPlacement(player) {
	        let ships = this.shipsByPlayer(player);
	        let ships2 = [];
	        for (let sh of ships) {
	            if (sh.position) {
	                if (!ship_fit_field(sh.length, sh.position, this._field())) {
	                    return false;
	                }
	                if (!can_place(sh.length, sh.position, ships2, this._field())) {
	                    return false;
	                }
	                ships2.push(sh);
	            }
	        }
	        return true;
	    }
	    autoplace(player) {
	        random_place_ships(this.shipsByPlayer(player), this._field());
	    }
	    shipByCell(player, cell) {
	        for (let sh of this.shipsByPlayer(player)) {
	            let { startx, endx, starty, endy } = ship_ends(sh.length, sh.position);
	            for (let x = startx; x <= endx; ++x) {
	                for (let y = starty; y <= endy; ++y) {
	                    if ((cell.x == x) && (cell.y == y)) {
	                        return sh;
	                    }
	                }
	            }
	        }
	        return undefined;
	    }
	    addShot(cell, player, auto = false) {
	        if (!is_cell_valid(cell.x, cell.y, this._field())) {
	            return;
	        }
	        let ship = this.shipByCell(player, cell);
	        let hit = !!ship;
	        let old_shot = this.shots.find(x => (x.player == player) && (x.cell.x == cell.x) && (x.cell.y == cell.y));
	        if (old_shot) {
	            return;
	        }
	        let new_id = Math.max(0, ...this.shots.map(x => x.id)) + 1;
	        let new_shot = new Shot(new_id, cell, player, hit, auto);
	        this.shots.push(new_shot);
	        if (ship) {
	            ship.hp -= 1;
	            if (ship.hp <= 0) {
	                let { startx, endx, starty, endy } = ship_ends(ship.length, ship.position);
	                for (let x = startx - 1; x <= endx + 1; ++x) {
	                    for (let y = starty - 1; y <= endy + 1; ++y) {
	                        this.addShot(new Cell(x, y), player, true);
	                    }
	                }
	            }
	            else {
	                this.addShot(new Cell(cell.x - 1, cell.y - 1), player, true);
	                this.addShot(new Cell(cell.x + 1, cell.y - 1), player, true);
	                this.addShot(new Cell(cell.x - 1, cell.y + 1), player, true);
	                this.addShot(new Cell(cell.x + 1, cell.y + 1), player, true);
	            }
	        }
	        return new_shot;
	    }
	    shotsByPlayer(player) {
	        return this.shots.filter(x => x.player == player);
	    }
	    whichPlayerWon() {
	        if (this.shipsByPlayer('me').filter(x => x.hp > 0).length == 0) {
	            return 'ai';
	        }
	        if (this.shipsByPlayer('ai').filter(x => x.hp > 0).length == 0) {
	            return 'me';
	        }
	    }
	    randomCell() {
	        let x = getRandomInt(0, this.rules.field.width);
	        let y = getRandomInt(0, this.rules.field.height);
	        return new Cell(x, y);
	    }
	}
	exports.Game = Game;
	function is_adj_cell(x1, y1, x2, y2, distance = 1) {
	    return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2)) <= distance;
	}
	function is_adj_ship(ship_length1, position1, ship_length2, position2, field) {
	    let { startx: startx1, endx: endx1, starty: starty1, endy: endy1 } = ship_ends(ship_length1, position1);
	    let { startx: startx2, endx: endx2, starty: starty2, endy: endy2 } = ship_ends(ship_length2, position2);
	    for (let x1 = startx1; x1 <= endx1; ++x1) {
	        for (let x2 = startx2; x2 <= endx2; ++x2) {
	            for (let y1 = starty1; y1 <= endy1; ++y1) {
	                for (let y2 = starty2; y2 <= endy2; ++y2) {
	                    if (is_adj_cell(x1, y1, x2, y2)) {
	                        return true;
	                    }
	                }
	            }
	        }
	    }
	    return false;
	}
	function can_place(ship_length, pos, ships, field) {
	    if (!ship_fit_field(ship_length, pos, field)) {
	        return false;
	    }
	    for (let sh of ships) {
	        if (sh.position && is_adj_ship(ship_length, pos, sh.length, sh.position, field)) {
	            return false;
	        }
	    }
	    return true;
	}
	function is_cell_valid(x, y, field) {
	    return x >= 0 && y >= 0 && x < field.width && y < field.height;
	}
	function ship_ends(ship_length, position) {
	    let startx = position.cell.x;
	    let endx = startx;
	    let starty = position.cell.y;
	    let endy = starty;
	    switch (position.orient) {
	        case 'h':
	            endx += ship_length - 1;
	            break;
	        case 'v':
	            endy += ship_length - 1;
	            break;
	        default: throw new Error('Invalid orientation');
	    }
	    return { startx, endx, starty, endy };
	}
	function ship_fit_field(ship_length, position, field) {
	    let { startx, endx, starty, endy } = ship_ends(ship_length, position);
	    return is_cell_valid(startx, endx, field) && is_cell_valid(starty, endy, field);
	}
	function getRandomInt(min, max) {
	    min = Math.ceil(min);
	    max = Math.floor(max);
	    return Math.floor(Math.random() * (max - min)) + min;
	}
	function all_valid_positions(ship_length, ships, field) {
	    let result = [];
	    let orients = ['h', 'v'];
	    for (let x = 0; x < field.width; ++x) {
	        for (let y = 0; y < field.height; ++y) {
	            for (let orient of orients) {
	                let pos = new ShipPosition(new Cell(x, y), orient);
	                if (can_place(ship_length, pos, ships, field)) {
	                    result.push(pos);
	                }
	            }
	        }
	    }
	    return result;
	}
	function random_place_ships(ships, field) {
	    let all_ships = ships.filter(x => !!x.position);
	    let new_ships = ships.filter(x => !x.position);
	    let result = [];
	    for (let new_sh of new_ships) {
	        let positions = all_valid_positions(new_sh.length, all_ships, field);
	        var chosen_pos = positions[getRandomInt(0, positions.length)];
	        new_sh.position = chosen_pos;
	        all_ships.push(new_sh);
	        result.push(new_sh);
	    }
	    return result;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map