// Costanti ARERA
const PUN_LUCE = 0.13832;  // €/kWh
const PSV_GAS = 0.52074;   // €/Smc

// Configurazione dei gestori (spread, commissione fissa)
// Valori presi come esempio; assicurati che siano quelli reali
const gestori = {
  "a2a Energia": { luce: 0.02226, gas: 0.13, commissione: 19.00 },
  "Fastweb Energia": { luce: 0.05, gas: null, commissione: 15.00 },
  "Enel Energia": { luce: 0.0222, gas: 0.0222, commissione: 18.00 },
  "Egea Energie": { luce: 0.04960, gas: 0.11, commissione: 17.00 }
};

// Funzione per interpretare il periodo di fatturazione
function getMoltiplicatore(periodo) {
  if (periodo === "mensile") return 12;
  if (periodo === "bimestrale") return 6;
  if (periodo === "trimestrale") return 4;
  return 12;
}

// Listener per mostrare/nascondere il campo gas in base al servizio scelto
document.getElementById('tipoServizio').addEventListener('change', function() {
  const luceDiv = document.getElementById('consumoLuceDiv');
  const gasDiv = document.getElementById('consumoGasDiv');
  if(this.value === 'gas') {
    luceDiv.classList.add('hidden');
    gasDiv.classList.remove('hidden');
  } else if(this.value === 'luce') {
    luceDiv.classList.remove('hidden');
    gasDiv.classList.add('hidden');
  } else { // entrambi
    luceDiv.classList.remove('hidden');
    gasDiv.classList.remove('hidden');
  }
});

// Calcolo e visualizzazione offerta più conveniente
document.getElementById('calcForm').addEventListener('submit', function(e) {
  e.preventDefault();
  document.getElementById('spinner').classList.remove('hidden');
  
  const tipo = document.getElementById('tipoServizio').value;
  const consumoLuce = parseFloat(document.getElementById('consumoLuce').value) || 0;
  const consumoGas = parseFloat(document.getElementById('consumoGas').value) || 0;
  const costoPrecedente = parseFloat(document.getElementById('costoPrecedente').value) || 0;
  const periodo = document.getElementById('periodoFatturazione').value;
  const moltiplicatore = getMoltiplicatore(periodo);

  let bestOffer = null;
  Object.entries(gestori).forEach(([nome, config]) => {
    let costoEnergia = 0;
    if (tipo === "luce") {
      costoEnergia = (PUN_LUCE + config.luce) * consumoLuce;
    } else if (tipo === "gas") {
      // Se il gestore non offre il servizio gas, salta
      if(config.gas === null) return;
      costoEnergia = (PSV_GAS + config.gas) * consumoGas;
    } else if (tipo === "entrambi") {
      // Se un gestore non offre gas, usa solo luce
      let costoL = (PUN_LUCE + config.luce) * consumoLuce;
      let costoG = config.gas !== null ? (PSV_GAS + config.gas) * consumoGas : 0;
      costoEnergia = costoL + costoG;
    }
    const totale = costoEnergia + config.commissione;
    const risparmio = costoPrecedente ? (costoPrecedente - totale) : null;
    const stimaAnnuale = totale * moltiplicatore;
    // Per il costo per kWh, lo calcolo solo per luce e mostro in formato "0,XX"
    const costoPerKwh = (tipo === "luce" && consumoLuce > 0) ?
      (PUN_LUCE + config.luce).toFixed(2).replace('.', ',') : null;

    const offer = { nome, costoEnergia, commissione: config.commissione, totale, risparmio, stimaAnnuale, costoPerKwh };
    if (!bestOffer || offer.totale < bestOffer.totale) {
      bestOffer = offer;
    }
  });

  let html = "";
  if (bestOffer) {
    html = `
      <div class="p-4 bg-gray-700 rounded-md mb-4">
        <strong>Offerta più conveniente: ${bestOffer.nome}</strong><br>
        Energia: €${bestOffer.costoEnergia.toFixed(2)}<br>
        Commissione: €${bestOffer.commissione.toFixed(2)}<br>
        Totale: €${bestOffer.totale.toFixed(2)}<br>
        Stima annuale: €${bestOffer.stimaAnnuale.toFixed(2)}<br>
        ${bestOffer.costoPerKwh ? `Costo per kWh: €0,${bestOffer.costoPerKwh}` : ""}
        ${bestOffer.risparmio !== null ? `<br>Risparmio: €${bestOffer.risparmio.toFixed(2)}` : ""}
      </div>
    `;
  } else {
    html = "<p>Nessun risultato valido.</p>";
  }
  
  document.getElementById('dettagliPreventivo').innerHTML = html;
  document.getElementById('spinner').classList.add('hidden');
  document.getElementById('risultato').classList.remove('hidden');
});
