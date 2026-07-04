const testCont = (req,res) => {
    res.status(200).send("<h1>Response from MVC pattern</h1>");
};

module.exports = {testCont};