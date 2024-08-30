const Categogy = require("../../model/categogy.model");
module.exports.category = async (req, res, next) => {
    let find = {
        deleted: false
       
    }
    function createTree(arr, parentId = "") {
        let tree = [];
        arr.forEach(element => {
            if (element.parent_id === parentId) {
                const newElement = element;
                const children = createTree(arr, element.id);
                if(children.length > 0)
                {

                    newElement.child = children;
                }
                tree.push(newElement);
            }
        });
        return tree;
    }

    const records = await Categogy.find(find);
    const arr = createTree(records);
   
    res.locals.records = arr;
    next();
}