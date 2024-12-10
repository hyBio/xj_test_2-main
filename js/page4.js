class Page4 extends BasePage {
    constructor() {
        super(4);
        this.chart = null;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.element.className = 'page4-container';
        this.element.innerHTML = `
            <div class="page4-content">
                <div id="map-container"></div>
                <div class="text-container">
                    <div class="text-mask">
                        <div class="text-line">很幸运</div>
                        <div class="text-line">茫茫人海之中</div>
                        <div class="text-line highlight">1079.4km</div>
                        <div class="text-line">还是彼此相识</div>
                    </div>
                </div>
            </div>
        `;
    }


    async loadMapData() {
        return window.CHINA_MAP_DATA;
    }

    async initAndZoomMap() {
        try {
            const mapContainer = this.element.querySelector('#map-container');
            if (!mapContainer) return;

            // 确保容器可见并设置初始尺寸
            mapContainer.style.display = 'block';
            mapContainer.style.width = '100%';
            mapContainer.style.height = '100vh';
            
            // 等待下一帧确保DOM更新
            await new Promise(resolve => requestAnimationFrame(resolve));
            
            // 清理旧的实例
            if (this.chart) {
                this.chart.dispose();
                this.chart = null;
            }
            
            // 初始化新实例
            this.chart = echarts.init(mapContainer, null, {
                renderer: 'canvas',
                useDirtyRect: true
            });

            const chinaJson = await this.loadMapData();
            echarts.registerMap('china', chinaJson);
            
            this.setBaseOption();
            await this.animateZoom();
        } catch (error) {
            console.error('地图初始化失败:', error);
        }
    }

    setBaseOption() {
        this.chart.setOption({
            backgroundColor: 'transparent',
            geo: {
                map: 'china',
                roam: false,
                label: { show: false },
                itemStyle: {
                    areaColor: '#0a2b4e',
                    borderColor: '#00eaff',
                    borderWidth: 1.5,
                    shadowColor: 'rgba(0, 234, 255, 0.3)',
                    shadowBlur: 10
                },
                emphasis: { disabled: true },
                select: { disabled: true },
                zoom: 1,
                center: [105, 30],
                aspectScale: 0.85
            }
        });
    }

    async animateZoom() {
        if (!this.chart) return;

        const TOTAL_DURATION = 4000;
        const FINAL_ZOOM = 3;
        const INITIAL_ZOOM = 1;
        const startTime = performance.now();

        return new Promise(resolve => {
            const animate = () => {
                if (!this.chart) {
                    resolve();
                    return;
                }

                try {
                    const currentTime = performance.now();
                    const progress = Math.min((currentTime - startTime) / TOTAL_DURATION, 1);
                    const easedProgress = this.easeInOutQuad(progress);
                    const currentZoom = INITIAL_ZOOM + (FINAL_ZOOM - INITIAL_ZOOM) * easedProgress;

                    this.chart.setOption({
                        geo: {
                            zoom: currentZoom
                        }
                    }, false);

                    if (progress < 1 && !this.isDestroyed) {
                        requestAnimationFrame(animate);
                    } else {
                        resolve();
                    }
                } catch (error) {
                    console.error('动画更新失败:', error);
                    resolve();
                }
            };
            animate();
        });
    }

    easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    async showCityMarkers() {
        const cities = [{
            name: '武汉',
            value: [114.305393, 30.593099]
        }, {
            name: '珠海',
            value: [113.576726, 22.270715]
        }];

        this.chart.setOption({
            series: [{
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: cities,
                symbolSize: 15,
                itemStyle: {
                    color: '#ff2d51',
                    shadowColor: 'rgba(255, 45, 81, 0.5)',
                    shadowBlur: 10
                },
                rippleEffect: {
                    period: 4,
                    scale: 6,
                    brushType: 'stroke'
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                    color: '#fff',
                    fontSize: 16,
                    textBorderColor: '#0a2b4e',
                    textBorderWidth: 3
                }
            }]
        });
    }

    async startFlyingLines() {
        const lines = [
            {
                coords: [
                    [114.305393, 30.593099], // 武汉
                    [113.576726, 22.270715]  // 珠海
                ],
                lineStyle: { curveness: 0.3 }
            },
            {
                coords: [
                    [113.576726, 22.270715],  // 珠海
                    [114.305393, 30.593099]   // 武汉
                ],
                lineStyle: { curveness: -0.2 }
            }
        ];

        const currentOption = this.chart.getOption();
        
        this.chart.setOption({
            series: [
                currentOption.series[0],
                {
                    type: 'lines',
                    coordinateSystem: 'geo',
                    data: lines,
                    effect: {
                        show: true,
                        period: 3,
                        trailLength: 0.9,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        color: '#fff',
                        width: 1,
                        opacity: 0.1
                    }
                }
            ]
        });
    }

    async showTexts() {
        const textLines = this.element.querySelectorAll('.text-line');
        for (let i = 0; i < textLines.length; i++) {
            await this.delay(750);
            textLines[i].classList.add('show');
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    showTextMask() {
        const textMask = this.element.querySelector('.text-mask');
        const textContainer = this.element.querySelector('.text-container');
        textContainer.style.opacity = '1';
        textMask.classList.add('show');
    }

    hideTextContainer() {
        const textContainer = this.element.querySelector('.text-container');
        const textMask = this.element.querySelector('.text-mask');
        if (textContainer) {
            textContainer.style.opacity = '0';
            textMask.classList.remove('show');
        }
    }

    async onShow() {
        this.isDestroyed = false;
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        try {
            await this.initAndZoomMap();
            if (this.isDestroyed) return;

            await this.showCityMarkers();
            if (this.isDestroyed) return;

            this.startFlyingLines();
            this.showTextMask();
            await this.showTexts();
        } catch (error) {
            console.error('页面显示失败:', error);
        }
    }

    onHide() {
        this.isDestroyed = true;
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        
        if (this.chart) {
            try {
                this.chart.dispose();
            } catch (error) {
                console.error('图表清理失败:', error);
            }
            this.chart = null;
        }
    }

    resetElements() {
        const textLines = this.element.querySelectorAll('.text-line');
        textLines.forEach(line => line.classList.remove('show'));
        this.hideTextContainer();
    }
}

window.Page4 = Page4; 