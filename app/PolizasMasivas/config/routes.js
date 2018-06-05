/**
 *  Configuración del submódulo Pólizas Masivas
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 25/05/2018
 *  
 *  Este módulo es el encargado de establecer la configuración del módulo de Pólizas másivas,
 *  hasta el momento, sólo se ha agregado la configuración de los estados del módulo.
 */

angular.module('Utilerias.PolizasMasivas').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var states = [
        {
          name: 'polizas-masivas.generales',
          url: '/generales',
          component: 'plantillaCarga',
        },
        {
            name: 'polizas-masivas.comisiones',
            url: '/comisiones',
            template: '<h3>COMISIONES</h3>'
        }
    ] 
    
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
  });