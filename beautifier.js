function Point(t, e) {
    t || (t = 0), e || (e = 0), this.x = t, this.y = e
}

function Rectangle(t, e, i, s) {
    t || (t = 0), e || (e = 0), i || (i = 0), s || (s = 0), this.x = t, this.y = e, this.width = i, this.height = s
}

function Transform() {
    this._obj = null, this._mdirty = !1, this._vdirty = !1, this._tmat = Point._m4.create(), this._imat = Point._m4.create(), this._atmat = Point._m4.create(), this._aimat = Point._m4.create(), this._pscal = Point._m4.create(), this._cmat = Point._m4.create(), this._cvec = Point._v4.create(), this._cID = !0, this._scaleX = 1, this._scaleY = 1, this._scaleZ = 1, this._rotationX = 0, this._rotationY = 0, this._rotationZ = 0
}

function EventDispatcher() {
    this.lsrs = {}, this.cals = {}
}

function Event(t, e) {
    e || (e = !1), this.type = t, this.target = null, this.currentTarget = null, this.bubbles = e
}

function MouseEvent(t, e) {
    Event.call(this, t, e), this.movementX = 0, this.movementY = 0
}

function TouchEvent(t, e) {
    Event.call(this, t, e), this.stageX = 0, this.stageY = 0, this.touchPointID = -1
}

function KeyboardEvent(t, e) {
    Event.call(this, t, e), this.altKey = !1, this.ctrlKey = !1, this.shiftKey = !1, this.keyCode = 0, this.charCode = 0
}

function DisplayObject() {
    EventDispatcher.call(this), this.visible = !0, this.parent = null, this.stage = null, this.transform = new Transform, this.transform._obj = this, this.blendMode = BlendMode.NORMAL, this.x = 0, this.y = 0, this.z = 0, this._trect = new Rectangle, this._tempP = new Point, this._torg = Point._v4.create(), this._tvec4_0 = Point._v4.create(), this._tvec4_1 = Point._v4.create(), this._tempm = Point._m4.create(), this._atsEv = new Event(Event.ADDED_TO_STAGE), this._rfsEv = new Event(Event.REMOVED_FROM_STAGE), this._atsEv.target = this._rfsEv.target = this
}

function InteractiveObject() {
    DisplayObject.call(this), this.buttonMode = !1, this.mouseEnabled = !0, this.mouseChildren = !0
}

function DisplayObjectContainer() {
    InteractiveObject.call(this), this._tempR = new Rectangle, this.numChildren = 0, this._children = []
}

function BitmapData(t) {
    if (this.width = 0, this.height = 0, this.rect = new Rectangle, this.loader = new EventDispatcher, this.loader.bitmapData = this, this._rwidth = 0, this._rheight = 0, this._rrect = null, this._texture = null, this._tcBuffer = null, this._vBuffer = null, this._loaded = !1, this._dirty = !0, this._gpuAllocated = !1, this._buffer = null, this._ubuffer = null, null != t) {
        var e = document.createElement("img");
        e.crossOrigin = "Anonymous", e.onload = function(t) {
            this._initFromImg(e, e.width, e.height);
            var i = new Event(Event.COMPLETE);
            this.loader.dispatchEvent(i)
        }.bind(this), e.src = t
    }
}

function Bitmap(t) {
    DisplayObject.call(this), this.bitmapData = t
}

function Stage(t) {
    DisplayObjectContainer.call(this), document.body.setAttribute("style", "margin:0; overflow:hidden");
    var e = document.createElement("meta");
    e.setAttribute("name", "viewport"), e.setAttribute("content", "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0"), document.getElementsByTagName("head")[0].appendChild(e), this.stage = this, this.stageWidth = 0, this.stageHeight = 0, this.focus = null, this._focii = [null, null, null], this._mousefocus = null, this._knM = !1, this._mstack = new Stage._MStack, this._cmstack = new Stage._CMStack, this._sprg = null, this._svec4_0 = Point._v4.create(), this._svec4_1 = Point._v4.create(), this._pmat = Point._m4.create([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1]), this._umat = Point._m4.create([2, 0, 0, 0, 0, -2, 0, 0, 0, 0, 2, 0, -1, 1, 0, 1]), this._smat = Point._m4.create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, .001, 0, 0, 0, 0, 1]), this._mcEvs = [new MouseEvent(MouseEvent.CLICK, !0), new MouseEvent(MouseEvent.MIDDLE_CLICK, !0), new MouseEvent(MouseEvent.RIGHT_CLICK, !0)], this._mdEvs = [new MouseEvent(MouseEvent.MOUSE_DOWN, !0), new MouseEvent(MouseEvent.MIDDLE_MOUSE_DOWN, !0), new MouseEvent(MouseEvent.RIGHT_MOUSE_DOWN, !0)], this._muEvs = [new MouseEvent(MouseEvent.MOUSE_UP, !0), new MouseEvent(MouseEvent.MIDDLE_MOUSE_UP, !0), new MouseEvent(MouseEvent.RIGHT_MOUSE_UP, !0)], this._smd = [!1, !1, !1], this._smu = [!1, !1, !1], this._smm = !1, this._srs = !1, this._touches = {}, this._canvas = this.canvas = document.getElementById(t), Stage._main = this;
    var i = {
            alpha: !0,
            antialias: !0,
            depth: !0,
            premultipliedAlpha: !0
        },
        s = this.canvas;
    gl = s.getContext("webgl", i), gl || (gl = s.getContext("experimental-webgl", i)), gl || alert("Could not initialize WebGL. Try to update your browser or graphic drivers."), gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
    var n = document;
    n.addEventListener("contextmenu", Stage._ctxt, !1), n.addEventListener("dragstart", Stage._blck, !1), s.addEventListener("touchstart", Stage._onTD, !1), s.addEventListener("touchmove", Stage._onTM, !1), s.addEventListener("touchend", Stage._onTU, !1), n.addEventListener("touchstart", Stage._blck, !1), s.addEventListener("touchmove", Stage._blck, !1), s.addEventListener("touchend", Stage._blck, !1), s.addEventListener("mousedown", Stage._onMD, !1), s.addEventListener("mousemove", Stage._onMM, !1), s.addEventListener("mouseup", Stage._onMU, !1), s.addEventListener("mousemove", Stage._blck, !1), s.addEventListener("mouseup", Stage._blck, !1), n.addEventListener("keydown", Stage._onKD, !1), n.addEventListener("keyup", Stage._onKU, !1), n.addEventListener("keydown", Stage._blck, !1), n.addEventListener("keyup", Stage._blck, !1), window.addEventListener("resize", Stage._onRS, !1), this._initShaders(), this._initBuffers(), gl.clearColor(0, 0, 0, 0), gl.enable(gl.BLEND), gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA), gl.enable(gl.DEPTH_TEST), gl.depthFunc(gl.LEQUAL), this._resize(), this._srs = !0, _requestAF(Stage._tick)
}

function Graphics() {
    this._conf = {
        ftype: 0,
        fbdata: null,
        fcolor: null,
        lwidth: 0,
        lcolor: null
    }, this._points = [0, 0], this._fills = [], this._afills = [], this._lfill = null, this._rect = new Rectangle(0, 0, 0, 0), this._srect = new Rectangle(0, 0, 0, 0), this._startNewFill()
}

function Sprite() {
    DisplayObjectContainer.call(this), this._trect2 = new Rectangle, this.graphics = new Graphics
}

function TextFormat(t, e, i, s, n, r, a) {
    this.font = t ? t : "Times New Roman", this.size = e ? e : 12, this.color = i ? i : 0, this.bold = s ? s : !1, this.italic = n ? n : !1, this.align = r ? r : TextFormatAlign.LEFT, this.leading = a ? a : 0, this.maxW = 0, this.data = {
        image: null,
        tw: 0,
        th: 0,
        rw: 0,
        rh: 0
    }
}

