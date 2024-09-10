const Post = require('../models/postModel')
//Get thong tin post
exports.getPost = async (req, res) => {
    const idPost = req.params.idPost
    console.log(idPost)
    try {
        const result = await Post.findById(idPost);
        console.log(result);

        if (result) {
            return res.status(200).json({ message: "Success", data: result });
        } else {
            return res.status(400).json({ message: "Post not found or invalid ID" });
        }
    } catch (e) {
        console.error(e); // Ghi log lỗi vào console để kiểm tra
        return res.status(500).json({ message: "Internal Server Error", error: e.message });
    }

}
//cap nhat post
exports.updatePost = async (req, res) => {
    const idPost = req.params.idPost
    const contentUpdate = req.body
    console.log(contentUpdate)
    try {
        const updateResult = await Post.findByIdAndUpdate(idPost, contentUpdate, { new: true })
        if (updateResult) {
            console.log("UPDATE : ", updateResult)
            return res.status(200).json({ message: "Success", data: updateResult });
        }
        // Tài liệu không tìm thấy
        res.status(404).json({ message: "Post not found" });
    } catch (e) {
        res.status(500).json("Corrupt data generation process")
    }
}
// xoa bai post
exports.deletePost = async (req, res) => {
    const idPost = req.params.idPost
    try {
        const deletePost = await Post.findByIdAndDelete(idPost)
        if (deletePost) {
            return res.status(201).json("Success")
        }
        res.status(404).json('NOT DELETE')

    } catch (e) {
        console.log(e)
        res.status(500).json("Corrupt data generation process")
    }
}

//tao yeu cau post
exports.createPost = async (req, res) => {
    const { title, role, author } = req.body
    console.log("CreatePost")
    try {
        const newPost = new Post({ title, role, author })
        const result = await newPost.save()
        res.status(201).json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json("Corrupt data generation process")
    }
}