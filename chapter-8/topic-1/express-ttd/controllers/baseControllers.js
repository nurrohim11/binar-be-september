module.exports = { 

  hello:(req, res)=>{
    res.status(200).json({
      status:true,
      message:"Hello world!"
    })
  },

  sum:(req, res)=>{
    const { x, y } = req.body
    const result = x+y;

    res.status(200).json({
      status:true,
      message:"parameters summarized!",
      data:{
        x:x, 
        y:y, 
        result: result
      }
    })
  }

}