function TextField() {
    InteractiveObject.call(this), this._tarea = document.createElement("textarea"), this._tareaAdded = !1, this._tarea.setAttribute("style", "font-family:Times New Roman; font-size:12px; z-index:-1; 											position:absolute; top:0px; left:0px; opacity:0; pointer-events:none; user-select:none; width:100px; height:100px;"), this._tarea.addEventListener("input", this._tfInput.bind(this), !1), this._stage = null, this._type = "dynamic", this._selectable = !0, this._mdown = !1, this._curPos = -1, this._select = null, this._metrics = null, this._wordWrap = !1, this._textW = 0, this._textH = 0, this._areaW = 100, this._areaH = 100, this._text = "", this._tForm = new TextFormat, this._rwidth = 0, this._rheight = 0, this._background = !1, this._border = !1, this._texture = gl.createTexture(), this._tcArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]), this._tcBuffer = gl.createBuffer(), Stage._setBF(this._tcBuffer), gl.bufferData(gl.ARRAY_BUFFER, this._tcArray, gl.STATIC_DRAW), this._fArray = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), this._vBuffer = gl.createBuffer(), Stage._setBF(this._vBuffer), gl.bufferData(gl.ARRAY_BUFFER, this._fArray, gl.STATIC_DRAW), this.addEventListener2(Event.ADDED_TO_STAGE, this._tfATS, this), this.addEventListener2(Event.REMOVED_FROM_STAGE, this._tfRFS, this), this.addEventListener2(MouseEvent.MOUSE_DOWN, this._tfMD, this), this.addEventListener2(KeyboardEvent.KEY_UP, this._tfKU, this), this._brect = new Rectangle
}
window._requestAF = function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
        window.setTimeout(t, 1e3 / 60)
    }
}(), Point.prototype.add = function(t) {
    return new Point(this.x + t.x, this.y + t.y)
}, Point.prototype.clone = function() {
    return new Point(this.x, this.y)
}, Point.prototype.copyFrom = function(t) {
    this.x = t.x, this.y = t.y
}, Point.prototype.equals = function(t) {
    return this.x == t.x && this.y == t.y
}, Point.prototype.normalize = function(t) {
    var e = Math.sqrt(this.x * this.x + this.y * this.y);
    this.x *= t / e, this.y *= t / e
}, Point.prototype.offset = function(t, e) {
    this.x += t, this.y += e
}, Point.prototype.setTo = function(t, e) {
    this.x = t, this.y = e
}, Point.prototype.subtract = function(t) {
    return new Point(this.x - t.x, this.y - t.y)
}, Point.distance = function(t, e) {
    return Point._distance(t.x, t.y, e.x, e.y)
}, Point.interpolate = function(t, e, i) {
    return new Point(t.x + i * (e.x - t.x), t.y + i * (e.y - t.y))
}, Point.polar = function(t, e) {
    return new Point(t * Math.cos(e), t * Math.sin(e))
}, Point._distance = function(t, e, i, s) {
    return Math.sqrt((i - t) * (i - t) + (s - e) * (s - e))
}, Point._v4 = {}, Point._m4 = {}, Point._v4.create = function() {
    var t = new Float32Array(4);
    return t
}, Point._m4.create = function(t) {
    var e = new Float32Array(16);
    return e[0] = e[5] = e[10] = e[15] = 1, t && Point._m4.set(t, e), e
}, Point._v4.add = function(t, e, i) {
    i[0] = t[0] + e[0], i[1] = t[1] + e[1], i[2] = t[2] + e[2], i[3] = t[3] + e[3]
}, Point._v4.set = function(t, e) {
    e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3]
}, Point._m4.set = function(t, e) {
    e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]
}, Point._m4.multiply = function(t, e, i) {
    var s = t[0],
        n = t[1],
        r = t[2],
        a = t[3],
        h = t[4],
        o = t[5],
        c = t[6],
        l = t[7],
        _ = t[8],
        u = t[9],
        p = t[10],
        g = t[11],
        f = t[12],
        d = t[13],
        m = t[14],
        v = t[15],
        y = e[0],
        E = e[1],
        T = e[2],
        x = e[3];
    return i[0] = y * s + E * h + T * _ + x * f, i[1] = y * n + E * o + T * u + x * d, i[2] = y * r + E * c + T * p + x * m, i[3] = y * a + E * l + T * g + x * v, y = e[4], E = e[5], T = e[6], x = e[7], i[4] = y * s + E * h + T * _ + x * f, i[5] = y * n + E * o + T * u + x * d, i[6] = y * r + E * c + T * p + x * m, i[7] = y * a + E * l + T * g + x * v, y = e[8], E = e[9], T = e[10], x = e[11], i[8] = y * s + E * h + T * _ + x * f, i[9] = y * n + E * o + T * u + x * d, i[10] = y * r + E * c + T * p + x * m, i[11] = y * a + E * l + T * g + x * v, y = e[12], E = e[13], T = e[14], x = e[15], i[12] = y * s + E * h + T * _ + x * f, i[13] = y * n + E * o + T * u + x * d, i[14] = y * r + E * c + T * p + x * m, i[15] = y * a + E * l + T * g + x * v, i
}, Point._m4.inverse = function(t, e) {
    var i = t[0],
        s = t[1],
        n = t[2],
        r = t[3],
        a = t[4],
        h = t[5],
        o = t[6],
        c = t[7],
        l = t[8],
        _ = t[9],
        u = t[10],
        p = t[11],
        g = t[12],
        f = t[13],
        d = t[14],
        m = t[15],
        v = i * h - s * a,
        y = i * o - n * a,
        E = i * c - r * a,
        T = s * o - n * h,
        x = s * c - r * h,
        S = n * c - r * o,
        M = l * f - _ * g,
        b = l * d - u * g,
        w = l * m - p * g,
        R = _ * d - u * f,
        D = _ * m - p * f,
        A = u * m - p * d,
        F = v * A - y * D + E * R + T * w - x * b + S * M;
    return F ? (F = 1 / F, e[0] = (h * A - o * D + c * R) * F, e[1] = (n * D - s * A - r * R) * F, e[2] = (f * S - d * x + m * T) * F, e[3] = (u * x - _ * S - p * T) * F, e[4] = (o * w - a * A - c * b) * F, e[5] = (i * A - n * w + r * b) * F, e[6] = (d * E - g * S - m * y) * F, e[7] = (l * S - u * E + p * y) * F, e[8] = (a * D - h * w + c * M) * F, e[9] = (s * w - i * D - r * M) * F, e[10] = (g * x - f * E + m * v) * F, e[11] = (_ * E - l * x - p * v) * F, e[12] = (h * b - a * R - o * M) * F, e[13] = (i * R - s * b + n * M) * F, e[14] = (f * y - g * T - d * v) * F, e[15] = (l * T - _ * y + u * v) * F, e) : null
}, Point._m4.multiplyVec2 = function(t, e, i) {
    var s = e[0],
        n = e[1];
    i[0] = s * t[0] + n * t[4] + t[12], i[1] = s * t[1] + n * t[5] + t[13]
}, Point._m4.multiplyVec4 = function(t, e, i) {
    var s = e[0],
        n = e[1],
        r = e[2],
        a = e[3];
    i[0] = t[0] * s + t[4] * n + t[8] * r + t[12] * a, i[1] = t[1] * s + t[5] * n + t[9] * r + t[13] * a, i[2] = t[2] * s + t[6] * n + t[10] * r + t[14] * a, i[3] = t[3] * s + t[7] * n + t[11] * r + t[15] * a
}, Rectangle.prototype.clone = function() {
    return new Rectangle(this.x, this.y, this.width, this.height)
}, Rectangle.prototype.contains = function(t, e) {
    return t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height
}, Rectangle.prototype.containsPoint = function(t) {
    return this.contains(t.x, t.y)
}, Rectangle.prototype.containsRect = function(t) {
    return this.x <= t.x && this.y <= t.y && t.x + t.width <= this.x + this.width && t.y + t.height <= this.y + this.height
}, Rectangle.prototype.copyFrom = function(t) {
    this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
}, Rectangle.prototype.equals = function(t) {
    return this.x == t.x && this.y == t.y && this.width == t.width && this.height == t.height
}, Rectangle.prototype.inflate = function(t, e) {
    this.x -= t, this.y -= e, this.width += 2 * t, this.height += 2 * e
}, Rectangle.prototype.inflatePoint = function(t) {
    this.inflate(t.x, t.y)
}, Rectangle.prototype.intersection = function(t) {
    var e = Math.max(this.x, t.x),
        i = Math.max(this.y, t.y),
        s = Math.min(this.x + this.width, t.x + t.width),
        n = Math.min(this.y + this.height, t.y + t.height);
    return e > s || i > n ? new Rectangle : new Rectangle(e, i, s - e, n - i)
}, Rectangle.prototype.intersects = function(t) {
    return t.y + t.height < this.y || t.x > this.x + this.width || t.y > this.y + this.height || t.x + t.width < this.x ? !1 : !0
}, Rectangle.prototype.isEmpty = function() {
    return this.width <= 0 || this.height <= 0
}, Rectangle.prototype.offset = function(t, e) {
    this.x += t, this.y += e
}, Rectangle.prototype.offsetPoint = function(t) {
    this.offset(t.x, t.y)
}, Rectangle.prototype.setEmpty = function() {
    this.x = this.y = this.width = this.height = 0
}, Rectangle.prototype.setTo = function(t, e, i, s) {
    this.x = t, this.y = e, this.width = i, this.height = s
}, Rectangle.prototype.union = function(t) {
    if (this.isEmpty()) return t.clone();
    if (t.isEmpty()) return this.clone();
    var e = this.clone();
    return e._unionWith(t), e
}, Rectangle._temp = new Float32Array(2), Rectangle.prototype._unionWith = function(t) {
    if (!t.isEmpty()) {
        if (this.isEmpty()) return void this.copyFrom(t);
        this._unionWP(t.x, t.y), this._unionWP(t.x + t.width, t.y + t.height)
    }
}, Rectangle.prototype._unionWP = function(t, e) {
    var i = Math.min(this.x, t),
        s = Math.min(this.y, e);
    this.width = Math.max(this.x + this.width, t) - i, this.height = Math.max(this.y + this.height, e) - s, this.x = i, this.y = s
}, Rectangle.prototype._unionWL = function(t, e, i, s) {
    0 == this.width && 0 == this.height ? this._setP(t, e) : this._unionWP(t, e), this._unionWP(i, s)
}, Rectangle.prototype._setP = function(t, e) {
    this.x = t, this.y = e, this.width = this.height = 0
}, Transform.prototype._getTMat = function() {
    var t = this._obj,
        e = this._tmat;
    return this._checkMat(), e[12] = t.x, e[13] = t.y, e[14] = t.z, e
}, Transform.prototype._getIMat = function() {
    return Point._m4.inverse(this._getTMat(), this._imat), this._imat
}, Transform.prototype._postScale = function(t, e) {
    this._checkMat();
    var i = this._pscal;
    i[10] = i[15] = 1, i[0] = t, i[5] = e, Point._m4.multiply(i, this._tmat, this._tmat), this._vdirty = !0
}, Transform.prototype._valsToMat = function() {
    var t = this._tmat,
        e = this._scaleX,
        i = this._scaleY,
        s = this._scaleZ,
        n = -.01745329252,
        r = this._rotationX * n,
        a = this._rotationY * n,
        h = this._rotationZ * n,
        o = Math.cos(r),
        c = Math.cos(a),
        l = Math.cos(h),
        _ = Math.sin(r),
        u = Math.sin(a),
        p = Math.sin(h);
    t[0] = c * l * e, t[1] = -c * p * e, t[2] = u * e, t[4] = (o * p + _ * u * l) * i, t[5] = (o * l - _ * u * p) * i, t[6] = -_ * c * i, t[8] = (_ * p - o * u * l) * s, t[9] = (_ * l + o * u * p) * s, t[10] = o * c * s
}, Transform.prototype._matToVals = function() {
    var t = this._tmat,
        e = t[0],
        i = t[1],
        s = t[2],
        n = t[4],
        r = t[5],
        a = t[6],
        h = t[8],
        o = t[9],
        c = t[10];
    this._scaleX = Math.sqrt(e * e + i * i + s * s), this._scaleY = Math.sqrt(n * n + r * r + a * a), this._scaleZ = Math.sqrt(h * h + o * o + c * c);
    var l = 1 / this._scaleX,
        _ = 1 / this._scaleY,
        u = 1 / this._scaleZ;
    e *= l, i *= l, s *= l, n *= _, r *= _, a *= _, h *= u, o *= u, c *= u;
    var p = -57.29577951308;
    this._rotationX = p * Math.atan2(-a, c), this._rotationY = p * Math.atan2(s, Math.sqrt(a * a + c * c)), this._rotationZ = p * Math.atan2(-i, e)
}, Transform.prototype._checkVals = function() {
    this._vdirty && (this._matToVals(), this._vdirty = !1)
}, Transform.prototype._checkMat = function() {
    this._mdirty && (this._valsToMat(), this._mdirty = !1)
}, Transform.prototype._setOPos = function(t) {
    var t = this._tmat;
    this._obj.x = t[12], this._obj.y = t[13], this._obj.z = t[14]
}, Transform.prototype._checkColorID = function() {
    var t = this._cmat,
        e = this._cvec;
    this._cID = 1 == t[15] && 1 == t[0] && 0 == t[1] && 0 == t[2] && 0 == t[3] && 0 == t[4] && 1 == t[5] && 0 == t[6] && 0 == t[7] && 0 == t[8] && 0 == t[9] && 1 == t[10] && 0 == t[11] && 0 == t[12] && 0 == t[13] && 0 == t[14] && 1 == t[15] && 0 == e[0] && 0 == e[1] && 0 == e[2] && 0 == e[3]
}, Transform.prototype._setMat3 = function(t) {
    var e = this._tmat;
    e[0] = t[0], e[1] = t[1], e[4] = t[3], e[5] = t[4], e[12] = t[6], e[13] = t[7]
}, Transform.prototype._getMat3 = function(t) {
    var e = this._tmat;
    t[0] = e[0], t[1] = e[1], t[3] = e[4], t[4] = e[5], t[6] = e[12], t[7] = e[13]
}, Transform.prototype._setCMat5 = function(t) {
    for (var e = this._cmat, i = this._cvec, s = 0; 4 > s; s++) {
        i[s] = t[20 + s];
        for (var n = 0; 4 > n; n++) e[4 * s + n] = t[5 * s + n]
    }
}, Transform.prototype._getCMat5 = function(t) {
    var e = this._cmat,
        i = this._cvec;
    t[24] = 1;
    for (var s = 0; 4 > s; s++) {
        t[20 + s] = i[s];
        for (var n = 0; 4 > n; n++) t[5 * s + n] = e[4 * s + n]
    }
}, Transform.prototype.__defineSetter__("matrix", function(t) {
    this._checkMat(), this._setMat3(t), this._setOPos(), this._vdirty = !0
}), Transform.prototype.__defineGetter__("matrix", function() {
    this._checkMat();
    var t = new Float32Array(9);
    return this._getMat3(t), t
}), Transform.prototype.__defineSetter__("matrix3D", function(t) {
    this._checkMat(), Point._m4.set(t, this._tmat), this._setOPos(), this._vdirty = !0
}), Transform.prototype.__defineGetter__("matrix3D", function() {
    return this._checkMat(), Point._m4.create(this._getTMat())
}), Transform.prototype.__defineSetter__("colorTransform", function(t) {
    this._setCMat5(t), this._checkColorID()
}), Transform.prototype.__defineGetter__("colorTransform", function() {
    var t = new Float32Array(25);
    return this._getCMat5(t), t
}), EventDispatcher.efbc = [], EventDispatcher.prototype.hasEventListener = function(t) {
    var e = this.lsrs[t];
    return null == e ? !1 : e.length > 0
}, EventDispatcher.prototype.addEventListener = function(t, e) {
    this.addEventListener2(t, e, null)
}, EventDispatcher.prototype.addEventListener2 = function(t, e, i) {
    if (null == this.lsrs[t] && (this.lsrs[t] = [], this.cals[t] = []), this.lsrs[t].push(e), this.cals[t].push(i), t == Event.ENTER_FRAME) {
        var s = EventDispatcher.efbc;
        s.indexOf(this) < 0 && s.push(this)
    }
}, EventDispatcher.prototype.removeEventListener = function(t, e) {
    var i = this.lsrs[t];
    if (null != i) {
        var s = i.indexOf(e);
        if (!(0 > s)) {
            var n = this.cals[t];
            if (i.splice(s, 1), n.splice(s, 1), t == Event.ENTER_FRAME && 0 == i.length) {
                var r = EventDispatcher.efbc;
                r.splice(r.indexOf(this), 1)
            }
        }
    }
}, EventDispatcher.prototype.dispatchEvent = function(t) {
    t.currentTarget = this, null == t.target && (t.target = this);
    var e = this.lsrs[t.type];
    if (null != e)
        for (var i = this.cals[t.type], s = 0; s < e.length; s++) null == i[s] ? e[s](t) : e[s].call(i[s], t)
}, Event.ENTER_FRAME = "enterFrame", Event.RESIZE = "resize", Event.ADDED_TO_STAGE = "addedToStage", Event.REMOVED_FROM_STAGE = "removedFromStage", Event.CHANGE = "change", Event.OPEN = "open", Event.PROGRESS = "progress", Event.COMPLETE = "complete", MouseEvent.prototype = new Event, MouseEvent.CLICK = "click", MouseEvent.MOUSE_DOWN = "mouseDown", MouseEvent.MOUSE_UP = "mouseUp", MouseEvent.MIDDLE_CLICK = "middleClick", MouseEvent.MIDDLE_MOUSE_DOWN = "middleMouseDown", MouseEvent.MIDDLE_MOUSE_UP = "middleMouseUp", MouseEvent.RIGHT_CLICK = "rightClick", MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown", MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp", MouseEvent.MOUSE_MOVE = "mouseMove", MouseEvent.MOUSE_OVER = "mouseOver", MouseEvent.MOUSE_OUT = "mouseOut", TouchEvent.prototype = new Event, TouchEvent.prototype._setFromDom = function(t) {
    var e = window.devicePixelRatio || 1;
    this.stageX = t.clientX * e, this.stageY = t.clientY * e, this.touchPointID = t.identifier
}, TouchEvent.TOUCH_BEGIN = "touchBegin", TouchEvent.TOUCH_END = "touchEnd", TouchEvent.TOUCH_MOVE = "touchMove", TouchEvent.TOUCH_OUT = "touchOut", TouchEvent.TOUCH_OVER = "touchOver", TouchEvent.TOUCH_TAP = "touchTap", KeyboardEvent.prototype = new Event, KeyboardEvent.prototype._setFromDom = function(t) {
    this.altKey = t.altKey, this.ctrlKey = t.ctrlKey, this.shiftKey = t.shiftKey, this.keyCode = t.keyCode, this.charCode = t.charCode
}, KeyboardEvent.KEY_DOWN = "keyDown", KeyboardEvent.KEY_UP = "keyUp";
var BlendMode = {
    NORMAL: "normal",
    ADD: "add",
    SUBTRACT: "subtract",
    MULTIPLY: "multiply",
    SCREEN: "screen",
    ERASE: "erase",
    ALPHA: "alpha"
};
DisplayObject.prototype = new EventDispatcher, DisplayObject.prototype.dispatchEvent = function(t) {
    EventDispatcher.prototype.dispatchEvent.call(this, t), t.bubbles && null != this.parent && this.parent.dispatchEvent(t)
}, DisplayObject.prototype._globalToLocal = function(t, e) {
    var i = this._torg;
    Stage._main._getOrigin(i), Point._m4.multiplyVec4(this._getAIMat(), i, i);
    var s = this._tvec4_1;
    s[0] = t.x, s[1] = t.y, s[2] = 0, s[3] = 1, Point._m4.multiplyVec4(this._getAIMat(), s, s), this._lineIsc(i, s, e)
}, DisplayObject.prototype.globalToLocal = function(t) {
    var e = new Point;
    return this._globalToLocal(t, e), e
}, DisplayObject.prototype.localToGlobal = function(t) {
    var e = this._torg;
    Stage._main._getOrigin(e);
    var i = this._tvec4_1;
    i[0] = t.x, i[1] = t.y, i[2] = 0, i[3] = 1, Point._m4.multiplyVec4(this._getATMat(), i, i);
    var s = new Point;
    return this._lineIsc(e, i, s), s
}, DisplayObject.prototype._lineIsc = function(t, e, i) {
    var s = e[0] - t[0],
        n = e[1] - t[1],
        r = e[2] - t[2],
        a = Math.sqrt(s * s + n * n + r * r);
    s /= a, n /= a, r /= a;
    var h = -t[2] / r;
    i.x = t[0] + h * s, i.y = t[1] + h * n
}, DisplayObject.prototype._transfRect = function(t, e, i, s) {
    var n = this._tvec4_0,
        r = this._tvec4_1,
        a = new Point,
        h = 1 / 0,
        o = 1 / 0,
        c = -(1 / 0),
        l = -(1 / 0);
    n[0] = i.x, n[1] = i.y, n[2] = 0, n[3] = 1, Point._m4.multiplyVec4(t, n, r), this._lineIsc(e, r, a), h = Math.min(h, a.x), o = Math.min(o, a.y), c = Math.max(c, a.x), l = Math.max(l, a.y), n[0] = i.x + i.width, n[1] = i.y, n[2] = 0, n[3] = 1, Point._m4.multiplyVec4(t, n, r), this._lineIsc(e, r, a), h = Math.min(h, a.x), o = Math.min(o, a.y), c = Math.max(c, a.x), l = Math.max(l, a.y), n[0] = i.x, n[1] = i.y + i.height, n[2] = 0, n[3] = 1, Point._m4.multiplyVec4(t, n, r), this._lineIsc(e, r, a), h = Math.min(h, a.x), o = Math.min(o, a.y), c = Math.max(c, a.x), l = Math.max(l, a.y), n[0] = i.x + i.width, n[1] = i.y + i.height, n[2] = 0, n[3] = 1, Point._m4.multiplyVec4(t, n, r), this._lineIsc(e, r, a), h = Math.min(h, a.x), o = Math.min(o, a.y), c = Math.max(c, a.x), l = Math.max(l, a.y), s.x = h, s.y = o, s.width = c - h, s.height = l - o
}, DisplayObject.prototype._getLocRect = function() {}, DisplayObject.prototype._getRect = function(t, e, i) {
    return Point._m4.multiply(t, this._getATMat(), this._tempm), this._transfRect(this._tempm, e, this._getLocRect(), this._trect), this._trect
}, DisplayObject.prototype._getR = function(t, e) {
    return Stage._main._getOrigin(this._torg), Point._m4.multiplyVec4(t._getAIMat(), this._torg, this._torg), this._getRect(t._getAIMat(), this._torg, e)
}, DisplayObject.prototype._getParR = function(t, e) {
    null == DisplayObject._tdo && (DisplayObject._tdo = new DisplayObject);
    var i = null == this.parent;
    i && (this.parent = DisplayObject._tdo);
    var s = this._getR(this.parent, e);
    return i && (this.parent = null), s
}, DisplayObject.prototype.getRect = function(t) {
    return this._getR(t, !1).clone()
}, DisplayObject.prototype.getBounds = function(t) {
    return this._getR(t, !0).clone()
}, DisplayObject.prototype._htpLocal = function(t, e) {
    var i = this._tempP;
    return this._lineIsc(t, e, i), this._getLocRect().contains(i.x, i.y)
}, DisplayObject.prototype.hitTestPoint = function(t, e, i) {
    null == i && (i = !1);
    var s = this._torg;
    Stage._main._getOrigin(s), Point._m4.multiplyVec4(this._getAIMat(), s, s);
    var n = this._tvec4_1;
    return n[0] = t, n[1] = e, n[2] = 0, n[3] = 1, Point._m4.multiplyVec4(this._getAIMat(), n, n), i ? this._htpLocal(s, n) : this._getR(Stage._main, !1).contains(t, e)
}, DisplayObject.prototype.hitTestObject = function(t) {
    var e = this._getR(Stage._main, !1),
        i = t._getR(Stage._main, !1);
    return e.intersects(i)
}, DisplayObject.prototype._loseFocus = function() {}, DisplayObject.prototype._getTarget = function(t, e) {
    return null
}, DisplayObject.prototype._setStage = function(t) {
    var e = this.stage;
    this.stage = t, null == e && null != t && this.dispatchEvent(this._atsEv), null != e && null == t && this.dispatchEvent(this._rfsEv)
}, DisplayObject.prototype._preRender = function(t) {
    var e = this.transform._getTMat();
    t._mstack.push(e), t._cmstack.push(this.transform._cmat, this.transform._cvec, this.transform._cID, this.blendMode)
}, DisplayObject.prototype._render = function(t) {}, DisplayObject.prototype._renderAll = function(t) {
    this.visible && (this._preRender(t), this._render(t), t._mstack.pop(), t._cmstack.pop())
}, DisplayObject.prototype._getATMat = function() {
    return null == this.parent ? this.transform._getTMat() : (Point._m4.multiply(this.parent._getATMat(), this.transform._getTMat(), this.transform._atmat), this.transform._atmat)
}, DisplayObject.prototype._getAIMat = function() {
    return null == this.parent ? this.transform._getIMat() : (Point._m4.multiply(this.transform._getIMat(), this.parent._getAIMat(), this.transform._aimat), this.transform._aimat)
}, DisplayObject.prototype._getMouse = function() {
    var t = this._tempP;
    return t.setTo(Stage._mouseX, Stage._mouseY), this._globalToLocal(t, t), t
}, this.dp = DisplayObject.prototype, dp.ds = dp.__defineSetter__, dp.dg = dp.__defineGetter__, dp.ds("scaleX", function(t) {
    this.transform._checkVals(), this.transform._scaleX = t, this.transform._mdirty = !0
}), dp.ds("scaleY", function(t) {
    this.transform._checkVals(), this.transform._scaleY = t, this.transform._mdirty = !0
}), dp.ds("scaleZ", function(t) {
    this.transform._checkVals(), this.transform._scaleZ = t, this.transform._mdirty = !0
}), dp.dg("scaleX", function() {
    return this.transform._checkVals(), this.transform._scaleX
}), dp.dg("scaleY", function() {
    return this.transform._checkVals(), this.transform._scaleY
}), dp.dg("scaleZ", function() {
    return this.transform._checkVals(), this.transform._scaleZ
}), dp.ds("rotationX", function(t) {
    this.transform._checkVals(), this.transform._rotationX = t, this.transform._mdirty = !0
}), dp.ds("rotationY", function(t) {
    this.transform._checkVals(), this.transform._rotationY = t, this.transform._mdirty = !0
}), dp.ds("rotationZ", function(t) {
    this.transform._checkVals(), this.transform._rotationZ = t, this.transform._mdirty = !0
}), dp.ds("rotation", function(t) {
    this.transform._checkVals(), this.transform._rotationZ = t, this.transform._mdirty = !0
}), dp.dg("rotationX", function() {
    return this.transform._checkVals(), this.transform._rotationX
}), dp.dg("rotationY", function() {
    return this.transform._checkVals(), this.transform._rotationY
}), dp.dg("rotationZ", function() {
    return this.transform._checkVals(), this.transform._rotationZ
}), dp.dg("rotation", function() {
    return this.transform._checkVals(), this.transform._rotationZ
}), dp.ds("width", function(t) {
    var e = this.width;
    this.transform._postScale(t / e, 1)
}), dp.ds("height", function(t) {
    var e = this.height;
    this.transform._postScale(1, t / e)
}), dp.dg("width", function() {
    return this.transform._checkVals(), this._getParR(this, !0).width
}), dp.dg("height", function() {
    return this.transform._checkVals(), this._getParR(this, !0).height
}), dp.ds("alpha", function(t) {
    this.transform._cmat[15] = t, this.transform._checkColorID()
}), dp.dg("alpha", function() {
    return this.transform._cmat[15]
}), dp.dg("mouseX", function() {
    return this._getMouse().x
}), dp.dg("mouseY", function() {
    return this._getMouse().y
}), delete dp.ds, delete dp.dg, delete this.dp, InteractiveObject.prototype = new DisplayObject, InteractiveObject.prototype._getTarget = function(t, e) {
    if (!this.visible || !this.mouseEnabled) return null;
    var i = this._getLocRect();
    if (null == i) return null;
    var s = this._tvec4_0,
        n = this._tvec4_1;
    Point._m4.multiplyVec4(this.transform._getIMat(), t, s), Point._m4.multiplyVec4(this.transform._getIMat(), e, n);
    var r = this._tempP;
    return this._lineIsc(s, n, r), i.contains(r.x, r.y) ? this : null
}, DisplayObjectContainer.prototype = new InteractiveObject, DisplayObjectContainer.prototype._getRect = function(t, e, i) {
    var s = this._trect;
    s.setEmpty();
    for (var n = 0; n < this.numChildren; n++) {
        var r = this._children[n];
        r.visible && s._unionWith(r._getRect(t, e, i))
    }
    return s
}, DisplayObjectContainer.prototype._htpLocal = function(t, e) {
    for (var i = this._children.length, s = 0; i > s; s++) {
        var n = this._children[s];
        if (n.visible) {
            var r = n._tvec4_0,
                a = n._tvec4_1,
                h = n.transform._getIMat();
            return Point._m4.multiplyVec4(h, t, r), Point._m4.multiplyVec4(h, e, a), n._htpLocal(r, a)
        }
    }
    return !1
}, DisplayObjectContainer.prototype.addChild = function(t) {
    this._children.push(t), t.parent = this, t._setStage(this.stage), ++this.numChildren
}, DisplayObjectContainer.prototype.removeChild = function(t) {
    var e = this._children.indexOf(t);
    0 > e || (this._children.splice(e, 1), t.parent = null, t._setStage(null), --this.numChildren)
}, DisplayObjectContainer.prototype.removeChildAt = function(t) {
    this.removeChild(this._children[t])
}, DisplayObjectContainer.prototype.contains = function(t) {
    return this._children.indexOf(t) >= 0
}, DisplayObjectContainer.prototype.getChildIndex = function(t) {
    return this._children.indexOf(t)
}, DisplayObjectContainer.prototype.setChildIndex = function(t, e) {
    var i = this._children.indexOf(t);
    if (e > i) {
        for (var s = i + 1; e >= s; s++) this._children[s - 1] = this._children[s];
        this._children[e] = t
    } else if (i > e) {
        for (var s = i - 1; s >= e; s--) this._children[s + 1] = this._children[s];
        this._children[e] = t
    }
}, DisplayObjectContainer.prototype.getChildAt = function(t) {
    return this._children[t]
}, DisplayObjectContainer.prototype._render = function(t) {
    for (var e = 0; e < this.numChildren; e++) this._children[e]._renderAll(t)
}, DisplayObjectContainer.prototype._getTarget = function(t, e) {
    if (!this.visible || !this.mouseChildren && !this.mouseEnabled) return null;
    var i = this._tvec4_0,
        s = this._tvec4_1,
        n = this.transform._getIMat();
    Point._m4.multiplyVec4(n, t, i), Point._m4.multiplyVec4(n, e, s);
    for (var r = null, a = this.numChildren - 1, h = a; h > -1; h--) {
        var o = this._children[h]._getTarget(i, s);
        if (null != o) {
            r = o;
            break
        }
    }
    return this.mouseChildren || null == r ? r : this
}, DisplayObjectContainer.prototype._setStage = function(t) {
    InteractiveObject.prototype._setStage.call(this, t);
    for (var e = 0; e < this.numChildren; e++) this._children[e]._setStage(t)
}, BitmapData.empty = function(t, e, i) {
    null == i && (i = 4294967295);
    var s = new BitmapData(null);
    return s._initFromImg(null, t, e, i), s
}, BitmapData.prototype.setPixel = function(t, e, i) {
    var s = e * this.width + t,
        n = this._ubuffer;
    n[s] = (4278190080 & n[s]) + i, this._dirty = !0
}, BitmapData.prototype.setPixel32 = function(t, e, i) {
    var s = e * this.width + t;
    this._ubuffer[s] = i, this._dirty = !0
}, BitmapData.prototype.setPixels = function(t, e) {
    this._copyRectBuff(e, t, this._buffer, this.rect), this._dirty = !0
}, BitmapData.prototype.getPixel = function(t, e) {
    var i = e * this.width + t;
    return 16777215 & this._ubuffer[i]
}, BitmapData.prototype.getPixel32 = function(t, e) {
    var i = e * this.width + t;
    return this._ubuffer[i]
}, BitmapData.prototype.getPixels = function(t, e) {
    return e || (e = new Uint8Array(t.width * t.height * 4)), this._copyRectBuff(this._buffer, this.rect, e, t), e
}, BitmapData.prototype.draw = function(t) {
    this._dirty && this._syncWithGPU(), this._setTexAsFB(), Stage._setTEX(null), t._render(Stage._main);
    var e = this._buffer,
        i = this.rect;
    gl.readPixels(i.x, i.y, i.width, i.height, gl.RGBA, gl.UNSIGNED_BYTE, e), Stage._main._setFramebuffer(null, Stage._main.stageWidth, Stage._main.stageHeight, !1), Stage._setTEX(this._texture), gl.generateMipmap(gl.TEXTURE_2D)
}, BitmapData.prototype._syncWithGPU = function() {
    var t = this.rect,
        e = this._buffer;
    if (!this._gpuAllocated) {
        var i = t.width,
            s = t.height,
            n = i / this._rwidth,
            r = s / this._rheight;
        this._texture = gl.createTexture(), this._tcBuffer = gl.createBuffer(), this._vBuffer = gl.createBuffer(), Stage._setBF(this._tcBuffer), gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, n, 0, 0, r, n, r]), gl.STATIC_DRAW), Stage._setBF(this._vBuffer), gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0, 0, i, 0, 0, 0, s, 0, i, s, 0]), gl.STATIC_DRAW);
        for (var a = new Uint8Array(this._rwidth * this._rheight * 4), h = new Uint32Array(a.buffer), o = 0; o < h.length; o++) h[o] = 16777215;
        Stage._setTEX(this._texture), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._rwidth, this._rheight, 0, gl.RGBA, gl.UNSIGNED_BYTE, a), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), this._gpuAllocated = !0
    }
    Stage._setTEX(this._texture), gl.texSubImage2D(gl.TEXTURE_2D, 0, t.x, t.y, t.width, t.height, gl.RGBA, gl.UNSIGNED_BYTE, e), gl.generateMipmap(gl.TEXTURE_2D), this._dirty = !1
}, BitmapData.prototype._setTexAsFB = function() {
    if (null == BitmapData._fbo) {
        BitmapData._fbo = gl.createFramebuffer();
        var t = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, t), gl.bindFramebuffer(gl.FRAMEBUFFER, BitmapData._fbo), gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, t)
    }
    Stage._main._setFramebuffer(BitmapData._fbo, this._rwidth, this._rheight, !0), gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._texture, 0)
}, BitmapData.prototype._initFromImg = function(t, e, i, s) {
    this._loaded = !0, this.width = e, this.height = i, this.rect = new Rectangle(0, 0, e, i), this._rwidth = BitmapData._nhpot(e), this._rheight = BitmapData._nhpot(i), this._rrect = new Rectangle(0, 0, this._rwidth, this._rheight);
    var n = BitmapData._canv;
    n.width = e, n.height = i;
    var r = BitmapData._ctx;
    null != t && r.drawImage(t, 0, 0);
    var a = r.getImageData(0, 0, e, i);
    if (window.CanvasPixelArray && a.data instanceof CanvasPixelArray ? this._buffer = new Uint8Array(a.data) : this._buffer = new Uint8Array(a.data.buffer), this._ubuffer = new Uint32Array(this._buffer.buffer), null == t)
        for (var h = 0, o = this._ubuffer; h < o.length; h++) o[h] = s
}, BitmapData.prototype._copyRectBuff = function(t, e, i, s) {
    t = new Uint32Array(t.buffer), i = new Uint32Array(i.buffer);
    for (var n = e.intersection(s), r = Math.max(0, n.x - e.x), a = Math.max(0, n.x - s.x), h = Math.max(0, n.y - e.y), o = Math.max(0, n.y - s.y), c = n.width, l = n.height, _ = 0; l > _; _++)
        for (var u = (h + _) * e.width + r, p = (o + _) * s.width + a, g = 0; c > g; g++) i[p++] = t[u++]
}, BitmapData._canv = document.createElement("canvas"), BitmapData._ctx = BitmapData._canv.getContext("2d"), BitmapData._ipot = function(t) {
    return 0 == (t & t - 1)
}, BitmapData._nhpot = function(t) {
    --t;
    for (var e = 1; 32 > e; e <<= 1) t |= t >> e;
    return t + 1
}, Bitmap.prototype = new InteractiveObject, Bitmap.prototype._getLocRect = function() {
    return this.bitmapData.rect
}, Bitmap.prototype._render = function(t) {
    var e = this.bitmapData;
    e._loaded && (e._dirty && e._syncWithGPU(), gl.uniformMatrix4fv(t._sprg.tMatUniform, !1, t._mstack.top()), t._cmstack.update(), Stage._setVC(e._vBuffer), Stage._setTC(e._tcBuffer), Stage._setUT(1), Stage._setTEX(e._texture), Stage._setEBF(t._unitIBuffer), gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0))
};
var gl;
Stage.prototype = new DisplayObjectContainer, Stage.prototype._getOrigin = function(t) {
    t[0] = this.stageWidth / 2, t[1] = this.stageHeight / 2, t[2] = -500, t[3] = 1;
}, Stage._mouseX = 0, Stage._mouseY = 0, Stage._curBF = -1, Stage._curEBF = -1, Stage._curVC = -1, Stage._curTC = -1, Stage._curUT = -1, Stage._curTEX = -1, Stage._curBMD = "normal", Stage._setBF = function(t) {
    Stage._curBF != t && (gl.bindBuffer(gl.ARRAY_BUFFER, t), Stage._curBF = t)
}, Stage._setEBF = function(t) {
    Stage._curEBF != t && (gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, t), Stage._curEBF = t)
}, Stage._setVC = function(t) {
    Stage._curVC != t && (gl.bindBuffer(gl.ARRAY_BUFFER, t), gl.vertexAttribPointer(Stage._main._sprg.vpa, 3, gl.FLOAT, !1, 0, 0), Stage._curVC = Stage._curBF = t)
}, Stage._setTC = function(t) {
    Stage._curTC != t && (gl.bindBuffer(gl.ARRAY_BUFFER, t), gl.vertexAttribPointer(Stage._main._sprg.tca, 2, gl.FLOAT, !1, 0, 0), Stage._curTC = Stage._curBF = t)
}, Stage._setUT = function(t) {
    Stage._curUT != t && (gl.uniform1i(Stage._main._sprg.useTex, t), Stage._curUT = t)
}, Stage._setTEX = function(t) {
    Stage._curTEX != t && (gl.bindTexture(gl.TEXTURE_2D, t), Stage._curTEX = t)
}, Stage._setBMD = function(t) {
    Stage._curBMD != t && (t == BlendMode.NORMAL ? (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)) : t == BlendMode.MULTIPLY ? (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA)) : t == BlendMode.ADD ? (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ONE, gl.ONE)) : t == BlendMode.SUBTRACT ? (gl.blendEquationSeparate(gl.FUNC_REVERSE_SUBTRACT, gl.FUNC_ADD), gl.blendFunc(gl.ONE, gl.ONE)) : t == BlendMode.SCREEN ? (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR)) : t == BlendMode.ERASE ? (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_ALPHA)) : t == BlendMode.ALPHA && (gl.blendEquation(gl.FUNC_ADD), gl.blendFunc(gl.ZERO, gl.SRC_ALPHA)), Stage._curBMD = t)
}, Stage._okKeys = [112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 13, 16, 18, 27], Stage._isTD = function() {
    return !!("ontouchstart" in window)
}, Stage._ctxt = function(t) {
    Stage._main.hasEventListener(MouseEvent.RIGHT_CLICK) && t.preventDefault()
}, Stage.prototype._getMakeTouch = function(t) {
    var e = this._touches["t" + t];
    return null == e && (e = {
        touch: null,
        target: null,
        act: 0
    }, this._touches["t" + t] = e), e
}, Stage._onTD = function(t) {
    Stage._setStageMouse(t.touches.item(0)), Stage._main._smd[0] = !0, Stage._main._knM = !0;
    for (var e = Stage._main, i = 0; i < t.changedTouches.length; i++) {
        var s = t.changedTouches.item(i),
            n = e._getMakeTouch(s.identifier);
        n.touch = s, n.act = 1
    }
    e._processMouseTouch()
}, Stage._onTM = function(t) {
    Stage._setStageMouse(t.touches.item(0)), Stage._main._smm = !0, Stage._main._knM = !0;
    for (var e = Stage._main, i = 0; i < t.changedTouches.length; i++) {
        var s = t.changedTouches.item(i),
            n = e._getMakeTouch(s.identifier);
        n.touch = s, n.act = 2
    }
    e._processMouseTouch()
}, Stage._onTU = function(t) {
    Stage._main._smu[0] = !0, Stage._main._knM = !0;
    for (var e = Stage._main, i = 0; i < t.changedTouches.length; i++) {
        var s = t.changedTouches.item(i),
            n = e._getMakeTouch(s.identifier);
        n.touch = s, n.act = 3
    }
    e._processMouseTouch()
}, Stage._onMD = function(t) {
    Stage._setStageMouse(t), Stage._main._smd[t.button] = !0, Stage._main._knM = !0, Stage._main._processMouseTouch()
}, Stage._onMM = function(t) {
    Stage._setStageMouse(t), Stage._main._smm = !0, Stage._main._knM = !0, Stage._main._processMouseTouch()
}, Stage._onMU = function(t) {
    Stage._main._smu[t.button] = !0, Stage._main._knM = !0, Stage._main._processMouseTouch()
}, Stage._onKD = function(t) {
    var e = Stage._main,
        i = new KeyboardEvent(KeyboardEvent.KEY_DOWN, !0);
    i._setFromDom(t), e.focus && e.focus.stage ? e.focus.dispatchEvent(i) : e.dispatchEvent(i)
}, Stage._onKU = function(t) {
    var e = Stage._main,
        i = new KeyboardEvent(KeyboardEvent.KEY_UP, !0);
    i._setFromDom(t), e.focus && e.focus.stage ? e.focus.dispatchEvent(i) : e.dispatchEvent(i)
}, Stage._blck = function(t) {
    null != t.keyCode ? "textarea" == t.target.tagName.toLowerCase() || -1 == Stage._okKeys.indexOf(t.keyCode) && t.preventDefault() : t.preventDefault()
}, Stage._onRS = function(t) {
    Stage._main._srs = !0
}, Stage._getDPR = function() {
    return window.devicePixelRatio || 1
}, Stage.prototype._resize = function() {
    var t = Stage._getDPR(),
        e = window.innerWidth * t,
        i = window.innerHeight * t;
    this._canvas.style.width = window.innerWidth + "px", this._canvas.style.height = window.innerHeight + "px", this.stageWidth = e, this.stageHeight = i, this._canvas.width = e, this._canvas.height = i, this._setFramebuffer(null, e, i, !1)
}, Stage.prototype._getShader = function(t, e, i) {
    var s;
    return s = i ? t.createShader(t.FRAGMENT_SHADER) : t.createShader(t.VERTEX_SHADER), t.shaderSource(s, e), t.compileShader(s), t.getShaderParameter(s, t.COMPILE_STATUS) ? s : (alert(t.getShaderInfoLog(s)), null)
}, Stage.prototype._initShaders = function() {
    var t = "			precision mediump float;			varying vec2 texCoord;						uniform sampler2D uSampler;			uniform vec4 color;			uniform bool useTex;						uniform mat4 cMat;			uniform vec4 cVec;						void main(void) {				vec4 c;				if(useTex) { c = texture2D(uSampler, texCoord);  c.xyz *= (1.0/c.w); }				else c = color;				c = (cMat*c)+cVec;\n				c.xyz *= min(c.w, 1.0);\n				gl_FragColor = c;			}",
        e = "			attribute vec3 verPos;			attribute vec2 texPos;						uniform mat4 tMat;						varying vec2 texCoord;						void main(void) {				gl_Position = tMat * vec4(verPos, 1.0);				texCoord = texPos;			}",
        i = this._getShader(gl, t, !0),
        s = this._getShader(gl, e, !1);
    this._sprg = gl.createProgram(), gl.attachShader(this._sprg, s), gl.attachShader(this._sprg, i), gl.linkProgram(this._sprg), gl.getProgramParameter(this._sprg, gl.LINK_STATUS) || alert("Could not initialise shaders"), gl.useProgram(this._sprg), this._sprg.vpa = gl.getAttribLocation(this._sprg, "verPos"), this._sprg.tca = gl.getAttribLocation(this._sprg, "texPos"), gl.enableVertexAttribArray(this._sprg.tca), gl.enableVertexAttribArray(this._sprg.vpa), this._sprg.tMatUniform = gl.getUniformLocation(this._sprg, "tMat"), this._sprg.cMatUniform = gl.getUniformLocation(this._sprg, "cMat"), this._sprg.cVecUniform = gl.getUniformLocation(this._sprg, "cVec"), this._sprg.samplerUniform = gl.getUniformLocation(this._sprg, "uSampler"), this._sprg.useTex = gl.getUniformLocation(this._sprg, "useTex"), this._sprg.color = gl.getUniformLocation(this._sprg, "color")
}, Stage.prototype._initBuffers = function() {
    this._unitIBuffer = gl.createBuffer(), Stage._setEBF(this._unitIBuffer), gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 2, 3]), gl.STATIC_DRAW)
}, Stage.prototype._setFramebuffer = function(t, e, i, s) {
    this._mstack.clear(), this._mstack.push(this._pmat, 0), s ? (this._umat[5] = 2, this._umat[13] = -1) : (this._umat[5] = -2, this._umat[13] = 1), this._mstack.push(this._umat), this._smat[0] = 1 / e, this._smat[5] = 1 / i, this._mstack.push(this._smat), gl.bindFramebuffer(gl.FRAMEBUFFER, t), t && gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, e, i), gl.viewport(0, 0, e, i)
}, Stage._setStageMouse = function(t) {
    var e = Stage._getDPR();
    Stage._mouseX = t.clientX * e, Stage._mouseY = t.clientY * e
}, Stage.prototype._drawScene = function() {
    this._srs && (this._resize(), this.dispatchEvent(new Event(Event.RESIZE)), this._srs = !1), gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    for (var t = EventDispatcher.efbc, e = new Event(Event.ENTER_FRAME, !1), i = 0; i < t.length; i++) e.target = t[i], t[i].dispatchEvent(e);
    this._renderAll(this)
}, Stage.prototype._processMouseTouch = function() {
    if (this._knM) {
        var t = this._svec4_0;
        this._getOrigin(t);
        var e = this._svec4_1;
        e[0] = Stage._mouseX, e[1] = Stage._mouseY, e[2] = 0, e[3] = 1;
        var i = this._getTarget(t, e),
            s = this._mousefocus || this,
            n = i || this;
        if (i != this._mousefocus) {
            if (s != this) {
                var r = new MouseEvent(MouseEvent.MOUSE_OUT, !0);
                r.target = s, s.dispatchEvent(r)
            }
            if (n != this) {
                var r = new MouseEvent(MouseEvent.MOUSE_OVER, !0);
                r.target = n, n.dispatchEvent(r)
            }
        }
        this._smd[0] && this.focus && i != this.focus && this.focus._loseFocus();
        for (var a = 0; 3 > a; a++) this._mcEvs[a].target = this._mdEvs[a].target = this._muEvs[a].target = n, this._smd[a] && (n.dispatchEvent(this._mdEvs[a]), this._focii[a] = this.focus = i), this._smu[a] && (n.dispatchEvent(this._muEvs[a]), i == this._focii[a] && n.dispatchEvent(this._mcEvs[a])), this._smd[a] = this._smu[a] = !1;
        if (this._smm) {
            var r = new MouseEvent(MouseEvent.MOUSE_MOVE, !0);
            r.target = n, n.dispatchEvent(r), this._smm = !1
        }
        this._mousefocus = i;
        for (var h = !1, o = n; null != o.parent;) h |= o.buttonMode, o = o.parent;
        var c = h ? "pointer" : "default";
        n instanceof TextField && n.selectable && (c = "text"), this._canvas.style.cursor = c
    }
    var l = Stage._getDPR();
    for (var _ in this._touches) {
        var u = this._touches[_];
        if (0 != u.act) {
            var t = this._svec4_0;
            this._getOrigin(t);
            var e = this._svec4_1;
            e[0] = u.touch.clientX * l, e[1] = u.touch.clientY * l, e[2] = 0, e[3] = 1;
            var i = this._getTarget(t, e),
                s = u.target || this,
                n = i || this;
            if (i != u.target) {
                if (s != this) {
                    var r = new TouchEvent(TouchEvent.TOUCH_OUT, !0);
                    r._setFromDom(u.touch), r.target = s, s.dispatchEvent(r)
                }
                if (n != this) {
                    var r = new TouchEvent(TouchEvent.TOUCH_OVER, !0);
                    r._setFromDom(u.touch), r.target = n, n.dispatchEvent(r)
                }
            }
            var r;
            1 == u.act && (r = new TouchEvent(TouchEvent.TOUCH_BEGIN, !0)), 2 == u.act && (r = new TouchEvent(TouchEvent.TOUCH_MOVE, !0)), 3 == u.act && (r = new TouchEvent(TouchEvent.TOUCH_END, !0)), r._setFromDom(u.touch), r.target = n, n.dispatchEvent(r), 3 == u.act && i == u.target && (r = new TouchEvent(TouchEvent.TOUCH_TAP, !0), r._setFromDom(u.touch), r.target = n, n.dispatchEvent(r)), u.act = 0, u.target = 3 == u.act ? null : i
        }
    }
}, Stage._tick = function() {
    _requestAF(Stage._tick), Stage.prototype._drawScene.call(Stage._main)
}, Stage._MStack = function() {
    this.mats = [], this.size = 1;
    for (var t = 0; 30 > t; t++) this.mats.push(Point._m4.create())
}, Stage._MStack.prototype.clear = function() {
    this.size = 1
}, Stage._MStack.prototype.push = function(t) {
    var e = this.size++;
    Point._m4.multiply(this.mats[e - 1], t, this.mats[e])
}, Stage._MStack.prototype.pop = function() {
    this.size--
}, Stage._MStack.prototype.top = function() {
    return this.mats[this.size - 1]
}, Stage._CMStack = function() {
    this.mats = [], this.vecs = [], this.isID = [], this.bmds = [], this.lnnm = [], this.size = 1, this.dirty = !0;
    for (var t = 0; 30 > t; t++) this.mats.push(Point._m4.create()), this.vecs.push(new Float32Array(4)), this.isID.push(!0), this.bmds.push(BlendMode.NORMAL), this.lnnm.push(0)
}, Stage._CMStack.prototype.push = function(t, e, i, s) {
    var n = this.size++;
    this.isID[n] = i, i ? (Point._m4.set(this.mats[n - 1], this.mats[n]), Point._v4.set(this.vecs[n - 1], this.vecs[n])) : (Point._m4.multiply(this.mats[n - 1], t, this.mats[n]), Point._m4.multiplyVec4(this.mats[n - 1], e, this.vecs[n]), Point._v4.add(this.vecs[n - 1], this.vecs[n], this.vecs[n])), i || (this.dirty = !0), this.bmds[n] = s, this.lnnm[n] = s == BlendMode.NORMAL ? this.lnnm[n - 1] : n
}, Stage._CMStack.prototype.update = function() {
    if (this.dirty) {
        var t = Stage._main,
            e = this.size - 1;
        gl.uniformMatrix4fv(t._sprg.cMatUniform, !1, this.mats[e]), gl.uniform4fv(t._sprg.cVecUniform, this.vecs[e]), this.dirty = !1
    }
    var i = this.lnnm[this.size - 1];
    Stage._setBMD(this.bmds[i])
}, Stage._CMStack.prototype.pop = function() {
    this.isID[this.size - 1] || (this.dirty = !0), this.size--
}, Graphics._delTgs = {}, Graphics._delNum = 0, Graphics.prototype._startNewFill = function() {
    this._endLine();
    var t = this._points.length / 2,
        e = new Graphics.Fill(t - 1, this._conf);
    this._fills.push(e), this._afills.push(e), this._lfill = e
}, Graphics.prototype._startLine = function() {
    var t = this._points.length / 2,
        e = this._fills[this._fills.length - 1],
        i = e.lines.length;
    i > 0 && e.lines[i - 1].isEmpty() ? e.lines[i - 1].Set(t - 1, this._conf) : e.lines.push(new Graphics.Line(t - 1, this._conf))
}, Graphics.prototype._endLine = function() {
    if (0 != this._fills.length) {
        var t = this._points.length / 2,
            e = this._fills[this._fills.length - 1];
        0 != e.lines.length && (e.lines[e.lines.length - 1].end = t - 1)
    }
}, Graphics.prototype._render = function(t) {
    this._endLine(), gl.uniformMatrix4fv(t._sprg.tMatUniform, !1, t._mstack.top()), t._cmstack.update();
    for (var e = 0; e < this._afills.length; e++) this._afills[e].render(t, this._points, this._rect)
}, Graphics.prototype.lineStyle = function(t, e, i) {
    e || (e = 0), i || (i = 1), this._conf.lwidth = t, this._conf.lcolor = Graphics.makeColor(e, i), this._endLine(), this._startLine()
}, Graphics.prototype.beginFill = function(t, e) {
    null == e && (e = 1), this._conf.ftype = 1, this._conf.fcolor = Graphics.makeColor(t, e), this._startNewFill()
}, Graphics.prototype.beginBitmapFill = function(t) {
    this._conf.ftype = 2, this._conf.fbdata = t, this._startNewFill()
}, Graphics.prototype.endFill = function() {
    this._conf.ftype = 0, this._startNewFill()
}, Graphics.prototype.moveTo = function(t, e) {
    this._endLine(), this._points.push(t, e), this._startLine()
}, Graphics.prototype.lineTo = function(t, e) {
    var i = this._points;
    (t != i[i.length - 2] || e != i[i.length - 1]) && (i.length > 0 && this._conf.ftype > 0 && this._rect._unionWL(i[i.length - 2], i[i.length - 1], t, e), this._conf.lwidth > 0 && this._srect._unionWL(i[i.length - 2], i[i.length - 1], t, e), i.push(t, e))
}, Graphics.prototype.curveTo = function(t, e, i, s) {
    var n = this._points,
        r = n[n.length - 2],
        a = n[n.length - 1],
        h = 2 / 3;
    this.cubicCurveTo(r + h * (t - r), a + h * (e - a), i + h * (t - i), s + h * (e - s), i, s)
}, Graphics.prototype.cubicCurveTo = function(t, e, i, s, n, r, a) {
    a || (a = 40);
    for (var h = this._points, o = h[h.length - 2], c = h[h.length - 1], l = t - o, _ = e - c, u = i - t, p = s - e, g = n - i, f = r - s, d = 1 / a, m = 1; a > m; m++) {
        var v = m * d,
            y = o + v * l,
            E = c + v * _,
            T = t + v * u,
            x = e + v * p,
            S = i + v * g,
            M = s + v * f,
            b = T - y,
            w = x - E,
            R = S - T,
            D = M - x,
            A = y + v * b,
            F = E + v * w,
            P = T + v * R,
            O = x + v * D,
            C = P - A,
            U = O - F;
        this.lineTo(A + v * C, F + v * U)
    }
    this.lineTo(n, r)
}, Graphics.prototype.drawCircle = function(t, e, i) {
    this.drawEllipse(t, e, 2 * i, 2 * i)
}, Graphics.prototype.drawEllipse = function(t, e, i, s) {
    var n = i / 2,
        r = s / 2,
        a = .553;
    this.moveTo(t, e - r), this.cubicCurveTo(t + a * n, e - r, t + n, e - a * r, t + n, e, 16), this.cubicCurveTo(t + n, e + a * r, t + a * n, e + r, t, e + r, 16), this.cubicCurveTo(t - a * n, e + r, t - n, e + a * r, t - n, e, 16), this.cubicCurveTo(t - n, e - a * r, t - a * n, e - r, t, e - r, 16)
}, Graphics.prototype.drawRect = function(t, e, i, s) {
    this.moveTo(t, e), this.lineTo(t + i, e), this.lineTo(t + i, e + s), this.lineTo(t, e + s), this.lineTo(t, e)
}, Graphics.prototype.drawRoundRect = function(t, e, i, s, n, r) {
    var a = n / 2,
        h = r / 2,
        o = .553,
        c = t + a,
        l = t + i - a,
        _ = e + h,
        u = e + s - h;
    this.moveTo(c, e), this.lineTo(l, e), this.cubicCurveTo(l + o * a, e, t + i, _ - o * h, t + i, _, 16), this.lineTo(t + i, u), this.cubicCurveTo(t + i, u + o * h, l + o * a, e + s, l, e + s, 16), this.lineTo(c, e + s), this.cubicCurveTo(c - o * a, e + s, t, u + o * h, t, u, 16), this.lineTo(t, _), this.cubicCurveTo(t, _ - o * h, c - o * a, e, c, e, 16)
}, Graphics.prototype.drawTriangles = function(t, e, i) {
    Graphics.Fill.updateRect(t, this._rect);
    for (var s = [], n = 0; n < t.length; n += 2) s.push(t[n], t[n + 1], 0);
    var r = Graphics._makeTgs(s, e, i, this._conf.fcolor, this._conf.fbdata);
    this._afills.push(r), this._lfill = r
}, Graphics.prototype.drawTriangles3D = function(t, e, i) {
    var s = Graphics._makeTgs(t, e, i, this._conf.fcolor, this._conf.fbdata);
    this._afills.push(s), this._lfill = s
}, Graphics.prototype.clear = function() {
    this._conf.ftype = 0, this._conf.bdata = null, this._conf.fcolor = null, this._conf.lwidth = 0, this._points = [0, 0], this._fills = [];
    for (var t = 0; t < this._afills.length; t++) {
        var e = this._afills[t];
        if (e instanceof Graphics.Fill) {
            e.tgs && Graphics._freeTgs(e.tgs);
            for (var i = 0; i < e.lineTGS.length; i++) Graphics._freeTgs(e.lineTGS[i])
        } else Graphics._freeTgs(e)
    }
    this._afills = [], this._lfill = null, this._rect.setEmpty(), this._startNewFill()
}, Graphics.prototype._getLocRect = function(t) {
    return 0 == t ? this._rect : this._rect.union(this._srect)
}, Graphics.prototype._hits = function(t, e) {
    return this._rect.contains(t, e)
}, Graphics.makeColor = function(t, e) {
    var i = new Float32Array(4);
    return i[0] = .0039215686 * (t >> 16 & 255), i[1] = .0039215686 * (t >> 8 & 255), i[2] = .0039215686 * (255 & t), i[3] = e, i
}, Graphics.equalColor = function(t, e) {
    return t[0] == e[0] && t[1] == e[1] && t[2] == e[2] && t[3] == e[3]
}, Graphics.len = function(t, e) {
    return Math.sqrt(t * t + e * e)
}, Graphics.Fill = function(t, e) {
    this.type = e.ftype, this.color = e.fcolor, this.bdata = e.fbdata, this.lines = [new Graphics.Line(t, e)], this.lineTGS = [], this.dirty = !0, this.tgs = null
}, Graphics.Fill.prototype.Build = function(t, e) {
    for (var i = [], s = [], n = [], r = null, a = -1, h = null, o = 0; o < this.lines.length; o++) {
        var c = this.lines[o];
        if (c.begin != c.end) {
            var l = 2 * c.begin,
                _ = 2 * c.end,
                u = t[l] == t[_] && t[l + 1] == t[_ + 1];
            if (u && (_ -= 2), c.width > 0 && (null != r && c.width == a && Graphics.equalColor(h, c.color) || (r = {
                    vrt: [],
                    ind: [],
                    color: c.color
                }, n.push(r), a = c.width, h = c.color), Graphics.Line.GetTriangles(t, l, _, c, 0 != this.type || u, r.ind, r.vrt)), 0 != this.type && _ - l > 2) {
                var p = t.slice(2 * c.begin, 2 * c.end + 2);
                u && (p.pop(), p.pop()), Graphics.PolyK.GetArea(p) < 0 && (p = Graphics.PolyK.Reverse(p));
                for (var g = i.length / 3, f = Graphics.PolyK.Triangulate(p), d = 0; d < f.length; d++) s.push(f[d] + g);
                for (var d = 0; d < p.length / 2; d++) i.push(p[2 * d], p[2 * d + 1], 0)
            }
        }
    }
    for (var d = 0; d < n.length; d++) this.lineTGS.push(Graphics._makeTgs(n[d].vrt, n[d].ind, null, n[d].color));
    i.length > 0 && (this.tgs = Graphics._makeTgs(i, s, null, this.color, this.bdata))
}, Graphics.Fill.prototype.isEmpty = function() {
    return 0 == this.lines.length ? !0 : this.lines[0].isEmpty()
}, Graphics.Fill.prototype.render = function(t, e, i) {
    this.dirty && (this.Build(e, i), this.dirty = !1), this.tgs && this.tgs.render(t);
    for (var s = 0; s < this.lineTGS.length; s++) this.lineTGS[s].render(t)
}, Graphics.Fill.updateRect = function(t, e) {
    var i = 1 / 0,
        s = 1 / 0,
        n = -(1 / 0),
        r = -(1 / 0);
    e.isEmpty() || (i = e.x, s = e.y, n = e.x + e.width, r = e.y + e.height);
    for (var a = 0; a < t.length; a += 2) i = Math.min(i, t[a]), s = Math.min(s, t[a + 1]), n = Math.max(n, t[a]), r = Math.max(r, t[a + 1]);
    e.x = i, e.y = s, e.width = n - i, e.height = r - s
}, Graphics.Line = function(t, e) {
    this.begin = t, this.end = -1, this.width = e.lwidth, this.color = e.lcolor
}, Graphics.Line.prototype.Set = function(t, e) {
    this.begin = t, this.end = -1, this.width = e.lwidth, this.color = e.lcolor
}, Graphics.Line.prototype.isEmpty = function() {
    return this.begin == this.end
}, Graphics.Line.GetTriangles = function(t, e, i, s, n, r, a) {
    var h = a.length / 3,
        o = i - e - 2;
    n ? Graphics.Line.AddJoint(t, i, e, e + 2, s.width, a) : Graphics.Line.AddEnd(t, e, e + 2, !0, s.width, a);
    for (var c = 0; o > c; c += 2) Graphics.Line.AddJoint(t, e + c, e + c + 2, e + c + 4, s.width, a), r.push(h + c + 0, h + c + 1, h + c + 2, h + c + 1, h + c + 2, h + c + 3);
    n ? (Graphics.Line.AddJoint(t, e + o, e + o + 2, e, s.width, a), r.push(h + o + 0, h + o + 1, h + o + 2, h + o + 1, h + o + 2, h + o + 3), r.push(h + o + 2, h + o + 3, h + 0, h + o + 3, h + 0, h + 1)) : (Graphics.Line.AddEnd(t, e + o, e + o + 2, !1, s.width, a), r.push(h + 0 + o, h + 1 + o, h + 2 + o, h + 1 + o, h + 2 + o, h + 3 + o))
}, Graphics.Line.AddEnd = function(t, e, i, s, n, r) {
    var a = t[e],
        h = t[e + 1],
        o = t[i],
        c = t[i + 1],
        l = .5 * n / Graphics.len(a - o, h - c),
        _ = l * (h - c);
    dy = -l * (a - o), s ? r.push(a + _, h + dy, 0, a - _, h - dy, 0) : r.push(o + _, c + dy, 0, o - _, c - dy, 0)
}, Graphics.Line.AddJoint = function(t, e, i, s, n, r) {
    var a = new Point,
        h = new Point,
        o = new Point,
        c = new Point,
        l = new Point,
        _ = t[e],
        u = t[e + 1],
        p = t[i],
        g = t[i + 1],
        f = t[s],
        d = t[s + 1],
        m = .5 * n / Graphics.len(_ - p, u - g),
        v = .5 * n / Graphics.len(p - f, g - d),
        y = m * (u - g),
        E = -m * (_ - p),
        T = v * (g - d),
        x = -v * (p - f);
    return Math.abs(y - T) + Math.abs(E - x) < 1e-7 ? (r.push(p + y, g + E, 0), void r.push(p - y, g - E, 0)) : (a.setTo(_ + y, u + E), h.setTo(p + y, g + E), o.setTo(p + T, g + x), c.setTo(f + T, d + x), Graphics.PolyK._GetLineIntersection(a, h, o, c, l), r.push(l.x, l.y, 0), a.setTo(_ - y, u - E), h.setTo(p - y, g - E), o.setTo(p - T, g - x), c.setTo(f - T, d - x), Graphics.PolyK._GetLineIntersection(a, h, o, c, l), void r.push(l.x, l.y, 0))
}, Graphics._makeTgs = function(t, e, i, s, n) {
    var r = "t_" + t.length + "_" + e.length,
        a = Graphics._delTgs[r];
    if (null == a || 0 == a.length) return new Graphics.Tgs(t, e, i, s, n);
    var h = a.pop();
    return Graphics._delNum--, h.Set(t, e, i, s, n), h
}, Graphics._freeTgs = function(t) {
    var e = Graphics._delTgs[t.name];
    null == e && (e = []), e.push(t), Graphics._delNum++, Graphics._delTgs[t.name] = e
}, Graphics.Tgs = function(t, e, i, s, n) {
    this.color = s, this.bdata = n, this.name = "t_" + t.length + "_" + e.length, this.useTex = null != n, this.dirtyUVT = !0, this.emptyUVT = null == i, this.useIndex = t.length / 3 <= 65536, this.useIndex ? (this.ind = new Uint16Array(e), this.vrt = new Float32Array(t), i ? this.uvt = new Float32Array(i) : this.uvt = new Float32Array(2 * t.length / 3), this.ibuf = gl.createBuffer(), Stage._setEBF(this.ibuf), gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.ind, gl.STATIC_DRAW)) : (this.vrt = new Float32Array(3 * e.length), Graphics.Tgs.unwrapF32(e, t, 3, this.vrt), this.uvt = new Float32Array(2 * e.length), i && Graphics.Tgs.unwrapF32(e, i, 2, this.uvt)), this.vbuf = gl.createBuffer(), Stage._setBF(this.vbuf), gl.bufferData(gl.ARRAY_BUFFER, this.vrt, gl.STATIC_DRAW), this.tbuf = gl.createBuffer(), Stage._setBF(this.tbuf), gl.bufferData(gl.ARRAY_BUFFER, this.uvt, gl.STATIC_DRAW)
}, Graphics.Tgs.prototype.Set = function(t, e, i, s, n) {
    if (this.color = s, this.bdata = n, this.useTex = null != n, this.dirtyUVT = !0, this.emptyUVT = null == i, this.useIndex) {
        for (var r = e.length, a = t.length, h = 0; r > h; h++) this.ind[h] = e[h];
        for (var h = 0; a > h; h++) this.vrt[h] = t[h];
        if (i)
            for (var h = 0; h < i.length; h++) this.uvt[h] = i[h];
        Stage._setEBF(this.ibuf), gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.ind, gl.STATIC_DRAW)
    } else Graphics.Tgs.unwrapF32(e, t, 3, this.vrt), i && Graphics.Tgs.unwrapF32(e, i, 2, this.uvt);
    Stage._setBF(this.vbuf), gl.bufferData(gl.ARRAY_BUFFER, this.vrt, gl.STATIC_DRAW), Stage._setBF(this.tbuf), gl.bufferData(gl.ARRAY_BUFFER, this.uvt, gl.STATIC_DRAW)
}, Graphics.Tgs.prototype.render = function(t) {
    if (this.useTex) {
        var e = this.bdata;
        if (0 == e._loaded) return;
        if (e._dirty && e._syncWithGPU(), this.dirtyUVT) {
            if (this.dirtyUVT = !1, this.emptyUVT) {
                this.emptyUVT = !1;
                for (var i = 1 / e._rwidth, s = 1 / e._rheight, n = 0; n < this.uvt.length; n++) this.uvt[2 * n] = i * this.vrt[3 * n], this.uvt[2 * n + 1] = s * this.vrt[3 * n + 1]
            } else if (e.width != e._rwidth || e.height != e._rheight)
                for (var i = e.width / e._rwidth, s = e.height / e._rheight, n = 0; n < this.uvt.length; n++) this.uvt[2 * n] *= i, this.uvt[2 * n + 1] *= s;
            Stage._setBF(this.tbuf), gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvt)
        }
        Stage._setUT(1), Stage._setTEX(e._texture)
    } else Stage._setUT(0), gl.uniform4fv(t._sprg.color, this.color);
    Stage._setTC(this.tbuf), Stage._setVC(this.vbuf), this.useIndex ? (Stage._setEBF(this.ibuf), gl.drawElements(gl.TRIANGLES, this.ind.length, gl.UNSIGNED_SHORT, 0)) : gl.drawArrays(gl.TRIANGLES, 0, this.vrt.length / 3)
}, Graphics.Tgs.unwrapF32 = function(t, e, i, s) {
    for (var n = t.length, r = 0; n > r; r++)
        for (var a = 0; i > a; a++) s[r * i + a] = e[t[r] * i + a]
}, Graphics.PolyK = {}, Graphics.PolyK.Triangulate = function(t) {
    var e = t.length >> 1;
    if (3 > e) return [];
    var i = [];
    if (Graphics.PolyK.IsConvex(t)) {
        for (var s = 1; e - 1 > s; s++) i.push(0, s, s + 1);
        return i
    }
    for (var n = [], s = 0; e > s; s++) n.push(s);
    for (var s = 0, r = e; r > 3;) {
        var a = n[(s + 0) % r],
            h = n[(s + 1) % r],
            o = n[(s + 2) % r],
            c = t[2 * a],
            l = t[2 * a + 1],
            _ = t[2 * h],
            u = t[2 * h + 1],
            p = t[2 * o],
            g = t[2 * o + 1],
            f = !1;
        if (Graphics.PolyK._convex(c, l, _, u, p, g)) {
            f = !0;
            for (var d = 0; r > d; d++) {
                var m = n[d];
                if (m != a && m != h && m != o && Graphics.PolyK._PointInTriangle(t[2 * m], t[2 * m + 1], c, l, _, u, p, g)) {
                    f = !1;
                    break
                }
            }
        }
        if (f) i.push(a, h, o), n.splice((s + 1) % r, 1), r--, s = 0;
        else if (s++ > 3 * r) break
    }
    return i.push(n[0], n[1], n[2]), i
}, Graphics.PolyK.IsConvex = function(t) {
    if (t.length < 6) return !0;
    for (var e = t.length - 4, i = 0; e > i; i += 2)
        if (!Graphics.PolyK._convex(t[i], t[i + 1], t[i + 2], t[i + 3], t[i + 4], t[i + 5])) return !1;
    return Graphics.PolyK._convex(t[e], t[e + 1], t[e + 2], t[e + 3], t[0], t[1]) && Graphics.PolyK._convex(t[e + 2], t[e + 3], t[0], t[1], t[2], t[3]) ? !0 : !1
}, Graphics.PolyK._convex = function(t, e, i, s, n, r) {
    return (e - s) * (n - i) + (i - t) * (r - s) >= 0
}, Graphics.PolyK._PointInTriangle = function(t, e, i, s, n, r, a, h) {
    var o = a - i,
        c = h - s,
        l = n - i,
        _ = r - s,
        u = t - i,
        p = e - s,
        g = o * o + c * c,
        f = o * l + c * _,
        d = o * u + c * p,
        m = l * l + _ * _,
        v = l * u + _ * p,
        y = 1 / (g * m - f * f),
        E = (m * d - f * v) * y,
        T = (g * v - f * d) * y;
    return E >= 0 && T >= 0 && 1 > E + T
}, Graphics.PolyK._GetLineIntersection = function(t, e, i, s, n) {
    var r = t.x - e.x,
        a = i.x - s.x,
        h = t.y - e.y,
        o = i.y - s.y,
        c = r * o - h * a;
    if (0 == c) return null;
    var l = t.x * e.y - t.y * e.x,
        _ = i.x * s.y - i.y * s.x;
    n.x = (l * a - r * _) / c, n.y = (l * o - h * _) / c
}, Graphics.PolyK.GetArea = function(t) {
    if (t.length < 6) return 0;
    for (var e = t.length - 2, i = 0, s = 0; e > s; s += 2) i += (t[s + 2] - t[s]) * (t[s + 1] + t[s + 3]);
    return i += (t[0] - t[e]) * (t[e + 1] + t[1]), .5 * -i
}, Graphics.PolyK.Reverse = function(t) {
    for (var e = [], i = t.length - 2; i >= 0; i -= 2) e.push(t[i], t[i + 1]);
    return e
}, Sprite.prototype = new DisplayObjectContainer, Sprite.prototype._getRect = function(t, e, i) {
    var s = DisplayObjectContainer.prototype._getRect.call(this, t, e, i),
        n = this.graphics._getLocRect(i);
    return Point._m4.multiply(t, this._getATMat(), this._tempm), this._transfRect(this._tempm, e, n, this._trect2), s.union(this._trect2)
}, Sprite.prototype._render = function(t) {
    this.graphics._render(t), DisplayObjectContainer.prototype._render.call(this, t)
}, Sprite.prototype._getTarget = function(t, e) {
    if (!this.visible || !this.mouseChildren && !this.mouseEnabled) return null;
    var i = DisplayObjectContainer.prototype._getTarget.call(this, t, e);
    if (null != i) return i;
    if (!this.mouseEnabled) return null;
    var s = this._tvec4_0,
        n = this._tvec4_1,
        r = this.transform._getIMat();
    Point._m4.multiplyVec4(r, t, s), Point._m4.multiplyVec4(r, e, n);
    var a = this._tempP;
    return this._lineIsc(s, n, a), this.graphics._hits(a.x, a.y) ? this : null
}, Sprite.prototype._htpLocal = function(t, e) {
    var i = this._tempP;
    return this._lineIsc(t, e, i), this.graphics._hits(i.x, i.y) ? !0 : DisplayObjectContainer.prototype._htpLocal.call(this, t, e)
};
var TextFormatAlign = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right",
    JUSTIFY: "justify"
};
TextFormat.prototype.clone = function() {
    return new TextFormat(this.font, this.size, this.color, this.bold, this.italic, this.align, this.leading)
}, TextFormat.prototype.set = function(t) {
    this.font = t.font, this.size = t.size, this.color = t.color, this.bold = t.bold, this.italic = t.italic, this.align = t.align, this.leading = t.leading
}, TextFormat.prototype.setContext = function(t) {
    var e = this.color,
        i = e >> 16 & 255,
        s = e >> 8 & 255,
        n = 255 & e;
    t.textBaseline = "top", t.fillStyle = t.strokeStyle = "rgb(" + i + "," + s + "," + n + ")", t.font = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.size + "px " + this.font
}, TextFormat.prototype.getImageData = function(t, e) {
    var i = TextFormat._canvas,
        s = TextFormat._ctxext,
        n = this.data;
    i.width = n.rw = this._nhpt(e._areaW), i.height = n.rh = this._nhpt(e._areaH), e._background && (s.fillStyle = "rgba(255,255,255,1)", s.fillRect(0, 0, e._areaW, e._areaH)), e._border && (s.strokeStyle = "rgb(0,0,0)", s.beginPath(), s.rect(.5, .5, e._areaW - 1, e._areaH - 1), s.stroke()), this.setContext(s);
    var r = [];
    this.maxW = 0;
    for (var a = t.split("\n"), h = 0, o = 0, c = 1.25 * this.size, l = 0, _ = 0; _ < a.length; _++) {
        var u = this.renderPar(a[_], o, c, s, e, l, r);
        h += u, o += u * (c + this.leading), l += a[_].length + 1
    }
    if (this.align == TextFormatAlign.JUSTIFY && (this.maxW = Math.max(this.maxW, e._areaW)), n.tw = this.maxW, n.th = (c + this.leading) * h - this.leading, e._metrics = r, e._selectable && e._select && e._select.from < e._select.to) {
        var p = e._select,
            g = r,
            f = e.getLineIndexOfChar(p.from),
            d = e.getLineIndexOfChar(p.to - 1),
            m = e.getCharBoundaries(p.from),
            v = e.getCharBoundaries(p.to - 1);
        if (s.fillStyle = "rgba(0,0,0,0.25)", f == d) s.fillRect(m.x, m.y, v.x + v.width - m.x, v.y + v.height - m.y);
        else {
            s.fillRect(m.x, m.y, g[f].x + g[f].width - m.x, g[f].y + g[f].height - m.y);
            for (var y = f + 1; d > y; y++) s.fillRect(g[y].x, g[y].y, g[y].width, g[y].height);
            s.fillRect(g[d].x, g[d].y, v.x + v.width - g[d].x, v.y + v.height - g[d].y)
        }
    } else if ("input" == e._type && e._curPos > -1) {
        var m = e.getCharBoundaries(e._curPos);
        s.beginPath(), s.moveTo(Math.round(m.x) + .5, m.y), s.lineTo(Math.round(m.x) + .5, m.y + m.height), s.stroke()
    }
    n.canvas = i;
    var E = s.getImageData(0, 0, n.rw, n.rh);
    return window.CanvasPixelArray && E.data instanceof CanvasPixelArray ? n.ui8buff = new Uint8Array(E.data) : n.ui8buff = new Uint8Array(E.data.buffer), n
}, TextFormat.prototype.renderPar = function(t, e, i, s, n, r, a) {
    var h;
    h = n._wordWrap ? t.split(" ") : [t];
    for (var o = s.measureText(" ").width, c = 0, l = n._areaW, _ = 0, u = [
            []
        ], p = [], g = 0; g < h.length; g++) {
        var f = h[g],
            d = s.measureText(f).width;
        l >= c + d || 0 == c ? (u[_].push(f), c += d + o) : (p.push(l - c + o), u.push([]), _++, c = 0, g--)
    }
    p.push(l - c + o);
    for (var g = 0; g < u.length; g++) {
        var m = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            charOffset: r,
            words: []
        };
        m.height = 1.25 * this.size + this.leading;
        var v = u[g];
        this.maxW = Math.max(this.maxW, l - p[g]);
        var y, E = e + (i + this.leading) * g;
        c = 0, y = o, this.align == TextFormatAlign.CENTER && (c = .5 * p[g]), this.align == TextFormatAlign.RIGHT && (c = p[g]), this.align == TextFormatAlign.JUSTIFY && (y = o + p[g] / (v.length - 1)), m.x = c, m.y = E;
        for (var T = 0; T < v.length; T++) {
            var f = v[T];
            s.fillText(f, c, E);
            var d = s.measureText(f).width;
            m.words.push({
                x: c,
                y: E,
                width: d,
                height: m.height,
                charOffset: r,
                word: f
            }), c += g < u.length - 1 ? d + y : d + o, r += f.length + 1
        }
        m.width = c - m.x, g == u.length - 1 && (m.width -= o), a.push(m)
    }
    return _ + 1
}, TextFormat.prototype._nhpt = function(t) {
    --t;
    for (var e = 1; 32 > e; e <<= 1) t |= t >> e;
    return t + 1
}, TextFormat._canvas = document.createElement("canvas"), TextFormat._ctxext = TextFormat._canvas.getContext("2d"), TextField.prototype = new InteractiveObject, TextField.prototype._getLocRect = function() {
    return this._brect
}, TextField.prototype._loseFocus = function() {
    this._tareaAdded && document.body.removeChild(this._tarea), this._tareaAdded = !1, this._curPos = -1, this._update()
}, TextField.prototype._tfKU = function(t) {
    this._tfInput(null)
}, TextField.prototype._tfInput = function(t) {
    "input" == this._type && (this._text = this._tarea.value, this._select = null, this._curPos = this._tarea.selectionStart, this.setSelection(this._tarea.selectionStart, this._tarea.selectionEnd))
}, TextField.prototype._tfATS = function(t) {
    this._stage = this.stage
}, TextField.prototype._tfRFS = function(t) {
    this._loseFocus()
}, TextField.prototype._tfMD = function(t) {
    if (this._selectable) {
        "input" == this._type && (this._tareaAdded = !0, document.body.appendChild(this._tarea), this._tarea.value = this._text, this._tarea.focus());
        var e = this.getCharIndexAtPoint(this.mouseX, this.mouseY);
        this._mdown = !0, this._curPos = e, this.setSelection(e, e), this._update(), this.stage.addEventListener2(MouseEvent.MOUSE_MOVE, this._tfMM, this), this.stage.addEventListener2(MouseEvent.MOUSE_UP, this._tfMU, this)
    }
}, TextField.prototype._tfMM = function(t) {
    if (this._selectable && this._mdown) {
        var e = this.getCharIndexAtPoint(this.mouseX, this.mouseY);
        this.setSelection(this._curPos, e)
    }
}, TextField.prototype._tfMU = function(t) {
    this._selectable && (this._mdown = !1, "input" == this._type && this._tarea.focus(), this._stage.removeEventListener(MouseEvent.MOUSE_MOVE, this._tfMM), this._stage.removeEventListener(MouseEvent.MOUSE_UP, this._tfMU))
}, TextField.prototype.appendText = function(t) {
    this._text += t, this._update()
}, TextField.prototype.getCharBoundaries = function(t) {
    var e = TextFormat._ctxext;
    this._tForm.setContext(e);
    var i = this._metrics,
        s = this.getLineIndexOfChar(t);
    if (0 == i[s].words.length) return new Rectangle(i[s].x, i[s].y, i[s].width, i[s].height);
    for (var n = 0; n + 1 < i[s].words.length && i[s].words[n + 1].charOffset <= t;) n++;
    var r = i[s].words[n],
        a = r.word.substring(0, t - r.charOffset),
        h = new Rectangle(r.x + e.measureText(a).width, r.y, 0, r.height);
    h.width = e.measureText(this._text.charAt(t)).width;
    var o = i[s].words[n + 1];
    return o && o.charOffset == t + 1 && (h.width = o.x - h.x), h
}, TextField.prototype.getCharIndexAtPoint = function(t, e) {
    if (0 == this._text.length) return 0;
    var i = TextFormat._ctxext;
    this._tForm.setContext(i);
    var s = this._metrics,
        n = this.getLineIndexAtPoint(t, e);
    t = Math.max(s[n].x, Math.min(s[n].x + s[n].width, t));
    for (var r = 0; r + 1 < s[n].words.length && s[n].words[r + 1].x <= t;) r++;
    for (var a = s[n].words[r], h = a.charOffset, o = a.x;;) {
        var c = i.measureText(this._text.charAt(h)).width;
        if (!(t > o + .5 * c && 0 != c)) break;
        o += c, h++
    }
    return h
}, TextField.prototype.getLineIndexAtPoint = function(t, e) {
    for (var i = this._metrics, s = 0; s + 1 < i.length && i[s + 1].y <= e;) s++;
    return s
}, TextField.prototype.getLineIndexOfChar = function(t) {
    for (var e = this._metrics, i = 0; i + 1 < e.length && e[i + 1].charOffset <= t;) i++;
    return i
}, TextField.prototype.getTextFormat = function(t) {
    return this._tForm.clone()
}, TextField.prototype.setTextFormat = function(t) {
    this._tForm.set(t), this._tarea.style.fontFamily = t.font, this._tarea.style.fontSize = t.size + "px", this._tarea.style.textAlign = t.align, this._update()
}, TextField.prototype.setSelection = function(t, e) {
    var i = Math.min(t, e),
        s = Math.max(t, e),
        n = this._select;
    (null == n || n.from != i || n.to != s) && (this._select = {
        from: i,
        to: s
    }, this._tarea.selectionStart = i, this._tarea.selectionEnd = s, this._update())
}, TextField.prototype._update = function() {
    var t = this._brect.width = this._areaW,
        e = this._brect.height = this._areaH;
    if (0 != t && 0 != e) {
        var i = this._tForm.getImageData(this._text, this);
        this._textW = i.tw, this._textH = i.th, (i.rw != this._rwidth || i.rh != this._rheight) && (gl.deleteTexture(this._texture), this._texture = gl.createTexture()), Stage._setTEX(this._texture), gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, i.rw, i.rh, 0, gl.RGBA, gl.UNSIGNED_BYTE, i.ui8buff), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR), gl.generateMipmap(gl.TEXTURE_2D), this._rwidth = i.rw, this._rheight = i.rh;
        var s = t / i.rw,
            n = e / i.rh,
            r = this._tcArray;
        r[2] = r[6] = s, r[5] = r[7] = n, Stage._setBF(this._tcBuffer), gl.vertexAttribPointer(Stage._main._sprg.tca, 2, gl.FLOAT, !1, 0, 0), gl.bufferSubData(gl.ARRAY_BUFFER, 0, r);
        var a = this._fArray;
        a[3] = a[9] = t, a[7] = a[10] = e, Stage._setBF(this._vBuffer), gl.vertexAttribPointer(Stage._main._sprg.vpa, 3, gl.FLOAT, !1, 0, 0), gl.bufferSubData(gl.ARRAY_BUFFER, 0, a)
    }
}, TextField.prototype._render = function(t) {
    0 != this._areaW && 0 != this._areaH && (gl.uniformMatrix4fv(t._sprg.tMatUniform, !1, t._mstack.top()), t._cmstack.update(), Stage._setVC(this._vBuffer), Stage._setTC(this._tcBuffer), Stage._setUT(1), Stage._setTEX(this._texture), Stage._setEBF(t._unitIBuffer), gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0))
}, this.tp = TextField.prototype, tp.ds = tp.__defineSetter__, tp.dg = tp.__defineGetter__, tp.dg("textWidth", function() {
    return this._textW
}), tp.dg("textHeight", function() {
    return this._textH
}), tp.ds("wordWrap", function(t) {
    this._wordWrap = t, this._update()
}), tp.dg("wordWrap", function() {
    return this._wordWrap
}), tp.ds("width", function(t) {
    this._areaW = Math.max(0, t), this._tarea.style.width = this._areaW + "px", this._update()
}), tp.dg("width", function() {
    return this._areaW
}), tp.ds("height", function(t) {
    this._areaH = Math.max(0, t), this._tarea.style.height = this._areaH + "px", this._update()
}), tp.dg("height", function() {
    return this._areaH
}), tp.ds("text", function(t) {
    this._text = t + "", this._update()
}), tp.dg("text", function() {
    return this._text
}), tp.ds("selectable", function(t) {
    this._selectable = t, this._update()
}), tp.dg("selectable", function() {
    return this._selectable
}), tp.ds("type", function(t) {
    this._type = t, this._update()
}), tp.dg("type", function() {
    return this._type
}), tp.ds("background", function(t) {
    this._background = t, this._update()
}), tp.dg("background", function() {
    return this._background
}), tp.ds("border", function(t) {
    this._border = t, this._update()
}), tp.dg("border", function() {
    return this._border
}), delete tp.ds, delete tp.dg, delete this.tp;