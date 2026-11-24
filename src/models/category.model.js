import mongoose, {Schema} from 'mongoose';


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: true
    }
}, {timestamps: true});

export const Category = mongoose.model("Category", categorySchema);