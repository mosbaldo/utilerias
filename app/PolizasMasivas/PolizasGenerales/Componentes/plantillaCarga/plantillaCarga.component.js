/**
 *  Componente de plantilla de carga del submódulo Pólizas Generales
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 25/05/2018
 *  
 *  Componente principal del submódulo de Pólizas generales, es el encargado de definir el comportamiento
 *  general del submódulo.
 *  
 *  TODO: Se debe desagregar el componente para mayor control y encapsulamiento, los posibles componentes
 *  resultantes serían cabecera y detalles.
 */


angular.module('Utilerias.PolizasMasivas.Generales').component('plantillaCarga', {
  // bindings: { person: '<' }},
  templateUrl: 'app/PolizasMasivas/PolizasGenerales/Componentes/plantillaCarga/plantillaCarga.html',
  controller: plantillaCargaCtrl
});

plantillaCargaCtrl.$inject = ['Catalogos', 'hotRegisterer'];

function plantillaCargaCtrl(Catalogos, hotRegisterer) {
  this.rowsCabecera = {obj:{}};
  let noColumnas = {retenciones: 1, impuestos: 1};
  let conceptos = ['Kia', 'Nissan', 'Toyota', 'Honda'];
  let colsIniciales = {cabecera:0, detalles:0};
  
  
  Catalogos.GetConceptos().then(
    function(respuesta) {
      conceptos = respuesta;
    }, function(error) {
      console.error(error);
    });
  
  this.colsCabecera = getColumnasCabecera(conceptos);
  
  colsIniciales.cabecera = this.colsCabecera.length;

  this.colsDetalles = getColumnasDetalles(conceptos);

  colsIniciales.detalles = this.colsDetalles.length;
  
  this.cabeceraConfig = {
    data: this.rowsCabecera,
    columns: this.colsCabecera,
    colHeaders: true,
    rowHeaders: false,
    minRows: 1,
    maxRows: 1
  }

  this.detallesConfig = {
    data: {},
    columns: this.colsDetalles,
    colHeaders: true,
    rowHeaders: false,
    minRows: 1
  }

  this.agregarRetenciones = function() {
    
    this.colsCabecera.push({
      type: 'autocomplete',
      title: 'Retención '+noColumnas.retenciones++,
      data: 'idTipoRetencion',
      source: [],
      filter: false,
      readonly: false,
      AutocompleteValidator: false,
      allowInvalid: true,
      strict: true
    });
    this.colsCabecera.push({
      type: 'text',
      title: 'Monto',
      data: 'montoRetencion',
      readonly: false,
      allowInvalid: false
    });
  };

  this.removerRetenciones = function() {
    if(colsIniciales.cabecera < hotRegisterer.getInstance('htCabecera').countCols()) {
      noColumnas.retenciones--;
      this.colsCabecera.pop();
      this.colsCabecera.pop();
    }
  }

  this.agregarImpuestos = function() {
    
    this.colsDetalles.push({
      type: 'autocomplete',
      title: 'Impuesto '+noColumnas.impuestos++,
      data: 'idTipoImpuesto',
      source: [],
      filter: false,
      readonly: false,
      AutocompleteValidator: false,
      allowInvalid: true,
      strict: true
    });
    this.colsDetalles.push({
      type: 'text',
      title: 'Monto impuesto',
      data: 'montoImpuesto',
      readonly: false,
      allowInvalid: false
    });
  };

  this.removerImpuestos = function() {
    if(colsIniciales.detalles < hotRegisterer.getInstance('htDetalles').countCols()) {
      noColumnas.impuestos--;
      this.colsDetalles.pop();
      this.colsDetalles.pop();
    }
  }

}

function getColumnasDetalles(conceptos) {
  return [
    {
      title: 'Clave presupuestaria',
      readonly: false,
      allowInvalid: false
    },
    {
      title: 'Descripción',
      readonly: false,
      allowInvalid: false
    },
    {
      title: 'Monto',
      readonly: false,
      allowInvalid: false
    }
  ];
}

function getColumnasCabecera(conceptos) {
  return [
    {
      type: 'text',
      title: 'Proceso',
      data: 'idProceso',
      source: conceptos,
      filter: false,
      readonly: false,
      AutocompleteValidator: false,
      allowInvalid: true,
      strict: true
    },
    {
      type: 'autocomplete',
      title: 'Concepto',
      data: 'idConcepto',
      source: conceptos,
      filter: false,
      readonly: false,
      AutocompleteValidator: false,
      allowInvalid: true,
      strict: true
    },
    {
      type: 'text',
      title: 'Subconcepto',
      data: 'idSubconcepto',
      readonly: false,
      allowInvalid: false
    },
    {
      type: 'text',
      title: 'Beneficiario',
      data: 'idPersona',
      readonly: false,
      allowInvalid: false
    },
    {
      type: 'date',
      dateFormat: 'DD/MM/YYYY',
      title: 'Fecha documento',
      data: 'fechaDocumento',
      readonly: false,
      allowInvalid: true
    },
    {
      title: 'Documento fuente',
      data: 'idClaseDocumento',
      readonly: false,
      allowInvalid: false
    },
    {
      title: 'Número de documento fuente',
      data: 'numeroDocumento',
      readonly: false,
      allowInvalid: true
    },
    {
      title: 'Descripción',
      data: 'concepto',
      readonly: false,
      allowInvalid: true
    },
    {
      type: 'date',
      dateFormat: 'DD/MM/YYYY',
      title: 'Fecha probable de pago',
      data: 'fechaDocumentoFuente',
      readonly: false,
      allowInvalid: true
    }
  ];
}