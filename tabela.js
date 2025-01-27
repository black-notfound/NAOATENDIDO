// Função para preencher a tabela com os dados do JSON
function preencherTabela(dados, tabelaId) {
    const tabelaBody = document.getElementById(tabelaId).getElementsByTagName('tbody')[0];
    tabelaBody.innerHTML = ''; // Limpa a tabela antes de preenchê-la

    // Verifica se os dados existem antes de tentar preenchê-la
    if (dados.sku.length === 0) {
        console.log("Os dados estão vazios!");
        return; // Caso os dados estejam vazios, retorna sem preencher a tabela
    }

    // Preenche a tabela com os dados
    for (let i = 0; i < dados.sku.length; i++) {
        const linha = document.createElement('tr');        
        
        const celulaSku = document.createElement('td');
        celulaSku.textContent = dados.sku[i];

        const celulaDescricao = document.createElement('td');
        celulaDescricao.textContent = dados.descrição[i];

        const celulaSetor = document.createElement('td');
        celulaSetor.textContent = dados.setor[i];

        const celulaEndereco = document.createElement('td');
        celulaEndereco.textContent = dados.endereço[i];

        const celulaSugestao = document.createElement('td');
        celulaSugestao.textContent = dados.sugestão[i];

        const celulaUnidadeFaturada = document.createElement('td');
        celulaUnidadeFaturada.textContent = dados.faturada[i];

        const celulaUnidadeNAT = document.createElement('td');
        celulaUnidadeNAT.textContent = dados.NAT[i];  // Correção: Agora está pegando a chave correta

        const celulaSaldoInicial = document.createElement('td');
        celulaSaldoInicial.textContent = dados['saldo inicial'][i];

        const celulaSaldoCase = document.createElement('td');
        celulaSaldoCase.textContent = dados['saldo case'][i];

        const celulaStatusNAT = document.createElement('td');
        celulaStatusNAT.textContent = dados['status NAT'][i];

        const celulaStatusValidado = document.createElement('td');
        celulaStatusValidado.textContent = dados['status validado'][i];

        const celulaSaldoAtivo = document.createElement('td');
        celulaSaldoAtivo.textContent = dados['saldo ativo'][i];

        const celulaQuemValidou = document.createElement('td');
        celulaQuemValidou.textContent = dados['quem validou'][i];

        const celulaDiasRecorrentes = document.createElement('td');
        celulaDiasRecorrentes.textContent = dados['dias recorrentes'][i];

        const celulaNATAcumulado = document.createElement('td');
        celulaNATAcumulado.textContent = dados['NAT acumulado'][i];

        // Adiciona as células na linha
        linha.appendChild(celulaSku);
        linha.appendChild(celulaDescricao);
        linha.appendChild(celulaSetor);
        linha.appendChild(celulaEndereco);
        linha.appendChild(celulaSugestao);
        linha.appendChild(celulaUnidadeFaturada);
        linha.appendChild(celulaUnidadeNAT);
        linha.appendChild(celulaSaldoInicial);
        linha.appendChild(celulaSaldoCase);
        linha.appendChild(celulaStatusNAT);
        linha.appendChild(celulaStatusValidado);
        linha.appendChild(celulaSaldoAtivo);
        linha.appendChild(celulaQuemValidou);
        linha.appendChild(celulaDiasRecorrentes);
        linha.appendChild(celulaNATAcumulado);

        // Adiciona a linha na tabela
        tabelaBody.appendChild(linha);
    }
}

// Função para carregar o arquivo JSON e preencher a tabela
function carregarDados(arquivoJson, tabelaId) {
    fetch(arquivoJson)  // Caminho do arquivo JSON
        .then(response => response.json()) // Converte o arquivo JSON em objeto JavaScript
        .then(dados => {
            preencherTabela(dados, tabelaId); // Preenche a tabela com os dados
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
        });
}

// Certificando-se de que o DOM foi carregado antes de preencher as tabelas
document.addEventListener('DOMContentLoaded', () => {
    carregarDados('Ofensores.json', 'tabela-dados');  // Carrega os dados do arquivo ofensores.json
    carregarDados('separação.json', 'tabela-separacao');  // Carrega os dados do arquivo separação.json
    carregarDados('ressuprimento.json', 'tabela-ressuprimento');  // Carrega os dados do arquivo ressuprimento.json
});



// Selecionando os elementos da sidebar e do conteúdo
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const content = document.querySelector('.content');
const toggleItemsBtn = document.getElementById('toggle-items');
const toggleItemsBtn1 = document.getElementById('toggle-items1');
const toggleItemsBtn2 = document.getElementById('toggle-items2');
const itemList = document.getElementById('itemlist');
const itemList1 = document.getElementById('itemlist1');
const itemList2 = document.getElementById('itemlist2');

// Abrir a sidebar
openBtn.addEventListener('click', () => {
    sidebar.classList.add('open');
    content.classList.add('open');
});

// Fechar a sidebar
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('open');
    content.classList.remove('open');
});

// Mostrar ou esconder os itens na sidebar
toggleItemsBtn.addEventListener('click', () => {
    itemList.classList.toggle('show');
    toggleItemsBtn.textContent = itemList.classList.contains('show') ? 'MÁQUINA' : 'MÁQUINA';
});

toggleItemsBtn1.addEventListener('click', () => {
    itemList1.classList.toggle('show');
    toggleItemsBtn1.textContent = itemList1.classList.contains('show') ? 'EXTERNO' : 'EXTERNO';
});

toggleItemsBtn2.addEventListener('click', () => {
    itemList2.classList.toggle('show');
    toggleItemsBtn2.textContent = itemList2.classList.contains('show') ? 'MEZANINO' : 'MEZANINO';
});


function verificarMouse(evento){
    const elemento = evento.target;
    const tr = elemento.closest('tr');
    const tds = tr.getElementsByTagName('td');
   
    for (let i = 0; i < tds.length; i++) {
        tds[i].style.backgroundColor = 'rgba(0, 153, 13, 0.61)';
    }
 
}
function restaurarCor(event){
    const elemento = event.target;
    const tr = elemento.closest('tr');
    const tds = tr.getElementsByTagName('td');

    for( let i= 0; i < tds.length; i++){
        tds[i].style.backgroundColor = "";
    };
};

document.querySelectorAll('table').forEach(td=>{
    td.addEventListener('mouseover', verificarMouse);
    td.addEventListener('mouseout', restaurarCor);
});


