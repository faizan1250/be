import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { console } from 'inspector';
import Product from '../models/productModel.js';
import productModel from '../models/productModel.js';


// TO ADD PRODUCTS
const addProduct = async (req, res) => {
    try {
        // Destructure the product data from the request body
        const { name, description, price, category, subcategory, sizes, bestseller } = req.body;

        // Get image files from the request
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Filter out undefined items
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Validate file paths before uploading
        images.forEach((item) => {
            if (!fs.existsSync(item.path)) {
                console.error(`File not found: ${item.path}`);
                return res.status(400).json({ success: false, message: `File not found: ${item.originalname}` });
            }
            console.log("Uploading file:", item.originalname, "Type:", item.mimetype);
        });

        // Upload images to Cloudinary
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                console.log("Uploaded Image Result:", result); // Log Cloudinary response
                return result.secure_url;
            })
        );

        // Create a new product instance using the Product model
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            subcategory,
            sizes: JSON.parse(sizes),
            bestseller,
            image: imageUrl,
            date: Date.now(),
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        console.log("Saved Product:", savedProduct);

        // Send response back to client
        res.status(200).json({
            success: true,
            message: "Product added successfully!",
            data: savedProduct,
        });
    } catch (error) {
        console.error("Error uploading images or saving product:", error);
        res.status(500).json({ success: false, message: error.message, stack: error.stack });
        }
};
// TO REMOVE PRODUCTS
const removeProduct = async(req,res) => {
    try {
     
        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success : true , message : "Product removed"})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false , message : error.message})
    }
}

// PRODUCTS LIST
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        console.log("Fetched Products from DB:", products); // Log to check DB response
        res.json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
    

// SINGLE PRODUCT INFO
const singleProduct = async(req,res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.status(200).json({ success : true , message : product})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success : false , message : error})
    }
}

export{addProduct,listProduct,removeProduct,singleProduct}