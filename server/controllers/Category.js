const Category = require("../models/Category")

exports.createCategory = async (req, res) =>{
    try{
        const {name , description} = req.body;
        if(!name){
            return res.status(400).json({
                success:false,
                message: "Category name is required",
            })
        }

        const CategoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(CategoryDetails)
        return res.status(200).json({
            success: true,
            message: " category Created Successfully",
        })

    }
    catch(error){
        return res.status(500).json({
            success:true,
            message: error.message,
        })
    }
}


// error :- yahan parcalling function aur variable name same hai jo error la skate hain
exports.showAllCategories = async (req, res) => {
    try{
        const showAllCategories = await Category.find({} , 
            {name: true,
            description:true,}
        )
        res.status(200).json({
            success:true,
            data : showAllCategories,
        })
    }
    catch(error){

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.categoryPageDetails = async (req, res) =>{
    try{
        const { categoryId} = req.body

        // get courses for the specified category
        const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
        console.log(selectedCategory)
        if(!selectedCategory){
            console.log("category not found")
            return res.status(404).json({
                success:false,
                message: "category not found"
            })
        }
        // handle the case when there are no 
        if(selectedCategory.courses.length === 0){
            return res.status(200).json({
                success: true,
                message: "No courses found for this category",
                data: [],
            });
           
        }

        const selectedCourses = selectedCategory.courses;

        // get courses for other categories
        const coursesExceptSelected = await Category.find({_id: { $ne: categoryId},}).populate("courses").exec();

        let differentCategoryCourses = [];
        coursesExceptSelected.forEach((category) => {
            differentCategoryCourses = differentCategoryCourses.concat(category.courses);
        });

        // Get top selling or popular courses from different categories
        const allCategories = await Category.find({}).populate("courses").exec();
        const allCourses = allCategories.flatMap(category => category.courses);

        const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold).slice(0, 10);

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory: selectedCourses,
                otherCategories: coursesExceptSelected,
                mostSellingCourses: mostSellingCourses,
            },
        })



    }
    catch(error){
        return res.Status(500).json({
            success: false,
            message: error.message,
        })

    }

}


