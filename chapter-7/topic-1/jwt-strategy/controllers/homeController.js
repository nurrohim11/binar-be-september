module.exports = {
  home:(req, res)=>{
    // ekseskusi create
    const { id, username } = req.user
    res.json({message:'Successfull '+username+" id="+id})
  }
}