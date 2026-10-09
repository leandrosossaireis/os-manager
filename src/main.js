
import './style.css';
import { createIcons, icons } from 'lucide';

console.log("OS Manager Iniciado!");

// Dados de exemplo
const ordens = [
    {
        id: "001",
        cliente: "João Silva",
        equipe: "Equipe A",
        status: "Em andamento",
        data: "2026-10-09"
    },
    {
        id: "002",
        cliente: "Maria Oliveira",
        equipe: "Equipe B",
        status: "Concluída",
        data: "2026-10-08"
    },
    {
        id: "003",
        cliente: "Pedro Santos",
        equipe: "Equipe A",
        status: "Agendada",
        data: "2026-10-10"
    }
];

// Seleciona os elementos do HTML
const listaOrdens = document.querySelector("#list-OS");
const searchInput = document.querySelector("#search-input");

// Define a classe CSS conforme o status
function obterClasseStatus(status) {
    if (status === "Em andamento") {
        return "status-processing";
    }

    if (status === "Concluída") {
        return "status-success";
    }

    if (status === "Agendada") {
        return "status-scheduled";
    }

    return "";
}

// Cria e exibe as linhas da tabela
function renderizarOrdens(ordensFiltradas) {
    // Limpa a tabela antes de renderizar
    listaOrdens.innerHTML = "";

    // Verifica se existem resultados
    if (ordensFiltradas.length === 0) {
        listaOrdens.innerHTML = `
            <tr>
                <td colspan="6" class="info-table text-center py-8 text-slate-500">
                    Nenhuma ordem de serviço encontrada.
                </td>
            </tr>
        `;

        return;
    }

    // Percorre as ordens filtradas
    ordensFiltradas.forEach((ordem) => {
        const classeStatus = obterClasseStatus(ordem.status);

        const linha = `
            <tr>
                <td class="info-table">${ordem.id}</td>
                <td class="info-table">${ordem.cliente}</td>
                <td class="info-table">${ordem.equipe}</td>
                <td class="info-table">
                    <span class="${classeStatus}">
                        ${ordem.status}
                    </span>
                </td>
                <td class="info-table">${ordem.data}</td>
                <td class="info-table">
                    <button
                        class="bg-primary-600 text-white py-1 px-2 rounded-md hover:bg-primary-700 transition-colors"
                        type="button"
                        aria-label="Ações da OS ${ordem.id}"
                    >
                        ...
                    </button>
                </td>
            </tr>
        `;

        listaOrdens.innerHTML += linha;
    });

    // Inicializa os ícones Lucide, caso existam na tabela
    createIcons({ icons });
}

// Executa a busca enquanto o usuário digita
searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.trim().toLowerCase();

    const ordensFiltradas = ordens.filter((ordem) => {
        return (
            ordem.id.toLowerCase().includes(searchTerm) ||
            ordem.cliente.toLowerCase().includes(searchTerm) ||
            ordem.equipe.toLowerCase().includes(searchTerm) ||
            ordem.status.toLowerCase().includes(searchTerm) ||
            ordem.data.toLowerCase().includes(searchTerm)
        );
    });

    renderizarOrdens(ordensFiltradas);
});

// Exibe todas as ordens ao abrir a página
renderizarOrdens(ordens);
