/**
 *  Controlador principal del proyecto
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 25/05/2018
 *  
 *  Este controlador es el encargado de definir el comportamiento general del módulo de Utilerías.
 *  
 *  TODO: Se debe evaluar si se sustituye el controlador por un componente, impactaría en la configuración
 *  del archivo general de rutas app/config/routes.js.
 **/

angular.module('Utilerias').run(function($http, $uiRouter) {
    var Visualizer = window['ui-router-visualizer'].Visualizer;
    $uiRouter.plugin(Visualizer);
});