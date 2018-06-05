/**
 *  Servicios generales del módulo Utilerías
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 25/05/2018
 *  
 *  Contiene los conceptos generales a los que pueden acceder todos los componentes del proyecto.
 *  
 *  TODO: Definir la estructura de los objetos.
 */

angular.module('Utilerias.Servicios')
.factory('Catalogos', ['$http', '$q', function($http, $q, appValues) {
    return {
        GetConceptos: GetConceptos
    }

    function GetConceptos() {
        var d = $q.defer();
        $http.get('app/json/conceptos.json').then(
            function(response) {
                d.resolve(response.data);
            }, function(response) {
                var errorMessage = "Error al cargar los catálogos";
                d.reject(errorMessage);
            });
        return d.promise; 
    }
}]);