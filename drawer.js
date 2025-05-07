var canvas, ctx, flag, dot_flag = false
prevX = 0
currX = 0
prevY = 0
currY = 0

canvas = document.getElementsByClassName("canvas")[0]
ctx = canvas.getContext("2d")

const draw = () => {
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currX, currY)
    ctx.strokeStyle = x
    ctx.lineWidth = y
    ctx.stroke()
    ctx.closePath()
}

const findxy = (res, e) => {
    bb = canvas.getBoundingClientRect() // use this to account for scroll
    if (res == 'down' && e.button === 0) {  // check if this is primary mouse button
        prevX = currX;
        prevY = currY;
        currX = e.clientX - bb.left
        currY = e.clientY - bb.top

        flag = true
        dot_flag = true
        if (dot_flag) {
            ctx.beginPath()
            ctx.fillStyle = x
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if ((res == 'up' || res == 'out') && e.button === 0) {
        flag = false;
    }
    if (res == 'move' && e.button === 0) {
        if (flag) {
            prevX = currX
            prevY = currY
            currX = e.clientX - bb.left
            currY = e.clientY - bb.top
            draw()
        }
    }
}

const resizeCanvas = () => {
    w = Math.max(
        document.documentElement["clientWidth"],
        document.body["scrollWidth"],
        document.documentElement["scrollWidth"],
        document.body["offsetWidth"],
        document.documentElement["offsetWidth"]
    );
    h = Math.max(
        document.documentElement["clientHeight"],
        document.body["scrollHeight"],
        document.documentElement["scrollHeight"],
        document.body["offsetWidth"],
        document.documentElement["offsetHeight"]
    );
    canvas.width = w
    canvas.height = h
    width = canvas.width
    height = canvas.height
}

canvas.addEventListener("mousemove", function(e) {
    findxy('move', e)
}, false)

canvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false)

canvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false)

canvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false)

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
