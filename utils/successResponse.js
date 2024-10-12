const successResponse = (res, data, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    data: data
  })
}

export default successResponse