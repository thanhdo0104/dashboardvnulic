// Chart.js configuration and data
document.addEventListener('DOMContentLoaded', function() {
    // CAC & CLTV Chart (Combined Bar and Line Chart)
    const cacCltvCtx = document.getElementById('cacCltvChart').getContext('2d');
    
    const cacCltvChart = new Chart(cacCltvCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'CAC',
                    type: 'bar',
                    data: [18.50, 19.20, 19.80, 20.10, 19.90, 20.30, 19.70, 20.00, 19.60, 19.80, 20.20, 19.50],
                    backgroundColor: '#e91e63',
                    borderColor: '#e91e63',
                    borderWidth: 1,
                    yAxisID: 'y'
                },
                {
                    label: 'CLTV',
                    type: 'line',
                    data: [2100, 2150, 2200, 2250, 2300, 2350, 2400, 2450, 2500, 2550, 2600, 2689],
                    backgroundColor: 'rgba(3, 169, 244, 0.1)',
                    borderColor: '#03a9f4',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'CAC ($)'
                    },
                    min: 0,
                    max: 25,
                    ticks: {
                        stepSize: 5
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'CLTV ($)'
                    },
                    min: 2000,
                    max: 2800,
                    ticks: {
                        stepSize: 100
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // MRR Growth Chart (Bar Chart)
    const mrrGrowthCtx = document.getElementById('mrrGrowthChart').getContext('2d');
    
    const mrrGrowthChart = new Chart(mrrGrowthCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'MRR Growth',
                data: [4000, 5000, 10000, 4000, 8000, 3000, 6000, 5000, 4000, 7000, 12000, 3000],
                backgroundColor: '#9c27b0',
                borderColor: '#9c27b0',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Add animation to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    metricCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects to charts
    const chartContainers = document.querySelectorAll('.chart-container');
    
    chartContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add smooth transitions
    chartContainers.forEach(container => {
        container.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });

    // Simulate real-time data updates (optional)
    function updateMetrics() {
        const metricValues = document.querySelectorAll('.metric-value');
        
        metricValues.forEach(value => {
            const currentValue = value.textContent;
            const numericValue = parseFloat(currentValue.replace(/[$,%]/g, ''));
            
            if (!isNaN(numericValue)) {
                // Add small random variation (±2%)
                const variation = (Math.random() - 0.5) * 0.04;
                const newValue = numericValue * (1 + variation);
                
                if (currentValue.includes('$')) {
                    value.textContent = '$' + Math.round(newValue).toLocaleString();
                } else if (currentValue.includes('%')) {
                    value.textContent = newValue.toFixed(2) + '%';
                } else {
                    value.textContent = Math.round(newValue).toLocaleString();
                }
            }
        });
    }

    // Update metrics every 30 seconds (optional)
    // setInterval(updateMetrics, 30000);

    // Add click animation to metric cards
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});
