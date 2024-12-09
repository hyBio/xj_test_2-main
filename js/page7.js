class Page7 extends BasePage {
    constructor() {
        super(7);
        this.contentContainer = null;
        this.textContainer = null;
        this.init();
    }

    init() {
        this.element.className = 'page-common page-7';
        
        // 创建内容容器
        this.contentContainer = document.createElement('div');
        this.contentContainer.id = 'page7Content';
        this.contentContainer.className = 'page-content';
        
        // 创建文本容器
        this.textContainer = document.createElement('div');
        this.textContainer.id = 'page7TextContainer';
        
        this.element.appendChild(this.contentContainer);
        this.element.appendChild(this.textContainer);
    }

    async onShow() {
        this.element.style.display = 'block';
        this.element.style.opacity = '1';
        
        // 清除之前的内容
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
        
        // 绘制图表
        await this.drawChart();
        // 显示文本
        await this.showTexts();
    }

    onHide() {
        this.element.style.display = 'none';
        this.element.style.opacity = '0';
        
        // 清理内容
        this.contentContainer.innerHTML = '';
        this.textContainer.innerHTML = '';
    }

    async drawChart() {
        const data = [
            { name: '总消息', value: 86400, color: {
                start: '#FF9D6C',
                end: '#FF6B6B'
            }},
            { name: '秀杰', value: 30250, color: {
                start: '#FFB5DA',
                end: '#FF7BAC'
            }}
        ];

        // 调整容器尺寸计算
        const containerWidth = this.contentContainer.clientWidth;
        const width = containerWidth;
        const height = Math.min(160, window.innerHeight * 0.25);
        const margin = { 
            top: 30,
            right: 20,
            bottom: 30,
            left: 80
        };

        const svg = d3.select('#page7Content')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        // 创建比例尺
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)])
            .range([0, width - margin.left - margin.right]);

        const yScale = d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.top, height - margin.bottom])
            .padding(0.4);

        // 为每个柱子创建渐变
        data.forEach((d, i) => {
            const gradientId = `barGradient-${i}`;
            
            // 创建渐变
            const gradient = svg.append('defs')
                .append('linearGradient')
                .attr('id', gradientId)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '100%')
                .attr('y2', '0%');

            gradient.append('stop')
                .attr('offset', '0%')
                .attr('stop-color', d.color.start);

            gradient.append('stop')
                .attr('offset', '100%')
                .attr('stop-color', d.color.end);
        });

        // 绘制柱状图
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', margin.left)
            .attr('y', d => yScale(d.name))
            .attr('width', 0)
            .attr('height', yScale.bandwidth())
            .attr('fill', (d, i) => `url(#barGradient-${i})`)  // 使用渐变
            .attr('rx', 4)
            .attr('ry', 4)
            .style('filter', 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))')  // 添加柔和的发光效果
            .transition()
            .duration(1000)
            .attr('width', d => xScale(d.value));

        // 添加文本标签
        svg.selectAll('.value-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'value-label')
            .attr('x', d => margin.left + xScale(d.value))
            .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('dx', '-0.5em')
            .attr('fill', '#ffffff')
            .attr('text-anchor', 'end')
            .text(d => d.value.toLocaleString())
            .style('font-size', '16px')
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .style('opacity', 1);

        // 添加Y轴标签
        svg.selectAll('.y-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'y-label')
            .attr('x', margin.left - 10)
            .attr('y', d => yScale(d.name) + yScale.bandwidth() / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', 'end')
            .attr('fill', '#ffffff')
            .text(d => d.name)
            .style('font-size', '16px');
    }

    async showTexts() {
        const texts = [
            { text: "文字多多，", isHighlight: false },
            { text: "情谊", isHighlight: false },
            { text: "满满", isHighlight: true }
        ];
        
        texts.forEach(textConfig => {
            const textDiv = document.createElement('div');
            textDiv.className = 'text-line';
            
            if (textConfig.isHighlight) {
                const span = document.createElement('span');
                span.className = 'highlight';
                span.textContent = textConfig.text;
                textDiv.appendChild(span);
            } else {
                textDiv.textContent = textConfig.text;
            }
            
            this.textContainer.appendChild(textDiv);
        });
    }
}

window.Page7 = Page7; 