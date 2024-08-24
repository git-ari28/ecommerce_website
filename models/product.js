const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type:"String"
    },
    tags: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shipping: {
        type: Boolean,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
   
});

productSchema.pre('save', function(next) {
    if (this.isNew || this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
});

module.exports = mongoose.model("Product", productSchema);



