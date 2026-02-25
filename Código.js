function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Dashboard Logístico Executivo')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDadosLogistica() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('TESTE'); 
  const values = sheet.getDataRange().getValues();
  
  const cabecalho = values.shift();
  
  return values.map(r => {
    // Garantindo que a data seja tratada como string ISO no início
    let dataFormatada = "";
    if (r[4] instanceof Date) {
      dataFormatada = r[4].toISOString().split('T')[0];
    }

    return {
      placa: String(r[0]),
      segmento: String(r[1]),
      modelo: String(r[2]),
      motorista: String(r[3]),
      data: dataFormatada,
      valor: parseFloat(r[5]) || 0
    };
  });
}