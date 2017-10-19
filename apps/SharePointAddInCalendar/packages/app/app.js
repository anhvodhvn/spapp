(function(){
	'use strict';
	angular.module('appCalendar',[])
	.directive('mainCalendar', mainCalendar)
	.controller('mainCalendarController', mainCalendarController)
	.factory('searchService', searchService)
	.filter('searchFor', searchFor);

	
	// directives    
    mainCalendar.$inject = [];
    function mainCalendar(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            controller: 'mainCalendarController',			
			template: function () {
				var template = 				
				'	<div id="#instantSearch" class="instantSearch">																				 	       '+
				'		<div class="bar">        																									 	   '+				
				'			<input type="text" ng-model="searchString" ng-change="changeSearch(searchString)"                                              '+
				'                  placeholder="Enter your search terms" ng-keyup="$event.keyCode == 13 && submitSearch(searchString)"/>                   '+
				'		</div>																														 	   '+
				'		<ul>        																												 	   '+
				'			<li ng-repeat="i in items | searchFor:searchString">																	 	   '+
				'				<a href="{{i.url}}">																								 	   '+
				'					<img ng-src="{{i.image}}" />																					 	   '+
				'				</a>																												 	   '+
				'				<p>{{i.title}}</p>																									 	   '+
				'			</li>																													 	   '+
				'		</ul>            																											 	   '+
				'	</div>																															 	   ';				
				return template;
            },
            link: function (scope, element, attrs, ngCtrl) {
                console.log('init directive sample-search.....');
            }
        };
    };


    // controllers
    mainCalendarController.$inject = ['$scope', '$q', 'searchService'];
    function mainCalendarController($scope, $q, searchService){
		// models
		var siteUrl = _spPageContextInfo.siteAbsoluteUrl;		
		$scope.searchString = '';
		$scope.items = [
			{
				url: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png',
				title: '50 Must-have plugins for extending Twitter Bootstrap',				
				image: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png'
			},
			{
				url: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png',
				title: 'Making a Super Simple Registration System With PHP and MySQL',
				image: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png'
			},
			{
				url: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png',
				title: 'Create a slide-out footer with this neat z-index trick',
				image: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png'
			},
			{
				url: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png',
				title: 'How to Make a Digital Clock with jQuery and CSS3',
				image: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png'
			},
			{
				url: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png',
				title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions',
				image: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png'
			},
			{
				url: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png',
				title: 'Mini AJAX File Upload Form',
				image: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png'
			},
			{
				url: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png',
				title: 'Your First Backbone.js App – Service Chooser',
				image: 'https://development365.sharepoint.com/Style%20Library/SharePointAddInSample/img/logo.png'
			}
		];
		
		// functions
        var activate = function(){
			console.log('- activate():');
		}
		
		$scope.changeSearch = function(keyword){
			//console.log('- changeSearch():', keyword);
		}

		$scope.submitSearch = function(keyword){
			console.log('- submitSearch():', keyword);
						
			searchService.getData(siteUrl, keyword).then(function(result){
				if(result)
					console.log(result.d.query.PrimaryQueryResult);
			}, function(error){
				console.log(error);
			})
		};
		
		// start
        activate();
	};


	// services
	searchService.$inject = ['$http', '$q'];
	function searchService($http, $q){
		// constructor
		var searchService = function () {
		}
		
		// methods
        searchService.prototype.getData = function (siteUrl, keyword) {
            var url = String.format("{0}/_api/search/query?querytext='{1}'", siteUrl, keyword);

            var q = $q.defer();
            $http({
                url: url,
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;odata=verbose",
                    "Accept": "application/json;odata=verbose"
                }
            }).success(function (result) {
                q.resolve(result);
            }).error(function (error, status) {
                q.reject(error);
            });
            return q.promise;
        }
		
		return new searchService;
	};
	

	// instance search filter
	function searchFor(){
		return function(arr, searchString){
			if(!searchString) return arr;

			var result = [];
			searchString = searchString.toLowerCase();
			// Using the forEach helper method to loop through the array
			angular.forEach(arr, function(item){
				if(item.title.toLowerCase().indexOf(searchString) !== -1){
					result.push(item);
				}
			});
			return result;
		}
	};	
	
	// angular bootstrap
	angular.element(function() {
      angular.bootstrap(appCalendar, ['appCalendar']);
    });
})();


// prevent default form submit
(function(){
	$(document).ready(function() {
		$("#aspnetForm").submit(function(e){
			e.preventDefault();
			return false;
		});
	});	
})();