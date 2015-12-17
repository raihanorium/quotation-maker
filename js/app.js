var app = angular.module('app', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('quotation', {url: "/", templateUrl: "partials/quotation.html"})
	.state('templates', {url: "/templates", templateUrl: "partials/templates.html"})
});

app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {

    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.allTemplates = [
    {
    	name: 'Template 1',
    	path: 'templates/template1.html'
    },
    {
    	name: 'Template 2',
    	path: 'templates/template2.html'
    }
    ];
    $rootScope.products = [
    	{title: 'IP Camera', unitPrice: 2500},
    	{title: 'Cable', unitPrice: 22}
    ];
}]);

app.controller('quotationCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.frmData = {};
	$scope.frmData.template = {};
	$scope.changedValue = function(item){
		$scope.frmData.template = item;
	}

	$scope.frmData.template = $rootScope.allTemplates[0];

	$scope.print = function() {
		var printContents = document.getElementById('result-block').innerHTML;
		var popupWin = window.open('', '_blank', 'width=960,height=600');
		popupWin.document.open()
		popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="css/style.css" /></head><body onload="window.print()">' + printContents + '</html>');
		popupWin.document.close();
	}

	$scope.myInfo = {
		name: 'Raihan Shikder',
		orgName: 'WebJar',
		orgAddress: '121/222, Bara Moghbazar, Dhaka-1203',
		orgTel: '+88 01712 345 678',
		orgWeb: 'http://www.webjarbd.com',
		orgLogo: 'http://www.vectortemplates.com/raster/superman-logo-012.png'
	};
}]);
