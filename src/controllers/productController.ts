import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Products } from '../entity/Products';

class productController {
    public static getallproducts = async (req: any, res: Response, next: NextFunction) => {
        try {
            const productRepository = AppDataSource.getRepository(Products);
            const products = await productRepository.find();

            res.status(200).send(products);
        } catch (error) {
            next(error);
        }
    };

    public static getproductbyid = async (req: any, res: Response, next: NextFunction) => {
        const { product_id } = req.body;
        const id = req.product_id

        try {
            const productRepository = AppDataSource.getRepository(Products);
            const product = await productRepository.findOne({ where: {id: product_id }});

            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            res.status(200).send(product);
        } catch (error) {
            next(error);
        }
    };

    public static createproduct = async (req: any, res: Response, next: NextFunction) => {
        const { name, description, price, category, stock } = req.body;

        try {
            const productRepository = AppDataSource.getRepository(Products);
            const newProduct = productRepository.create({
                name,
                description,
                price,
                category,
                stock
            });

            await productRepository.save(newProduct);

            res.status(201).send({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
            next(error);
        }
    };

    public static updateproduct = async (req: any, res: Response, next: NextFunction) => {
        const { id } = req.product_id
        const { name, description, price } = req.body;

        try {
            const productRepository = AppDataSource.getRepository(Products);
            const product = await productRepository.findOne({ where: { id }  });

            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            if (name) product.name = name;
            if (description) product.description = description;
            if (price) product.price = price;

            await productRepository.save(product);

            res.status(200).send({ message: 'Product updated successfully', product });
        } catch (error) {
            next(error);
        }
    };

    public static deleteproduct = async (req: any, res: Response, next: NextFunction) => {
        const { id } = req.body;

        try {
            const productRepository = AppDataSource.getRepository(Products);
            const product = await productRepository.findOne({ where: { id }});

            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            await productRepository.remove(product);

            res.status(200).send({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    };
}

export default productController;
