/**
 * Timer
 * Description:
 *      Object oriented Timer.
 *      This object has method to start and stop the timer.
 *      Interval can be set while timer is running.
 *
 * Properties:
 *      run:        function to run by the timer.
 *      time:       time between each run.
 *      isStarted:  true if the timer is active (readonly).
 *
 * Methods:
 *      start(): start the timer, return false if was already active.
 *      stop():  stop the timer, return true if was active.
 */

define(function () {
    var Timer = function (time, run) {
        this.handler = null;
        this.run = (typeof run === "function") ? run : null;
        this.time = (typeof time === "number") ? time : 1000;
        Object.defineProperty(this, "time", {
            get: function () {
                return this.time;
            },
            set: function (value) {
                this.time = value;
                if (this.stop()) {
                    this.start();
                }
            }
        });
        Object.defineProperty(this, "isStarted", {
            get: function () {
                return this.handler !== null;
            }
        });
    };

    Timer.prototype.start = function () {
        if ((this.handler !== null) && (this.run !== null)) {
            return false;
        }
        setTimeout(this.run, 0);
        this.handler = setInterval(this.run, this.time);
        return true;
    };

    Timer.prototype.stop = function () {
        if (this.handler === null) {
            return false;
        }
        clearTimeout(this.handler);
        this.handler = null;
        return true;
    };

    return Timer;
});
