const baseController = require('../controllers/baseControllers')

const mockRequest = (body={}, params={}, query = {}) =>{
  return {
    body:body,
    params:params,
    query:query
  }
}

const mockResponse = () =>{
  const res = {}
  res.json = jest.fn().mockReturnValue(res)
  res.status = jest.fn().mockReturnValue(res)

  return res
}

// UNIT TEST
describe('Base controller hello function', ()=>{
  test('res.json called with {status:true, message:"Hello world!"}', (done)=>{
    const req = mockRequest()
    const res = mockResponse()

    baseController.hello(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({status:true, message:"Hello world!"})
    done()
  })
})

describe('Base controller sum function', ()=>{
  test('res.json called with {status:true, message:"parameters summarized!", data:{x:x, y:y, result: x+y}}', (done)=>{
    
    const req = mockRequest({x:5, y:5})
    const res = mockResponse()

    baseController.sum(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({
      status:true, 
      message:"parameters summarized123!",
      data:{
        x:req.body.x, 
        y:req.body.y, 
        result: req.body.x+req.body.y
      }
    })
    done()    
  })
})