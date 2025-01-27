let index = 0;
let intervaloCarrossel;
let contatdor = 1;
const intervaloTempoCarrossel = 3500;
let carrosselAtivo = true; // Variável para verificar se o carrossel está ativo

// Função para trocar a imagem
function trocarimagem() {
    var ibm = document.querySelectorAll('.imagem1');
    ibm.src = "Nat.png?t=" + new Date().getTime();
}

// Função para mover o carrossel
function moverCarrossel(direcao) {
    if (contatdor == 3) {
        var ele = document.getElementById('img1');
        var l = "tabelas/NAt.png?ver=" + new Date().getTime();
        ele.src = l;

        var elea = document.getElementById('img2');
        var li = "tabelas/Nat_por_setor.png?ver=" + new Date().getTime();
        elea.src = li;

        var elei = document.getElementById('img3');
        var la = "tabelas/Sobras.png?ver=" + new Date().getTime();
        elei.src = la;

        contatdor = 1;
    } else {
        contatdor += 1;
    }

    const imagens = document.querySelectorAll('.container img');
    const totalImagens = imagens.length;
    trocarimagem();

    index = (index + direcao + totalImagens) % totalImagens;
    const novoTransform = `translateX(-${index * 33.33}%)`;

    document.querySelector('.container').style.transform = novoTransform;
}

// Iniciar o carrossel automaticamente
function iniciarCarrosselAutomatico() {
    if (!intervaloCarrossel) {
        intervaloCarrossel = setInterval(() => {
            moverCarrossel(1); // Mover para a próxima imagem
        }, intervaloTempoCarrossel);
    }
}

// Parar o carrossel automaticamente
function pararCarrosselAutomatico() {
    clearInterval(intervaloCarrossel);
    intervaloCarrossel = null; // Garantir que o intervalo seja limpo corretamente
}

// Função para alternar entre iniciar e parar o carrossel
function alternarCarrossel() {
    if (carrosselAtivo) {
        pararCarrosselAutomatico();  // Para o carrossel
        document.getElementById('btn-controle').textContent = 'GIRAR'; // Muda o texto do botão
    } else {
        iniciarCarrosselAutomatico();  // Inicia o carrossel
        document.getElementById('btn-controle').textContent = 'PARAR'; // Muda o texto do botão
    }
    carrosselAtivo = !carrosselAtivo;  // Alterna o estado do carrossel
}

// Ativar e desativar tela cheia
function alternarTelaCheia() {
    const carrossel = document.querySelector('.carrossel');
    if (!document.fullscreenElement) {
        // Entrar em tela cheia
        carrossel.requestFullscreen().catch(err => {
            console.error(`Erro ao ativar tela cheia: ${err.message}`);
        });
    } else {
        // Sair da tela cheia
        document.exitFullscreen().catch(err => {
            console.error(`Erro ao sair da tela cheia: ${err.message}`);
        });
    }
}

// Função para gerenciar o carrossel quando estiver em tela cheia
function girarCarrosselTelaCheia() {
    if (document.fullscreenElement) {
        // Iniciar a rotação automaticamente quando estiver em tela cheia
        iniciarCarrosselAutomatico();
    } else {
        // Parar a rotação automaticamente quando não estiver em tela cheia
        pararCarrosselAutomatico();
    }
}

// Quando a página for carregada
document.addEventListener('DOMContentLoaded', () => {
    // Iniciar o carrossel automaticamente
    iniciarCarrosselAutomatico();

    // Monitorar mudanças de tela cheia
    document.addEventListener('fullscreenchange', girarCarrosselTelaCheia);

    // Associar o botão de controle do carrossel
    document.getElementById('btn-controle').addEventListener('click', alternarCarrossel);

    // Associar o botão de tela cheia
    document.getElementById('btn-tela-cheia').addEventListener('click', () => {
        alternarTelaCheia();
    });
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
