/**
 *  Submódulo Pólizas masivas
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 25/05/2018
 *  
 *  Este submódulo pertenece al módulo principal Utilerías y es el encargado de definir
 *  los submódulos que le pertenecen, así como inyectar éstos y otros como dependencias.
 **/
angular.module('Utilerias.PolizasMasivas', [
    'ngMaterial',
    'ngMessages',
    'ngHandsontable',
    'Utilerias.PolizasMasivas.Generales',
    'Utilerias.PolizasMasivas.Directivas',
    'Utilerias.PolizasMasivas.Servicios'
]);
angular.module('Utilerias.PolizasMasivas.Directivas', []);
angular.module('Utilerias.PolizasMasivas.Servicios', []);