
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var intakeformSchema = new Schema({


	//contact details
	emailId: String,
	phoneCode: String,
	phoneNumber: String,
	country: String,
	address: String,
	zip: String,
	state: String,
	city: String,

	//business details
	
	legalBusinessName: String,
	description: String,
    businessTypeSupplier: Boolean,
	businessTypeManufacturer: Boolean,
	businessTypeConsumer: Boolean,
	businessTypeDistributor: Boolean,
	businessTypeGovernment: Boolean,
	
	
   //interest details
	compCase: Object,
	compProjectile: Object,
	compGunpowder: Object,
	compPrimer: Object,
	ammoHandgun: Object,
	ammoShortgun: Object,
	ammoRifle: Object,
	ammoRimfire: Object,
	brandWinchester: Object,
	brandRemington: Object,
	brandFederal: Object,
	brandFiocchi: Object,
	brandHornaday: Object,
	brandX: Object,
	brandY: Object,
	brandZ: Object,

	//Govt details
	tpUsGovt: Object,
	tpIntGovt: Object,
	tpUsCommercial: Object,
	tpIntCommercial: Object,
	saletermImmediate: Object,
	saletermLt30days: Object,
	saletermGt30days: Object,


});
var intakeModel = mongoose.model('userIntake', intakeformSchema);

module.exports = intakeModel;


