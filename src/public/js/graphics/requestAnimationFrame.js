"use strict";
/**
 * Author: Cy Brown.
 * File: util.js
 * Description:
 *      Collection of utility classes and polyfills:
 *          -Class Timer
 *          -Polyfill requestAnimationFrame
 */

/**
 * Description:
 *      Polyfill for requestAnimationFrame.
 *      Use vendor's prefixed requestAnimationFrame, or setTimeout as a fallback.
 */
define(function () {
    window.requestAnimationFrame = window.requestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame;
    if (!window.requestAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback, element) {
            var currTime, timeToCall;
            currTime = Date.now();
            timeToCall = Math.max(0, 16 - (currTime - lastTime));
            lastTime = currTime + timeToCall;
            return window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
        };
    }
});
