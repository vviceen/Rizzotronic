document.addEventListener("DOMContentLoaded", function () {
    fetch('/Rizzotronic/backend/app/services/adminView/getProductRevenue.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const ctx = document.getElementById('productRevenueChart').getContext('2d');
                const chartData = data.data;

                // Obtener la fecha actual y calcular la fecha límite (5 meses atrás)
                const currentDate = new Date();
                const limitDate = new Date();
                limitDate.setMonth(currentDate.getMonth() - 5);

                // Filtrar los datos para incluir solo los últimos 5 meses
                const filteredData = chartData.filter(item => {
                    const itemDate = new Date(item.mes + '-01'); // Convertir el mes a una fecha
                    return itemDate >= limitDate;
                });

                // Obtener los primeros 3 productos más remunerados de cada mes
                const topProductsByMonth = {};
                filteredData.forEach(item => {
                    if (!topProductsByMonth[item.mes]) {
                        topProductsByMonth[item.mes] = [];
                    }
                    topProductsByMonth[item.mes].push(item);
                });

                Object.keys(topProductsByMonth).forEach(month => {
                    topProductsByMonth[month].sort((a, b) => b.total_revenue - a.total_revenue);
                    topProductsByMonth[month] = topProductsByMonth[month].slice(0, 4);
                });

                const labels = [...new Set(filteredData.map(item => item.mes))];
                const products = [...new Set(filteredData.map(item => item.nombre))];

                const datasets = products.map(product => {
                    const productData = [];
                    labels.forEach(label => {
                        const monthData = topProductsByMonth[label] || [];
                        const item = monthData.find(d => d.nombre === product);
                        productData.push(item ? item.total_revenue : 0);
                    });
                    return {
                        label: product,
                        data: productData,
                        backgroundColor: getRandomColor(),
                        borderColor: getRandomColor(),
                        with: 10,
                        borderWidth: 2
                    };
                });

                const chart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: datasets
                    },
                    options: {
                        plugins: {
                            legend: {
                                display: false // Oculta la leyenda
                            },
                            title: {
                                display: true,
                                text: 'Productos con más remuneración generada en el tiempo'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function (context) {
                                        const label = context.dataset.label || '';
                                        const value = context.raw || 0;
                                        return `${label}: $${(typeof value === 'number' ? value.toFixed(2) : value)}`;
                                    }
                                },
                                mode: 'index',
                                intersect: false,
                            }
                        },
                        scales: {
                            x: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Mes'
                                },
        },
                            y: {
                                display: true,
                                title: {
                                    display: true,
                                    text: 'Remuneración Total'
                                },
                                beginAtZero: true
                            }
                        }
                    }
                });
            } else {
                console.error('Error al obtener los datos:', data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
