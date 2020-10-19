sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("org.wfp.zodatapromise.controller.View1", {
		onInit: function () {
			this._readService();
		},
		_readService: function(){
			var sUrl = "/northwind/V2/Northwind/Northwind.svc/";
    var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
    this.getView().setModel(oModel,"viewModel");
    this.getView().getModel("viewModel").setProperty("/ProductData",[]);
    sap.ui.getCore().setModel(oModel);
    var productsData = this._promisRead();
    productsData.then(function(data){
    	let oModel= this.getView().getModel("viewModel");
    	oModel.setProperty("/ProductData", data.results);
    }.bind(this)).catch(function(oError){
    		console.log("promise reject");}.bind(this));
    },
    
    _promisRead: function(){
		return new Promise (function(resolve,reject){
			this.getView().getModel("viewModel").read("/Products",{
				success: function (data){
					console.log("promise resolved");
					resolve(data);
				},
				error: function (oError){
					reject(oError);
				}
			});
		}.bind(this));
	}	
    
    
    });
});