import { findAll, create, findByProfile } from '../models/table';

const { getPostData } = require('../utils/utils');

// @desc    Gets All Tasks
// @route   GET /api/tasks
async function getTasks(req, res) {
  try {
    const tasks = await findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Profile Tasks
// @route   GET /api/tasks/:profile
async function getProfileTasks(req, res, profile) {
  try {
    const tasks = await findByProfile(profile);

    if (!tasks) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Tasks Not Found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tasks));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
// async function getProduct(req, res, id) {
//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Product Not Found' }));
//     } else {
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify(product));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// @desc    Create a Product
// @route   POST /api/tasks
async function createTask(req, res) {
  try {
    const body = await getPostData(req);
    const { task, profile } = JSON.parse(body as string);
    const createdTask = await create(task, profile);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(createdTask));
  } catch (error) {
    console.log(error);
  }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
// async function updateProduct(req, res, id) {
//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Product Not Found' }));
//     } else {
//       const body = await getPostData(req);

//       const { name, description, price } = JSON.parse(body);

//       const productData = {
//         name: name || product.name,
//         description: description || product.description,
//         price: price || product.price,
//       };

//       const updProduct = await Product.update(id, productData);

//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       return res.end(JSON.stringify(updProduct));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// @desc    Delete Product
// @route   DELETE /api/product/:id
// async function deleteProduct(req, res, id) {
//   try {
//     const product = await Product.findById(id);

//     if (!product) {
//       res.writeHead(404, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: 'Product Not Found' }));
//     } else {
//       await Product.remove(id);
//       res.writeHead(200, { 'Content-Type': 'application/json' });
//       res.end(JSON.stringify({ message: `Product ${id} removed` }));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = {
  getTasks,
  getProfileTasks,
  createTask,
};
