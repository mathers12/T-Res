var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var tablesSchema = new Schema({
	seats: [
		{
			_id: {
				type: Schema.Types.ObjectId, ref: 'seats'
			}
		}
	],
	order: Number,
	part: {
		type: Schema.ObjectId,
		ref: 'parts'
	},
	modified: { type: Date, default: Date.now }
},{});

mongoose.model('tables', tablesSchema);
