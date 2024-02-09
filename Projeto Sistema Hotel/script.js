class Hotel {
    constructor() {
        this.quartos = [];       //As duas propriedades no constructor, estão vazias, elas serão utilizadas para armazenamento.
        this.reservas = [];
    }

    adicionarQuarto(quarto) {
        this.quartos.push(quarto); // Adicionando a lista de quartos.
    }

    reservarQuarto(quarto, hospede, dataInicio, dataFim) {
        if (quarto.verificarDisponibilidade()) {
            const reserva = new Reserva(quarto, hospede, dataInicio, dataFim);
            quarto.reservado = true;
            this.reservas.push(reserva);
            return reserva;
        } else {
            console.log("Quarto não disponível para reserva.");
            return null;
        }
    }

    exibirQuartosDisponiveis() {
        const listaQuartos = document.getElementById("lista-quartos");
        listaQuartos.innerHTML = "";
        this.quartos.forEach(quarto => {
            if (quarto.verificarDisponibilidade()) {
                const item = document.createElement("li");
                item.textContent = `Número: ${quarto.numero}, Tipo: ${quarto.tipo}, Preço Diária: R$${quarto.precoDiaria}`;
                listaQuartos.appendChild(item);
            }
        });
    }

    exibirReservas() {
        const listaReservas = document.getElementById("lista-reservas");
        listaReservas.innerHTML = "";
        this.reservas.forEach(reserva => {
            const item = document.createElement("li");
            item.textContent = `Hóspede: ${reserva.hospede.nome}, Quarto: ${reserva.quarto.numero}, Custo Total: R$${reserva.custoTotal}`;
            listaReservas.appendChild(item);
        });
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------//

class Quarto {
    constructor(numero, tipo, precoDiaria) {
        this.numero = numero;
        this.tipo = tipo;
        this.precoDiaria = precoDiaria;
        this.reservado = false; // O quarto não esta reservado no momento da sua criação.
    }

    verificarDisponibilidade() {
        return !this.reservado;
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------//

class Hospede {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------//

class Reserva {
    constructor(quarto, hospede, dataInicio, dataFim) {
        this.quarto = quarto;
        this.hospede = hospede;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.custoTotal = this.calculaCustoTotal();
    }

    calculaCustoTotal() {
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const dias = Math.round((this.dataFim - this.dataInicio) / millisecondsPerDay);
        return this.quarto.precoDiaria * dias;
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------//

const hotel = new Hotel();

const quarto1 = new Quarto(101, "Standard", 100);
const quarto2 = new Quarto(102, "Luxo", 200);
const quarto3 = new Quarto(103, "Suíte", 300);
hotel.adicionarQuarto(quarto1);
hotel.adicionarQuarto(quarto2);
hotel.adicionarQuarto(quarto3);

hotel.exibirQuartosDisponiveis();

const hospede = new Hospede("João", "joao@email.com");

const dataInicio = new Date(2024, 1, 10);
const dataFim = new Date(2024, 1, 15);
const reserva = hotel.reservarQuarto(quarto1, hospede, dataInicio, dataFim);
if (reserva) {
    console.log(`Reserva realizada para ${reserva.hospede.nome} no quarto ${reserva.quarto.numero}. Custo total: R$${reserva.custoTotal}`);
}

hotel.exibirReservas();

//------------------------------------------------------------------------------------------------------------------------------------------//
