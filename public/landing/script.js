/* ============================================
   Hero Card — Tilt effect on mouse move
   ============================================ */
(function() {
    const card = document.querySelector('.hero-card');
    if (!card) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function() {
        card.style.transform = 'rotate(-2deg)';
    });
})();

/* ============================================
   Counter animation — count up with formatting
   ============================================ */
(function() {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.counter').forEach(function(el) {
        var target = parseInt(el.dataset.target, 10);
        if (isNaN(target)) return;

        if (prefersReduced) {
            el.textContent = target;
            return;
        }

        el.textContent = '0';
        var pause = 2000;
        var stepDelay = 1000;

        function pulse() {
            el.style.transform = 'scale(1.3)';
            el.style.color = '#1a1a2e';
            setTimeout(function() {
                el.style.transform = 'scale(1)';
                el.style.color = '';
            }, 300);
        }

        function runCycle() {
            var current = 0;
            el.textContent = '0';

            function tick() {
                current++;
                el.textContent = current;
                pulse();
                if (current < target) {
                    setTimeout(tick, stepDelay);
                } else {
                    setTimeout(function() {
                        el.textContent = '0';
                        el.style.color = '';
                        runCycle();
                    }, pause);
                }
            }

            setTimeout(tick, stepDelay);
        }

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    runCycle();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(el);
    });
})();

/* ============================================
   Scanner — drag & reveal logic
   ============================================ */
(function() {
    var scanLine = document.querySelector('.scan-line');
    var grid = document.querySelector('.scanner-wrap .grid');
    if (!scanLine || !grid) return;

    var cells = grid.querySelectorAll('.cell');
    var isDragging = false;

    function getVisibleMaxY() {
        var gridRect = grid.getBoundingClientRect();
        var maxBottom = 0;
        cells.forEach(function(cell) {
            if (cell.offsetParent === null) return; // hidden via display:none
            var r = cell.getBoundingClientRect();
            var bottom = r.bottom - gridRect.top;
            if (bottom > maxBottom) maxBottom = bottom;
        });
        return maxBottom || gridRect.height;
    }

    function updateCells() {
        var lineRect = scanLine.getBoundingClientRect();
        var lineY = lineRect.top + lineRect.height / 2;

        cells.forEach(function(cell) {
            if (cell.offsetParent === null) return;
            var cellRect = cell.getBoundingClientRect();
            var whiteLayer = cell.querySelector('.cell-white');
            var cellTop = cellRect.top;
            var cellBottom = cellRect.bottom;
            var cellHeight = cellRect.height;

            if (lineY <= cellTop) {
                whiteLayer.style.clipPath = 'inset(0 0 100% 0)';
            } else if (lineY >= cellBottom) {
                whiteLayer.style.clipPath = 'inset(0 0 0 0)';
            } else {
                var pct = ((lineY - cellTop) / cellHeight) * 100;
                whiteLayer.style.clipPath = 'inset(0 0 ' + (100 - pct) + '% 0)';
            }

            if (cell.hasAttribute('data-sick')) {
                if (lineY >= cellBottom) {
                    cell.classList.add('sick-active');
                } else {
                    cell.classList.remove('sick-active');
                }
            }
        });
    }

    var animObserver = setInterval(function() { updateCells(); }, 30);
    setTimeout(function() { clearInterval(animObserver); }, 7000);

    scanLine.addEventListener('mousedown', function(e) {
        e.preventDefault();
        var currentTop = scanLine.getBoundingClientRect().top - grid.getBoundingClientRect().top;
        scanLine.style.animation = 'none';
        scanLine.style.top = currentTop + 'px';
        isDragging = true;
        scanLine.classList.add('dragging');
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        var rect = grid.getBoundingClientRect();
        var y = e.clientY - rect.top;
        var maxY = getVisibleMaxY();
        y = Math.max(0, Math.min(y, maxY));
        scanLine.style.top = y + 'px';
        updateCells();
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;
        scanLine.classList.remove('dragging');
    });

    scanLine.addEventListener('touchstart', function(e) {
        e.preventDefault();
        var currentTop = scanLine.getBoundingClientRect().top - grid.getBoundingClientRect().top;
        scanLine.style.animation = 'none';
        scanLine.style.top = currentTop + 'px';
        isDragging = true;
        scanLine.classList.add('dragging');
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        var touch = e.touches[0];
        var rect = grid.getBoundingClientRect();
        var y = touch.clientY - rect.top;
        var maxY = getVisibleMaxY();
        y = Math.max(0, Math.min(y, maxY));
        scanLine.style.top = y + 'px';
        updateCells();
    }, { passive: false });

    document.addEventListener('touchend', function() {
        if (!isDragging) return;
        isDragging = false;
        scanLine.classList.remove('dragging');
    });
})();
