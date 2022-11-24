const { product } = require('../models')
const sequelize = require('sequelize')
const { Op } = require("sequelize");

module.exports = {

  list: async (req, res)=>{
    const { search="" } = req.query
    const data = await product.findAll({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('name')), 
        {
          [Op.like]: `%${search.toLowerCase()}%`
        }
      )
    })
    if (data.length == 0) {
      return res.status(404).json({
        status:404,
        message:'Data tidak ditemukan'
      })
    }
    res.status(200).json({
      status:200,
      message:'Successfull',
      response:data
    })
  },

  createProduct:async(req, res) =>{
    const { name="", qty=0, price=0 } = req.body
    if (name == "" || qty == 0 || price == 0) {
      if (name == "") {
        return res.status(400).json({
          status:400,
          message:'Name tidak kosong'
        })
      }
      if (qty == 0) {
        return res.status(400).json({
          status:400,
          message:'Qty tidak boleh 0'
        })
      }
      if (price == 0) {
        return res.status(400).json({
          status:400,
          message:'Price tidak boleh 0'
        })
      }
    } else {
      const create = await product.create({
        name:name,
        qty:qty,
        price:price,
        createdAt:new Date(),
        updatedAt:new Date()
      })
      if (create == null) {
        return res.status(500).json({
          status:500,
          message:'Server error'
        })
      }
      res.status(200).json({
        status:200,
        message:'Successfull insert a new data',
        response:create
      })
    }
  },
  
  editProduct:async(req, res) =>{
    const { productId } = req.params
    const { name="", qty=0, price=0 } = req.body
    if (name == "" || qty == 0 || price == 0) {
      if (name == "") {
        return res.status(400).json({
          status:400,
          message:'Name tidak kosong'
        })
      }
      if (qty == 0) {
        return res.status(400).json({
          status:400,
          message:'Qty tidak boleh 0'
        })
      }
      if (price == 0) {
        return res.status(400).json({
          status:400,
          message:'Price tidak boleh 0'
        })
      }
    } else {
      const update = await product.update({
        name:name,
        qty:qty,
        price:price,
        updatedAt:new Date()
      },{
        where:{
          id:productId
        }
      })
      if (update == null) {
        return res.status(500).json({
          status:500,
          message:'Server error'
        })
      }
      res.status(200).json({
        status:200,
        message:'Successfull update data'
      })
    }
  },

  deleteProduct:async(req, res) =>{
    const { productId } = req.params
    const del = await product.destroy({
      where:{
        id:productId
      }
    })
    if (del == null) {
      return res.status(500).json({
        status:500,
        message:'Server error'
      })
    }
    res.status(200).json({
      status:200,
      message:'Successfull delete data'
    })
  }
}