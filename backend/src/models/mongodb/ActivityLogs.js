const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    module_name: { type: String },
    event_source: { type: String },
    action: { type: String, required: true },
    url: { type: String, required: true },
    data: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const ActivityLogs = mongoose.model('ActivityLogs', activitySchema);

module.exports = ActivityLogs;