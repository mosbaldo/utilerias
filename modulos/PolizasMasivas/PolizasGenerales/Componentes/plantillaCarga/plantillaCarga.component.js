let MainCtrl = function() {
    this.db = {};
    this.db.items = [
      {
        "id": 1,
        "name": {
          "first": "John",
          "last": "Schmidt"
        },
        "address": "45024 France",
        "price": 760.41,
        "isActive": "Yes",
        "product": {
          "description": "Fried Potatoes",
          "options": [
            {
              "description": "Fried Potatoes",
              "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
            },
            {
              "description": "Fried Onions",
              "image": "//a248.e.akamai.net/assets.github.com/images/icons/emoji/fries.png"
            }
          ]
        }
      },
      //more items go here
    ];
    var productos = [
        {id: 1, descripcion: 'Producto 1'},
        {id: 2, descripcion: 'Producto 2'},
        {id: 3, descripcion: 'Producto 3'}
    ];
    this.settings = {
     colHeaders: ['ID', 'First Name', 'Last Name', 'Address', 'Favorite food<br>(allowInvalid true)', 'Price', 'Is active'],
     colums: [
       {},
       {},
       {},
       {},
       {
         editor: 'select',
         selectOptions: function(productos) {
           let response = []
           productos.forEach(function(producto) {
             response.push(producto.descripcion);
           });
           console.log(response);
           return response;
         }
       },
       {},
       {}
     ]
    }
  }
  
  Generales.component('plantillaCarga', {
    // bindings: { person: '<' }},
    templateUrl: 'modulos/PolizasMasivas/PolizasGenerales/Componentes/plantillaCarga/plantillaCarga.html',
    controller: MainCtrl
  });