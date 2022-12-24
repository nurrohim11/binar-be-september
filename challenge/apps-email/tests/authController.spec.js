const authController = require('../controllers/authController')

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
describe('Auth controller login admin function', ()=>{
  it('res.json called with {status:200, message:"Successfull", response:null}', async function() {
    const req = mockRequest({email:'rohim@gmail.com',password:'password'})
    const res = mockResponse()
    await authController.loginAdmin(req, res)
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({status:200, message:"Successfull", response:null})
  });
})