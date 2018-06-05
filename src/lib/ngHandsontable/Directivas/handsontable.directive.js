/**
 *  Directiva principal de Handsontable
 *  Author: Miguel Osbaldo Gallardo Toledo
 *  Fecha de inicio: 31/05/2018
 *  
 *  Esta directiva se encarga de definir cómo interactua la librería de handsontable en el entorno del módulo de Pólizas masivas
 * 
 *  TODO: Evaluar si es factible reutilizar la directiva ngHandsontable o definir desde cero
 *  su comportamiento.
 */

angular.module('ngHandsontable.directives')
    .directive('handsontable', handsontableDirectiva)
   
handsontableDirectiva.$inject = ['settingFactory', '$rootScope', '$parse'];

function handsontableDirectiva(settingFactory, $rootScope, $parse) {
    return {
        restrict: 'EA',
        scope: {},
        // for ng-repeat
        priority: -400,
        
        compile: function(tElement, tAttrs) {
          console.info("Compile");        
          var _this = this,
            bindingsKeys;
  
          this.scope = settingFactory.trimScopeDefinitionAccordingToAttrs(settingFactory.getTableScopeDefinition(), tAttrs);
          bindingsKeys = Object.keys(this.scope);
  
          console.log(bindingsKeys);
          angular.forEach(bindingsKeys, function(key) {
            var mode = _this.scope[key].charAt(0);
            
            _this.$$isolateBindings[key] = {
              attrName: _this.scope[key].length > 1 ? _this.scope[key].substr(1, _this.scope[key].length) : key,
              collection: key === 'datarows',
              mode: mode,
              optional: false
            };
          });
  
          return function(scope, element, attrs) {
            console.log("Return function in compile");
            scope.settings = $parse(attrs.settings)(scope.$parent);
  
            if (!scope.htSettings) {
              scope.htSettings = {};
            }
            // Turn all attributes without value as `true` by default
            angular.forEach(Object.keys(attrs), function(key) {
              if (key.charAt(0) !== '$' && attrs[key] === '') {
                scope.htSettings[key] = true;
              }
            });
  
            settingFactory.mergeSettingsFromScope(scope.htSettings, scope);
            settingFactory.mergeHooksFromScope(scope.htSettings, scope);
  
            if (!scope.htSettings.data) {
              scope.htSettings.data = scope.datarows;
            }
            scope.htSettings.dataSchema = scope.dataschema;
            scope.htSettings.hotId = attrs.hotId;
            scope.htSettings.observeDOMVisibility = scope.observeDomVisibility;
  
            if (scope.htSettings.columns) {
              for (var i = 0, length = scope.htSettings.columns.length; i < length; i++) {
                var column = scope.htSettings.columns[i];
  
                if (column.type !== 'autocomplete') {
                  continue;
                }
                if (!column.optionList) {
                  continue;
                }
                if (typeof column.optionList === 'string') {
                  var optionList = {};
                  var match = column.optionList.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/);
  
                  if (match) {
                    optionList.property = match[1];
                    optionList.object = match[2];
                  } else {
                    optionList.object = optionList;
                  }
                  column.optionList = optionList;
                }
                // autoCompleteFactory.parseAutoComplete(column, scope.datarows, true);
              }
            }
            var origAfterChange = scope.htSettings.afterChange;
  
            scope.htSettings.afterChange = function() {
              if (origAfterChange) {
                origAfterChange.apply(this, arguments);
              }
              if (!$rootScope.$$phase) {
                scope.$apply();
              }
            };
            scope.hotInstance = settingFactory.initializeHandsontable(element, scope.htSettings);
  
            // TODO: Add watch properties descriptor + needs perf test. Watch full equality vs toJson
            angular.forEach(bindingsKeys, function(key) {
              scope.$watch(key, function(newValue, oldValue) {
                if (newValue === void 0) {
                  return;
                }
                if (key === 'datarows') {
                  // If reference to data rows is not changed then only re-render table
                  if (scope.hotInstance.getSettings().data === newValue) {
                    settingFactory.renderHandsontable(scope.hotInstance);
                  } else {
                    scope.hotInstance.loadData(newValue);
                    scope.htSettings.data = newValue;
                  }
                } else if (newValue !== oldValue) {
                  scope.htSettings[key] = newValue;
                  settingFactory.updateHandsontableSettings(scope.hotInstance, scope.htSettings);
                }
              }, ['datarows', 'columns', 'rowHeights', 'colWidths', 'rowHeaders', 'colHeaders'].indexOf(key) >= 0);
            });
  
            /**
             * Check for reference equality changes for datarows
             * TODO: must the remaining bindingsKeys need to be added also if their reference changes
             */
            scope.$watch('datarows', function(newValue) {
              if (newValue === void 0) {
                return;
              }
              if (scope.hotInstance.getSettings().data !== newValue) {
                scope.hotInstance.loadData(newValue);
              }
            });
  
            /**
             * Check if data length has been changed
             */
            scope.$watchCollection('datarows', function(newValue, oldValue) {
              if (oldValue && oldValue.length === scope.htSettings.minSpareRows && newValue.length !== scope.htSettings.minSpareRows) {
                scope.htSettings.data = scope.datarows;
                settingFactory.updateHandsontableSettings(scope.hotInstance, scope.htSettings);
              }
            });
          };
        }
      };
}