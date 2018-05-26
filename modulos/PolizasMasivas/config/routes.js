polizasMasivas.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var states = [
        {
          name: 'polizas-masivas.generales',
          url: '/generales',
          component: 'plantillaCarga'
        //   templateUrl: 'modulos/PolizasMasivas/PolizasGenerales/polizasGenerales.html'
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