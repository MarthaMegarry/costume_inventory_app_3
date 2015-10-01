/**
 * Created by Mothra on 9/28/15.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CostumeSchema = new Schema({
    cosPic: { type: String },
    cosType: { type: String },
    cosColor: { type: String },
    cosColorCat: { type: String },
    cosNumber: { type: String },
    cosGender: { type: String },
    cosSize: { type: String },
    shoulders: { type: Number },
    napeToHem: { type: Number },
    shoulderToWrist: { type: Number },
    inseam: { type: Number },
    length: { type: Number },
    waist: { type: Number },
    checkedOut: { type: String },
    shows: { type: Array },
    notes: { type: String },
    linked: { type: Array }
});

module.exports = mongoose.model('Costume', CostumeSchema);