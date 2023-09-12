const testController = (req, res) => {
    res.status(200).send({
        message: "welcome testing",
        success: true
    })
}

module.exports = { testController }