/**
 *  Configuración principal del proyecto
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 25/05/2018
 *  
 *  Este módulo es el encargado de establecer la configuración del módulo de Utilerías,
 *  hasta el momento, sólo se ha agregado la configuración de los estados del aplicativo.
 **/

angular.module('Utilerias').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var states = [
        {
          name: 'polizas-masivas',
          url: '/polizas-masivas',
          templateUrl: 'app/PolizasMasivas/polizasMasivas.html'
        },
        {
          name: 'about',
          url: '/about',
          template: '<h3>Its the UI-Router hello world app!</h3>' +
                    '<a ui-sref-active="active" ui-sref="about.about2({})">About2</a>' +
                    '<ui-view></ui-view>'
        },
        {
          name: 'about.about2',
          url: '/about2',
          template: '<h3>Its the UI-Router hello world app!</h3>'
        }
    ] 
    
    states.forEach(function(state) {
        $stateProvider.state(state);
    });
  });