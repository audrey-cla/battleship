/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var sheep = {dom: {parentNode: {removeChild: function () {}}}};

    var player = {
        grid: [],
        tries: [],
        fleet: [],
        game: null,
        activeShip: 0,
        init: function () {
            // créé la flotte
            this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
            this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

            // créé les grilles
            this.grid = utils.createGrid(10, 10);
            this.tries = utils.createGrid(10, 10);
        },
        play: function (col, line) {
            // appel la fonction fire du game, et lui passe une calback pour récupérer le résultat du tir
            this.game.fire(this, col, line, _.bind(function (hasSucced) {
                this.tries[line][col] = hasSucced;
            }, this));
        },
        // quand il est attaqué le joueur doit dire si il a un bateaux ou non à l'emplacement choisi par l'adversaire
        receiveAttack: function (col, line, callback) {
            var succeed = false;

            if (this.grid[line][col] !== 0) {
                succeed = true;
                this.grid[line][col] = 0;
            }
            callback.call(undefined, succeed);
        },
        setActiveShipPosition: function (x, y) {
            var ship = this.fleet[this.activeShip];
            var i = 0;
console.log(x,y,ship)
            while (i < ship.getLife()) {
                if (  this.grid[y][x + i] != 0) {
                return alert('NO');
                } else {
                    this.grid[y][x + i] = ship.getId();
                    i += 1;
                }
                
            }

            return true;
        },
        clearPreview: function () {
            this.fleet.forEach(function (ship) {
                if (sheep.dom.parentNode) {
                    sheep.dom.parentNode.removeChild(ship.dom);
                    ship.dom.remove();
                }
            });
        },
        resetShipPlacement: function () {
            this.clearPreview();
            this.activeShip = 0;
            this.grid = utils.createGrid(10, 10);
        },
        activateNextShip: function () {
            if (this.activeShip < this.fleet.length - 1) {
                this.activeShip += 1;
                return true;
            } else {
                return false;
            }
        },
        renderTries: function (grid) {
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) {
                    var node = grid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col + 1) + ')');

                    if (val === true) {
                        node.style.backgroundColor = '#e60019';
                    } else if (val === false) {
                        node.style.backgroundColor = '#aeaeae';
                    }
                });
            });
        },
        renderPreview: function (grid,minigrid) {
            this.tries.forEach(function (row, rid) {
                row.forEach(function (val, col) {
                    if (player.grid[rid][col] == 1 )
                    {
                        var node = minigrid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col -1) + ')');
                        node.style.backgroundColor = player.fleet[0].color;
                    }
                    if (player.grid[rid][col] == 2 )
                    {
                        var node = minigrid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col -1) + ')');
                        node.style.backgroundColor = player.fleet[1].color;
                    }
                    if (player.grid[rid][col] == 3 )
                    {
                        var node = minigrid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col -1) + ')');
                        node.style.backgroundColor = player.fleet[2].color;
                    }
                    if (player.grid[rid][col] == 4 )
                    {
                        var node = minigrid.querySelector('.row:nth-child(' + (rid + 1) + ') .cell:nth-child(' + (col) + ')');
                        node.style.backgroundColor = player.fleet[3].color;
                    }
                });
            });
        },
        renderShips: function (grid) {
        },
        setGame: function () {
        },
        isShipOk: function () {
        }
    };

    global.player = player;

}(this));