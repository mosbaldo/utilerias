mainModule.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    var states = [
        {
          name: 'polizas-masivas',
          url: '/polizas-masivas',
          templateUrl: 'modulos/PolizasMasivas/polizasMasivas.html'
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