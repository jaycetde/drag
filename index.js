var events = require('event')
  , Emitter = require('emitter')
;

module.exports = Drag;

function Drag(el) {
    if (!(this instanceof Drag)) return new Drag(el);
    Emitter.call(this);
    this.el = el;
    this._start = null;
    
    this.start = this.start.bind(this);
    this.drag = this.drag.bind(this);
    this.end = this.end.bind(this);
    
    events.bind(el, 'mousedown', this.start);
}

Drag.prototype = new Emitter();

Drag.prototype.start = function (e) {
    this._start = e;
    events.bind(document, 'mousemove', this.drag);
    events.bind(document, 'mouseup', this.end);
    
    this.emit('dragstart', e);
};

Drag.prototype.drag = function (e) {
    this.emit('drag', e, this._start);
};

Drag.prototype.end = function (e) {
    events.unbind(document, 'mousemove', this.drag);
    events.unbind(document, 'mouseup', this.end);
    
    this.emit('dragend', e, this._start);
    
    this._start = null;
};