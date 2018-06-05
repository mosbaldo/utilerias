/**
 *  Módulo principal del proyecto
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 25/05/2018
 *  
 *  Este módulo es el encargado de definir los submódulos que pertenecen al módulo de Utilerías,
 *  así como inyectar éstos y otros como dependencias.
 **/

angular.module('Utilerias', [
    'ui.router',
    'Utilerias.PolizasMasivas',
    'Utilerias.Servicios'
]);
angular.module('Utilerias.Servicios', []);


