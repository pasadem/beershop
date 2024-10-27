import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        producer: {
          type: String,
          required: false,
        },
        description:
        {
          type: String,
          required: true,
        },
        brand:  {
          type: String,
          required: true,
        },
        category:  {
          type: String,
          required: true,
        },
        price:  {
          type: Number,
          required: true,
        },
        alfa:  {
          type: String,
          required: true,
        },
        ferment_temp:  {
          type: Number,
          required: false,
        },
        ferment_type:  {
          type: String,
          required: false,
        },
        form:  {
          type: String,
          required: true,
        },
        cropYear:  {
          type: String,
          required: true,
        },
       
       
        charecteristics:  {
          type: String,
          required: true,
        },
        beerStyles:  {
          type: String,
          required: true,
        },
        purpose:  {
          type: String,
          required: true,
        },
        countInStock:  {
          type: Number,
          required: true,
        },
        percent_solids: {
          type: String,
          required: true,
        },
        viability: {
          type: String,
          required: true,
        },
        wild_yeast: {
          type: String,
          required: true,
        },
        origin: {
          type: String,
          required: true,
        },
        bacteria: {
          type: String,
          required: true,
        },
      
      },
        
    /* user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    }, */
  
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;