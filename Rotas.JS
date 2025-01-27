document.addEventListener("DOMContentLoaded", function () {
    // Obter o horário atual
    const currentDate = new Date();
    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes(); // Convertendo para minutos

    // Carregar o arquivo configuracoes.json (horários limites)
    fetch('configuracoes.json')
        .then(response => response.json())
        .then(configuracoes => {
            // Carregar o arquivo Rotas.json (status das rotas)
            fetch('Rotas.json')
                .then(response => response.json())
                .then(rotas => {
                    // Função para converter o horário "HH:MM" para minutos
                    function timeToMinutes(time) {
                        const [hours, minutes] = time.split(":");
                        return parseInt(hours) * 60 + parseInt(minutes);
                    }

                    // Função para calcular a cor baseada na diferença de tempo
                    function calculateColor(difference, status, timeLimitInMinutes) {
                        const maxDifference = 100; // horas em minutos
                        const ratio = Math.min(difference / maxDifference, 1);

                        // Se o horário limite já passou e o status não é "pronta", a célula ficará vermelha
                        if (timeLimitInMinutes < currentTime && status !== "pronta") {
                            return "red";
                        }

                        // Caso o status seja "pronta", "no escaneamento" ou "na esteira"
                        if (status === "pronta" || status === "no escaneamento" || status === "na esteira") {
                            const r = Math.floor(255 * (1 - ratio));
                            const g = Math.floor(255 * ratio);
                            const b = 0;
                            return `rgb(${r}, ${g}, ${b})`;
                        } else {
                            return "white"; // "a fazer" será branco
                        }
                    }

                    // Função para aplicar as cores e os textos nas tabelas
                    function applyColors() {
                        const sectors = ["M", "Y", "V", "H"];

                        sectors.forEach(sector => {
                            const sectorData = configuracoes[sector];
                            const routesData = rotas[sector];
                            const rows = document.querySelectorAll(`table.${sector} tbody tr`);

                            rows.forEach((row, index) => {
                                const routeName = row.cells[0].textContent.trim();
                                
                                // Obter horário limite e status da rota
                                const { horario } = sectorData[routeName];
                                const { status } = routesData[routeName];

                                const timeLimitInMinutes = timeToMinutes(horario);
                                const timeDifference = Math.abs(timeLimitInMinutes - currentTime);
                                const color = calculateColor(timeDifference, status, timeLimitInMinutes);

                                // Aplica a cor de fundo na célula de status
                                row.cells[1].style.backgroundColor = color;
                                // Exibe o texto de status
                                row.cells[1].textContent = status;
                            });
                        });
                    }

                    // Chama a função para aplicar as cores e textos assim que os dados estiverem carregados
                    applyColors();
                })
                .catch(error => console.error("Erro ao carregar Rotas.json:", error));
        })
        .catch(error => console.error("Erro ao carregar configuracoes.json:", error));
});
